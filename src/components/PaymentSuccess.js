import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Clock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const orderId = searchParams.get('order_id');
  
  useEffect(() => {
    if (orderId) {
      fetchOrderStatus();
    } else {
      setLoading(false);
    }
  }, [orderId]);
  
  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(`/api/payments/order/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
      toast.error('Could not verify order status');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-emerald-400">Verifying payment...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="bg-emerald-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-white">Payment Successful! 🎉</h1>
        <p className="text-slate-400 mb-8">
          Your payment has been processed successfully. We'll start processing your order immediately.
        </p>
        
        {order && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left">
            <p className="text-sm text-slate-500 mb-2">Order Reference</p>
            <p className="text-lg font-mono text-emerald-400 mb-4">{order.id}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-white font-bold">R{parseFloat(order.amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Status:</span>
                <span className="text-green-400">Completed</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 text-left border border-slate-700">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
            <Package size={18} className="text-emerald-500" />
            What happens next?
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">1.</span>
              <span>Order confirmation sent to your email</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">2.</span>
              <span>Our team prepares your shipment</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">3.</span>
              <span>Tracking number shared within 2 hours</span>
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