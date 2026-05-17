// server.js - ONE SERVER FOR BOTH BACKEND AND FRONTEND
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

// ============================================
// 1. SERVE STATIC FILES FROM REACT BUILD
// ============================================
app.use(express.static(path.join(__dirname, 'build')));

// ============================================
// 2. BACKEND API ROUTES (PayFast)
// ============================================

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
  const queryString = Object.keys(data)
    .sort()
    .map(key => `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}`)
    .join('&');
  
  const signatureString = PAYFAST_CONFIG.passphrase 
    ? `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`
    : queryString;
  
  return crypto.createHash('md5').update(signatureString).digest('hex');
};

// POST /api/payments/payfast-url
app.post('/api/payments/payfast-url', async (req, res) => {
  try {
    const { amount, item_name, item_description, email, name, phone, order_id } = req.body;
    
    if (!amount || !item_name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: amount, item_name, email' 
      });
    }

    const merchantOrderId = order_id || `MEL${Date.now()}${Math.floor(Math.random() * 10000)}`;
    
    const paymentData = {
      merchant_id: PAYFAST_CONFIG.merchant_id,
      merchant_key: PAYFAST_CONFIG.merchant_key,
      return_url: `${process.env.APP_URL || 'https://melome-app.onrender.com'}/payment/success`,
      cancel_url: `${process.env.APP_URL || 'https://melome-app.onrender.com'}/payment/cancel`,
      notify_url: `${process.env.APP_URL || 'https://melome-app.onrender.com'}/api/payments/itn`,
      m_payment_id: merchantOrderId,
      amount: parseFloat(amount).toFixed(2),
      item_name: item_name.substring(0, 100),
      item_description: (item_description || item_name).substring(0, 255),
      email_address: email,
      name_first: (name || 'Customer').split(' ')[0],
      name_last: (name || 'Customer').split(' ').slice(1).join(' ') || 'Customer',
      cell_number: phone || '',
    };

    paymentData.signature = generatePayFastSignature(paymentData);
    
    const payfastUrl = PAYFAST_CONFIG.sandbox 
      ? PAYFAST_CONFIG.sandbox_url 
      : PAYFAST_CONFIG.live_url;
    
    const urlParams = new URLSearchParams(paymentData).toString();
    const redirectUrl = `${payfastUrl}?${urlParams}`;
    
    console.log(`[PayFast] Payment initiated for order ${merchantOrderId}, amount: R${amount}`);
    
    res.json({
      success: true,
      redirect_url: redirectUrl,
      order_id: merchantOrderId
    });
    
  } catch (error) {
    console.error('[PayFast] URL Generation Error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate payment URL' });
  }
});

// POST /api/payments/itn
app.post('/api/payments/itn', async (req, res) => {
  try {
    console.log('[PayFast ITN] Received notification:', req.body);
    res.status(200).send('OK');
  } catch (error) {
    console.error('[PayFast ITN] Error:', error);
    res.status(200).send('OK');
  }
});

// GET /api/payments/order/:orderId
app.get('/api/payments/order/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    res.json({ success: true, order: { id: orderId, status: 'completed' } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ============================================
// 3. CATCH-ALL - SERVES REACT APP FOR ALL OTHER ROUTES
//    THIS MUST BE THE LAST ROUTE!
// ============================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ============================================
// 4. START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💳 PayFast Mode: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX' : 'LIVE'}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
});