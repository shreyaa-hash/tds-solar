import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium viewport-triggered marker highlighter component inspired by 11sqft.com.
 * Smoothly draws a highlighter stroke underneath the text when scrolled into view.
 */
export default function Highlight({ children, color = 'blue', className = '' }) {
  const isGold = color === 'gold';
  
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      className={`inline bg-no-repeat px-1 rounded-sm transition-colors duration-350 ${
        isGold 
          ? 'bg-[linear-gradient(transparent_62%,rgba(253,184,19,0.22)_62%,rgba(253,184,19,0.22)_92%,transparent_92%)] text-slate-900 dark:text-white' 
          : 'bg-[linear-gradient(transparent_62%,rgba(0,174,239,0.22)_62%,rgba(0,174,239,0.22)_92%,transparent_92%)] text-slate-900 dark:text-white'
      } ${className}`}
      style={{
        backgroundPosition: '0 0'
      }}
    >
      {children}
    </motion.span>
  );
}
