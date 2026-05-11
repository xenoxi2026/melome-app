import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders - using realistic South African pricing
    const loadOrders = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const demoOrders = [
        { id: 'ORD-2026-001', date: '2026-05-01', status: 'Delivered', tracking: 'MEL123456', amount: 2450, from: 'Johannesburg', to: 'Cape Town' },
        { id: 'ORD-2026-002', date: '2026-05-03', status: 'In Transit', tracking: 'MEL123457', amount: 3780, from: 'Pretoria', to: 'Durban' },
        { id: 'ORD-2026-003', date: '2026-05-05', status: 'Pending', tracking: 'MEL123458', amount: 1250, from: 'Boksburg', to: 'Port Elizabeth' },
        { id: 'ORD-2026-004', date: '2026-05-06', status: 'Processing', tracking: 'MEL123459', amount: 5600, from: 'Johannesburg', to: 'Harare' },
        { id: 'ORD-2026-005', date: '2026-05-02', status: 'Delivered', tracking: 'MEL123460', amount: 890, from: 'Cape Town', to: 'George' },
        { id: 'ORD-2026-006', date: '2026-05-04', status: 'In Transit', tracking: 'MEL123461', amount: 3200, from: 'Durban', to: 'Johannesburg' }
      ];
      
      setOrders(demoOrders);
      setLoading(false);
    };
    
    loadOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Delivered':
        return { background: '#10b981', color: 'white' };
      case 'In Transit':
        return { background: '#3b82f6', color: 'white' };
      case 'Pending':
        return { background: '#f59e0b', color: 'white' };
      case 'Processing':
        return { background: '#8b5cf6', color: 'white' };
      default:
        return { background: '#64748b', color: 'white' };
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#10b981', fontSize: '18px' }}>Loading orders...</div>
      </div>
    );
  }

  // Calculate total cost
  const totalCost = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '50px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '28px', marginBottom: '8px' }}>My Orders</h1>
            <p style={{ color: '#94a3b8' }}>View and track all your shipments</p>
          </div>
          <div style={{ background: '#1e293b', padding: '15px 25px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '5px' }}>Total Spent</p>
            <p style={{ color: '#10b981', fontSize: '24px', fontWeight: 'bold' }}>R{totalCost.toLocaleString()}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#334155', borderBottom: '1px solid #475569' }}>
                <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>Order #</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>Route</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#cbd5e1', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} style={{ borderBottom: index === orders.length - 1 ? 'none' : '1px solid #334155' }}>
                  <td style={{ padding: '15px', color: 'white', fontFamily: 'monospace' }}>{order.id}</td>
                  <td style={{ padding: '15px', color: '#cbd5e1' }}>{order.date}</td>
                  <td style={{ padding: '15px', color: '#cbd5e1' }}>{order.from} â†’ {order.to}</td>
                  <td style={{ padding: '15px', color: 'white', fontWeight: '600' }}>R{order.amount.toLocaleString()}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px',
                      fontWeight: '600',
                      ...getStatusStyle(order.status)
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <Link 
                      to={`/portal/tracking?order=${order.tracking}`} 
                      style={{ 
                        color: '#10b981', 
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#34d399'}
                      onMouseLeave={(e) => e.target.style.color = '#10b981'}
                    >
                      Track â†’
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link 
            to="/portal/dashboard" 
            style={{ 
              display: 'inline-block',
              color: '#10b981', 
              textDecoration: 'none',
              padding: '10px 20px',
              background: '#1e293b',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2d3a5e';
              e.target.style.color = '#34d399';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1e293b';
              e.target.style.color = '#10b981';
            }}
          >
            â† Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};