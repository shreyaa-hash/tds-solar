import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { categories } from '../data/websiteData';

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark bg-gradient-to-b from-lightbg to-background text-primary pt-16 pb-8 border-t border-white/5 relative z-10">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(0,200,255,0.04)_0%,_transparent_70%)]" />
        <div className="absolute top-0 left-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(253,184,19,0.03)_0%,_transparent_70%)]" />
      </div>

      {/* Premium Footer CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-r from-lightbg via-background to-lightbg p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between text-left gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-50%] left-[-10%] w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">Ready to Switch to Solar?</h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-semibold leading-relaxed">
              Contact our authorized support desk now. Get a complete comprehensive engineering quote and layout visualization for your residence or industrial warehouse.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link 
              to="/contact-us"
              className="inline-flex items-center space-x-2 bg-gold hover:bg-gold/90 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-gold/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        {/* Brand Profile */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shadow-sm">
              <img src="/images/logo.png" alt="TDS Solar Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <span className="font-heading text-base font-bold text-white tracking-wider block">TDS SOLAR</span>
              <span className="text-[9px] text-secondary tracking-widest uppercase block -mt-1 font-semibold">Energy Solutions</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            TDS SOLAR ENERGY (established in 2016) is a premier smart renewable energy solutions provider in Uttar Pradesh. We supply genuine, high-performance solar materials and expert installation.
          </p>
          {/* Social Icons */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://www.facebook.com/people/Tdssolarenergy/61559624085580/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-slate-950 hover:border-secondary hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@TDSSOLARPOWER/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-slate-950 hover:border-secondary hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/tds_solar_energy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-slate-950 hover:border-secondary hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-slate-950 hover:border-secondary hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-secondary pl-3">
            Product Categories
          </h4>
          <ul className="space-y-3 text-sm">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link to={`/products/${cat.id}`} className="text-zinc-400 font-semibold hover:text-secondary hover:translate-x-1 transition-all inline-block">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Group */}
        <div>
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-secondary pl-3">
            Company Quick Links
          </h4>
          <ul className="space-y-3 text-sm font-semibold text-zinc-400">
            <li>
              <Link to="/company" className="hover:text-secondary hover:translate-x-1 transition-all inline-block">
                About Our Company
              </Link>
            </li>
            <li>
              <Link to="/tdsgroup" className="hover:text-secondary hover:translate-x-1 transition-all inline-block">
                TDS Groups
              </Link>
            </li>
            <li>
              <Link to="/partner" className="hover:text-secondary hover:translate-x-1 transition-all inline-block">
                Authorized Partners
              </Link>
            </li>
            <li>
              <Link to="/innovation" className="hover:text-secondary hover:translate-x-1 transition-all inline-block">
                Innovation & Technology
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-secondary hover:translate-x-1 transition-all inline-block">
                Latest Solar Updates
              </Link>
            </li>
            <li className="pt-1 border-t border-white/5">
              <a
                href="https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary hover:translate-x-1 transition-all inline-block text-secondary font-bold"
              >
                Calculate Solar Size &rarr;
              </a>
            </li>
            <li>
              <a
                href="https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary hover:translate-x-1 transition-all inline-block text-secondary font-bold"
              >
                Build Your Solar &rarr;
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-secondary pl-3">
            Contact Support
          </h4>
          <ul className="space-y-4 text-sm text-left">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span className="text-zinc-400 font-semibold">
                0, VIP ROAD OMKAR NAGAR, FATEHPUR, 212601 U.P.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex flex-col space-y-1 text-zinc-400 font-semibold">
                <a href="tel:+917800010013" className="hover:text-secondary text-xs">
                  +91 78000 10013 <span className="text-[10px] text-zinc-500">(B2B)</span>
                </a>
                <a href="tel:+917800070017" className="hover:text-secondary text-xs">
                  +91 78000 70017 <span className="text-[10px] text-zinc-500">(Support)</span>
                </a>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex flex-col space-y-1 text-zinc-400 font-semibold break-all text-xs">
                <a href="mailto:tds@tdssolar.in" className="hover:text-secondary">
                  tds@tdssolar.in
                </a>
                <a href="mailto:tdssolarenergy@gmail.com" className="hover:text-secondary">
                  tdssolarenergy@gmail.com
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 space-y-4 md:space-y-0 relative z-10 font-medium">
        <div>
          &copy; {currentYear} TDS Solar Energy. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link to="/privacy-policy" className="hover:text-secondary">Privacy Policy</Link>
          <Link to="/terms-conditions" className="hover:text-secondary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
