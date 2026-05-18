import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, TrendingUp, Users, ArrowRight, MapPin, Package, CheckCircle } from 'lucide-react';

const ChinaCorridor = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full mb-6">
            <Globe size={16} className="text-red-400" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">China-Africa Trade Corridor</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-white">中非贸易</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-emerald-500 bg-clip-text text-transparent">China-Africa Partnership</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Melome facilitates seamless trade and investment between China and 14 SADC countries. 
            Your trusted partner for logistics, market entry, and cross-border cooperation.
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="text-4xl font-black text-red-400">$28B</div>
            <div className="text-slate-400 mt-2">China-SADC Trade Volume</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="text-4xl font-black text-emerald-400">450+</div>
            <div className="text-slate-400 mt-2">Verified Logistics Partners</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="text-4xl font-black text-red-400">14</div>
            <div className="text-slate-400 mt-2">SADC Countries</div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our <span className="text-red-400">Corridor Services</span></h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-red-500/50 transition-all group">
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <Package size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sourcing & Procurement</h3>
              <p className="text-slate-400">
                Direct sourcing from Chinese manufacturers. Quality control, consolidation, and export documentation.
              </p>
              <Link to="/logistics" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mt-4 text-sm font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-red-500/50 transition-all group">
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <MapPin size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cross-Border Logistics</h3>
              <p className="text-slate-400">
                Sea freight, air freight, and rail solutions. End-to-end tracking from Chinese ports to SADC destinations.
              </p>
              <Link to="/tracking" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mt-4 text-sm font-medium">
                Track Shipment →
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-red-500/50 transition-all group">
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <Users size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Investment Facilitation</h3>
              <p className="text-slate-400">
                Connecting Chinese investors with SADC opportunities. Market research, partner identification, and due diligence.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mt-4 text-sm font-medium">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner with <span className="text-red-400">Melome?</span></h2>
            <div className="w-20 h-1 bg-red-500 mb-6"></div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-500 mt-0.5" />
                <div><span className="text-white font-bold">Bilingual Team</span><p className="text-slate-400">Mandarin & English fluent staff</p></div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-500 mt-0.5" />
                <div><span className="text-white font-bold">On-the-Ground Presence</span><p className="text-slate-400">Shanghai and Johannesburg offices</p></div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-500 mt-0.5" />
                <div><span className="text-white font-bold">Regulatory Expertise</span><p className="text-slate-400">Customs clearance specialists</p></div>
              </li>
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition mt-6">
              Speak with a Specialist <ArrowRight size={18} />
            </Link>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Quick Facts</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Shanghai to Durban:</span>
                <span className="text-white font-bold">22 days</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Air freight transit:</span>
                <span className="text-white font-bold">3-5 days</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Customs clearance:</span>
                <span className="text-white font-bold">24-48 hours</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">WeChat Support:</span>
                <span className="text-white font-bold">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-950/30 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore the Corridor?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Let's discuss how Melome can support your China-Africa trade objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:china@melome.co.za" className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg transition inline-flex items-center justify-center gap-2">
              Contact China Desk <ArrowRight size={18} />
            </a>
            <Link to="/contact" className="border border-slate-700 hover:border-red-500 text-white font-bold px-8 py-4 rounded-lg transition">
              General Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChinaCorridor;