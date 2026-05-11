import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-emerald-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/portal/dashboard" />;
  }

  return children;
};