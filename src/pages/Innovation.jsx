import { Cpu, ShieldCheck, Zap, Cog, Settings, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Innovation() {
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
              Future Matrix Labs
            </span>
          </motion.div>

          <div className="overflow-hidden py-0.5">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-zinc-400 tracking-tight leading-none"
            >
              Our Innovations
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main Info */}
      <section className="pt-10 pb-20 max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/20 px-4 py-1.5 rounded-full text-secondary font-black text-xs uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Technology Advancements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-heading">
              Solar Products & Dedicated Engineering
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-semibold">
              We leverage module-level electronics (MLPE), such as Enphase Microinverters, to optimize power yield under shadow cast and dust configurations. Each solar module operates independently, bypassing the single point of failure common in traditional string layouts.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-semibold">
              Our engineering team custom designs hot-dip galvanized and aluminum structures to handle local wind-load specs while maintaining optimal panel tilt angles for maximum solar radiation harvest in Uttar Pradesh.
            </p>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 rounded-3xl space-y-4 hover:border-secondary/25 transition-all shadow-xl border border-white/10"
            >
              <div className="p-3 bg-secondary/10 text-secondary w-fit rounded-xl border border-secondary/20">
                <Cog className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '10s' }} />
              </div>
              <h4 className="font-extrabold text-white text-base font-heading">Custom Structure Framing</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">Structural layouts designed by our engineers using wind-load calculations to ensure 25+ years stability.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 rounded-3xl space-y-4 hover:border-gold/25 transition-all shadow-xl border border-white/10"
            >
              <div className="p-3 bg-gold/10 text-gold w-fit rounded-xl border border-gold/20">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-base font-heading">Live Panel Monitoring</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">Track output from every solar panel dynamically from your smartphone app anywhere.</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* R&D Engineers Section */}
      <section className="py-20 bg-white/[0.01] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="font-heading text-xs font-black text-secondary uppercase tracking-widest block">
              Scientific Precision
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-heading">
              Professional R&D Engineers
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-semibold">
              We continually upgrade our component standardizations, sourcing premium XLPE tinned-copper wires, copper lightning arrestors, and heavy lip-channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 rounded-3xl space-y-4 hover:border-secondary/25 transition-all shadow-xl border border-white/10"
            >
              <Settings className="w-8 h-8 text-secondary animate-spin-slow" style={{ animationDuration: '8s' }} />
              <h4 className="font-extrabold text-white text-lg font-heading">Electrical Optimization</h4>
              <p className="text-zinc-450 text-sm leading-relaxed font-semibold">
                Minimizing AC/DC transmission losses with tinned copper conductors, custom conduit runs, and low resistance chemical earthing compounds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-8 rounded-3xl space-y-4 hover:border-gold/25 transition-all shadow-xl border border-white/10"
            >
              <ShieldCheck className="w-8 h-8 text-gold" />
              <h4 className="font-extrabold text-white text-lg font-heading">Structural Wind Shielding</h4>
              <p className="text-zinc-450 text-sm leading-relaxed font-semibold">
                Hot-dip galvanized steel mounting channels designed to distribute forces evenly, resisting direct wind shears during extreme weather events.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-8 rounded-3xl space-y-4 hover:border-secondary/25 transition-all shadow-xl border border-white/10"
            >
              <Zap className="w-8 h-8 text-secondary" />
              <h4 className="font-extrabold text-white text-lg font-heading">Smart Battery Coordination</h4>
              <p className="text-zinc-450 text-sm leading-relaxed font-semibold">
                Optimized charge cycles dynamically managed via CAN communication lines between hybrid Deye/Servotec inverters and LFP battery banks.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
