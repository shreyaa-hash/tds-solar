import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Partner() {
  const partners = [
    {
      name: 'Waaree Energies',
      image: '/images/p1.png',
      desc: 'Tier-1 solar module manufacturer and primary engineering partner.',
      url: 'https://www.waaree.com/'
    },
    {
      name: 'V-Marc',
      image: '/images/p2.webp',
      desc: 'Premium building and heavy electrical transmission cables partner.',
      url: 'https://www.v-marc.com/'
    },
    {
      name: 'APL Apollo',
      image: '/images/p3.webp',
      desc: 'Structural steel components and hollow tube section fabrication.',
      url: 'https://aplapollo.com/'
    },
    {
      name: 'AM/NS India',
      image: '/images/p4.png',
      desc: 'Corrosion resistant galvanized hot-dip steel alloy provider.',
      url: 'https://www.amns.in/'
    },
    {
      name: 'Schneider Electric Global',
      image: '/images/p5.svg',
      desc: 'Circuit breakers, surge protections, and electrical safety gear.',
      url: 'https://www.se.com/ww/en/'
    },
    {
      name: 'Deye India',
      image: '/images/p6.webp',
      desc: 'Smart grid-tie string inverters and hybrid storage solutions.',
      url: 'https://www.deyeindia.in/'
    },
    {
      name: 'Solis Inverter',
      image: '/images/p7.webp',
      desc: 'Advanced solar string inverter technologies and web monitoring.',
      url: 'https://www.solisinverters.com/in'
    },
    {
      name: 'JSW Steel Coated',
      image: '/images/p8.svg',
      desc: 'Galvalume steel sheeting for commercial structure roofs.',
      url: 'https://www.jswcoatedsteel.in/'
    },
    {
      name: 'WAA Cables',
      image: '/images/p9.png',
      desc: 'Double insulated heavy DC solar cables for rooftop arrays.',
      url: 'https://waacables.com/'
    },
    {
      name: 'Dyness',
      image: '/images/p10.svg',
      desc: 'Lithium iron phosphate LFP solar battery storage systems.',
      url: 'https://dyness.com/'
    },
    {
      name: 'LIB India',
      image: '/images/p11.png',
      desc: 'Sustainable lithium ion battery packs and backup grids.',
      url: 'https://libindia.com/'
    },
    {
      name: 'Enphase Energy',
      image: '/images/p12.png',
      desc: 'High efficiency AC module microinverters and monitoring apps.',
      url: 'https://enlighten.enphaseenergy.com/'
    },
    {
      name: 'Shakti Pumps',
      image: '/images/p13.webp',
      desc: 'Solar powered submersible and surface water pumps for farming.',
      url: 'https://shaktipumps.com/'
    }
  ];

  return (
    <div className="bg-background text-primary pt-14 min-h-screen relative overflow-hidden text-left">
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,174,239,0.03)_0%,_transparent_75%)]" />
        <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(0,174,239,0.02)_0%,_transparent_75%)]" />
      </div>

      {/* Banner */}
      {/* --- ULTRA-COMPACT PARTNERS HEADER --- */}
      <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 pt-6 pb-4 text-center border-b border-slate-200 dark:border-white/5 z-10 backdrop-blur-sm mt-0">
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center space-y-1">
          
          {/* CRUNCHED ULTRA MINI BADGE */}
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
              AUTHORIZED COLLABORATIONS
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
              Our Partners
            </motion.h1>
          </div>
          
        </div>
      </section>
      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, idx) => (
            <motion.a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              className="glass-panel rounded-3xl p-6 flex items-center space-x-4 hover:border-secondary/20 transition-all group text-left shadow-sm"
            >
              {/* Logo Box */}
              <div className="w-20 h-20 bg-white border border-primary/5 rounded-2xl flex items-center justify-center p-3.5 flex-shrink-0 overflow-hidden relative group-hover:scale-105 transition-transform shadow-sm">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain rounded-xl grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-grow space-y-1 overflow-hidden">
                <h3 className="font-heading text-base font-bold text-primary group-hover:text-secondary transition-colors flex items-center">
                  <span className="truncate">{partner.name}</span>
                </h3>
                <p className="text-xs text-darkslate line-clamp-2 leading-relaxed">
                  {partner.desc}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-primary/40 group-hover:text-secondary transition-colors flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
