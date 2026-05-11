import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, HelpCircle, MessageCircle } from 'lucide-react';

<a 
  href="#contact" 
  className="block border border-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition"
>
  Contact Support
</a>

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-red-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-slate-400 mb-8">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold mb-4">Need help?</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p>If you experienced any issues, please contact us:</p>
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-emerald-500" />
              <span>WhatsApp: 078 946 7636</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle size={16} className="text-emerald-500" />
              <span>Email: info@melome.co.za</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            to="/" 
            className="block bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition"
          >
            Return to Home
          </Link>
          <Link 
            to="/contact" 
            className="block border border-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;