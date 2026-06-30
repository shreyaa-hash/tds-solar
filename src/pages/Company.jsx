import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Trophy, MapPin, Award, CheckCircle } from 'lucide-react';
import { timeline } from '../data/websiteData';

export default function Company() {
  const [selectedYear, setSelectedYear] = useState(timeline[0].year);

  const currentTimelineData = timeline.find((item) => item.year === selectedYear);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-background text-primary pt-14 min-h-screen relative overflow-hidden"
    >
      <div className="noise-overlay" />
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(0,200,255,0.06)_0%,_transparent_70%)] animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(253,184,19,0.04)_0%,_transparent_70%)] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header Banner */}
      <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 pt-6 pb-4 text-center border-b border-slate-200 dark:border-white/5 z-10 backdrop-blur-sm mt-0">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Frame2147237044.png"
            alt="TDS Solar Corporate"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center space-y-1">
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 shadow-sm scale-90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
            </span>
            <span className="text-[10px] font-black text-secondary tracking-widest uppercase">
              Established in 2016
            </span>
          </motion.div>

          <div className="overflow-hidden py-0.5">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-zinc-400 tracking-tight leading-none"
            >
              Fatehpur Smart Renewable Energy Solutions
            </motion.h1>
          </div>
        </div>
      </section>

      {/* About Description */}
      <section className="pt-10 pb-20 relative z-10">
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
              <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full text-secondary font-black text-xs uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Brand Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                Energy Flows Exactly Your Way
              </h2>
              <div className="text-zinc-400 text-sm sm:text-base leading-relaxed space-y-4 font-semibold">
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
              className="relative rounded-3xl overflow-hidden glass-panel p-2 group shadow-2xl"
            >
              <img
                src="/images/1776392691908918.jpg"
                alt="Solar Panels Installation"
                className="w-full h-full object-cover rounded-2xl aspect-[4/3] group-hover:scale-[1.02] transition-all duration-500 opacity-80"
                loading="lazy"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5 relative z-10 backdrop-blur-sm w-full">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="section-badge mb-2">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              TDS Solar Corporate History
            </h2>
            <p className="text-zinc-400 text-sm font-semibold max-w-2xl mx-auto">
              Explore our growth milestone timeline from 2016 startup to full-fledged clean energy provider.
            </p>
          </div>

          {/* Year Buttons Layout */}
          <div className="flex justify-center flex-wrap gap-3 mb-12 w-full">
            {timeline.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all focus:outline-none ${
                  selectedYear === item.year
                    ? 'bg-secondary text-slate-950 shadow-lg scale-105 shadow-secondary/20'
                    : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Milestone Details Card */}
          <div className="w-full p-8 sm:p-12 rounded-3xl text-left relative min-h-[300px] shadow-2xl glass-panel border border-white/10 transition-all">
            
            {/* Massive Background Year Indicator */}
            <div className="absolute top-6 right-8 text-7xl sm:text-9xl font-black font-heading text-white/[0.03] select-none tracking-tighter">
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
                <div className="flex items-center space-x-3 text-secondary">
                  <Calendar className="w-6 h-6" />
                  <h3 className="font-heading text-2xl font-black text-white">
                    Yearly Milestones
                  </h3>
                </div>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/5 w-full">
                  {currentTimelineData?.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-zinc-300 text-sm sm:text-base leading-relaxed font-semibold">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
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
      <section className="py-20 relative z-10">
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
              <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full text-secondary font-black text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                <span>Geographic Footprint</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                Serving Across Uttar Pradesh
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-semibold">
                TDS SOLAR ENERGY provides reliable solar products and professional installation services across Uttar Pradesh. We serve residential houses, private firms, public institutions, and agricultural facilities in Fatehpur, Lucknow, Kanpur, and surrounding areas.
              </p>
              
              <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/10">
                <h4 className="font-extrabold text-white text-base font-heading mb-2">Fatehpur Headquarters</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
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
              className="glass-panel p-8 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10"
            >
              <picture>
                <img
                  src="/images/downolad.png"
                  alt="Uttar Pradesh Service Map"
                  className="max-h-[300px] object-contain opacity-40 brightness-[0.85] contrast-[1.1] transition-all duration-300"
                  loading="lazy"
                />
              </picture>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Honors Section */}
      <section className="py-20 bg-white/[0.01] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="section-badge mb-2">
              Company Honors
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
              Certifications & Standards
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-secondary/20 transition-all shadow-xl border border-white/10">
              <Award className="w-8 h-8 text-secondary mx-auto" />
              <h4 className="font-extrabold text-white text-sm">Waaree Authorized</h4>
              <p className="text-xs text-zinc-450">Certified Dealer</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-gold/20 transition-all shadow-xl border border-white/10">
              <ShieldCheck className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-extrabold text-white text-sm">IS Standards</h4>
              <p className="text-xs text-zinc-450">Quality Assured</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-secondary/20 transition-all shadow-xl border border-white/10">
              <Trophy className="w-8 h-8 text-secondary mx-auto" />
              <h4 className="font-extrabold text-white text-sm">1000+ Installs</h4>
              <p className="text-xs text-zinc-450">Service Milestone</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center space-y-3 hover:border-gold/20 transition-all shadow-xl border border-white/10">
              <Award className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-extrabold text-white text-sm">Net-Meter Certified</h4>
              <p className="text-xs text-zinc-450">UPPCL Compliant</p>
            </div>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
