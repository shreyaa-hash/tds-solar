import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Company from './pages/Company';
import TdsGroup from './pages/TdsGroup';
import Partner from './pages/Partner';
import Innovation from './pages/Innovation';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Resolver for legacy PHP files to redirect to the new clean URLs
function LegacyRedirectResolver() {
  const { phpFile } = useParams();
  const id = phpFile.replace('.php', '');

  // Check if it is a category path
  const categories = [
    'microinverter',
    'pv-inverter',
    'hybrid-inverter',
    'battery',
    'Grid+',
    'wires',
    'solar-structures',
    'earthing-systems',
    'microinverteer'
  ];

  if (categories.includes(id)) {
    const cleanCat = id === 'microinverteer' ? 'microinverter' : id;
    return <Navigate to={`/products/${cleanCat}`} replace />;
  }

  // Check if it matches a known news post
  const isNews = ['30', '39', '40', '41'].includes(id);

  if (isNews) {
    return <Navigate to={`/news/${id}`} replace />;
  }

  // Fallback to product detail
  return <Navigate to={`/product/${id}`} replace />;
}

export default function App() {
  // 1. Theme state manager (pehle local storage check karega)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // 2. Jab bhi theme state badlegi, html tag update hoga aur local storage save hoga
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <ScrollToTop />
      {/* 🟢 CENTRAL GLOBAL LAYOUT OVERHAUL (STANDARD FLEX STRUCTURE) */}
      <div className="flex flex-col min-h-screen bg-background text-primary transition-colors duration-300 w-full">
        
        {/* 🟢 HEADER IS FREE - NOT WRAPPED BY MAIN CONTAINER */}
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        {/* 🟢 ROUTES SEPARATED WITH INDEPENDENT LAYOUT WRAPPER (Fluid with 12px margins) */}
        <main className="flex-grow w-full px-4 md:px-12 mx-auto mt-0">
          <Routes>
            {/* Clean URLs */}
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/tdsgroup" element={<TdsGroup />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/contact-us" element={<Contact />} />
            
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categoryId" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />

            {/* Legacy PHP mappings for root-level paths */}
            <Route path="/index.php" element={<Navigate to="/" replace />} />
            <Route path="/company.php" element={<Navigate to="/company" replace />} />
            <Route path="/tdsgroup.php" element={<Navigate to="/tdsgroup" replace />} />
            <Route path="/partner.php" element={<Navigate to="/partner" replace />} />
            <Route path="/innovation.php" element={<Navigate to="/innovation" replace />} />
            <Route path="/contact-us.php" element={<Navigate to="/contact-us" replace />} />
            <Route path="/products.php" element={<Navigate to="/products" replace />} />
            <Route path="/news.php" element={<Navigate to="/news" replace />} />

            {/* Legacy category subfolder paths */}
            <Route path="/products/:phpFile" element={<LegacyRedirectResolver />} />

            {/* Legacy general PHP file path resolver */}
            <Route path="/php/:phpFile" element={<LegacyRedirectResolver />} />
            <Route path="/:phpFile" element={<LegacyRedirectResolver />} />

            {/* Fallback Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 3. Floating Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-300 shadow-2xl backdrop-blur-md"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            /* Sun Icon (Dark mode me dikhega) */
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ) : (
            /* Moon Icon (Light mode me dikhega) */
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )
          }
        </button>
        
        <Footer />
      </div>
    </Router>
  );
}