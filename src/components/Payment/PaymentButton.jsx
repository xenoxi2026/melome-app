import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

const Payment = ({ amount, itemName, itemDescription, customerEmail, customerName, customerPhone }) => {
  const [processing, setProcessing] = useState(false);

  // LIVE PAYFAST CONFIGURATION
  const PAYFAST_CONFIG = {
    merchant_id: '34934721',
    merchant_key: 'nbmhut4xj9wi9',
    passphrase: 'MelomeMoney2020',
    url: 'https://www.payfast.co.za/eng/process',  // LIVE URL
  };

  const generateSignature = async (data) => {
    // Call your backend to generate signature securely
    const response = await fetch('/api/payments/generate-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result.signature;
  };

  const handlePayment = async () => {
    setProcessing(true);

    const orderId = `MEL${Date.now()}${Math.floor(Math.random() * 10000)}`;
    
    // First, get signature from backend
    const signatureResponse = await fetch('/api/payments/generate-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: PAYFAST_CONFIG.merchant_id,
        merchant_key: PAYFAST_CONFIG.merchant_key,
        amount: amount.toString(),
        item_name: itemName,
        email_address: customerEmail
      })
    });
    const { signature } = await signatureResponse.json();
    
    const paymentData = {
      merchant_id: PAYFAST_CONFIG.merchant_id,
      merchant_key: PAYFAST_CONFIG.merchant_key,
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      notify_url: `${window.location.origin}/api/payments/itn`,
      m_payment_id: orderId,
      amount: amount.toString(),
      item_name: itemName,
      item_description: itemDescription.substring(0, 100),
      email_address: customerEmail,
      name_first: customerName?.split(' ')[0] || 'Customer',
      name_last: customerName?.split(' ').slice(1).join(' ') || 'Customer',
      cell_number: customerPhone || '',
      signature: signature
    };

    // Create form and submit to PayFast
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
          <div className="bg-emerald-500/10 p-6 border-b border-slate-800">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <CreditCard size={24} />
              Secure Payment
            </h3>
            <p className="text-slate-400 text-sm mt-1">Pay securely with PayFast</p>
            <div className="mt-2 inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">
              🔒 LIVE MODE - Real transactions
            </div>
          </div>

          <div className="p-6">
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total:</span>
                <span className="text-emerald-400 font-bold text-xl">R{parseFloat(amount).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6 text-xs text-slate-500">
              <div className="flex items-center gap-1"><Lock size={12} /> Secure</div>
              <div className="flex items-center gap-1"><Shield size={12} /> Protected</div>
              <div className="flex items-center gap-1"><CheckCircle size={12} /> Instant</div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processing ? 'Processing...' : `Pay R${parseFloat(amount).toFixed(2)} →`}
            </button>

            <p className="text-slate-500 text-xs text-center mt-4">
              You will be redirected to PayFast's secure payment page.
              Your card details are never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;