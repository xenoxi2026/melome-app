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

// Get APP_URL from environment
const APP_URL = process.env.APP_URL || 'http://localhost:5000';
console.log(`📱 APP_URL: ${APP_URL}`);

// ============================================
// 1. API ROUTES FIRST (BEFORE static files!)
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
  const { signature, ...cleanData } = data;
  
  const queryString = Object.keys(cleanData)
    .sort()
    .map(key => {
      const value = cleanData[key];
      if (value === '' || value === null || value === undefined) return null;
      return `${key}=${encodeURIComponent(value.toString().trim()).replace(/%20/g, '+')}`;
    })
    .filter(item => item !== null)
    .join('&');
  
  const signatureString = PAYFAST_CONFIG.passphrase 
    ? `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`
    : queryString;
  
  return crypto.createHash('md5').update(signatureString).digest('hex');
};

// Health check - MUST be before static files
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// POST /api/payments/payfast-url
app.post('/api/payments/payfast-url', async (req, res) => {
  console.log('[PayFast] Request received:', req.body);
  
  try {
    const { amount, item_name, item_description, email, name, phone } = req.body;
    
    if (!amount || !item_name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const merchantOrderId = `MEL${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const firstName = (name || 'Customer').split(' ')[0];
    const lastName = (name || 'Customer').split(' ').slice(1).join(' ') || 'Customer';
    
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
      name_first: firstName,
      name_last: lastName,
    };
    
    if (phone && phone.trim()) {
      paymentData.cell_number = phone.replace(/\D/g, '').substring(0, 13);
    }
    
    paymentData.signature = generatePayFastSignature(paymentData);
    
    const payfastUrl = PAYFAST_CONFIG.sandbox 
      ? PAYFAST_CONFIG.sandbox_url 
      : PAYFAST_CONFIG.live_url;
    
    const redirectUrl = `${payfastUrl}?${new URLSearchParams(paymentData).toString()}`;
    
    console.log(`[PayFast] Payment initiated: ${merchantOrderId}`);
    
    res.json({ success: true, redirect_url: redirectUrl, order_id: merchantOrderId });
    
  } catch (error) {
    console.error('[PayFast] Error:', error);
    res.status(500).json({ success: false, error: 'Payment initiation failed' });
  }
});

// POST /api/payments/itn
app.post('/api/payments/itn', async (req, res) => {
  console.log('[PayFast ITN] Received:', req.body);
  res.status(200).send('OK');
});

// GET /api/payments/order/:orderId
app.get('/api/payments/order/:orderId', (req, res) => {
  res.json({ success: true, order: { id: req.params.orderId, status: 'completed' } });
});

// ============================================
// 2. STATIC FILES (React build)
// ============================================
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');

app.use(express.static(buildPath));

// ============================================
// 3. CATCH-ALL - Must be LAST!
// ============================================
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build not found');
  }
});

// ============================================
// 4. START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`\n🚀 Melome server running on port ${PORT}`);
  console.log(`💳 PayFast Mode: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX' : 'LIVE'}`);
  console.log(`🔗 APP_URL: ${APP_URL}`);
});