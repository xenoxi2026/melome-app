import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaTruck, FaFileInvoice, FaChartLine, FaBox, FaClock, FaCheckCircle } from 'react-icons/fa';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeShipments: 0,
    deliveredThisMonth: 0,
    pendingQuotes: 0,
    totalSpent: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo data - replace with API call
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        activeShipments: 3,
        deliveredThisMonth: 12,
        pendingQuotes: 2,
        totalSpent: 12500
      });
      
      setRecentOrders([
        { id: 'ORD-2026-001', date: '2026-05-01', status: 'delivered', tracking: 'MEL123456', amount: 2450, from: 'Johannesburg', to: 'Cape Town' },
        { id: 'ORD-2026-002', date: '2026-05-03', status: 'in-transit', tracking: 'MEL123457', amount: 3780, from: 'Pretoria', to: 'Durban' },
        { id: 'ORD-2026-003', date: '2026-05-05', status: 'pending', tracking: 'MEL123458', amount: 1250, from: 'Boksburg', to: 'Port Elizabeth' },
        { id: 'ORD-2026-004', date: '2026-05-06', status: 'processing', tracking: 'MEL123459', amount: 5600, from: 'Johannesburg', to: 'Harare' }
      ]);
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'delivered': 'bg-green-500/20 text-green-400 border-green-500/50',
      'in-transit': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'processing': 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-emerald-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-400 text-sm">Welcome back, {user?.name}</p>
            </div>
            <Link to="/portal/logout" className="text-slate-400 hover:text-emerald-400 transition">
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Shipments</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.activeShipments}</p>
              </div>
              <FaTruck className="text-3xl text-emerald-400" />
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Delivered (This Month)</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.deliveredThisMonth}</p>
              </div>
              <FaCheckCircle className="text-3xl text-emerald-400" />
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Quotes</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.pendingQuotes}</p>
              </div>
              <FaClock className="text-3xl text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-white mt-1">R{stats.totalSpent.toLocaleString()}</p>
              </div>
              <FaChartLine className="text-3xl text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/portal/quote" className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <FaFileInvoice className="text-3xl mb-3" />
            <h3 className="text-lg font-bold">Request Quote</h3>
            <p className="text-emerald-100 text-sm mt-1">Get instant pricing</p>
          </Link>
          
          <Link to="/portal/orders" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <FaClipboardList className="text-3xl mb-3" />
            <h3 className="text-lg font-bold">My Orders</h3>
            <p className="text-blue-100 text-sm mt-1">View order history</p>
          </Link>
          
          <Link to="/portal/tracking" className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <FaBox className="text-3xl mb-3" />
            <h3 className="text-lg font-bold">Track Shipment</h3>
            <p className="text-purple-100 text-sm mt-1">Live tracking</p>
          </Link>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">From â†’ To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-sm font-mono text-white">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{order.from} â†’ {order.to}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">R{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/portal/tracking?order=${order.tracking}`} className="text-emerald-400 hover:text-emerald-300 text-sm">
                        Track â†’
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};