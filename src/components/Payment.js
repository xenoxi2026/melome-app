import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

const Payment = ({ amount, itemName, itemDescription }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // PayFast Configuration
  // FOR TESTING (Sandbox Mode) - Get your actual credentials from payfast.co.za
  const PAYFAST_CONFIG = {
    // Sandbox (Testing) - Use these for now
    merchant_id: '10000100',  // Sandbox test merchant
    merchant_key: '46f0cd694581a',
    passphrase: 'testpassphrase',
    url: 'https://sandbox.payfast.co.za/eng/process',
    
    // For Production (when you go live):
    // merchant_id: 'YOUR_LIVE_MERCHANT_ID',
    // merchant_key: 'YOUR_LIVE_MERCHANT_KEY',
    // url: 'https://www.payfast.co.za/eng/process'
  };

  const generateSignature = (data) => {
    // Simple signature for testing - Replace with proper backend signature in production
    const queryString = Object.keys(data)
      .sort()
      .map(key => `${key}=${encodeURIComponent(data[key].toString().trim())}`)
      .join('&');
    
    // Add passphrase if set
    const signatureString = PAYFAST_CONFIG.passphrase 
      ? `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`
      : queryString;
    
    // Simple hash (not secure - for testing only)
    let hash = 0;
    for (let i = 0; i < signatureString.length; i++) {
      const char = signatureString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  const handlePayment = async () => {
    setProcessing(true);

    // Generate unique order ID
    const orderId = `MEL${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Prepare payment data
    const paymentData = {
      merchant_id: PAYFAST_CONFIG.merchant_id,
      merchant_key: PAYFAST_CONFIG.merchant_key,
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      notify_url: `${window.location.origin}/api/payment/notify`,
      m_payment_id: orderId,
      amount: amount.toString(),
      item_name: itemName,
      item_description: itemDescription.substring(0, 100),
      email_address: 'customer@example.com', // Replace with actual customer email
      name_first: 'Customer',
      name_last: 'Name',
      cell_number: '0780000000',
    };

    // Add signature
    paymentData.signature = generateSignature(paymentData);

    // Create form and submit
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = PAYFAST_CONFIG.url;
    form.target = '_blank';

    Object.keys(paymentData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-500/10 p-6 border-b border-slate-800">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <CreditCard size={24} />
              Secure Payment
            </h3>
            <p className="text-slate-400 text-sm mt-1">Pay securely with PayFast</p>
          </div>

          {/* Payment Methods */}
          <div className="p-6">
            <div className="space-y-3 mb-6">
              <div 
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  paymentMethod === 'card' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <input type="radio" checked={paymentMethod === 'card'} readOnly className="text-emerald-500" />
                <span className="text-2xl">ðŸ’³</span>
                <div>
                  <p className="font-bold">Credit/Debit Card</p>
                  <p className="text-slate-400 text-xs">Visa, Mastercard, American Express</p>
                </div>
              </div>

              <div 
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  paymentMethod === 'eft' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setPaymentMethod('eft')}
              >
                <input type="radio" checked={paymentMethod === 'eft'} readOnly />
                <span className="text-2xl">ðŸ¦</span>
                <div>
                  <p className="font-bold">Instant EFT</p>
                  <p className="text-slate-400 text-xs">Direct bank transfer</p>
                </div>
              </div>

              <div 
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  paymentMethod === 'mobicred' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setPaymentMethod('mobicred')}
              >
                <input type="radio" checked={paymentMethod === 'mobicred'} readOnly />
                <span className="text-2xl">ðŸ“±</span>
                <div>
                  <p className="font-bold">Mobicred</p>
                  <p className="text-slate-400 text-xs">Buy now, pay monthly</p>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-white">R{amount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Fee:</span>
                <span className="text-white">R{(amount * 0.035).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="text-emerald-400 font-bold text-xl">R{(amount + (amount * 0.035)).toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 mb-6 text-xs text-slate-500">
              <div className="flex items-center gap-1"><Lock size={12} /> PCI Compliant</div>
              <div className="flex items-center gap-1"><Shield size={12} /> 3D Secure</div>
              <div className="flex items-center gap-1"><CheckCircle size={12} /> Instant Confirmation</div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>Processing... <span className="animate-spin">â³</span></>
              ) : (
                <>Pay R{amount} with PayFast â†’</>
              )}
            </button>

            <p className="text-slate-500 text-xs text-center mt-4">
              You will be redirected to PayFast's secure payment page.
              No card details are stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;