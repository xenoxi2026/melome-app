import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Connect with </span>
            <span className="text-emerald-500">Command</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg">Direct line to our logistics command center. We respond within 2 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-emerald-400">Send Direct Message</h3>
            {isSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-6 text-center">
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-slate-300">We'll respond within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Siphelo Badela" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="info@melome.co.za" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Describe your logistics requirements..."></textarea>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                  <Send size={18} /> {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Command Centers</h3>
              <div className="space-y-4">
                <div><h4 className="text-white font-bold mb-2">📍 Gauteng Hub</h4><p className="text-slate-400">Boksburg, South Africa</p></div>
                <div><h4 className="text-white font-bold mb-2">📍 Eastern Cape Base</h4><p className="text-slate-400">Dimbaza, South Africa</p></div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Direct Line</h3>
              <p className="text-slate-300 mb-2">📞 078 946 7636</p>
              <p className="text-slate-300">📧 info@melome.co.za</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;