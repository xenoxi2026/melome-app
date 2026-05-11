import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const driverData = localStorage.getItem('melome_driver');
    if (!driverData) {
      navigate('/driver/login');
      return;
    }
    setDriver(JSON.parse(driverData));
    
    // Load assigned orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('melome_orders') || '[]');
    const myOrders = allOrders.filter(o => o.driverId === 101 || o.driver === driverData.name);
    setAssignedOrders(myOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const orders = JSON.parse(localStorage.getItem('melome_orders') || '[]');
    const updatedOrders = orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
    );
    localStorage.setItem('melome_orders', JSON.stringify(updatedOrders));
    setAssignedOrders(updatedOrders.filter(o => o.driverId === 101));
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  if (!driver) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-emerald-400">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">ðŸšš {driver.name}</h1>
            <p className="text-slate-400 text-sm">Driver Dashboard</p>
          </div>
          <button onClick={() => {
            localStorage.removeItem('melome_driver');
            navigate('/driver/login');
          }} className="text-slate-400 hover:text-white">Logout</button>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-4 bg-slate-900 p-4 rounded-lg">
          <p className="text-slate-400">Today's Stats</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{assignedOrders.length}</p>
              <p className="text-slate-500 text-sm">Active Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">0</p>
              <p className="text-slate-500 text-sm">Completed</p>
            </div>
          </div>
        </div>

        <h2 className="text-white font-bold mb-3">My Assigned Orders</h2>
        
        {assignedOrders.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-lg text-center">
            <p className="text-slate-400">No orders assigned yet</p>
            <p className="text-slate-500 text-sm mt-2">Pull down to refresh</p>
          </div>
        ) : (
          <div className="space-y-3">
            {assignedOrders.map(order => (
              <div key={order.id} className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-emerald-400 font-mono text-sm">{order.id}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{order.status}</span>
                </div>
                <p className="text-white font-medium">{order.clientName}</p>
                <p className="text-slate-400 text-sm mt-1">ðŸ“ {order.pickup?.city || 'JHB'} â†’ ðŸ“¦ {order.delivery?.city || 'CPT'}</p>
                <p className="text-emerald-400 font-bold mt-2">R{order.amount?.toLocaleString()}</p>
                
                <div className="flex gap-2 mt-3">
                  {order.status === 'assigned' && (
                    <button onClick={() => updateStatus(order.id, 'picked-up')} className="flex-1 bg-blue-500 text-white py-2 rounded text-sm">Confirm Pickup</button>
                  )}
                  {order.status === 'picked-up' && (
                    <button onClick={() => updateStatus(order.id, 'in-transit')} className="flex-1 bg-purple-500 text-white py-2 rounded text-sm">Start Delivery</button>
                  )}
                  {order.status === 'in-transit' && (
                    <button onClick={() => updateStatus(order.id, 'delivered')} className="flex-1 bg-emerald-500 text-slate-950 py-2 rounded text-sm font-bold">Mark Delivered</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverDashboard;