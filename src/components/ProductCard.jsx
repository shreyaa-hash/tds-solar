import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for routing

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  if (!product || typeof product !== 'object') {
    return null;
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const element = cardRef.current;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xVal = x / rect.width - 0.5;
    const yVal = y / rect.height - 0.5;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setMousePos({ x: glowX, y: glowY });
    
    setRotate({
      x: yVal * -20,
      y: xVal * 20
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  const productName = product.name || 'Solar Solution Asset';
  const productDesc = product.description || 'High efficiency solar tech optimization infrastructure.';
  const productImage = product.image || 'logo.png';
  const productTag = product.tagline || product.categoryId || 'Premium Hardware';
  
  // Dynamic slug or ID based navigation URL
  const productLink = `/product/${product.id || 'details'}`;

  return (
    <div 
      className="w-full relative select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Wrapped the whole motion.div with React Router's Link */}
      <Link to={productLink} className="block no-underline">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: rotate.x,
            rotateY: rotate.y,
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] backdrop-blur-md shadow-sm hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between text-left group cursor-pointer"
        >
          
          {/* Dynamic tdssolar style flash shimmer aura overlay */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 174, 239, 0.15), transparent)`
            }}
          />

          <div style={{ transformStyle: "preserve-3d" }}>
            
            {/* --- ULTRA PARALLAX IMAGE WINDOW --- */}
            <div 
              className="w-full h-48 rounded-2xl bg-slate-50 dark:bg-neutral-900/40 border border-slate-100 dark:border-white/5 p-6 flex items-center justify-center relative overflow-hidden mb-5 shadow-inner"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                animate={{
                  x: rotate.y * 0.8,
                  y: rotate.x * -0.8
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="absolute w-28 h-28 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-2xl pointer-events-none" 
              />
              
              <motion.img
                animate={{
                  x: rotate.y * 1.5,
                  y: rotate.x * -1.5,
                }}
                style={{ 
                  transform: "translateZ(80px)",
                  transformStyle: "preserve-3d" 
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                src={`/images/${productImage}`}
                alt={productName}
                onError={(e) => {
                  e.target.src = '/images/logo.png'; 
                }}
                className="max-w-[85%] max-h-[85%] object-contain filter drop-shadow-lg transition-transform"
              />
            </div>

            {/* Texts Info Segment */}
            <div style={{ transform: "translateZ(40px)" }} className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs">⚡</span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                  {productTag}
                </span>
              </div>
              
              <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                {productName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {productDesc}
              </p>
            </div>
          </div>

          {/* Action button layer footer */}
          <div 
            style={{ transform: "translateZ(50px)" }} 
            className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between z-30"
          >
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hardware Type</span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">Certified</span>
            </div>
            <div 
              className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 px-4 py-2 rounded-xl border border-sky-100 dark:border-white/5 transition-all duration-300 shadow-sm group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-black"
            >
              View Specs &rarr;
            </div>
          </div>
          
        </motion.div>
      </Link>
    </div>
  );
}