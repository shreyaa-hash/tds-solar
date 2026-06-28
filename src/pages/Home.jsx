import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/websiteData';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-primary pt-14 min-h-screen relative overflow-hidden text-left transition-colors duration-300"
    >
      
      {/* ================= 3D ANIMATED SOLAR VIDEO BACKGROUND ENGINE ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 dark:opacity-20 scale-105 select-none"
          style={{ filter: "brightness(0.95) contrast(1.05)" }}
        >
          <source src="/videos/solar-3d-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00aeef04_1px,transparent_1px),linear-gradient(to_bottom,#00aeef04_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/80" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* ================= SECTION 1: HERO OVERLAY BLOCK (FULL WIDTH) ================= */}
      <section className="relative w-full px-6 md:px-12 pt-24 pb-32 z-10 min-h-[75vh] flex flex-col justify-center">
        <div className="space-y-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/60 dark:bg-sky-950/50 border border-sky-300/40 dark:border-sky-500/20 shadow-inner backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-[10px] font-black text-sky-700 dark:text-sky-400 uppercase tracking-widest">
              Authorized Waaree Partner
            </span>
          </motion.div>

          <div className="overflow-hidden py-1">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-7xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Empowering Fatehpur With Clean Solar Energy
            </motion.h1>
          </div>

          <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl pt-2">
            Supplying top-tier certified hardware materials from modules to smart hybrid grid infrastructures. Lower production setup risks with professional authorized engineering.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              to="/products"
              className="inline-flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-black font-black text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-xl shadow-sky-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Materials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/company"
              className="inline-flex items-center justify-center bg-slate-100/80 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl border border-slate-200/60 dark:border-white/10 backdrop-blur-sm transition-all"
            >
              Our History
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: LIVE STATISTICS MATRIX (FULL WIDTH) ================= */}
      <section className="border-y border-slate-200 dark:border-white/5 py-12 bg-slate-50/40 dark:bg-slate-950/20 backdrop-blur-sm relative z-10 w-full">
        <div className="w-full px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-1 pl-4 border-l-2 border-sky-500">
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">2016</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Established Year</p>
          </div>
          <div className="space-y-1 pl-4 border-l-2 border-sky-500">
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">1000+</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Successful Installs</p>
          </div>
          <div className="space-y-1 pl-4 border-l-2 border-sky-500">
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">15+ MW</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clean Power Deployed</p>
          </div>
          <div className="space-y-1 pl-4 border-l-2 border-sky-500">
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">100%</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Genuine Materials</p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: CORE VALUE PROPOSITIONS (FULL WIDTH UPDATED) ================= */}
      <section className="py-24 w-full px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest block">WHY TDS SOLAR</span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white tracking-tight">Engineering Industrial Excellence</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium">We deliver structured material configurations built to last 25+ years with zero execution flaws.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white">Genuine Certified Hardware</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Direct authorized distributor setups guarantee that every single PV panel, microinverter, and earthing structure carries official tier-1 factory certifications.</p>
          </div>

          <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white">Maximized Peak Efficiency</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">By optimizing layout parameters and deploying specialized high-efficiency bifacial infrastructure, our setups capture up to 22% more solar radiation daily.</p>
          </div>

          <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white">UPPCL Net-Metering Compliant</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Full grid integration paperwork and technical standards support. Send excess power generated back to the UPPCL grid seamlessly to ensure negative electricity bills.</p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: PRODUCT CATEGORIES SHOWCASE (FULL WIDTH) ================= */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950/40 border-y border-slate-200 dark:border-white/5 relative z-10 backdrop-blur-sm w-full">
        <div className="w-full px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3 text-left">
              <span className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest block">PRODUCT LINEUP</span>
              <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white tracking-tight">Premium Architecture Materials</h2>
            </div>
            <Link 
              to="/products"
              className="inline-flex items-center space-x-1.5 text-xs font-black uppercase text-sky-600 dark:text-sky-400 group flex-shrink-0"
            >
              <span>View Full Catalog</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full"
          >
            {(categories || []).slice(0, 4).map((cat) => (
              <motion.div 
                key={cat.id}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-neutral-950/40 hover:border-sky-500/20 transition-all group flex flex-col justify-between w-full shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl p-3 flex items-center justify-center shadow-inner">
                    <img src={`/images/${cat.image}`} alt="" className="w-full h-full object-contain filter drop-shadow-sm" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black font-heading text-slate-900 dark:text-white transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400">{cat.name}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed line-clamp-2">Premium standard engineering hardware parts optimized for maximum life threshold output.</p>
                  </div>
                </div>
                <Link to={`/products/${cat.id}`} className="mt-6 text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 inline-flex items-center space-x-1 group/btn">
                  <span>Explore items</span>
                  <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 5: INTERACTIVE 4-STEP WORKFLOW (FULL WIDTH UPDATED) ================= */}
      <section className="py-24 w-full px-6 md:px-12 relative z-10 text-left">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest block">DEPLOYMENT PIPELINE</span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white tracking-tight">How We Build Your Plant</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative w-full">
          <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-sky-500/40 via-emerald-500/20 to-sky-500/40 z-0" />

          <div className="space-y-4 relative z-10 w-full">
            <div className="w-12 h-12 rounded-xl bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-black font-heading flex items-center justify-center text-lg shadow-md shadow-sky-500/20">
              01
            </div>
            <h4 className="text-lg font-black font-heading text-slate-900 dark:text-white">Site Assessment</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Our certified team scans roof shadow thresholds and load parameters to formulate the ideal blueprint structure layout.</p>
          </div>

          <div className="space-y-4 relative z-10 w-full">
            <div className="w-12 h-12 rounded-xl bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-black font-heading flex items-center justify-center text-lg shadow-md shadow-sky-500/20">
              02
            </div>
            <h4 className="text-lg font-black font-heading text-slate-900 dark:text-white">Custom Engineering</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">We curate an absolute custom tier-1 component hardware assembly mapping, specifying correct module tilts for maximum irradiation.</p>
          </div>

          <div className="space-y-4 relative z-10 w-full">
            <div className="w-12 h-12 rounded-xl bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-black font-heading flex items-center justify-center text-lg shadow-md shadow-sky-500/20">
              03
            </div>
            <h4 className="text-lg font-black font-heading text-slate-900 dark:text-white">Precision Assembly</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Authorized professional installation techs handle structural anchoring, heavy earthing meshes, and string routing setups flawlessly.</p>
          </div>

          <div className="space-y-4 relative z-10 w-full">
            <div className="w-12 h-12 rounded-xl bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-black font-heading flex items-center justify-center text-lg shadow-md shadow-sky-500/20">
              04
            </div>
            <h4 className="text-lg font-black font-heading text-slate-900 dark:text-white">Grid Net-Metering</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">We handle full net-meter compliance approvals with UPPCL officials, enabling active bidirectional logging and synchronization loops.</p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: CALL TO ACTION (FULL WIDTH UPDATED) ================= */}
      <section className="w-full px-6 md:px-12 pb-24 relative z-10">
        <div className="w-full rounded-3xl border border-slate-200 dark:border-white/5 bg-gradient-to-br from-white via-sky-50/20 to-transparent dark:from-white/[0.01] dark:to-sky-950/10 p-8 sm:p-16 flex flex-col md:flex-row md:items-center justify-between text-left gap-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-4xl">
            <h3 className="text-2xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white tracking-tight">Ready to Switch to Zero Electricity Costs?</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Contact our authorized support desk now. Get a complete comprehensive engineering quote and layout visualization for your residence or industrial warehouse.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link 
              to="/contact-us"
              className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
}