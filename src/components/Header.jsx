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
  
  // 🟢 Fixed: Controlled state for mobile toggle (By default strictly false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
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

  // Sync states on path mutations
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setShowSearch(false);
    setMobileProductsOpen(false); 
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

  const isHomepageUnscrolled = location.pathname === '/' && !isScrolled && !activeDropdown;

  return (
    <header
      className={`fixed z-50 transition-all duration-500 flex items-center ${
        (isScrolled || activeDropdown)
          ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl h-16 rounded-full border border-secondary/15 dark:border-white/10 shadow-2xl shadow-secondary/5 dark:shadow-black/40 glass-nav'
          : 'top-0 left-0 w-full h-20 border-b border-transparent bg-transparent'
      } ${isHomepageUnscrolled ? 'always-dark-container' : ''}`}
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center relative z-50">
        
        {/* Head Logo */}
        <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
          <div className="relative w-9 h-9 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-secondary/30 group-hover:scale-105 shadow-inner">
            <img src="/images/logo.png" alt="Logo" className="max-w-[75%] max-h-[75%] object-contain" />
          </div>
          <div className="text-left leading-none">
            <span className="font-heading text-base font-black text-white tracking-wider block">
              TDS SOLAR
            </span>
            <span className="text-[8px] text-secondary tracking-widest uppercase block font-black mt-0.5">
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
                  className={`flex items-center text-xs font-black uppercase tracking-wider transition-all duration-300 focus:outline-none relative z-10 ${
                    location.pathname.startsWith('/products')
                      ? 'text-secondary font-black'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180 text-secondary' : 'text-zinc-500'}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`text-xs font-black uppercase tracking-wider transition-all duration-300 block relative z-10 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 ${
                    location.pathname === link.path
                      ? 'text-secondary font-black'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {link.dropdown && activeDropdown === 'products' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-sky-50/90 dark:bg-slate-950/95 border border-secondary/25 dark:border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,174,239,0.15)] dark:shadow-black/60 p-4 mt-2 flex flex-col space-y-1.5 z-50 backdrop-blur-xl">
                  <div className="pb-2 border-b border-secondary/15 dark:border-white/5 mb-1 pl-2 text-left">
                    <span className="font-heading text-[10px] font-black text-secondary uppercase tracking-widest block">
                      Solar Products
                    </span>
                  </div>
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      to={`/products/${cat.id}`} 
                      className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-secondary/15 dark:hover:bg-secondary/20 transition-all text-left group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/80 dark:bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/15 dark:border-secondary/20 flex-shrink-0 group-hover/item:border-secondary/25">
                        <img src={`/images/${cat.image}`} alt="" className="w-5 h-5 object-contain rounded-md" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-zinc-100 group-hover/item:text-secondary transition-colors">
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
          <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-secondary transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={toggleTheme} className="p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-secondary transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link 
            to="/contact-us" 
            className="relative group overflow-hidden bg-secondary text-white font-extrabold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-1"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center space-x-2 lg:hidden flex-shrink-0">
          <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-zinc-450 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-300 hover:text-white focus:outline-none relative z-50">
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

      {/* 🟢 SLEEK RIGHT-SIDE DRAWER PANEL INTERACTION ARCHITECTURE */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        {/* Transparent Black Dimmer Overlay Backdrop */}
        <div 
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        />

        {/* 75% Width Sidebar Drawer Content Frame */}
        <div className={`absolute top-0 right-0 w-[78%] max-w-[320px] h-screen bg-sky-50/95 dark:bg-slate-950/95 border-l border-slate-200 dark:border-white/10 pt-20 px-5 flex flex-col justify-between shadow-2xl backdrop-blur-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex flex-col space-y-1 text-left w-full">
            {navLinks.map((link) => (
              <div key={link.name} className="w-full py-0.5">
                {link.dropdown ? (
                  <div className="w-full">
                    {/* Controlled Accordion Trigger for Products */}
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
                        location.pathname.startsWith('/products')
                          ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary font-extrabold'
                          : 'text-slate-700 dark:text-zinc-300 hover:bg-secondary/15 dark:hover:bg-secondary/20'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180 text-secondary' : 'opacity-40'}`} />
                    </button>

                    {/* Subcategories open strictly only when clicked */}
                    {mobileProductsOpen && (
                      <div className="grid grid-cols-1 gap-1.5 pl-3 pr-1 mt-1 transition-all">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products/${cat.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.02] text-xs font-bold text-slate-650 dark:text-zinc-400 hover:bg-secondary/10 dark:hover:bg-secondary/20 hover:text-secondary"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight className="w-3 h-3 opacity-30" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
                      location.pathname === link.path
                        ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary font-extrabold'
                        : 'text-slate-700 dark:text-zinc-300 hover:bg-secondary/15 dark:hover:bg-secondary/20'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Utility Dock */}
          <div className="mt-auto mb-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] flex items-center justify-between shadow-inner">
            <span className="text-[11px] font-black text-zinc-550 uppercase tracking-widest">Theme</span>
            <button 
              onClick={toggleTheme} 
              className="p-2 px-3.5 bg-slate-100 border border-slate-200 text-slate-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 rounded-xl flex items-center gap-1.5 font-bold text-xs shadow-sm active:scale-95 transition-all"
            >
              {theme === 'dark' ? <><Sun className="w-3.5 h-3.5 text-yellow-500" /> Light</> : <><Moon className="w-3.5 h-3.5 text-slate-650" /> Dark</>}
            </button>
          </div>

        </div>
      </div>

    </header>
  );
}