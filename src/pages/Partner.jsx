import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Highlight from '../components/Highlight';

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
      <div className="noise-overlay" />
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(0,200,255,0.06)_0%,_transparent_75%)] animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(0,200,255,0.04)_0%,_transparent_75%)] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Banner */}
      <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 pt-6 pb-4 text-center border-b border-slate-200 dark:border-white/5 z-10 backdrop-blur-sm mt-0">
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
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">
              Authorized Collaborations
            </span>
          </motion.div>

          <div className="overflow-hidden py-0.5">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white tracking-tight leading-none"
            >
              Our <Highlight color="blue">Partners</Highlight>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 relative z-10">
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
              className="glass-panel rounded-3xl p-6 flex items-center space-x-4 hover:border-secondary/25 transition-all group text-left shadow-xl border border-white/10"
            >
              {/* Logo Box */}
              <div className="w-20 h-20 bg-white border border-white/5 rounded-2xl flex items-center justify-center p-3.5 flex-shrink-0 overflow-hidden relative group-hover:scale-105 transition-transform shadow-inner">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain rounded-xl grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-grow space-y-1 overflow-hidden">
                <h3 className="font-heading text-base font-black text-white group-hover:text-secondary transition-colors flex items-center">
                  <span className="truncate">{partner.name}</span>
                </h3>
                <p className="text-xs text-zinc-450 font-semibold line-clamp-2 leading-relaxed">
                  {partner.desc}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-zinc-500 group-hover:text-secondary transition-colors flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
