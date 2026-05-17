// server.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// PayFast Configuration
const PAYFAST_CONFIG = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  passphrase: process.env.PAYFAST_PASSPHRASE,
  sandbox: process.env.NODE_ENV !== 'production',
  sandbox_url: 'https://sandbox.payfast.co.za/eng/process',
  live_url: 'https://www.payfast.co.za/eng/process'
};

// Helper: Generate PayFast Signature
const generatePayFastSignature = (data) => {
  // Create query string by sorting keys alphabetically
  const queryString = Object.keys(data)
    .sort()
    .map(key => `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}`)
    .join('&');
  
  // Add passphrase if set
  const signatureString = PAYFAST_CONFIG.passphrase 
    ? `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`
    : queryString;
  
  // Generate MD5 signature
  return crypto.createHash('md5').update(signatureString).digest('hex');
};

// Helper: Validate PayFast ITN Data
const validatePayFastITN = (data, signature) => {
  // Remove signature from data for validation
  const { signature: _, ...dataWithoutSignature } = data;
  
  // Generate our own signature
  const expectedSignature = generatePayFastSignature(dataWithoutSignature);
  
  // Compare signatures
  return signature === expectedSignature;
};

// ==================== API ROUTES ====================

/**
 * POST /api/payments/payfast-url
 * Generates PayFast redirect URL for payment
 */
app.post('/api/payments/payfast-url', async (req, res) => {
  try {
    const { amount, item_name, item_description, email, name, phone, order_id } = req.body;
    
    // Validate required fields
    if (!amount || !item_name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: amount, item_name, email' 
      });
    }

    // Generate unique order ID if not provided
    const merchantOrderId = order_id || `MEL${Date.now()}${Math.floor(Math.random() * 10000)}`;
    
    // Prepare payment data for PayFast
    const paymentData = {
      merchant_id: PAYFAST_CONFIG.merchant_id,
      merchant_key: PAYFAST_CONFIG.merchant_key,
      return_url: `${process.env.APP_URL || 'https://mehome-app.onrender.com'}/payment/success`,
      cancel_url: `${process.env.APP_URL || 'https://mehome-app.onrender.com'}/payment/cancel`,
      notify_url: `${process.env.APP_URL || 'https://mehome-app.onrender.com'}/api/payments/itn`,
      m_payment_id: merchantOrderId,
      amount: parseFloat(amount).toFixed(2),
      item_name: item_name.substring(0, 100),
      item_description: (item_description || item_name).substring(0, 255),
      email_address: email,
      name_first: (name || 'Customer').split(' ')[0],
      name_last: (name || 'Customer').split(' ').slice(1).join(' ') || 'Customer',
      cell_number: phone || '',
    };

    // Generate signature
    paymentData.signature = generatePayFastSignature(paymentData);
    
    // Determine PayFast URL
    const payfastUrl = PAYFAST_CONFIG.sandbox 
      ? PAYFAST_CONFIG.sandbox_url 
      : PAYFAST_CONFIG.live_url;
    
    // Build complete URL with query parameters
    const urlParams = new URLSearchParams(paymentData).toString();
    const redirectUrl = `${payfastUrl}?${urlParams}`;
    
    console.log(`[PayFast] Payment initiated for order ${merchantOrderId}, amount: R${amount}`);
    
    // Store order in memory/database (you should use a real database)
    // For now, we'll use a simple in-memory store (replace with your DB)
    const orders = JSON.parse(process.env.TEMP_ORDERS || '{}');
    orders[merchantOrderId] = {
      id: merchantOrderId,
      amount,
      item_name,
      email,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    process.env.TEMP_ORDERS = JSON.stringify(orders);
    
    res.json({
      success: true,
      redirect_url: redirectUrl,
      order_id: merchantOrderId
    });
    
  } catch (error) {
    console.error('[PayFast] URL Generation Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate payment URL' 
    });
  }
});

/**
 * POST /api/payments/itn
 * Handles PayFast Instant Transaction Notification
 */
app.post('/api/payments/itn', async (req, res) => {
  try {
    const itnData = req.body;
    const signature = itnData.signature;
    
    console.log('[PayFast ITN] Received notification:', {
      m_payment_id: itnData.m_payment_id,
      payment_status: itnData.payment_status,
      amount: itnData.amount,
      pf_payment_id: itnData.pf_payment_id
    });
    
    // Step 1: Validate signature
    if (!validatePayFastITN(itnData, signature)) {
      console.error('[PayFast ITN] Invalid signature detected');
      return res.status(400).send('Invalid signature');
    }
    
    // Step 2: Verify payment status
    const isPaymentComplete = itnData.payment_status === 'COMPLETE';
    
    if (!isPaymentComplete) {
      console.log(`[PayFast ITN] Payment not complete. Status: ${itnData.payment_status}`);
      return res.status(200).send('OK');
    }
    
    // Step 3: Verify amount matches expected
    const orderId = itnData.m_payment_id;
    const orders = JSON.parse(process.env.TEMP_ORDERS || '{}');
    const order = orders[orderId];
    
    if (!order) {
      console.error(`[PayFast ITN] Order not found: ${orderId}`);
      return res.status(200).send('OK');
    }
    
    // Compare amounts (convert both to float with 2 decimals)
    const expectedAmount = parseFloat(order.amount).toFixed(2);
    const receivedAmount = parseFloat(itnData.amount).toFixed(2);
    
    if (expectedAmount !== receivedAmount) {
      console.error(`[PayFast ITN] Amount mismatch. Expected: ${expectedAmount}, Received: ${receivedAmount}`);
      return res.status(200).send('OK');
    }
    
    // Step 4: Update order status
    orders[orderId] = {
      ...order,
      status: 'completed',
      payment_id: itnData.pf_payment_id,
      payment_date: itnData.payment_date,
      completed_at: new Date().toISOString()
    };
    process.env.TEMP_ORDERS = JSON.stringify(orders);
    
    console.log(`[PayFast ITN] Payment completed for order ${orderId}`);
    
    // Step 5: Send confirmation email (optional)
    // await sendPaymentConfirmationEmail(order.email, order);
    
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('[PayFast ITN] Error:', error);
    res.status(200).send('OK'); // Always return 200 OK to PayFast
  }
});

/**
 * GET /api/payments/order/:orderId
 * Get order status
 */
app.get('/api/payments/order/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = JSON.parse(process.env.TEMP_ORDERS || '{}');
    const order = orders[orderId];
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    console.error('[PayFast] Order lookup error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Catch-all handler for React routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💳 PayFast Mode: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX' : 'LIVE'}`);
});