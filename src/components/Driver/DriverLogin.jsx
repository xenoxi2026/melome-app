import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Truck, Mail, Lock, Construction, Phone, Mail as MailIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Demo driver credentials
    const driverCredentials = {
      'driver@melome.com': { password: 'driver123', name: 'Sipho Dlamini' },
      'thabo.driver@melome.com': { password: 'driver123', name: 'Thabo Nkosi' }
    };
    
    const driver = driverCredentials[email];
    if (driver && driver.password === password) {
      const driverData = {
        id: 101,
        name: driver.name,
        email: email,
        role: 'driver',
        phone: '+27784567890',
        status: 'active'
      };
      localStorage.setItem('melome_driver', JSON.stringify(driverData));
      toast.success(`Welcome ${driverData.name}!`);
      navigate('/driver/dashboard');
    } else {
      toast.error('Invalid driver credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Under Construction Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-2 mb-4">
            <Construction size={18} className="text-yellow-500" />
            <span className="text-yellow-500 text-sm font-bold">UNDER CONSTRUCTION</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck size={32} className="text-slate-950" />
            </div>
            <h1 className="text-2xl font-bold text-white">Melome Driver</h1>
            <p className="text-slate-400 mt-1">Mobile Delivery App • Coming Soon Q3 2026</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Driver Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="driver@melome.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-center text-slate-500 text-sm mb-2">Demo Credentials:</p>
            <p className="text-center text-slate-400 text-xs">driver@melome.com / driver123</p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
          <p className="text-xs text-slate-500 text-center mb-2">Features coming to Driver App:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-400">✓ Route Optimization</div>
            <div className="flex items-center gap-2 text-slate-400">✓ Live Tracking</div>
            <div className="flex items-center gap-2 text-slate-400">✓ Proof of Delivery</div>
            <div className="flex items-center gap-2 text-slate-400">✓ Earnings Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;