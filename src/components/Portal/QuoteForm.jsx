import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaBox, FaClipboardList, FaCalculator } from 'react-icons/fa';
import { notifyQuoteReceived } from '../services/notificationService';
import Payment from '../Payment/Payment';

export const QuoteForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [formData, setFormData] = useState({
    pickup: { address: '', city: '', code: '' },
    delivery: { address: '', city: '', code: '' },
    package: { type: 'standard', weight: '', dimensions: { length: '', width: '', height: '' } },
    specialInstructions: '',
    isUrgent: false
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const calculateEstimate = () => {
    const weight = parseFloat(formData.package.weight) || 0;
    let basePrice = 350;
    
    if (weight <= 5) basePrice += 0;
    else if (weight <= 20) basePrice += 200;
    else if (weight <= 50) basePrice += 500;
    else basePrice += 1000;
    
    const multipliers = { standard: 1, fragile: 1.5, hazardous: 2, temperature: 1.8 };
    const multiplier = multipliers[formData.package.type] || 1;
    const urgentFee = formData.isUrgent ? 500 : 0;
    const total = (basePrice * multiplier) + urgentFee;
    setEstimatedPrice(total);
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.pickup.address || !formData.delivery.address || !formData.package.weight) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    const quote = {
      id: 'Q-' + Date.now(),
      clientId: user.id,
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: user.phone,
      pickup: formData.pickup,
      delivery: formData.delivery,
      package: formData.package,
      specialInstructions: formData.specialInstructions,
      isUrgent: formData.isUrgent,
      estimatedPrice: calculateEstimate(),
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    };
    
    const quotes = JSON.parse(localStorage.getItem('melome_quotes') || '[]');
    quotes.push(quote);
    localStorage.setItem('melome_quotes', JSON.stringify(quotes));
    
    // Send notifications
    const client = {
      name: user.name,
      email: user.email,
      phone: user.phone
    };
    await notifyQuoteReceived(client, quote);
    
    setCurrentQuote(quote);
    setShowPayment(true);
    setLoading(false);
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Order created.');
    setShowPayment(false);
    navigate('/portal/orders');
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    toast.error('Payment cancelled. You can try again later.');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Request Shipping Quote</h1>
            <p className="text-emerald-100 mt-2">Fill in the details below for an instant estimate</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Pickup Location */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-400" /> Pickup Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Street address"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.pickup.address}
                  onChange={(e) => setFormData({ ...formData, pickup: { ...formData.pickup, address: e.target.value } })}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.pickup.city}
                  onChange={(e) => setFormData({ ...formData, pickup: { ...formData.pickup, city: e.target.value } })}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.pickup.code}
                  onChange={(e) => setFormData({ ...formData, pickup: { ...formData.pickup, code: e.target.value } })}
                />
              </div>
            </div>
            
            {/* Delivery Location */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-400" /> Delivery Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Street address"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.delivery.address}
                  onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, address: e.target.value } })}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.delivery.city}
                  onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, city: e.target.value } })}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.delivery.code}
                  onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, code: e.target.value } })}
                />
              </div>
            </div>
            
            {/* Package Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaBox className="text-emerald-400" /> Package Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  value={formData.package.type}
                  onChange={(e) => setFormData({ ...formData, package: { ...formData.package, type: e.target.value } })}
                >
                  <option value="standard">Standard Package</option>
                  <option value="fragile">Fragile / Glass</option>
                  <option value="hazardous">Hazardous Materials</option>
                  <option value="temperature">Temperature Controlled</option>
                </select>
                
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.package.weight}
                  onChange={(e) => setFormData({ ...formData, package: { ...formData.package, weight: e.target.value } })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Length (cm)"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.package.dimensions.length}
                  onChange={(e) => setFormData({ ...formData, package: { ...formData.package, dimensions: { ...formData.package.dimensions, length: e.target.value } } })}
                />
                <input
                  type="number"
                  placeholder="Width (cm)"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.package.dimensions.width}
                  onChange={(e) => setFormData({ ...formData, package: { ...formData.package, dimensions: { ...formData.package.dimensions, width: e.target.value } } })}
                />
                <input
                  type="number"
                  placeholder="Height (cm)"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  value={formData.package.dimensions.height}
                  onChange={(e) => setFormData({ ...formData, package: { ...formData.package, dimensions: { ...formData.package.dimensions, height: e.target.value } } })}
                />
              </div>
            </div>
            
            {/* Special Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaClipboardList className="text-emerald-400" /> Special Instructions
              </h3>
              <textarea
                rows="3"
                placeholder="Any special handling, delivery instructions, or notes..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              />
            </div>
            
            {/* Urgent Option */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                checked={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
              />
              <span className="text-white">🚀 Urgent Delivery (Additional R500 fee)</span>
            </label>
            
            {/* Estimate Button */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={calculateEstimate}
                className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
              >
                <FaCalculator /> Calculate Estimate
              </button>
              
              {estimatedPrice && (
                <div className="text-right">
                  <p className="text-slate-400 text-sm">Estimated Price:</p>
                  <p className="text-3xl font-bold text-emerald-400">R{estimatedPrice.toLocaleString()}</p>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating Quote...' : 'Proceed to Payment →'}
            </button>
          </form>
        </div>
      </div>

      {/* LIVE Payment Modal */}
      {showPayment && currentQuote && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handlePaymentCancel}>
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <Payment 
              amount={currentQuote.estimatedPrice}
              itemName="Melome Logistics Service"
              itemDescription={`Pickup: ${currentQuote.pickup.city} → Delivery: ${currentQuote.delivery.city} | Weight: ${currentQuote.package.weight}kg`}
              customerEmail={currentQuote.clientEmail}
              customerName={currentQuote.clientName}
              customerPhone={currentQuote.clientPhone}
            />
            <button 
              onClick={handlePaymentCancel}
              className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};