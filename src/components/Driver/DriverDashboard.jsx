import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, MapPin, Package, LogOut, RefreshCw,
  DollarSign, User, Calendar, Phone, Mail, Star, TrendingUp, 
  AlertCircle, Navigation, Menu, X
} from 'lucide-react';
import toast from 'react-hot-toast';

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('deliveries');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [earnings, setEarnings] = useState({
    thisMonth: 4250,
    lastMonth: 3800,
    pending: 850,
    payments: [
      { id: 'ORD-001', amount: 1250, date: '2026-05-12', status: 'paid' },
      { id: 'ORD-002', amount: 3200, date: '2026-05-11', status: 'paid' },
      { id: 'ORD-003', amount: 850, date: '2026-05-10', status: 'pending' },
    ]
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const driverData = localStorage.getItem('melome_driver');
    if (!driverData) {
      navigate('/driver/login');
      return;
    }
    setDriver(JSON.parse(driverData));
    loadOrders();
  }, [navigate]);

  const loadOrders = () => {
    setLoading(true);
    // Mock orders - in production, fetch from API
    const mockOrders = [
      { 
        id: 'ORD-001', 
        clientName: 'Mining Corp SA', 
        pickup: { city: 'Johannesburg', address: '123 Main St', time: '10:30 AM' },
        delivery: { city: 'Pretoria', address: '456 Church St', time: '12:00 PM' },
        status: 'picked-up', 
        amount: 1250,
        distance: '58 km',
        customerPhone: '+27781234567'
      },
      { 
        id: 'ORD-002', 
        clientName: 'Construction Solutions', 
        pickup: { city: 'Boksburg', address: 'Industrial Rd', time: '2:00 PM' },
        delivery: { city: 'Midrand', address: 'Commerce Ave', time: '3:30 PM' },
        status: 'assigned', 
        amount: 3200,
        distance: '35 km',
        customerPhone: '+27782345678'
      },
      { 
        id: 'ORD-003', 
        clientName: 'Retail Distributors', 
        pickup: { city: 'Kempton Park', address: 'Airport Rd', time: '9:00 AM' },
        delivery: { city: 'Sandton', address: 'Maude St', time: '10:30 AM' },
        status: 'in-transit', 
        amount: 850,
        distance: '42 km',
        customerPhone: '+27783456789'
      },
    ];
    setAssignedOrders(mockOrders);
    setLoading(false);
  };

  const updateStatus = (orderId, newStatus) => {
    setAssignedOrders(assignedOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} updated to ${newStatus}`);
    
    // If order is delivered, update earnings
    if (newStatus === 'delivered') {
      const order = assignedOrders.find(o => o.id === orderId);
      if (order) {
        setEarnings(prev => ({
          ...prev,
          thisMonth: prev.thisMonth + order.amount,
          payments: [{ id: orderId, amount: order.amount, date: new Date().toISOString().split('T')[0], status: 'paid' }, ...prev.payments]
        }));
      }
    }
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

  const inProgressOrders = assignedOrders.filter(o => o.status !== 'delivered').length;

  const tabs = [
    { id: 'deliveries', label: 'Deliveries', icon: Package },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header - Mobile Friendly */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Truck size={20} className="text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">{driver.name}</h1>
              <p className="text-slate-400 text-xs">Driver Dashboard</p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={loadOrders} className="text-slate-400 hover:text-emerald-400">
              <RefreshCw size={18} />
            </button>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-2">
            <button 
              onClick={loadOrders}
              className="w-full px-4 py-3 text-left text-slate-400 hover:bg-slate-800 transition flex items-center gap-2"
            >
              <RefreshCw size={18} /> Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-red-400 hover:bg-slate-800 transition flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </header>

      {/* Stats Cards */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-3">
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-emerald-400">{assignedOrders.length}</p>
            <p className="text-xs text-slate-400">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-white">{assignedOrders.filter(o => o.status === 'delivered').length}</p>
            <p className="text-xs text-slate-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-emerald-400">R{earnings.thisMonth}</p>
            <p className="text-xs text-slate-400">This Month</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <p className="text-xl md:text-2xl font-bold text-white">{driver.rating || 4.8}</p>
            </div>
            <p className="text-xs text-slate-400">Rating</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-800 px-4">
        <div className="flex space-x-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="p-4 max-w-lg mx-auto">
        {/* Deliveries Tab */}
        {activeTab === 'deliveries' && (
          <>
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
              </div>
            ) : (
              <div className="space-y-4">
                {assignedOrders.map(order => (
                  <div key={order.id} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="text-emerald-400 font-mono text-sm">{order.id}</span>
                          <span className="ml-2 text-xs text-slate-500">{order.pickup.time}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'picked-up' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status === 'picked-up' ? 'PICKED UP' :
                           order.status === 'in-transit' ? 'IN TRANSIT' :
                           order.status === 'delivered' ? 'DELIVERED' : 'ASSIGNED'}
                        </span>
                      </div>
                      <p className="text-white font-bold mt-2">{order.clientName}</p>
                      <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                        <Phone size={12} /> {order.customerPhone}
                      </p>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex gap-3">
                        <MapPin className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500">Pickup</p>
                          <p className="text-sm text-white break-words">{order.pickup.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <MapPin className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500">Delivery</p>
                          <p className="text-sm text-white break-words">{order.delivery.address}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <Navigation className="text-emerald-500" size={16} />
                          <span className="text-sm text-slate-400">{order.distance}</span>
                        </div>
                        <p className="text-emerald-400 font-bold">R{order.amount}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                      {(!order.status || order.status === 'assigned') && (
                        <button onClick={() => updateStatus(order.id, 'picked-up')} 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-sm font-medium transition">
                          ✓ Confirm Pickup
                        </button>
                      )}
                      {order.status === 'picked-up' && (
                        <button onClick={() => updateStatus(order.id, 'in-transit')} 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition">
                          🚚 Start Delivery
                        </button>
                      )}
                      {order.status === 'in-transit' && (
                        <button onClick={() => updateStatus(order.id, 'delivered')} 
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-sm font-medium transition">
                          ✅ Mark Delivered
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <div className="text-center text-green-400 text-sm font-medium">
                          ✓ Delivered
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-900/30 to-slate-900 rounded-lg p-6 border border-emerald-500/20 text-center">
              <TrendingUp className="text-emerald-500 mx-auto mb-3" size={40} />
              <p className="text-3xl md:text-4xl font-bold text-white">R{earnings.thisMonth.toLocaleString()}</p>
              <p className="text-slate-400 mt-1">This Month's Earnings</p>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div>
                  <p className="text-slate-500">Last Month</p>
                  <p className="text-white font-bold">R{earnings.lastMonth}</p>
                </div>
                <div>
                  <p className="text-slate-500">Pending</p>
                  <p className="text-yellow-400 font-bold">R{earnings.pending}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-bold text-white">Payment History</h3>
              </div>
              <div className="divide-y divide-slate-800">
                {earnings.payments.map((payment, i) => (
                  <div key={i} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{payment.id}</p>
                      <p className="text-xs text-slate-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">R{payment.amount}</p>
                      <p className={`text-xs ${payment.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {payment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-slate-950" />
              </div>
              <h2 className="text-xl font-bold text-white">{driver.name}</h2>
              <p className="text-emerald-400 text-sm mt-1">Delivery Driver</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white">{driver.rating || 4.8}</span>
                <span className="text-slate-500 text-sm">(45 reviews)</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
              <div className="divide-y divide-slate-800">
                <div className="p-4 flex items-center gap-3">
                  <Mail className="text-emerald-500 flex-shrink-0" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-white text-sm break-words">{driver.email}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <Phone className="text-emerald-500 flex-shrink-0" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-white text-sm">{driver.phone}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <Truck className="text-emerald-500 flex-shrink-0" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">Vehicle</p>
                    <p className="text-white text-sm">{driver.vehicle || 'Toyota Hilux'}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <Calendar className="text-emerald-500 flex-shrink-0" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">Member Since</p>
                    <p className="text-white text-sm">{driver.joinedDate || 'March 2026'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                <AlertCircle size={16} />
                <p className="text-sm font-medium">Need Help?</p>
              </div>
              <p className="text-sm text-slate-400">
                Contact dispatch: <strong className="text-emerald-400">078 946 7636</strong>
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 md:hidden">
        <div className="flex justify-around py-2">
          <button 
            onClick={() => setActiveTab('deliveries')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition ${activeTab === 'deliveries' ? 'text-emerald-400' : 'text-slate-500'}`}
          >
            <Package size={22} />
            <span className="text-xs mt-1">Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('earnings')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition ${activeTab === 'earnings' ? 'text-emerald-400' : 'text-slate-500'}`}
          >
            <DollarSign size={22} />
            <span className="text-xs mt-1">Earnings</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition ${activeTab === 'profile' ? 'text-emerald-400' : 'text-slate-500'}`}
          >
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center py-2 px-4 rounded-lg text-red-500"
          >
            <LogOut size={22} />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;