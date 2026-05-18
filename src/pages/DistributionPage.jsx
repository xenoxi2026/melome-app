import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Tv, Globe, Upload, Users, CheckCircle, ArrowRight } from 'lucide-react';

const DistributionPage = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    status: '',
    logline: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      console.log('Project submitted:', formData);
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
            <Film size={16} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase">Media Distribution Network</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Melome Media</span>
            <br />
            <span className="text-emerald-500">Distribution Network</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Connecting authentic African stories with regional and global audiences.
            We bridge the gap between creators and broadcasters across South Africa and the SADC region.
          </p>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Strategic <span className="text-emerald-400">Focus Areas</span></h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Tv size={32} className="text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Traditional Broadcast</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['SABC', 'e.tv', 'Mzansi Magic', 'Moja Love', '1KZN TV', 'BTV', 'ZBC', 'TBC', 'RTS'].map((channel, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300">{channel}</span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={32} className="text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Digital & VOD</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Showmax', 'Netflix', 'Amazon Prime', 'Apple TV+', 'Disney+', 'YouTube', 'Vimeo'].map((platform, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300">{platform}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Project Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Upload size={28} className="text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Submit Your Project</h3>
              </div>
              
              {submitted ? (
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6 text-center">
                  <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Project Submitted!</h4>
                  <p className="text-slate-300">Our team will review and contact you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Title *</label>
                    <input
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      placeholder="e.g., Blood and Kraal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Select status</option>
                      <option value="Development">Development</option>
                      <option value="Pre-production">Pre-production</option>
                      <option value="Production">Production</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Logline / Synopsis</label>
                    <textarea
                      name="logline"
                      value={formData.logline}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Brief description of your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition"
                  >
                    {submitting ? 'Submitting...' : 'Submit Project →'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users size={28} className="text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Partner With Us</h3>
              </div>
              <p className="text-slate-400 mb-6">
                For broadcasters, streaming platforms, and organizations looking to discover authentic African content.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold">Content Acquisition</h4>
                    <p className="text-slate-400 text-sm">Access pre-vetted African films and series</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold">Co-production Opportunities</h4>
                    <p className="text-slate-400 text-sm">Joint ventures with African creators</p>
                  </div>
                </div>
              </div>
              <a 
                href="mailto:media@melome.co.za?subject=Partnership%20Inquiry"
                className="mt-6 inline-block text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Inquire About Partnership →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Strategy */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Festival & Market <span className="text-emerald-400">Strategy</span></h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "DIFF", full: "Durban International Film Festival" },
              { name: "JFF", full: "Joburg Film Festival" },
              { name: "Encounters", full: "Encounters Documentary Festival" },
              { name: "FESPACO", full: "Pan-African Film Festival" }
            ].map((festival, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">{festival.name}</h3>
                <p className="text-white">{festival.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Distribute Your Story?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Join the creators who trust Melome to bring their stories to African and global audiences.
          </p>
          <Link 
            to="/portal/login" 
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-4 rounded-lg transition"
          >
            Submit Your Project →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DistributionPage;