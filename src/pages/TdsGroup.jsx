import { Building, LandPlot, Tractor, Plug, Factory, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
      image: '/images/tds-corporation-logo.png'
    },
    {
      name: 'TDS INDUSTRIES',
      icon: Factory,
      desc: 'Heavy-duty industrial products, manufacturing support, and logistics solutions built with safety, compliance, and long-term trust.',
      image: '/images/TDS-industries-logo.jpeg'
    },
    {
      name: 'TDS INFRA',
      icon: LandPlot,
      desc: 'Smart infrastructure developments, local government contracting, and engineering project execution for regional growth.',
      image: '/images/tds-infra-logo.jpeg'
    },
    {
      name: 'GRID+',
      icon: Plug,
      desc: 'A growing solar energy brand offering smart grid integrations, power coordinators, and future-ready LFP energy storage systems.',
      image: '/images/grid.jpeg'
    },
    {
      name: 'GAJ VILAS',
      icon: ShieldCheck,
      desc: 'A premium marriage lawn, garden, and event banquet venue designed for elegant weddings, receptions, and memorable celebrations in Fatehpur.',
      image: '/images/gajvilas-logo.jpeg'
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
      {/* --- ULTRA-COMPACT TDS GROUPS HEADER --- */}
     {/* --- EXTRA CRUNCHED COMPACT PAGE HEADER --- */}
      {/* --- EXTRA CRUNCHED COMPACT PAGE HEADER (ZERO GAP FIX) --- */}
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
              ENTERPRISE DISCOVERY
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
              TDS Groups
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
