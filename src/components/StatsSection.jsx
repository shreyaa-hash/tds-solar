import React, { useEffect, useState, useRef } from 'react';
import { statistics } from '../data/websiteData';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const duration = 2000; // 2 seconds animation

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Cubic-bezier style easeOutExpo
      const easeOutValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOutValue * numericPart);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericPart]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-zinc-950/20 border-y border-white/5">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[radial-gradient(circle,_rgba(0,174,239,0.04)_0%,_transparent_75%)] filter blur-5xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2 group"
            >
              <div className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-none group-hover:text-secondary transition-colors duration-500 font-heading">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="h-0.5 w-8 bg-secondary/20 group-hover:bg-secondary/60 mx-auto rounded-full transition-colors duration-500" />
              <div className="text-xs text-zinc-500 uppercase tracking-widest leading-relaxed font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
