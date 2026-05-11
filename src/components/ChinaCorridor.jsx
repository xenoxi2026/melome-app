import React from 'react';
import { Link } from 'react-router-dom';

const ChinaCorridor = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-900 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-yellow-500 text-red-900 px-4 py-1 rounded-full text-sm font-bold mb-6">
            ä¸­éžåˆä½œä¼™ä¼´ | China-Africa Partner
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6">
            Your Logistics Bridge to
            <span className="text-yellow-400 block mt-2">SADC Africa</span>
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            We secure your supply chain across 14 African countries â€” from Johannesburg to Kinshasa, Durban to Dar es Salaam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact" className="bg-yellow-500 text-red-900 px-8 py-4 font-bold rounded-lg hover:bg-yellow-400 transition">
              Contact Our China Desk â†’
            </a>
            <Link to="/portal/demo" className="border-2 border-white text-white px-8 py-4 font-bold rounded-lg hover:bg-white hover:text-red-900 transition">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Melome for Chinese Partners */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Chinese Partners Trust <span className="text-red-500">Melome</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">We don't just ship products â€” we protect your bottom line in Africa</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-lg border border-red-500/30">
              <div className="text-5xl mb-4">ðŸ†</div>
              <h3 className="text-2xl font-bold mb-3">B-BBEE Level 1</h3>
              <p className="text-slate-400">Preferred supplier status for government and mining tenders â€” we open doors you can't access alone.</p>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-lg border border-red-500/30">
              <div className="text-5xl mb-4">ðŸŒ</div>
              <h3 className="text-2xl font-bold mb-3">14 Countries</h3>
              <p className="text-slate-400">SADC network including South Africa, Zimbabwe, Zambia, DRC, Mozambique, Botswana, Namibia, Eswatini, Lesotho, Malawi, Angola, Tanzania, Mauritius, Madagascar.</p>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-lg border border-red-500/30">
              <div className="text-5xl mb-4">âš¡</div>
              <h3 className="text-2xl font-bold mb-3">Same-Day Response</h3>
              <p className="text-slate-400">Chinese mining and construction clients can't afford downtime. Neither can we. Response within 2 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Chinese Clients */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What We Do for <span className="text-yellow-500">Chinese Companies</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-8 rounded-lg border-l-4 border-red-500">
              <h3 className="text-2xl font-bold mb-4">ðŸš¢ Cross-Border Freight & Customs</h3>
              <p className="text-slate-300 mb-4">From Chinese ports (Shanghai, Ningbo, Shenzhen) to any SADC destination. We handle:</p>
              <ul className="space-y-2 text-slate-400">
                <li>âœ“ Full container load (FCL) & less than container load (LCL)</li>
                <li>âœ“ Customs clearance at Durban, Richards Bay, Walvis Bay, Dar es Salaam</li>
                <li>âœ“ Inland freight to mining sites, factories, and warehouses</li>
                <li>âœ“ Dangerous goods & heavy machinery transport</li>
              </ul>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold mb-4">ðŸ­ Last-Mile & Warehousing</h3>
              <p className="text-slate-300 mb-4">Your products don't stop at the port. We deliver to the exact location:</p>
              <ul className="space-y-2 text-slate-400">
                <li>âœ“ Warehousing in Gauteng (Boksburg) & Eastern Cape (Dimbaza)</li>
                <li>âœ“ Inventory management & just-in-time delivery</li>
                <li>âœ“ Delivery to mining sites in Limpopo, North West, Copperbelt (Zambia/DRC)</li>
                <li>âœ“ Real-time tracking with chain-of-custody documentation</li>
              </ul>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-lg border-l-4 border-red-500">
              <h3 className="text-2xl font-bold mb-4">ðŸ“¦ Urgent Parts Delivery</h3>
              <p className="text-slate-300 mb-4">When a R500 part saves R500,000 in downtime â€” you need speed.</p>
              <ul className="space-y-2 text-slate-400">
                <li>âœ“ Same-day delivery within Gauteng industrial belt</li>
                <li>âœ“ 24-48 hour delivery to major SADC cities</li>
                <li>âœ“ Emergency response for mining & construction</li>
                <li>âœ“ Dedicated vehicles for critical shipments</li>
              </ul>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold mb-4">ðŸŽ¬ Industrial Media & Brand Visibility</h3>
              <p className="text-slate-300 mb-4">Tell your African success story. We produce B2B content that builds trust with African buyers.</p>
              <ul className="space-y-2 text-slate-400">
                <li>âœ“ Document your logistics journey for marketing</li>
                <li>âœ“ Case studies & testimonial production for Chinese brands in Africa</li>
                <li>âœ“ Content distribution across 14 African countries</li>
                <li>âœ“ Build credibility with African procurement teams</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-900 to-red-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">ðŸ‡¨ðŸ‡³ Investment Opportunity</h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            We are seeking strategic Chinese partners and investors to accelerate our Pan-African expansion.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">ðŸ“ˆ</div>
              <h3 className="font-bold text-xl mb-2">R17M Revenue Target</h3>
              <p className="text-red-100 text-sm">By 2030, with 5-year growth roadmap</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">ðŸ¤</div>
              <h3 className="font-bold text-xl mb-2">Joint Venture Ready</h3>
              <p className="text-red-100 text-sm">Open to equity partnership or strategic investment</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">ðŸŒ</div>
              <h3 className="font-bold text-xl mb-2">14-Country Network</h3>
              <p className="text-red-100 text-sm">Established relationships across SADC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact China Desk */}
      <section id="contact" className="py-20 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Contact Our <span className="text-red-500">China Desk</span></h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl">ðŸ“ž</span>
                <div>
                  <p className="font-bold">Direct Line (China Desk)</p>
                  <p className="text-slate-400">+27 78 946 7636</p>
                  <p className="text-xs text-slate-500">WeChat available</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">ðŸ“§</span>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-slate-400">china@melome.co.za</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">ðŸ’¬</span>
                <div>
                  <p className="font-bold">WeChat ID</p>
                  <p className="text-slate-400 font-mono text-lg">Melome_China</p>
                  <p className="text-xs text-slate-500">Scan QR code for quick response</p>
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-lg text-center mt-6">
                <p className="text-yellow-400 font-bold mb-2">Response within 2 hours</p>
                <p className="text-slate-400 text-sm">We understand time zones â€” reply in Chinese or English</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Send Inquiry (ä¸­æ–‡ / English)</h3>
              <form>
                <input type="text" placeholder="Company Name / å…¬å¸åç§°" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white" />
                <input type="text" placeholder="Contact Person / è”ç³»äºº" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white" />
                <input type="email" placeholder="Email / é‚®ç®±" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white" />
                <input type="text" placeholder="WeChat ID (optional)" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white" />
                <textarea placeholder="Your inquiry / æ‚¨çš„éœ€æ±‚ (products, volume, destinations)" rows="4" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white"></textarea>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition">
                  Send Inquiry â†’ å‘é€è¯¢é—®
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChinaCorridor;