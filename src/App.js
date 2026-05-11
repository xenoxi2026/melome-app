import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './melome-logo.jpg';

// Import Portal Components
import { Login } from './components/Portal/Login';
import { Dashboard } from './components/Portal/Dashboard';
import { PrivateRoute } from './components/Portal/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import AdminDashboard from './components/Admin/AdminDashboard';
import ChinaCorridor from './components/ChinaCorridor';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import Payment from './components/Payment';
import Notifications from './components/Portal/Notifications';
import WeChatButton from './components/WeChatButton';
import Contact from './components/Contact';

// Temporary placeholder components until Driver components are created
const DriverLogin = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-400">Driver Login</h2>
        <p className="text-slate-400 text-center mb-4">Driver portal coming soon.</p>
        <Link to="/" className="block text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

const DriverDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-8">Driver Dashboard</h1>
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <p className="text-slate-400">Driver dashboard coming soon.</p>
          <Link to="/" className="inline-block mt-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-2 rounded font-bold transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

function LandingPage() {
  const [request, setRequest] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuoteSuccess, setShowQuoteSuccess] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);

  const handleGetQuote = () => {
    if (!request.trim()) {
      alert("Please describe your logistics request");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setShowQuoteSuccess(true);
      setRequest("");
      setIsSubmitting(false);
      setTimeout(() => setShowQuoteSuccess(false), 5000);
    }, 1500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setShowContactSuccess(true);
      setName("");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setShowContactSuccess(false), 5000);
    }, 1500);
  };

  const services = [
    { icon: "🚚", title: "Urgent Parts Delivery", desc: "Rapid response to critical equipment needs — minimizing costly machinery downtime for mining and construction clients. A R500 part should never cost R500,000." },
    { icon: "🔒", title: "Secure Asset Transport", desc: "Professional handling of sensitive technical items and critical documentation, with real-time tracking and chain-of-custody accountability at every stage." },
    { icon: "⚡", title: "Fleet Agility", desc: "Specialized on/off-road vehicles navigating any terrain without delays. Our fleet adapts to remote mining sites, construction zones, and urban corridors." },
    { icon: "🎬", title: "Industrial Storytelling", desc: "Producing and distributing high-impact B2B visual assets for industrial clients. We connect your brand narrative to the audiences that matter most." },
    { icon: "🌍", title: "Market Entry Distribution", desc: "Managing cross-border media asset movement with supply chain transparency. We open doors for content creators across 14 African countries." },
    { icon: "🤝", title: "Pan-African Reach", desc: "The #OneAfrica movement — media hubs connecting art centers across 14 countries. Representing South African stories on the global stage." }
  ];

  const roadmap = [
    { period: "Years 1–2 · 2026–2027", title: "Foundation & Regional Expansion", target: "R3.5M", items: ["Secure Mining Pressure Systems partnership", "Two industrial retainers in Gauteng", "Complete Blood and Kraal series distribution", "Formalize Eastern Cape hub in Dimbaza", "Launch #OneAfrica expedition Cape to Cairo", "Sign partners in 14 countries"] },
    { period: "Year 3 · 2028", title: "Technology & Integration", target: "R10M", items: ["Pilot Autonomous Air Support (heavy-lift drones) for remote mining", "Launch Melome Digital Pipeline platform", "Real-time asset tracking across all operations", "AI-driven media distribution systems"] },
    { period: "Year 4–5 · 2029–2030", title: "Pan-African Leadership", target: "R17M", items: ["Primary B2B market-entry partner for international firms entering SADC", "Transition to international film sales", "Represent South African films globally", "Continental logistics network established"] }
  ];

  const team = [
    { name: "Siphelo Badela", role: "Founder & Director", focus: "Strategic Command", description: "Visionary leader bridging logistics and media across the SADC region." },
    { name: "Operations Team", role: "Logistics Command", focus: "Tactical Execution", description: "Experts in cross-border transport and time-critical deliveries." },
    { name: "Media Division", role: "Creative Directorate", focus: "Narrative Strategy", description: "Industrial storytellers capturing the heartbeat of African commerce." }
  ];

  const gallery = [
    { title: "Gauteng Logistics Hub", location: "Boksburg, South Africa", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600" },
    { title: "Cross-Border Fleet", location: "SADC Corridor", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600" },
    { title: "Eastern Cape Base", location: "Dimbaza, Eastern Cape", img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600" },
    { title: "Fleet Ready Response", location: "24/7 Operations", img: "/fleet-ready-response.png" },
    { title: "Industrial Media Studio", location: "Gauteng", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" },
    { title: "Pan-African Network", location: "14 Countries", img: "/pan-african-network12.png" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="flex justify-between items-center p-6 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Melome Logo" className="h-12 w-auto object-contain rounded-lg" />
          <div className="text-2xl font-bold tracking-tighter text-emerald-400">MELOME</div>
        </div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
          <a href="#services" className="text-slate-400 hover:text-emerald-400 transition">Services</a>
          <a href="#roadmap" className="text-slate-400 hover:text-emerald-400 transition">Roadmap</a>
          <a href="#gallery" className="text-slate-400 hover:text-emerald-400 transition">Gallery</a>
          <a href="#team" className="text-slate-400 hover:text-emerald-400 transition">Leadership</a>
          <a href="#contact" className="text-slate-400 hover:text-emerald-400 transition">Contact</a>
          <Link to="/china-corridor" className="text-red-400 hover:text-red-300 transition font-bold flex items-center gap-1">
            <span>🇨🇳</span> 中 EN
          </Link>
        </div>
        <Link to="/portal/login" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-5 py-2 rounded-sm font-bold transition text-sm uppercase">
          Customer Portal →
        </Link>
      </nav>

      {/* Demo Payment Button - Remove in production */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 py-2 px-4 text-center">
        <p className="text-sm text-emerald-400">
          🧪 Demo Payment: <Link to="/payment" className="underline font-bold">Click here to test PayFast integration</Link>
        </p>
      </div>

      <section className="relative py-24 px-6 text-center lg:text-left lg:flex lg:items-center max-w-7xl mx-auto">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6">
            <span className="text-emerald-400">🏆</span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Integrated Supply Chain & Media Solutions</span>
          </div>
          
          <div className="mb-8">
            <div className="text-7xl lg:text-8xl font-black leading-tight">
              <span className="text-white">The Speed </span>
              <span className="text-emerald-500">of Now</span>
            </div>
            <div className="text-7xl lg:text-8xl font-black text-emerald-500 leading-tight mt-2">
              has no limits
            </div>
          </div>
          
          <p className="text-slate-400 text-xl mb-10 max-w-xl">
            Melome bridges industrial logistics and media distribution — delivering critical parts and high-impact stories across the SADC region with precision and speed.
          </p>

          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-emerald-400">🏆</span>
              <span className="text-sm font-bold">B-BBEE Level 1</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-emerald-400">✅</span>
              <span className="text-sm font-bold">CSD Registered</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-emerald-400">🌍</span>
              <span className="text-sm font-bold">14 Countries</span>
            </div>
          </div>

          <div className="mt-8 p-6 border-l-4 border-emerald-500 bg-slate-900/50 rounded-r-lg">
            <p className="text-slate-300 italic text-lg">
              "To engineer a future-proof supply chain ecosystem that moves both physical goods and high-impact stories across the SADC region."
            </p>
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wider">— Director Siphelo Badela</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
            <button onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-500 text-slate-950 px-8 py-4 font-black uppercase tracking-widest hover:bg-emerald-400 transition">
              Launch Dispatch
            </button>
            <button className="border border-slate-700 px-8 py-4 font-bold uppercase tracking-widest hover:bg-slate-800 transition">
              View Portfolio
            </button>
          </div>
        </div>

        <div id="quote" className="lg:w-1/2 mt-16 lg:mt-0 lg:pl-12">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-2xl relative">
            <div className="absolute -top-3 left-8 bg-emerald-500 px-3 py-1 text-[10px] font-black text-slate-950 uppercase tracking-wider">
              Immediate Action Plan
            </div>
            <h3 className="text-xl font-bold mb-4">Request Tactical Move</h3>
            {showQuoteSuccess ? (
              <div className="bg-emerald-500/20 border border-emerald-500 p-4 rounded text-center">
                <span className="text-emerald-400 text-4xl">✓</span>
                <p className="mt-2">Request received! We'll contact you within 2 hours.</p>
              </div>
            ) : (
              <>
                <textarea className="w-full bg-slate-950 border border-slate-700 p-4 text-sm text-slate-300 focus:outline-none focus:border-emerald-500 h-32 mb-4 transition rounded" placeholder="Hi, I'm Siphelo. I need stock collected at Shop 5, Joburg for delivery to Pretoria East..." value={request} onChange={(e) => setRequest(e.target.value)} disabled={isSubmitting} />
                <button onClick={handleGetQuote} disabled={isSubmitting} className="w-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 py-3 font-bold transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed rounded">
                  <span>📩</span>
                  <span>{isSubmitting ? "Processing..." : "Get Automated Quote"}</span>
                </button>
              </>
            )}
            <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest">Gauteng & SADC Region Coverage | Response within 2 hours</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-slate-800">
        <div className="text-center"><div className="text-3xl font-black text-emerald-400">14</div><div className="text-xs uppercase tracking-wider text-slate-500">Countries in Network</div></div>
        <div className="text-center"><div className="text-3xl font-black text-emerald-400">Level 1</div><div className="text-xs uppercase tracking-wider text-slate-500">B-BBEE Rating</div></div>
        <div className="text-center"><div className="text-3xl font-black text-emerald-400">R17M</div><div className="text-xs uppercase tracking-wider text-slate-500">Revenue Target 2029</div></div>
        <div className="text-center"><div className="text-3xl font-black text-emerald-400">2</div><div className="text-xs uppercase tracking-wider text-slate-500">Operational Hubs</div></div>
      </div>

      <section id="services" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Two sectors. <span className="text-emerald-400">One ecosystem.</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">We deliver critical logistical infrastructure and strategic media distribution — creating a unified platform that serves both the physical and the narrative economy.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="group bg-slate-900 p-8 rounded-lg border border-slate-800 hover:border-emerald-500/50 transition-all hover:transform hover:-translate-y-1">
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-red-950/20 p-8 rounded-lg border border-red-500/20">
            <h3 className="text-2xl font-bold mb-4 text-red-400">⚠️ The Challenge</h3>
            <h4 className="text-xl font-bold mb-3">Traditional logistics and media suffer from "the gap"</h4>
            <p className="text-slate-300 leading-relaxed">Unnecessary delays and disconnects cost businesses time, money, and momentum. In high-stakes industries like mining and construction, these gaps aren't just inconvenient — they're catastrophic.</p>
            <p className="text-slate-400 mt-4 text-sm">A single missing part can halt an entire operation. A story untold at the right moment is an opportunity lost forever.</p>
          </div>
          <div className="bg-emerald-950/20 p-8 rounded-lg border border-emerald-500/20">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">🛡️ The Melome Solution</h3>
            <h4 className="text-xl font-bold mb-3">Tactical infrastructure that protects your bottom line</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Preventing Loss: Ensuring a R500 part never costs you R500,000 in downtime</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Real-time tracking and chain-of-custody accountability</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Connecting high-impact stories at the point of greatest influence</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> AI-driven distribution ensuring nothing falls through the cracks</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="roadmap" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">2026–2030: <span className="text-emerald-400">Phased growth</span></h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">Our strategic roadmap to Pan-African leadership in logistics and media distribution</p>
          <div className="grid md:grid-cols-3 gap-8">
            {roadmap.map((phase, i) => (
              <div key={i} className="border-l-4 border-emerald-500 pl-6 bg-slate-900/50 p-6 rounded-r-lg">
                <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">{phase.period}</span>
                <h3 className="text-xl font-bold mt-2 mb-4">{phase.title}</h3>
                <ul className="space-y-2 text-slate-400 text-sm mb-6">
                  {phase.items.map((item, j) => <li key={j} className="flex items-start gap-2"><span className="text-emerald-400">→</span> {item}</li>)}
                </ul>
                <div className="pt-4 border-t border-slate-800"><p className="text-emerald-400 font-bold text-lg">{phase.target}</p><p className="text-xs text-slate-500 uppercase tracking-wider">Revenue Target</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Operations <span className="text-emerald-500">Gallery</span></h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-16"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item, i) => (
              <div key={i} className="group cursor-pointer bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all hover:transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden"><img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                <div className="p-6"><h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">{item.title}</h3><p className="text-slate-400 text-sm">{item.location}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Leadership <span className="text-emerald-500">Command</span></h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-16"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group bg-slate-900 border border-slate-800 rounded-lg p-8 hover:border-emerald-500/50 transition-all hover:transform hover:-translate-y-2">
                <div className="mb-6 text-5xl">{i === 0 ? "👨‍💼" : i === 1 ? "📦" : "🎬"}</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition">{member.name}</h3>
                <p className="text-emerald-500 text-sm font-bold mb-4 uppercase tracking-wider">{member.role}</p>
                <p className="text-slate-400 mb-6 leading-relaxed">{member.description}</p>
                <div className="pt-6 border-t border-slate-800"><p className="text-xs text-slate-500 uppercase tracking-wider">Focus: <span className="text-emerald-400">{member.focus}</span></p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Connect with <span className="text-emerald-500">Command</span></h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-16"></div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4"><span className="text-2xl">📞</span><div><p className="font-bold">Phone</p><p className="text-slate-400">078 946 7636</p></div></div>
              <div className="flex items-center gap-4"><span className="text-2xl">📧</span><div><p className="font-bold">Email</p><p className="text-slate-400">info@melome.co.za</p></div></div>
              <div className="flex items-center gap-4"><span className="text-2xl">📍</span><div><p className="font-bold">Command Centers</p><p className="text-slate-400">Gauteng (Boksburg) | Eastern Cape (Dimbaza)</p></div></div>
              <div className="flex items-center gap-4"><span className="text-2xl">🌍</span><div><p className="font-bold">Pan-African Network</p><p className="text-slate-400">14 Countries Across SADC Region</p></div></div>
            </div>
            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
              {showContactSuccess ? (
                <div className="text-center"><span className="text-emerald-400 text-4xl">✓</span><p className="mt-2 text-slate-300">Message received! We'll respond within 2 hours.</p></div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <h3 className="text-xl font-bold mb-4 text-emerald-400">Send Direct Message</h3>
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white focus:outline-none focus:border-emerald-500" required />
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white focus:outline-none focus:border-emerald-500" required />
                  <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition">Send Message</button>
                </form>
              )}
              <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-500">
                <p>Registration: 2025/913536/07</p>
                <p>B-BBEE Level 1 Contributor | CSD Registered</p>
                <p>Director: Siphelo Badela</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2026 Melome (Pty) Ltd — SADC Logistics Network</p>
        </div>
      </footer>

      {/* WeChat Button - Contains both WhatsApp and WeChat */}
      <WeChatButton />
    </div>
  );
}

// Main App with Routes
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main Website */}
          <Route path="/" element={<LandingPage />} />
          
          {/* China Investor Page */}
          <Route path="/china-corridor" element={<ChinaCorridor />} />
          
          {/* Customer Portal */}
          <Route path="/portal/login" element={<Login />} />
          <Route path="/portal/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/portal/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          
          {/* Admin Portal */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          {/* Driver Portal - Using placeholder components */}
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          
          {/* Payment Pages */}
          <Route path="/payment" element={<Payment amount={500} itemName="Melome Logistics Service" itemDescription="Professional logistics and delivery service across SADC" />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;