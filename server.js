// server.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
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
// Check if build folder exists
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');

console.log(`Build path: ${buildPath}`);
console.log(`Index path: ${indexPath}`);
console.log(`Build exists: ${fs.existsSync(buildPath)}`);
console.log(`Index exists: ${fs.existsSync(indexPath)}`);

// Serve static files
app.use(express.static(buildPath));

// ============================================
// 2. BACKEND API ROUTES (PayFast)
// ============================================

// PayFast Configuration - LIVE MODE
// sandbox: false means REAL transactions with REAL money!
// Your customers will be charged for real!
const PAYFAST_CONFIG = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  passphrase: process.env.PAYFAST_PASSPHRASE,
  sandbox: false,  // false = LIVE real money transactions, true = test mode with fake cards
  sandbox_url: 'https://sandbox.payfast.co.za/eng/process',
  live_url: 'https://www.payfast.co.za/eng/process'  // LIVE URL - real money!
};

// Get APP_URL from environment or use default
const APP_URL = process.env.APP_URL || 'http://localhost:5000';
console.log(`📱 APP_URL: ${APP_URL}`);

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

// ============================================
// ENDPOINT: Generate signature for payment
// ============================================
app.post('/api/payments/generate-signature', (req, res) => {
  try {
    const { merchant_id, merchant_key, amount, item_name, email_address } = req.body;
    
    const data = {
      merchant_id,
      merchant_key,
      amount,
      item_name,
      email_address
    };
    
    const queryString = Object.keys(data)
      .sort()
      .map(key => `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}`)
      .join('&');
    
    const signatureString = `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`;
    const signature = crypto.createHash('md5').update(signatureString).digest('hex');
    
    console.log(`[PayFast] Signature generated for amount: R${amount}`);
    res.json({ success: true, signature });
  } catch (error) {
    console.error('[PayFast] Signature generation error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate signature' });
  }
});

// POST /api/payments/payfast-url
app.post('/api/payments/payfast-url', async (req, res) => {
  try {
    const { amount, item_name, item_description, email, name, phone } = req.body;
    
    if (!amount || !item_name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: amount, item_name, email' 
      });
    }

    const merchantOrderId = `MEL${Date.now()}${Math.floor(Math.random() * 10000)}`;
    
    const paymentData = {
      merchant_id: PAYFAST_CONFIG.merchant_id,
      merchant_key: PAYFAST_CONFIG.merchant_key,
      return_url: `${APP_URL}/payment/success`,
      cancel_url: `${APP_URL}/payment/cancel`,
      notify_url: `${APP_URL}/api/payments/itn`,
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
    
    console.log(`[PayFast] Payment initiated for order ${merchantOrderId}`);
    console.log(`[PayFast] Mode: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX (TEST)' : 'LIVE (REAL MONEY)'}`);
    console.log(`[PayFast] Return URL: ${APP_URL}/payment/success`);
    
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

// POST /api/payments/itn - Instant Transaction Notification
app.post('/api/payments/itn', async (req, res) => {
  console.log('[PayFast ITN] Received notification:', req.body);
  
  // Verify the payment
  const { payment_status, amount, m_payment_id, pf_payment_id } = req.body;
  
  if (payment_status === 'COMPLETE') {
    console.log(`✅ PAYMENT COMPLETE! Order: ${m_payment_id}, Amount: R${amount}, PayFast ID: ${pf_payment_id}`);
    // Here you would update your database with the successful payment
  } else {
    console.log(`⚠️ Payment status: ${payment_status} for order: ${m_payment_id}`);
  }
  
  res.status(200).send('OK');
});

// GET /api/payments/order/:orderId
app.get('/api/payments/order/:orderId', (req, res) => {
  res.json({ success: true, order: { id: req.params.orderId, status: 'completed' } });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// ============================================
// 3. CATCH-ALL - SERVES REACT APP FOR ALL OTHER ROUTES
// ============================================
app.get('*', (req, res) => {
  console.log(`Serving index.html for: ${req.url}`);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build not found. Please run npm run build first.');
  }
});

// ============================================
// 4. START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`\n🚀 Melome server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💳 PayFast Mode: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX (TEST MODE - No real money)' : 'LIVE (REAL MONEY - Customers will be charged)'}`);
  console.log(`🔗 APP_URL: ${APP_URL}`);
  console.log(`\n📱 Test URLs:`);
  console.log(`   Home: http://localhost:${PORT}/`);
  console.log(`   Pay: http://localhost:${PORT}/pay`);
  console.log(`   Admin: http://localhost:${PORT}/admin/dashboard`);
  console.log(`   API Health: http://localhost:${PORT}/api/health\n`);
});