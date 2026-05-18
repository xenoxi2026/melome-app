import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, Ship, Database, FileCheck, Clock, MapPin, 
  Scale, Shield, TrendingUp, ChevronRight, Package,
  Warehouse, Plane, BarChart3, CheckCircle, ArrowRight,
  Calendar, Users, Phone, Mail, Send, Navigation,
  Thermometer, AlertCircle
} from 'lucide-react';

const LogisticsPage = () => {
  const [quoteForm, setQuoteForm] = useState({
    loadType: '',
    origin: '',
    destination: '',
    weight: '',
    commodity: '',
    name: '',
    email: '',
    phone: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQuoteChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      console.log('Quote request:', quoteForm);
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const complianceItems = [
    { title: "Customs Documentation", description: "CNCA, Bill of Lading, Commercial Invoice", status: "managed" },
    { title: "Duty Optimization", description: "SADC preferential trade agreements", status: "managed" },
    { title: "Border Post Coordination", description: "Beitbridge, Groblersbrug, Nakonde", status: "managed" },
    { title: "SADC Trade Permits", description: "Cross-border compliance & transit bonds", status: "managed" }
  ];

  const avocadoSteps = [
    { step: "1", title: "Sourcing", desc: "Limpopo farms → Packhouse", icon: Package, time: "24h" },
    { step: "2", title: "Cold-Chain", desc: "Temperature-controlled transport", icon: Thermometer, time: "48h" },
    { step: "3", title: "Border Clearance", desc: "Beitbridge customs coordination", icon: FileCheck, time: "6h" },
    { step: "4", title: "Final Delivery", desc: "JHB markets & retailers", icon: MapPin, time: "12h" }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
                <Truck size={16} className="text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SADC Trade Coordinator</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="text-white">Multi-Sector</span>
                <br />
                <span className="text-emerald-500">Distribution & Logistics</span>
              </h1>
              <p className="text-slate-400 text-lg mb-8">
                Your single-point coordinator for SADC market entry. From fresh produce to industrial equipment, 
                we move what matters across Southern Africa.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-lg transition flex items-center gap-2"
                >
                  Get Logistics Quote <ArrowRight size={18} />
                </button>
                <button className="border border-slate-700 hover:border-emerald-500 text-white font-bold px-8 py-4 rounded-lg transition">
                  View Network
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">14</div>
                <div className="text-slate-400 text-sm">SADC Countries</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">450+</div>
                <div className="text-slate-400 text-sm">Verified Carriers</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">24/7</div>
                <div className="text-slate-400 text-sm">Border Support</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">98%</div>
                <div className="text-slate-400 text-sm">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Logistics Grid - Asset-Light Model */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Asset-Light <span className="text-emerald-400">Logistics Grid</span></h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We coordinate, not own. Access to 450+ verified carriers across road, rail, and air.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition">
                <Truck size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Freight Brokerage</h3>
              <p className="text-slate-400 mb-4">
                Connecting shippers with verified transporters across SADC. Real-time capacity matching.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">FTL</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">LTL</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Refrigerated</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Flatbed</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition">
                <Ship size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Port & Rail Coordination</h3>
              <p className="text-slate-400 mb-4">
                Managing the "Durban to Hinterland" pipeline. Seamless intermodal solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Durban Port</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Rail Freight</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Container</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition">
                <Database size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Digital Logistics</h3>
              <p className="text-slate-400 mb-4">
                Real-time tracking, digital documentation, and supply chain visibility platform.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Real-time GPS</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">E-docs</span>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SADC Gateway - Compliance Checklist */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">SADC <span className="text-emerald-400">Gateway</span></h2>
              <div className="w-20 h-1 bg-emerald-500 mb-6"></div>
              <p className="text-slate-400 text-lg mb-8">
                Your compliance partner for cross-border trade. We handle the paperwork so your goods flow.
              </p>
              <div className="space-y-4">
                {complianceItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                    <CheckCircle size={24} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileCheck size={28} className="text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Compliance Checklist</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-300">CNCA Certificate</span>
                  <span className="text-emerald-400 text-sm">Required</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-300">Bill of Lading</span>
                  <span className="text-emerald-400 text-sm">Required</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-300">Commercial Invoice</span>
                  <span className="text-emerald-400 text-sm">Required</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-300">Transit Bond</span>
                  <span className="text-orange-400 text-sm">Variable</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-300">SADC Certificate of Origin</span>
                  <span className="text-emerald-400 text-sm">For Preferential Duty</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-slate-500 text-sm text-center">
                  We manage all documentation. One point of contact for end-to-end compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Avocado Route - Case Study */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The <span className="text-emerald-400">Avocado Route</span></h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              How we move fresh produce from Limpopo farms to Johannesburg markets in under 4 days.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {avocadoSteps.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 mb-2">{item.step}</div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                  <div className="mt-3 text-xs text-orange-400">{item.time}</div>
                </div>
                {i < avocadoSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ChevronRight size={20} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              From farm to shelf in 96 hours. Cold-chain maintained from packhouse to market.
            </p>
          </div>
        </div>
      </section>

      {/* Get a Logistics Quote - Form */}
      <section id="quote" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a <span className="text-emerald-400">Logistics Quote</span></h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
            <p className="text-slate-400">Tell us what you need to move, and we'll get back to you within 2 hours.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            {submitted ? (
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-8 text-center">
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Quote Request Received!</h3>
                <p className="text-slate-300">Our logistics team will contact you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Load Type *</label>
                    <select
                      name="loadType"
                      value={quoteForm.loadType}
                      onChange={handleQuoteChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Select load type</option>
                      <option value="General Freight">General Freight</option>
                      <option value="Refrigerated">Refrigerated/Cold Chain</option>
                      <option value="Hazardous">Hazardous Materials</option>
                      <option value="Oversized">Oversized/Project Cargo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Commodity</label>
                    <input
                      type="text"
                      name="commodity"
                      value={quoteForm.commodity}
                      onChange={handleQuoteChange}
                      placeholder="e.g., Avocados, Machinery, Electronics"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Origin *</label>
                    <input
                      type="text"
                      name="origin"
                      value={quoteForm.origin}
                      onChange={handleQuoteChange}
                      required
                      placeholder="City, Country"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Destination *</label>
                    <input
                      type="text"
                      name="destination"
                      value={quoteForm.destination}
                      onChange={handleQuoteChange}
                      required
                      placeholder="City, Country"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Weight (kg) *</label>
                    <input
                      type="number"
                      name="weight"
                      value={quoteForm.weight}
                      onChange={handleQuoteChange}
                      required
                      placeholder="Estimated weight"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={quoteForm.name}
                      onChange={handleQuoteChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={quoteForm.email}
                      onChange={handleQuoteChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={quoteForm.phone}
                      onChange={handleQuoteChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {submitting ? 'Submitting...' : 'Get Quote →'}
                </button>
                <p className="text-slate-500 text-xs text-center">
                  We respond within 2 hours. Emergency support available 24/7.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-950/30 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Move?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Join the companies that trust Melome to coordinate their SADC logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/portal/login" 
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-lg transition inline-flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <a 
              href="mailto:logistics@melome.co.za"
              className="border border-slate-700 hover:border-emerald-500 text-white font-bold px-8 py-4 rounded-lg transition"
            >
              Contact Logistics Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogisticsPage;