import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Globe, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/websiteData';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null); // Tracks modern hover underline slide
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
    setHoveredLink('/products');
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setHoveredLink(null);
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
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* 🟢 FULL WIDTH DISTRIBUTION WITH PX-12 */}
      <div className="w-full px-6 md:px-12 flex justify-between items-center relative">
        
        {/* Head Logo */}
        <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
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

        {/* 🟢 CENTER NAVIGATION DESIGN WITH EXPANDED GAP */}
        <nav 
          className="hidden lg:flex items-center space-x-8 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-2 px-1"
              onMouseEnter={() => link.dropdown ? handleMouseEnter() : setHoveredLink(link.path)}
              onMouseLeave={link.dropdown ? handleMouseLeave : () => setHoveredLink(null)}
            >
              {link.dropdown ? (
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                  className={`flex items-center text-sm font-semibold transition-colors focus:outline-none relative z-10 ${
                    location.pathname.startsWith('/products')
                      ? 'text-sky-600 dark:text-[var(--accent-primary)] font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180 text-sky-500' : 'text-slate-400'}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`text-sm font-semibold transition-colors block relative z-10 ${
                    location.pathname === link.path
                      ? 'text-sky-600 dark:text-[var(--accent-primary)] font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* 🟢 SLIDING GLOW UNDERLINE ANIMATION (Framer Motion pill/line tracker) */}
              {hoveredLink === link.path && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-300 shadow-[0_1px_8px_rgba(0,174,239,0.5)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Original Dropdown Structure Reverted */}
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
                            <img src={`/images/${cat.image}`} alt="" className="w-5 h-5 object-contain rounded-md" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 group-hover/item:text-sky-600 dark:group-hover/item:text-[var(--accent-primary)] transition-colors">
                            {cat.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}

                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-center mt-1">
                      <Link to="/products" className="text-xs font-bold text-slate-400 hover:text-sky-600 dark:hover:text-[var(--accent-primary)] transition-colors flex items-center py-1">
                        View All Products &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Universal Mini Controllers */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-sky-600 transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={toggleTheme} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-sky-600 transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/contact-us"
            className="bg-sky-600 hover:bg-sky-700 dark:bg-[var(--accent-primary)] text-white dark:text-black font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all shadow-sm transform hover:scale-[1.02]"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Navbar Elements */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-slate-500 dark:text-zinc-400">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 dark:text-zinc-400 focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Floating Search Sheet */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10 py-4 px-6 shadow-md z-50">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center space-x-4">
            <Search className="text-slate-400 dark:text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search solar panels, inverters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 w-full text-base focus:outline-none border-b border-slate-200 dark:border-white/10 pb-1"
              autoFocus
            />
            <button type="submit" className="px-4 py-1.5 bg-sky-600 text-white font-bold text-xs rounded-full">Search</button>
          </form>
        </div>
      )}
    </header>
  );
}