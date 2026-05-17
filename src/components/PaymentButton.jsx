import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const PaymentButton = ({ amount, itemName, itemDescription, customerEmail, customerName, customerPhone, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Call backend to get PayFast redirect URL
      const response = await axios.post('/api/payments/payfast-url', {
        amount,
        item_name: itemName,
        item_description: itemDescription,
        email: customerEmail,
        name: customerName,
        phone: customerPhone
      });
      
      if (response.data.success) {
        // Redirect to PayFast
        window.location.href = response.data.redirect_url;
        if (onSuccess) onSuccess(response.data.order_id);
      } else {
        throw new Error(response.data.error || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard size={20} />
          Pay R{amount.toFixed(2)} with PayFast
        </>
      )}
    </button>
  );
};

export default PaymentButton;