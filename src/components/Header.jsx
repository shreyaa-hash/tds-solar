import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Globe, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/websiteData';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'EN', name: 'English' });
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', nextTheme);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown('products');
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'MR', name: 'मराठी (Marathi)' },
    { code: 'UR', name: 'اردو (Urdu)' },
    { code: 'GU', name: 'ગુજરાતી (Gujarati)' },
    { code: 'BN', name: 'বাংলা (Bengali)' },
    { code: 'PA', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'TA', name: 'தமிழ் (Tamil)' },
    { code: 'TE', name: 'తెలుగు (Telugu)' },
    { code: 'KN', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ML', name: 'മലയാളം (Malayalam)' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const changeLanguage = (lang) => {
    const targetCode = lang.code === 'ZH' ? 'zh-CN' : lang.code.toLowerCase();
    if (targetCode === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
      const cookieValue = `/en/${targetCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
    }
    setSelectedLang(lang);
    setShowLang(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setShowSearch(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products', dropdown: true },
    { name: 'Company', path: '/company' },
    { name: 'TDS Groups', path: '/tdsgroup' },
    { name: 'Partners', path: '/partner' },
    { name: 'Innovation', path: '/innovation' },
    { name: 'News', path: '/news' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-14 flex items-center ${
        isScrolled
          ? 'bg-[var(--bg-card)] border-b border-[var(--border-color)] backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        {/* Head Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
            <img src="/images/logo.png" alt="Logo" className="max-w-[80%] max-h-[80%] object-contain" />
          </div>
          <div className="text-left leading-none">
            <span className="font-heading text-base font-black text-slate-900 dark:text-white tracking-wider block">
              TDS SOLAR
            </span>
            <span className="text-[8px] text-sky-600 dark:text-[var(--accent-primary)] tracking-widest uppercase block font-bold mt-0.5">
              Energy Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-1"
              onMouseEnter={link.dropdown ? handleMouseEnter : undefined}
              onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
            >
              {link.dropdown ? (
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                  className="flex items-center text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-white transition-colors focus:outline-none"
                >
                  {link.name}
                  <ChevronDown className={`ml-1 w-4 h-4 text-slate-400 dark:text-zinc-500 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180 text-sky-500' : ''}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`text-sm font-semibold transition-colors block ${
                    location.pathname === link.path
                      ? 'text-sky-600 dark:text-[var(--accent-primary)] font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* --- ORIGINAL IMAGE DROPDOWN DESIGN --- */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === 'products' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white/95 dark:bg-neutral-950/90 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 mt-2 flex flex-col space-y-1.5 backdrop-blur-xl"
                  >
                    <div className="pb-2 border-b border-slate-100 dark:border-white/5 mb-1 pl-2 text-left">
                      <span className="font-heading text-[10px] font-bold text-sky-600 dark:text-[var(--accent-primary)] uppercase tracking-widest block">
                        Solar Products
                      </span>
                    </div>

                    {/* Staggered Item List With Reverted Image Icons */}
                    {categories.map((cat, index) => (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={`/products/${cat.id}`}
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/item text-left transform hover:translate-x-1 duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-[var(--accent-primary)]/10 flex items-center justify-center text-sky-600 border border-slate-100 dark:border-[var(--accent-primary)]/20 flex-shrink-0 transition-transform group-hover/item:scale-105">
                            <img
                              src={`/images/${cat.image}`}
                              alt=""
                              className="w-5 h-5 object-contain rounded-md"
                              onError={(e) => {
                                e.target.style.display = 'none'; // Handles gracefully if an image fails to load
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 group-hover/item:text-sky-600 dark:group-hover/item:text-[var(--accent-primary)] transition-colors">
                            {cat.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}

                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-center mt-1">
                      <Link
                        to="/products"
                        className="text-xs font-bold text-slate-400 hover:text-sky-600 dark:hover:text-[var(--accent-primary)] transition-colors flex items-center py-1"
                      >
                        View All Products &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-3">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-zinc-400">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={toggleTheme} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-zinc-400">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/contact-us"
            className="bg-sky-600 hover:bg-sky-700 dark:bg-[var(--accent-primary)] text-white dark:text-black font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}