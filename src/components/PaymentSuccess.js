import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

const PaymentSuccess = () => {
  useEffect(() => {
    // Track successful payment
    console.log('Payment successful!');
    // You can send email confirmation here
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-emerald-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Payment Successful! ðŸŽ‰</h1>
        <p className="text-slate-400 mb-8">
          Your payment has been processed successfully. We'll start processing your order immediately.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Package size={18} className="text-emerald-500" />
            What happens next?
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-emerald-500">1.</span>
              <span>Order confirmation sent to your email</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500">2.</span>
              <span>Our team prepares your shipment</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500">3.</span>
              <span>Tracking number shared within 2 hours</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500">4.</span>
              <span>Real-time updates via SMS/Email</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            to="/tracking" 
            className="block bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition"
          >
            Track Your Shipment
          </Link>
          <Link 
            to="/" 
            className="block border border-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition"
          >
            Return to Home
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1"><Mail size={14} /> info@melome.co.za</div>
          <div className="flex items-center gap-1"><Truck size={14} /> 24/7 Support</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;