import React, { useState } from 'react';
import { FaCreditCard, FaMobileAlt, FaTimes } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, quote, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  if (!isOpen) return null;

  const handleMockPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPaymentStatus('success');
      setIsProcessing(false);
      
      const quotes = JSON.parse(localStorage.getItem('melome_quotes') || '[]');
      const updatedQuotes = quotes.map(q => 
        q.id === quote.id ? { ...q, status: 'paid', paymentDate: new Date().toISOString() } : q
      );
      localStorage.setItem('melome_quotes', JSON.stringify(updatedQuotes));
      
      const orders = JSON.parse(localStorage.getItem('melome_orders') || '[]');
      const newOrder = {
        id: 'ORD-' + Date.now(),
        quoteId: quote.id,
        clientId: quote.clientId,
        clientName: quote.clientName,
        amount: quote.estimatedPrice,
        status: 'paid',
        createdAt: new Date().toISOString(),
        trackingNumber: 'MEL' + Math.floor(Math.random() * 1000000)
      };
      orders.push(newOrder);
      localStorage.setItem('melome_orders', JSON.stringify(orders));
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl max-w-md w-full border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-slate-800 rounded-lg p-4 mb-6">
            <p className="text-slate-400 text-sm mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold text-emerald-400">R{quote?.estimatedPrice?.toLocaleString()}</p>
            <p className="text-slate-500 text-xs mt-2">Quote: {quote?.id}</p>
          </div>
          <div className="mb-6">
            <p className="text-white font-bold mb-3">Select Payment Method</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition">
                <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-emerald-500" />
                <FaCreditCard className="text-emerald-400 text-xl" />
                <div><p className="text-white font-medium">Credit / Debit Card</p><p className="text-slate-400 text-xs">Visa, Mastercard</p></div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition">
                <input type="radio" name="paymentMethod" value="eft" checked={paymentMethod === 'eft'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-emerald-500" />
                <FaMobileAlt className="text-emerald-400 text-xl" />
                <div><p className="text-white font-medium">Instant EFT</p><p className="text-slate-400 text-xs">All major SA banks</p></div>
              </label>
            </div>
          </div>
          {paymentStatus === 'success' && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4 text-center">
              <span className="text-green-400 text-2xl">✓</span>
              <p className="text-green-400 font-bold mt-1">Payment Successful!</p>
            </div>
          )}
          <button onClick={handleMockPayment} disabled={isProcessing} className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition disabled:opacity-50">
            {isProcessing ? 'Processing...' : 'Pay Now (Test)'}
          </button>
          <p className="text-slate-500 text-xs text-center mt-4">🔒 Test mode - No real charge</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
