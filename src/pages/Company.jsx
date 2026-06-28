import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Trophy, MapPin, Award, CheckCircle } from 'lucide-react';
import { timeline } from '../data/websiteData';

export default function Company() {
  const [selectedYear, setSelectedYear] = useState(timeline[0].year);

  const currentTimelineData = timeline.find((item) => item.year === selectedYear);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-background text-primary pt-4 min-h-screen relative overflow-hidden"
    >
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,174,239,0.05)_0%,_transparent_75%)]" />
        <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(0,174,239,0.04)_0%,_transparent_75%)]" />
      </div>

      {/* Banner */}
{/* --- CATCHY CORPORATE BANNER (COMPACT GAP & MASSIVE FONT FIX) --- */}
      {/* --- ULTRA-COMPACT CORPORATE BANNER (PERFECT GAP & MASSIVE FONT) --- */}
      <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 pt-6 pb-4 text-center border-b border-slate-200 dark:border-white/5 z-10 backdrop-blur-sm mt-0">
        <div className="absolute inset-0">
          <img
            src="/images/Frame2147237044.png"
            alt="TDS Solar Corporate"
            className="w-full h-full object-cover opacity-10 dark:opacity-15"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center space-y-1">
          
          {/* HIGHLY VISIBLE & CRISP BADGE */}
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100/60 dark:bg-sky-950/50 border border-sky-300/40 dark:border-sky-500/20 shadow-inner scale-90 mb-0.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
            </span>
            <span className="text-[10px] font-black text-sky-700 dark:text-sky-400 uppercase tracking-widest">
              ESTABLISHED IN 2016
            </span>
          </motion.div>

          {/* COMPACT REVEAL TITLE */}
          <div className="overflow-hidden py-0.5">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white tracking-tight leading-none"
            >
              Fatehpur Smart Renewable Energy Solutions
            </motion.h1>
          </div>
          
        </div>
      </section>

      {/* About Description */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column Text */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full text-secondary font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Brand Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Energy Flows Exactly Your Way
              </h2>
              <div className="text-zinc-400 text-base leading-relaxed space-y-4 font-medium">
                <p>
                  TDS Solar Energy, established in 2016, is a trusted solar solutions provider committed to delivering genuine and high-quality solar products and professional installation services. As an Authorized Dealer of Waaree, we provide reliable solar systems for homes, businesses, and industries.
                </p>
                <p>
                  Our mission is to make clean, affordable, and sustainable energy accessible while helping customers reduce electricity costs and create long-term value.
                </p>
              </div>
            </motion.div>

            {/* Right Column Image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden glass-panel p-2 group"
            >
              <img
                src="/images/1776392691908918.jpg"
                alt="Solar Panels Installation"
                className="w-full h-full object-cover rounded-2xl aspect-[4/3] group-hover:scale-[1.02] transition-all duration-500"
                loading="lazy"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Timeline Section (Interactive History) */}
     {/* ================= TIMELINE SECTION (CARD WIDTH MAXED UPGRADE) ================= */}
      <section className="py-12 md:py-16 bg-slate-50/50 dark:bg-slate-950/40 border-y border-slate-200 dark:border-white/5 relative z-10 backdrop-blur-sm w-full">
        <div className="w-full">
          
          {/* Section Header */}
          <div className="text-center w-full mx-auto mb-12 space-y-4 px-4">
            <span className="font-heading text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">
              TDS Solar Corporate History
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto">
              Explore our growth milestone timeline from 2016 startup to full-fledged clean energy provider.
            </p>
          </div>

          {/* Year Buttons Layout */}
          <div className="flex justify-center flex-wrap gap-3 mb-12 px-4 w-full">
            {timeline.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all focus:outline-none ${
                  selectedYear === item.year
                    ? 'bg-sky-600 dark:bg-sky-500 text-white dark:text-black shadow-md scale-105'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* 🟢 CARD SET TO FULL WIDTH WITH W-FULL AND EXTENDED PADDINGS */}
          <div className="w-full p-8 sm:p-12 rounded-3xl text-left relative min-h-[300px] shadow-sm bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 transition-all">
            
            {/* Massive Background Year Indicator */}
            <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-black font-heading text-slate-200 dark:text-white/5 select-none tracking-tighter">
              {selectedYear}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                <div className="flex items-center space-x-3 text-sky-600 dark:text-sky-400">
                  <Calendar className="w-6 h-6" />
                  <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                    Yearly Milestones
                  </h3>
                </div>
                
                {/* 🟢 LIST SPLIT INTO TWO COLUMNS SO IT LOOKS RICH AND PRESTIGIOUS */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-slate-100 dark:border-white/5 w-full">
                  {currentTimelineData?.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-sky-500 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Service Presence */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Service Presence */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full text-accent font-bold text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                <span>Geographic Footprint</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Serving Across Uttar Pradesh
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed font-medium">
                TDS SOLAR ENERGY provides reliable solar products and professional installation services across Uttar Pradesh. We serve residential houses, private firms, public institutions, and agricultural facilities in Fatehpur, Lucknow, Kanpur, and surrounding areas.
              </p>
              
              <div className="glass-panel rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-white text-sm mb-2">Fatehpur Headquarters</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  0, VIP ROAD OMKAR NAGAR, FATEHPUR, 212601 U.P.
                </p>
              </div>
            </motion.div>

            {/* Map Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl flex items-center justify-center"
            >
              <picture>
                <img
                  src="/images/downolad.png"
                  alt="Uttar Pradesh Service Map"
                  className="max-h-[300px] object-contain opacity-50 brightness-[0.85] contrast-[1.1] group-hover:opacity-75 transition-all duration-300"
                  loading="lazy"
                />
              </picture>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Honors Section */}
      <section className="py-12 md:py-16 bg-lightbg border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-heading text-xs font-bold text-secondary uppercase tracking-widest block">
              Company Honors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Certifications & Standards
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-secondary/20 transition-all shadow-sm">
              <Award className="w-8 h-8 text-secondary mx-auto" />
              <h4 className="font-bold text-white text-sm">Waaree Authorized</h4>
              <p className="text-xs text-zinc-400">Certified Dealer</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-accent/20 transition-all shadow-sm">
              <ShieldCheck className="w-8 h-8 text-accent mx-auto" />
              <h4 className="font-bold text-white text-sm">IS Standards</h4>
              <p className="text-xs text-zinc-400">Quality Assured</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-secondary/20 transition-all shadow-sm">
              <Trophy className="w-8 h-8 text-secondary mx-auto" />
              <h4 className="font-bold text-white text-sm">1000+ Installs</h4>
              <p className="text-xs text-zinc-400">Service Milestone</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-accent/20 transition-all shadow-sm">
              <Award className="w-8 h-8 text-accent mx-auto" />
              <h4 className="font-bold text-white text-sm">Net-Meter Certified</h4>
              <p className="text-xs text-zinc-400">UPPCL Compliant</p>
            </div>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
