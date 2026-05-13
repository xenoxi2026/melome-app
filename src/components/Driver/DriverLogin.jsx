import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Truck, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Driver credentials (internal only)
    const driverCredentials = {
      'driver@melome.com': { password: 'driver123', name: 'Sipho Dlamini', id: 101, phone: '+27784567890', vehicle: 'Toyota Hilux' },
      'thabo.driver@melome.com': { password: 'driver123', name: 'Thabo Nkosi', id: 102, phone: '+27782345678', vehicle: 'Ford Ranger' }
    };
    
    const driver = driverCredentials[email];
    if (driver && driver.password === password) {
      const driverData = {
        id: driver.id,
        name: driver.name,
        email: email,
        role: 'driver',
        phone: driver.phone,
        vehicle: driver.vehicle,
        status: 'active',
        joinedDate: 'March 2026',
        rating: 4.8,
        deliveriesCompleted: 45
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck size={32} className="text-slate-950" />
            </div>
            <h1 className="text-2xl font-bold text-white">Melome Driver Portal</h1>
            <p className="text-slate-400 text-sm mt-1">Access your deliveries & earnings</p>
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

          <div className="mt-4 text-center">
            <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition inline-flex items-center gap-1">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;