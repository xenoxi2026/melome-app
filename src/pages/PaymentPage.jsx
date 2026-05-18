import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, Truck } from 'lucide-react';

const PaymentPage = () => {
  const [amount, setAmount] = useState(500);
  const [itemName, setItemName] = useState('Melome Logistics Service');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    // Validate email
    if (!customerEmail) {
      setError('Please enter your email address');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/payments/payfast-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          item_name: itemName,
          item_description: `Logistics service - ${itemName}`,
          email: customerEmail,
          name: customerName || 'Customer',
          phone: customerPhone || '0780000000'
        })
      });

      const data = await response.json();
      
      if (data.success && data.redirect_url) {
        // Redirect to PayFast payment page
        window.location.href = data.redirect_url;
      } else {
        setError('Payment initiation failed. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Network error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={40} className="text-slate-950" />
          </div>
          <h1 className="text-3xl font-bold text-white">Secure Payment</h1>
          <p className="text-slate-400 mt-2">Pay securely with PayFast</p>
        </div>

        {/* Payment Form */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="bg-emerald-500/10 p-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CreditCard size={24} className="text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Payment Details</h2>
            </div>
            <div className="mt-2 inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">
              🔒 LIVE MODE - Real transaction
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Email - Required */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Receipt will be sent to this email</p>
            </div>

            {/* Name - Optional */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Phone - Optional */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="078 000 0000"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Amount (R)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Item / Service
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Lock size={12} /> Secure
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Shield size={12} /> Protected
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <CheckCircle size={12} /> Instant
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-950"></div>
                  Processing...
                </>
              ) : (
                `Pay R${amount.toFixed(2)} →`
              )}
            </button>

            <p className="text-slate-500 text-xs text-center">
              You will be redirected to PayFast's secure payment page.
              Your card details are never stored on our servers.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-slate-400 hover:text-emerald-400 text-sm transition">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;