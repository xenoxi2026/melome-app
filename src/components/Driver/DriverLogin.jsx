import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const driverEmails = {
      'driver@melome.com': 'driver123',
      'thabo.driver@melome.com': 'driver123'
    };
    
    if (driverEmails[email] && driverEmails[email] === password) {
      const driverData = {
        id: 101,
        name: email === 'driver@melome.com' ? 'Sipho Dlamini' : 'Thabo Nkosi',
        email: email,
        role: 'driver',
        phone: '+27784567890'
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-800">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">ðŸšš</div>
          <h1 className="text-2xl font-bold text-white">Melome Driver</h1>
          <p className="text-slate-400 mt-1">Mobile Delivery App</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Driver Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Logging in...' : 'Login â†’'}
          </button>
        </form>
        
        <p className="text-center text-slate-500 text-sm mt-6">
          Demo: driver@melome.com / driver123
        </p>
      </div>
    </div>
  );
};

export default DriverLogin;