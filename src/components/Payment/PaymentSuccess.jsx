import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-emerald-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
        <p className="text-slate-400 mb-8">
          Your payment has been processed successfully. We'll start processing your order immediately.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Package size={18} className="text-emerald-500" />
            What happens next?
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3"><span className="text-emerald-500">1.</span><span>Order confirmation sent to your email</span></div>
            <div className="flex items-start gap-3"><span className="text-emerald-500">2.</span><span>Our team prepares your shipment</span></div>
            <div className="flex items-start gap-3"><span className="text-emerald-500">3.</span><span>Tracking number shared within 2 hours</span></div>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/" className="block bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;