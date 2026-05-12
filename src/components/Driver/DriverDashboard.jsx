import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Construction, CheckCircle, MapPin, Package, LogOut, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const driverData = localStorage.getItem('melome_driver');
    if (!driverData) {
      navigate('/driver/login');
      return;
    }
    setDriver(JSON.parse(driverData));
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    const allOrders = JSON.parse(localStorage.getItem('melome_orders') || '[]');
    const myOrders = allOrders.filter(o => o.driverId === 101);
    setAssignedOrders(myOrders);
    setLoading(false);
  };

  const updateStatus = (orderId, newStatus) => {
    const orders = JSON.parse(localStorage.getItem('melome_orders') || '[]');
    const updatedOrders = orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
    );
    localStorage.setItem('melome_orders', JSON.stringify(updatedOrders));
    loadOrders();
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('melome_driver');
    toast.success('Logged out successfully');
    navigate('/driver/login');
  };

  if (!driver) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-emerald-400">Loading...</div>
      </div>
    );
  }

  const completedOrders = assignedOrders.filter(o => o.status === 'delivered').length;
  const inProgressOrders = assignedOrders.filter(o => o.status !== 'delivered').length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Under Construction Header */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Construction size={16} className="text-yellow-500" />
          <span className="text-yellow-500 text-xs font-medium">UNDER CONSTRUCTION - FULL FEATURES COMING SOON</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Truck size={20} className="text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{driver.name}</h1>
              <p className="text-slate-400 text-xs">Driver Dashboard • Beta</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadOrders} className="text-slate-400 hover:text-emerald-400">
              <RefreshCw size={18} />
            </button>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-center">
            <Package className="text-emerald-500 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{assignedOrders.length}</p>
            <p className="text-slate-500 text-sm">Total Orders</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-center">
            <CheckCircle className="text-emerald-500 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{completedOrders}</p>
            <p className="text-slate-500 text-sm">Completed</p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-lg">My Deliveries</h2>
          <span className="text-slate-400 text-xs">{inProgressOrders} in progress</span>
        </div>
        
        {loading ? (
          <div className="bg-slate-900 p-8 rounded-lg text-center">
            <p className="text-slate-400">Loading orders...</p>
          </div>
        ) : assignedOrders.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-lg text-center border border-slate-800">
            <Package className="text-slate-600 mx-auto mb-3" size={48} />
            <p className="text-slate-400">No orders assigned yet</p>
            <p className="text-slate-500 text-sm mt-2">Check back later for deliveries</p>
          </div>
        ) : (
          <div className="space-y-3">
            {assignedOrders.map(order => (
              <div key={order.id} className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-emerald-400 font-mono text-sm">{order.id}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'picked-up' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status?.toUpperCase() || 'ASSIGNED'}
                  </span>
                </div>
                <p className="text-white font-medium">{order.clientName || 'Customer'}</p>
                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                  <MapPin size={14} />
                  <span>{order.pickup?.city || 'JHB'} → {order.delivery?.city || 'CPT'}</span>
                </div>
                {order.amount && (
                  <p className="text-emerald-400 font-bold mt-2">R{order.amount.toLocaleString()}</p>
                )}
                
                <div className="flex gap-2 mt-3">
                  {(!order.status || order.status === 'assigned') && (
                    <button onClick={() => updateStatus(order.id, 'picked-up')} 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition">
                      Confirm Pickup
                    </button>
                  )}
                  {order.status === 'picked-up' && (
                    <button onClick={() => updateStatus(order.id, 'in-transit')} 
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm font-medium transition">
                      Start Delivery
                    </button>
                  )}
                  {order.status === 'in-transit' && (
                    <button onClick={() => updateStatus(order.id, 'delivered')} 
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded text-sm font-medium transition">
                      Mark Delivered
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <div className="flex-1 bg-green-500/20 text-green-400 py-2 rounded text-sm text-center font-medium">
                      ✓ Delivered
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coming Soon Section */}
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
          <p className="text-sm text-slate-400 text-center">🚧 More features coming soon:</p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-500 text-center">
            <span>📍 Live GPS Tracking</span>
            <span>📸 Photo POD</span>
            <span>💰 Earnings Dashboard</span>
            <span>💬 In-app Chat</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;