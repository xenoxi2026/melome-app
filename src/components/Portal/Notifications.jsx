import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [emails, setEmails] = useState([]);
  const [sms, setSms] = useState([]);
  const [activeTab, setActiveTab] = useState('emails');

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
    const storedSms = JSON.parse(localStorage.getItem('melome_sms') || '[]');
    setEmails(storedEmails.reverse());
    setSms(storedSms.reverse());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-6 border-b border-slate-800">
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-slate-400 mt-1">View all email and SMS notifications</p>
          </div>
          
          <div className="flex border-b border-slate-800">
            <button onClick={() => setActiveTab('emails')} className={`px-6 py-3 font-medium transition ${activeTab === 'emails' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}>
              ðŸ“§ Emails ({emails.length})
            </button>
            <button onClick={() => setActiveTab('sms')} className={`px-6 py-3 font-medium transition ${activeTab === 'sms' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}>
              ðŸ“± SMS ({sms.length})
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {activeTab === 'emails' && emails.length === 0 && (
              <div className="p-12 text-center text-slate-400">No email notifications yet</div>
            )}
            {activeTab === 'emails' && emails.map((email) => (
              <div key={email.id} className="p-6 hover:bg-slate-800/30 transition">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-emerald-400">{email.subject}</p>
                  <p className="text-xs text-slate-500">{new Date(email.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-sm text-slate-400 mb-1">To: {email.to}</p>
                <p className="text-sm text-white">{email.content?.substring(0, 200)}...</p>
                <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">âœ“ Sent</span>
              </div>
            ))}
            {activeTab === 'sms' && sms.length === 0 && (
              <div className="p-12 text-center text-slate-400">No SMS notifications yet</div>
            )}
            {activeTab === 'sms' && sms.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-slate-800/30 transition">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-emerald-400">ðŸ“± SMS Notification</p>
                  <p className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-sm text-slate-400 mb-1">To: {msg.to}</p>
                <p className="text-sm text-white">{msg.message}</p>
                <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">âœ“ Sent</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/portal/dashboard" className="text-emerald-400 hover:text-emerald-300 transition">
            â† Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notifications;