import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

const Payment = ({ amount, itemName, itemDescription, customerEmail, customerName, customerPhone }) => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);

    try {
      const response = await fetch('/api/payments/payfast-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          item_name: itemName,
          item_description: itemDescription,
          email: customerEmail,
          name: customerName,
          phone: customerPhone
        })
      });

      const data = await response.json();
      
      if (data.success && data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
      <div className="bg-emerald-500/10 p-6 border-b border-slate-800">
        <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
          <CreditCard size={24} />
          Secure Payment
        </h3>
        <p className="text-slate-400 text-sm mt-1">Pay securely with PayFast</p>
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
        </p>
      </div>
    </div>
  );
};

export default Payment;