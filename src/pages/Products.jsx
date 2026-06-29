import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { categories, products } from '../data/websiteData';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { categoryId } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (categoryId) {
      setActiveTab(categoryId);
    } else {
      setActiveTab('all');
    }

    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    } else {
      setSearchQuery('');
    }
  }, [categoryId, location.search]);

  // Products filtering logic
  const filteredProducts = (products || []).filter((prod) => {
    if (!prod) return false;
    
    const name = prod.name || '';
    const tagline = prod.tagline || '';
    const description = prod.description || '';
    const prodCategory = prod.categoryId || '';

    const matchesCategory = activeTab === 'all' || prodCategory === activeTab;
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });

  const featuredProduct = filteredProducts[0];
  const remainingProducts = filteredProducts.slice(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background text-primary pt-14 min-h-screen relative overflow-hidden transition-colors duration-300 w-full"
    >
      {/* Background Radial Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/10 to-transparent dark:from-sky-500/5 opacity-70 blur-[120px]" />
      </div>

      {/* --- HEADER BANNER --- */}
      <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 pt-6 pb-4 text-center border-b border-slate-200 dark:border-white/5 z-10 backdrop-blur-sm mt-0">
        <div className="w-full px-4 md:px-6 flex flex-col items-center space-y-1">
          
          {/* Pulsating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100/60 dark:bg-sky-950/50 border border-sky-300/40 dark:border-sky-500/20 shadow-inner scale-90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
            </span>
            <span className="text-[10px] font-black text-sky-700 dark:text-sky-400 uppercase tracking-widest">
              TDS SOLAR MATERIAL CATALOG
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden py-0.5">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white tracking-tight leading-none"
            >
              High-Performance Solar Materials
            </motion.h1>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl pt-1">
            Authorized Waaree dealer supplying solar panels, microinverters, battery banks, earthing systems, and mounting profiles.
          </p>
        </div>
      </section>

      {/* --- MAIN CATALOGUE LAYOUT GRID --- */}
      <section className="w-full px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          
          {/* SIDEBAR FILTERS PANEL */}
          <div className="space-y-6 lg:col-span-1 text-left w-full">
            <div className="p-5 rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">Search Catalog</h4>
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-slate-400 dark:text-zinc-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-sm pl-9 pr-4 py-2.5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <div className="p-5 rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">Categories</h4>
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'all' ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-black shadow-md' : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  All Products
                </button>
                {(categories || []).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === cat.id ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-black shadow-md' : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div className="lg:col-span-3 space-y-8 text-left w-full">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <div className="space-y-8 w-full">
                  
                  {/* CARD COUNT DISPLAY SWITCH ENGINE */}
                  {filteredProducts.length <= 2 ? (
                    <div className="space-y-8 w-full">
                      {filteredProducts.map((prod) => (
                        <motion.div
                          key={prod.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="w-full relative overflow-visible"
                        >
                          <ProductCard product={prod} isFeatured={true} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {featuredProduct && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="w-full relative overflow-visible"
                        >
                          <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[9px] tracking-widest uppercase px-3 py-1 rounded-full shadow-md z-30">
                            Featured Innovation
                          </div>
                          <ProductCard product={featuredProduct} isFeatured={true} />
                        </motion.div>
                      )}

                      {remainingProducts.length > 0 && (
                        <motion.div 
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
                        >
                          {remainingProducts.map((prod) => (
                            <motion.div key={prod.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="w-full">
                              <ProductCard product={prod} isFeatured={false} />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </>
                  )}

                </div>
              ) : (
                <div className="rounded-3xl p-16 text-center text-slate-400 border border-dashed border-slate-200 dark:border-white/10 w-full">
                  🔍 No flagship innovations active matching the current filters.
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </motion.div>
  );
}