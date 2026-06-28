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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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
      <div className="flex flex-col min-h-screen bg-background text-primary transition-colors duration-300 w-full overflow-x-hidden">
        
        {/* 🟢 HEADER REMAINS FULLY FREE OUTSIDE CENTRAL CONTAINER */}
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        {/* 🟢 ROUTES SEPARATED WITH INDEPENDENT LAYOUT WRAPPER */}
        <main className="flex-grow w-full px-4 md:px-12 mx-auto mt-0">
          <Routes>
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

            {/* Legacy PHP mappings */}
            <Route path="/index.php" element={<Navigate to="/" replace />} />
            <Route path="/company.php" element={<Navigate to="/company" replace />} />
            <Route path="/tdsgroup.php" element={<Navigate to="/tdsgroup" replace />} />
            <Route path="/partner.php" element={<Navigate to="/partner" replace />} />
            <Route path="/innovation.php" element={<Navigate to="/innovation" replace />} />
            <Route path="/contact-us.php" element={<Navigate to="/contact-us" replace />} />
            <Route path="/products.php" element={<Navigate to="/products" replace />} />
            <Route path="/news.php" element={<Navigate to="/news" replace />} />

            <Route path="/products/:phpFile" element={<LegacyRedirectResolver />} />
            <Route path="/php/:phpFile" element={<LegacyRedirectResolver />} />
            <Route path="/:phpFile" element={<LegacyRedirectResolver />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}