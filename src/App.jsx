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

// Scroll to top and strip trailing slash anomalies on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Handler to safely guide routes ending with an accidental trailing slash
function TrailingSlashRedirect() {
  const location = useLocation();
  // Strips the trailing slash safely (e.g. /products/ becomes /products)
  const cleanPath = location.pathname.replace(/\/+$/, '');
  return <Navigate to={`${cleanPath}${location.search}`} replace />;
}

// Resolver for legacy PHP files to redirect to the new clean URLs
function LegacyRedirectResolver() {
  const { phpFile } = useParams();
  const id = phpFile.replace('.php', '');

  const categories = [
    'microinverter', 'pv-inverter', 'hybrid-inverter', 'battery',
    'Grid+', 'wires', 'solar-structures', 'earthing-systems', 'microinverteer'
  ];

  if (categories.includes(id)) {
    const cleanCat = id === 'microinverteer' ? 'microinverter' : id;
    return <Navigate to={`/products/${cleanCat}`} replace />;
  }

  const isNews = ['30', '39', '40', '41'].includes(id);
  if (isNews) {
    return <Navigate to={`/news/${id}`} replace />;
  }

  return <Navigate to={`/product/${id}`} replace />;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background text-primary transition-colors duration-300 w-full">
        
        {/* HEADER RENDERS ONLY ONCE AT THE ABSOLUTE ENTRY POINT */}
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        {/* MAIN COMPACT CONTAINER SLOTTED FOR ROUTING */}
        <main className="flex-grow w-full mt-0">
          <Routes>
            {/* Standard Trailing Slash Guard Rails */}
            <Route path="/:url*/" element={<TrailingSlashRedirect />} />

            {/* Clean Functional Base URLs */}
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
        
        <Footer />
      </div>
    </Router>
  );
}