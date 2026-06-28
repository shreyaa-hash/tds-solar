import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList, CheckCircle2, PhoneCall, HelpCircle, Zap } from 'lucide-react';
import { products } from '../data/websiteData';

export default function ProductDetail() {
  const { id } = useParams();

  // Find product by ID
  const product = products.find((prod) => prod.id === id);

  if (!product) {
    return (
      <div className="bg-background pt-32 pb-24 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl space-y-4">
          <HelpCircle className="w-16 h-16 text-zinc-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Product Not Found</h2>
          <p className="text-zinc-400 text-sm">The product you are looking for does not exist or has been relocated.</p>
          <Link to="/products" className="inline-block bg-secondary text-pure-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-secondary/80 transition-colors">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-background text-primary pt-24 min-h-screen text-left relative overflow-hidden"
    >
      
      {/* Background radial overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(0, 174, 239, 0.05)_0%,_transparent_75%)]" />
        <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0, 174, 239, 0.04)_0%,_transparent_75%)]" />
      </div>

      {/* Breadcrumbs Banner */}
      <section className="bg-lightbg border-b border-white/5 py-12 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <Link to="/products" className="inline-flex items-center space-x-1.5 text-xs font-bold text-secondary hover:text-white uppercase tracking-wider mb-3">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {product.name}
            </h1>
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-1">
              {product.tagline}
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-xs font-medium text-zinc-400 border-l border-white/10 pl-6">
            <div>
              <span className="block text-[10px] uppercase text-secondary font-bold tracking-widest">Max Efficiency</span>
              <span className="text-white font-extrabold text-lg mt-0.5 block">{product.maxEfficiency}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-secondary font-bold tracking-widest">Normal Efficiency</span>
              <span className="text-white font-extrabold text-lg mt-0.5 block">{product.normalEfficiency}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Product Image & Spec Sheet */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-3xl p-8 flex items-center justify-center relative overflow-hidden"
            >
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="max-h-[350px] object-contain rounded-2xl transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>

            {/* Advantages Grid */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-white flex items-center space-x-2 border-b border-white/5 pb-3">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>Key Advantages</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {product.advantages.map((adv, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-panel p-6 rounded-2xl space-y-2 hover:border-secondary/20 transition-all duration-300 shadow-sm"
                  >
                    <h4 className="font-bold text-white text-base">{adv.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{adv.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Spec List & Action Box */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Specs Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-panel p-6 rounded-3xl space-y-4 shadow-sm"
            >
              <h3 className="font-heading text-lg font-bold text-white flex items-center space-x-2 pb-2 border-b border-white/5">
                <ClipboardList className="w-5 h-5 text-accent" />
                <span>Technical Specifications</span>
              </h3>
              <div className="divide-y divide-white/5">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 text-sm">
                    <span className="text-zinc-400 font-medium">{spec.name}</span>
                    <span className="text-white font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Direct Action Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="glass-panel p-6 rounded-3xl relative overflow-hidden space-y-6 shadow-sm"
            >
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-2 relative z-10">
                <h3 className="font-heading text-lg font-bold text-white">Need a Quote?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                  Connect with our support team to calculate load capacity and configure Waaree products.
                </p>
              </div>
              <Link
                to="/contact-us"
                className="w-full bg-secondary hover:bg-secondary/90 text-pure-white font-bold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-md hover:shadow-lg shadow-secondary/15 transition-all scale-100 hover:scale-[1.01] active:scale-[0.98] relative z-10"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to a Solar Expert</span>
              </Link>
            </motion.div>

          </div>

        </div>
      </section>
    </motion.div>
  );
}
