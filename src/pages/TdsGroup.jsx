import { Building, LandPlot, Tractor, Plug, Factory, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Highlight from '../components/Highlight';

export default function TdsGroup() {
  const groups = [
    {
      name: 'TDS AGRO',
      icon: Tractor,
      desc: 'Import, export, and solar-based farming and agricultural business solutions focused on sustainable growth, quality products, and green practices.',
      image: '/images/tds-agro-logo.jpeg'
    },
    {
      name: 'TDS CORPORATION',
      icon: Building,
      desc: 'Corporate business operations, enterprise solutions, and consultancies designed for professional, highly structured, and reliable workflows.',
      image: '/images/tds-corp-logo.png'
    },
    {
      name: 'TDS REAL STATE',
      icon: LandPlot,
      desc: 'Real estate advisory, housing, infrastructure, and green building layout consultancies.',
      image: '/images/tds-real-logo.png'
    },
    {
      name: 'TDS INFOTECH',
      icon: Plug,
      desc: 'Software development, solar asset tracking monitors, cloud syncs, and advanced digital integrations.',
      image: '/images/tds-infotech-logo.png'
    },
    {
      name: 'TDS MULTIFRESH RICE MILL',
      icon: Factory,
      desc: 'Modern paddy milling facilities operated with high-performance solar generation systems.',
      image: '/images/tds-mill-logo.png'
    }
  ];

  return (
    <div className="bg-background text-primary pt-14 min-h-screen relative overflow-hidden text-left">
      <div className="noise-overlay" />
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(0,174,239,0.05)_0%,_transparent_75%)] animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(0,174,239,0.03)_0%,_transparent_75%)] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* --- ULTRA-COMPACT TDS GROUPS HEADER --- */}
      <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 pt-6 pb-4 text-center border-b border-slate-200 dark:border-white/5 z-10 backdrop-blur-sm mt-0">
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center space-y-1">
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-1"
          >
            <span className="bg-secondary/10 border border-secondary/20 shadow-sm text-secondary font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
              Enterprise Discovery
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
              <Highlight color="blue">TDS Groups</Highlight>
            </motion.h1>
          </div>
          
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-panel rounded-3xl p-8 flex flex-col h-full hover:border-secondary/20 transition-all group text-left relative shadow-sm"
              >
                {/* Glowing border highlight */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/5 to-transparent group-hover:via-secondary/40 transition-all duration-500" />
                
                {/* Logo Area */}
                <div className="w-20 h-20 bg-white border border-primary/5 rounded-2xl flex items-center justify-center p-3.5 mb-6 overflow-hidden relative group-hover:scale-105 transition-transform shadow-sm">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-contain rounded-xl grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-2 text-secondary">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-heading text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                      {group.name}
                    </h3>
                  </div>
                  <p className="text-darkslate text-sm leading-relaxed">
                    {group.desc}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-primary/5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                  <span>Explore Division</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
