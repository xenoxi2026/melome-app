import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, TrendingUp, Truck, DollarSign, 
  CheckCircle, Clock, AlertCircle, Search, 
  RefreshCw, Bell, BellOff, LogOut, Menu, X
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const user = localStorage.getItem('melome_user');
    if (!user) {
      navigate('/portal/login');
      return;
    }
    loadData();
  }, []);

  const loadData = () => {
    const savedQuotes = localStorage.getItem('melome_quotes');
    const savedOrders = localStorage.getItem('melome_orders');
    
    if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('melome_user');
    navigate('/portal/login');
  };

  const pendingQuotes = quotes.filter(q => q.status === 'pending' || q.status === 'pending_payment');
  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

  const stats = [
    { label: 'Pending Quotes', value: pendingQuotes.length, color: '#f59e0b', icon: Clock },
    { label: 'Active Orders', value: activeOrders.length, color: '#3b82f6', icon: Package },
    { label: 'Completed', value: completedOrders.length, color: '#10b981', icon: CheckCircle },
    { label: 'Revenue', value: `R${totalRevenue.toLocaleString()}`, color: '#10b981', icon: DollarSign },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-emerald-400 text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 border-b border-slate-800 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Truck className="text-emerald-500" size={28} />
              <h1 className="text-xl font-bold text-white">Melome Admin</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="text-slate-400 hover:text-white"
            >
              {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed left-0 top-14 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'} md:translate-x-0 md:w-64`}>
        <div className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'overview' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <TrendingUp size={20} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'quotes' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Clock size={20} />
            <span>Quotes ({pendingQuotes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'orders' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Package size={20} />
            <span>Orders ({activeOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <CheckCircle size={20} />
            <span>Completed</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <stat.icon size={32} style={{ color: stat.color, opacity: 0.6 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Quotes */}
              <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-white font-bold">Recent Quotes</h3>
                </div>
                <div className="divide-y divide-slate-800">
                  {pendingQuotes.slice(0, 5).map(quote => (
                    <div key={quote.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-emerald-400 text-sm">{quote.id}</p>
                          <p className="text-white font-medium">{quote.clientName}</p>
                          <p className="text-slate-400 text-sm">R{quote.estimatedPrice?.toLocaleString()}</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Pending</span>
                      </div>
                    </div>
                  ))}
                  {pendingQuotes.length === 0 && (
                    <div className="p-8 text-center text-slate-500">No pending quotes</div>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-slate-900 rounded-lg border border-slate-800">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-white font-bold">Active Orders</h3>
                </div>
                <div className="divide-y divide-slate-800">
                  {activeOrders.slice(0, 5).map(order => (
                    <div key={order.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-emerald-400 text-sm">{order.id}</p>
                          <p className="text-white font-medium">{order.clientName}</p>
                          <p className="text-slate-400 text-sm">R{order.amount?.toLocaleString()}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">{order.status}</span>
                      </div>
                    </div>
                  ))}
                  {activeOrders.length === 0 && (
                    <div className="p-8 text-center text-slate-500">No active orders</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-white font-bold">All Quotes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Quote ID</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Client</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Amount</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Status</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {quotes.map(quote => (
                      <tr key={quote.id} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-sm text-emerald-400">{quote.id}</td>
                        <td className="px-4 py-3 text-sm text-white">{quote.clientName}</td>
                        <td className="px-4 py-3 text-sm text-white">R{quote.estimatedPrice?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            quote.status === 'pending_payment' ? 'bg-yellow-500/20 text-yellow-400' :
                            quote.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-400">{new Date(quote.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-white font-bold">Active Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Order ID</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Client</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Amount</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Status</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {activeOrders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-sm text-emerald-400">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-white">{order.clientName}</td>
                        <td className="px-4 py-3 text-sm text-white">R{order.amount?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'assigned' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-400">{new Date(order.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Completed Tab */}
          {activeTab === 'completed' && (
            <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-white font-bold">Completed Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Order ID</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Client</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Amount</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Status</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {completedOrders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-sm text-emerald-400">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-white">{order.clientName}</td>
                        <td className="px-4 py-3 text-sm text-white">R{order.amount?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Delivered</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-400">{new Date(order.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;