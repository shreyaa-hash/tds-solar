import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Sun, Moon, ArrowRight } from 'lucide-react';
import { categories } from '../data/websiteData';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
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
        isScrolled || isOpen
          ? 'bg-white/80 dark:bg-zinc-950/80 border-b border-slate-200/60 dark:border-white/10 backdrop-blur-md shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center relative z-50">
        
        {/* Head Logo */}
        <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
          <div className="relative w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" className="max-w-[80%] max-h-[80%] object-contain" />
          </div>
          <div className="text-left leading-none">
            <span className="font-heading text-base font-black text-slate-900 dark:text-white tracking-wider block">
              TDS SOLAR
            </span>
            <span className="text-[8px] text-sky-600 dark:text-sky-400 tracking-widest uppercase block font-bold mt-0.5">
              Energy Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8 relative">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-2 px-1"
              onMouseEnter={link.dropdown ? handleMouseEnter : undefined}
              onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
            >
              {link.dropdown ? (
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                  className={`flex items-center text-sm font-semibold transition-colors focus:outline-none relative z-10 ${
                    location.pathname.startsWith('/products')
                      ? 'text-sky-600 dark:text-sky-400 font-bold'
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
                      ? 'text-sky-600 dark:text-sky-400 font-bold'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* Desktop Product Dropdown */}
              {link.dropdown && activeDropdown === 'products' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 mt-2 flex flex-col space-y-1.5 z-50">
                  <div className="pb-2 border-b border-slate-100 dark:border-white/5 mb-1 pl-2 text-left">
                    <span className="font-heading text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                      Solar Products
                    </span>
                  </div>
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      to={`/products/${cat.id}`} 
                      className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-600 border border-slate-100 dark:border-sky-500/20 flex-shrink-0">
                        <img src={`/images/${cat.image}`} alt="" className="w-5 h-5 object-contain rounded-md" />
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 hover:text-sky-600 transition-colors">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Feature Controllers */}
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-sky-600 transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={toggleTheme} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-sky-600 transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/contact-us" className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 text-white dark:text-black font-black text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all">
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden flex-shrink-0">
          <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-slate-500 dark:text-zinc-400">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 dark:text-zinc-400 focus:outline-none relative z-50">
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
              placeholder="Search solar panels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 w-full text-base focus:outline-none pb-1"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* 🟢 HYPER-PREMIUM APPLE STYLE MOBILE OVERLAY DRAWER */}
      {isOpen && (
        <div className="fixed top-14 left-0 w-full h-[calc(100vh-3.5rem)] bg-white/95 dark:bg-zinc-950/95 z-40 px-6 py-6 flex flex-col justify-between overflow-y-auto lg:hidden border-t border-slate-200/50 dark:border-zinc-900/80 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Menu Items Matrix */}
          <div className="flex flex-col space-y-2 text-left">
            {navLinks.map((link) => (
              <div key={link.name} className="w-full">
                {link.dropdown ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-xs font-black tracking-widest text-sky-600 dark:text-sky-400 uppercase mt-2">
                      {link.name}
                    </div>
                    {/* Compact Grid with Glassmorphism Cards */}
                    <div className="grid grid-cols-2 gap-2.5 px-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/products/${cat.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04] active:scale-98 transition-all group"
                        >
                          <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 group-hover:text-sky-500">
                            {cat.name}
                          </span>
                          <span className="text-[9px] font-medium text-slate-400 dark:text-zinc-500 mt-1 inline-flex items-center gap-0.5">
                            Explore <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl text-base font-bold transition-all active:bg-slate-50 dark:active:bg-white/[0.03] ${
                      location.pathname === link.path
                        ? 'bg-sky-50/50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400 font-black'
                        : 'text-slate-800 dark:text-zinc-200'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Premium Glassmorphic Bottom Control Bar */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] flex items-center justify-between shadow-inner">
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">Interface Theme</span>
              <span className="text-[10px] font-medium text-slate-400 dark:text-zinc-500">Toggle light or dark mode</span>
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-2.5 px-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-2 font-bold text-xs text-slate-700 dark:text-zinc-300 shadow-sm active:scale-95 transition-all"
            >
              {theme === 'dark' ? (
                <><Sun className="w-4 h-4 text-yellow-500" /> Light</>
              ) : (
                <><Moon className="w-4 h-4 text-slate-600" /> Dark</>
              )}
            </button>
          </div>

        </div>
      )}
    </header>
  );
}