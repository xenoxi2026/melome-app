import React, { useState } from 'react';
import { MapPin, Package, CheckCircle, Truck, Clock } from 'lucide-react';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data - Replace with your actual API
  const mockTrackingData = {
    'MEL123456': {
      id: 'MEL123456',
      status: 'in_transit',
      from: 'Johannesburg, Gauteng',
      to: 'Dimbaza, Eastern Cape',
      estimatedDelivery: '2026-05-12',
      currentLocation: 'Bloemfontein, Free State',
      history: [
        { status: 'Order Confirmed', date: '2026-05-10 08:00', location: 'Johannesburg' },
        { status: 'Picked Up', date: '2026-05-10 10:30', location: 'Johannesburg' },
        { status: 'In Transit', date: '2026-05-10 14:00', location: 'Bloemfontein' },
        { status: 'Out for Delivery', date: '2026-05-12 08:00', location: 'Dimbaza' }
      ]
    },
    'MEL789012': {
      id: 'MEL789012',
      status: 'delivered',
      from: 'Cape Town, Western Cape',
      to: 'Boksburg, Gauteng',
      estimatedDelivery: '2026-05-09',
      currentLocation: 'Boksburg, Gauteng',
      history: [
        { status: 'Order Confirmed', date: '2026-05-07 09:00', location: 'Cape Town' },
        { status: 'Picked Up', date: '2026-05-07 11:00', location: 'Cape Town' },
        { status: 'In Transit', date: '2026-05-08 08:00', location: 'Colesberg' },
        { status: 'Delivered', date: '2026-05-09 14:30', location: 'Boksburg' }
      ]
    }
  };

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber.toUpperCase()];
      if (data) {
        setShipment(data);
        setError('');
      } else {
        setError('No shipment found with this tracking number');
        setShipment(null);
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'in_transit':
        return <Truck className="text-emerald-500" size={24} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      default:
        return <Package className="text-slate-500" size={24} />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered':
        return 'Delivered';
      case 'in_transit':
        return 'In Transit';
      case 'pending':
        return 'Pending';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Track Your <span className="text-emerald-500">Shipment</span>
        </h1>
        <p className="text-slate-400 text-center mb-12">
          Enter your tracking number to get real-time updates
        </p>

        {/* Search Box */}
        <div className="bg-slate-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter tracking number (e.g., MEL123456)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track Shipment'}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}
        </div>

        {/* Tracking Results */}
        {shipment && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Tracking Number</p>
                  <p className="text-2xl font-bold text-white">{shipment.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(shipment.status)}
                  <span className="font-bold text-lg">{getStatusText(shipment.status)}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <p className="text-slate-400 text-sm flex items-center gap-1"><MapPin size={14} /> From</p>
                  <p className="font-medium">{shipment.from}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm flex items-center gap-1"><MapPin size={14} /> To</p>
                  <p className="font-medium">{shipment.to}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm flex items-center gap-1"><Clock size={14} /> Estimated Delivery</p>
                  <p className="font-medium text-emerald-400">{shipment.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm flex items-center gap-1"><Truck size={14} /> Current Location</p>
                  <p className="font-medium">{shipment.currentLocation}</p>
                </div>
              </div>
            </div>

            {/* Tracking History */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h3 className="text-xl font-bold mb-6">Tracking History</h3>
              <div className="space-y-4">
                {shipment.history.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        index === 0 ? 'bg-emerald-500' : 'bg-slate-600'
                      }`} />
                      {index < shipment.history.length - 1 && (
                        <div className="absolute top-5 left-1 w-0.5 h-12 bg-slate-700" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="font-bold text-white">{event.status}</p>
                      <p className="text-slate-400 text-sm">{event.date}</p>
                      <p className="text-slate-500 text-xs">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Example Tracking Numbers */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-2">Try these example numbers:</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => setTrackingNumber('MEL123456')}
              className="text-emerald-400 text-sm hover:underline"
            >
              MEL123456
            </button>
            <button 
              onClick={() => setTrackingNumber('MEL789012')}
              className="text-emerald-400 text-sm hover:underline"
            >
              MEL789012
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;