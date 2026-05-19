// server.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5802;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App URL
const APP_URL = process.env.APP_URL || 'http://localhost:5802';
console.log(`📱 APP_URL: ${APP_URL}`);

// ============================================
// PAYFAST CONFIGURATION
// ============================================
const PAYFAST_CONFIG = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID || '34934721',
  merchant_key: process.env.PAYFAST_MERCHANT_KEY || 'nbmhut4xj9wi9',
  passphrase: process.env.PAYFAST_PASSPHRASE || 'MelomeMoney2020',
  sandbox: false,
  live_url: 'https://www.payfast.co.za/eng/process'
};

console.log(`💳 PayFast Merchant ID: ${PAYFAST_CONFIG.merchant_id}`);
console.log(`💳 PayFast Mode: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX' : 'LIVE'}`);

// Helper: Generate PayFast Signature
const generatePayFastSignature = (data) => {
  const queryString = Object.keys(data)
    .sort()
    .map(key => {
      const value = data[key];
      if (value === '' || value === null || value === undefined) return null;
      return `${key}=${encodeURIComponent(value.toString().trim()).replace(/%20/g, '+')}`;
    })
    .filter(item => item !== null)
    .join('&');
  
  const signatureString = `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`;
  return crypto.createHash('md5').update(signatureString).digest('hex');
};

// ============================================
// API ROUTES
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

app.post('/api/payments/payfast-url', (req, res) => {
  console.log('[API] PayFast request:', req.body);
  
  try {
    const { amount, item_name, email, name } = req.body;
    
    if (!amount || !item_name || !email) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
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
      email_address: email,
      name_first: firstName,
      name_last: lastName,
    };
    
    paymentData.signature = generatePayFastSignature(paymentData);
    
    const redirectUrl = `${PAYFAST_CONFIG.live_url}?${new URLSearchParams(paymentData).toString()}`;
    
    console.log(`[API] Payment initiated: ${merchantOrderId}, Amount: R${amount}`);
    
    res.json({ success: true, redirect_url: redirectUrl, order_id: merchantOrderId });
    
  } catch (error) {
    console.error('[API] Error:', error);
    res.status(500).json({ success: false, error: 'Payment initiation failed' });
  }
});

app.post('/api/payments/itn', (req, res) => {
  console.log('[API] ITN received');
  res.status(200).send('OK');
});

// ============================================
// STATIC FILES
// ============================================
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');

console.log(`📁 Build path: ${buildPath}`);
console.log(`📁 Index exists: ${fs.existsSync(indexPath)}`);

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// ============================================
// CATCH-ALL
// ============================================
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <html>
        <head><title>Melome API</title></head>
        <body>
          <h1>Melome API Server</h1>
          <p>Server is running. Build folder not found.</p>
          <p>Run <code>npm run build</code> to build the React app.</p>
          <p>API is available at <a href="/api/health">/api/health</a></p>
        </body>
      </html>
    `);
  }
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`🔗 APP_URL: ${APP_URL}`);
  console.log(`💳 PayFast: ${PAYFAST_CONFIG.sandbox ? 'SANDBOX' : 'LIVE'}`);
  console.log(`\n📱 Test API: ${APP_URL}/api/health`);
});