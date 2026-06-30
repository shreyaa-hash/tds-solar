import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Shield, Zap, Award, ChevronRight, ChevronDown, 
  Sun, BatteryCharging, CheckCircle2, Star, Quote, Eye, Cpu, Home as HomeIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/websiteData';
import TiltCard from '../components/TiltCard';
import CanvasParticles from '../components/CanvasParticles';
import Highlight from '../components/Highlight';

// Inline Animated Counter Component
function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalSeconds = duration;
    let incrementTime = Math.abs(Math.floor(totalSeconds / end));
    incrementTime = Math.max(incrementTime, 30); // 30ms floor for performance

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  
  // Before/After comparison slider percentage state
  const [sliderPercent, setSliderPercent] = useState(50);
  const beforeAfterRef = useRef(null);

  const heroRef = useRef(null);
  const scene3Ref = useRef(null);

  // Parallax mouse tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 35;
        const y = (e.clientY - rect.top - rect.height / 2) / 35;
        setHeroOffset({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations for Scene 3 Solar Panel zoom
  const { scrollYProgress: scene3Scroll } = useScroll({
    target: scene3Ref,
    offset: ["start end", "end start"]
  });

  const panelScale = useTransform(scene3Scroll, [0.1, 0.5, 0.9], [0.75, 1.15, 1.25]);
  const panelRotateX = useTransform(scene3Scroll, [0.1, 0.5, 0.9], [25, 12, 5]);
  const panelGlowOpacity = useTransform(scene3Scroll, [0.2, 0.5, 0.8], [0.1, 0.8, 0.2]);
  const reflectionX = useTransform(scene3Scroll, [0.1, 0.8], ["-100%", "200%"]);

  // Partners data for infinite marquee
  const partners = [
    { name: 'Waaree', logo: '/images/p1.png' },
    { name: 'V-Marc', logo: '/images/p2.webp' },
    { name: 'APL Apollo', logo: '/images/p3.webp' },
    { name: 'AM/NS India', logo: '/images/p4.png' },
    { name: 'Schneider', logo: '/images/p5.svg' },
    { name: 'Deye India', logo: '/images/p6.webp' },
    { name: 'Solis', logo: '/images/p7.webp' },
    { name: 'JSW Steel', logo: '/images/p8.svg' },
    { name: 'WAA Cables', logo: '/images/p9.png' },
    { name: 'Dyness', logo: '/images/p10.svg' },
    { name: 'LIB India', logo: '/images/p11.png' },
    { name: 'Enphase', logo: '/images/p12.png' },
  ];

  // Projects data for fullscreen commission scenes
  const projects = [
    {
      title: "50kW Industrial Net-Meter System",
      location: "Fatehpur Rice Mill, U.P.",
      size: "50 kW",
      year: "2025",
      metric: "75% Bill Cut",
      image: "industrial-rice-mill-solar.png"
    },
    {
      title: "15kW Residential Hybrid Setup",
      location: "VIP Road, Fatehpur, U.P.",
      size: "15 kW",
      year: "2026",
      metric: "100% Autonomy",
      image: "residential-villa-solar.png"
    },
    {
      title: "100kW Commercial Rooftop Solar",
      location: "Kanpur Cold Storage, U.P.",
      size: "100 kW",
      year: "2024",
      metric: "25+ Yr Lifespan",
      image: "commercial-cold-storage-solar.png"
    },
    {
      title: "30kW Agricultural Pump Grid",
      location: "Khaga Farm Facility, U.P.",
      size: "30 kW",
      year: "2025",
      metric: "Zero Fuel Costs",
      image: "agricultural-solar-pump.png"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "TDS Solar installed a 10kW hybrid system for our clinic. The 16ms zero-lag failover means our medical equipment runs uninterrupted during outages. Highly recommended.",
      author: "Dr. A. K. Shukla",
      role: "Medical Director",
      location: "Fatehpur Clinic",
      rating: 5
    },
    {
      quote: "Reduced our factory's grid bill by 75%. Professional installation and seamless assistance with the UPPCL net-metering solar approval pipeline. Superb deal.",
      author: "Rajeev Singhal",
      role: "Factory Owner",
      location: "Kanpur",
      rating: 5
    },
    {
      quote: "The module-level monitoring with Enphase microinverters is fantastic. We can track each panel's generation on our smartphones. Zero-degradation installation.",
      author: "Manoj Dwivedi",
      role: "Residential Client",
      location: "VIP Road",
      rating: 5
    }
  ];

  // FAQ Array
  const faqs = [
    {
      q: "How does the UPPCL net-metering scheme work?",
      a: "Net-metering allows you to send excess electricity generated by your solar system back to the UPPCL grid. Your bidirectional meter records both imported and exported units, adjusting your monthly bill so you only pay for the net consumption. Often resulting in negative bills!"
    },
    {
      q: "What is the difference between grid-tied and hybrid solar?",
      a: "Grid-tied systems work directly with the utility grid to lower your bills but shut off during power cuts for safety. Hybrid systems integrate lithium (LFP) battery storage, providing zero-lag power backup during outages while still allowing you to export excess solar energy."
    },
    {
      q: "What is the expected warranty on components?",
      a: "Tier-1 solar modules (e.g. Waaree) carry a 25-year performance warranty. Microinverters like Enphase come with a 15 to 25-year warranty, and hybrid inverters like Deye or Servotec carry a 5 to 10-year warranty. Lithium battery packs usually offer 5 to 10 years."
    },
    {
      q: "How long does the installation take?",
      a: "Residential systems (3kW-10kW) are typically installed in 2-3 days. Larger commercial and industrial installations take between 10 days to 3 weeks, including mechanical framing structural assembly and electrical conduit synchronization."
    }
  ];

  // Handle Before/After slider movement
  const handleSliderMove = (e) => {
    if (!beforeAfterRef.current) return;
    const rect = beforeAfterRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPercent(percentage);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-primary pt-0 min-h-screen relative overflow-hidden text-left"
    >
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Background Animated Blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[550px] h-[550px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '5s' }} />

      {/* ================= SCENES 1 & 2: INTEGRATED CINEMATIC BACKDROP VIDEO PIPELINE ================= */}
      <div className="relative w-full">
        {/* Fullscreen Sticky Video Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none h-[200vh]">
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-35 scale-105"
              style={{ filter: "brightness(0.35) contrast(1.2) saturate(0.75)" }}
            >
              <source src="/videos/solar-3d-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#071A2D]/95 via-[#071A2D]/40 to-[#071A2D]" />
            {/* Futuristic grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:45px_45px]" />
          </div>
        </div>

        {/* ================= SCENE 1: FULLSCREEN CINEMATIC HERO SECTION ================= */}
        <section 
          ref={heroRef}
          className="relative w-full h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden border-b border-white/5 z-10"
        >
          {/* Ambient Mouse Tracking Light Ray */}
          <div 
            className="hidden md:block absolute w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[130px] pointer-events-none transition-all duration-300 z-10"
            style={{ 
              left: `${mousePosition.x - 225}px`, 
              top: `${mousePosition.y - 225}px`,
              mixBlendMode: 'screen' 
            }}
          />

          {/* Canvas floating particles */}
          <CanvasParticles />

          {/* Foreground Content (Netflix style delayed reveals) */}
          <div 
            className="relative z-20 text-center max-w-5xl space-y-8 mt-12"
            style={{ 
              transform: `translate3d(${heroOffset.x}px, ${heroOffset.y}px, 0)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Mini Tech Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-xs font-extrabold text-secondary uppercase tracking-widest">
                Authorized Waaree Partner & UP Dealer
              </span>
            </motion.div>

            {/* Headline with Choreographed Fades */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9, rotate: -1, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 45, damping: 13, delay: 0.8 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-100 dark:to-zinc-400"
              >
                Powering Tomorrow
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, delay: 2.2 }}
                className="text-2xl sm:text-3xl font-black tracking-widest text-gold font-heading uppercase"
              >
                One Ray At A Time
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.0 }}
              className="flex flex-wrap justify-center items-center gap-5 pt-4"
            >
              <Link 
                to="/contact-us"
                className="group relative overflow-hidden bg-gold text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-2xl shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10">Get Free Quote</span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <a 
                href="#storytelling"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 shadow-2xl backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Explore Experience
              </a>
            </motion.div>
          </div>

          {/* Floating Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 3.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          >
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-555">Scroll down</span>
            <div className="w-[18px] h-[30px] rounded-full border-2 border-zinc-650 flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full bg-secondary"
              />
            </div>
          </motion.div>
        </section>

        {/* ================= SCENE 2: INTERACTIVE COSMIC-TO-HOME TRANSITION SYSTEM ================= */}
        <section id="storytelling" className="py-28 bg-gradient-to-b from-background to-lightbg/10 border-b border-white/5 relative z-20 overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(0,174,239,0.03)_0%,_transparent_75%)] pointer-events-none blur-3xl" />

          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Badge */}
            <div className="text-center mb-16 space-y-3">
              <span className="section-badge">Energy Evolution</span>
              <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                Cosmic Power, <Highlight color="blue">Direct to Your Home</Highlight>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto relative items-stretch">
              
              {/* Card 1: The Cosmic Engine */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative flex flex-col justify-between p-8 rounded-3xl border border-secondary/15 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,174,239,0.05)] dark:shadow-black/35 hover:border-secondary/35 dark:hover:border-secondary/20 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle internal gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-6">
                  {/* Glowing Animated Sun SVG Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform duration-500 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-amber-500 opacity-10"></span>
                    <Sun className="w-8 h-8 text-amber-500 animate-spin" style={{ animationDuration: '20s' }} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase font-heading block">
                      Cosmic Source
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                      The Cosmic Engine
                    </h3>
                  </div>

                  <p className="text-slate-650 dark:text-zinc-400 text-sm font-semibold leading-relaxed">
                    For 4.5 billion years, the Sun has anchored our solar system, driving ecosystems, weather cycles, and organic life. It is the Earth's original, infinite engine.
                  </p>
                </div>

                {/* Decorative Earth Wireframe Graphic */}
                <div className="mt-8 pt-6 border-t border-slate-105 dark:border-white/5 flex items-center justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>Nature's Reactor</span>
                  <span className="text-amber-500 font-extrabold">3.8 × 10²⁶ W output</span>
                </div>
              </motion.div>

              {/* Card 2: Your Personal Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                className="group relative flex flex-col justify-between p-8 rounded-3xl border border-secondary/15 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,174,239,0.05)] dark:shadow-black/35 hover:border-secondary/35 dark:hover:border-secondary/20 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle internal gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-6">
                  {/* Glowing Animated Home SVG Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-105 transition-transform duration-500 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-secondary opacity-10"></span>
                    <HomeIcon className="w-8 h-8 text-secondary" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-secondary uppercase font-heading block">
                      Direct Capture
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                      Your Personal Grid
                    </h3>
                  </div>

                  <p className="text-slate-650 dark:text-zinc-400 text-sm font-semibold leading-relaxed">
                    Now, that same infinite power can be harvested directly on your rooftop. Sync your appliances, charge your vehicles, and power your home with zero dependency.
                  </p>
                </div>

                {/* Decorative House Wireframe Graphic */}
                <div className="mt-8 pt-6 border-t border-slate-105 dark:border-white/5 flex items-center justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>Smart Autonomy</span>
                  <span className="text-secondary font-extrabold">0% Carbon Footprint</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </div>

      {/* ================= SCENE 3: MASSIVE REALISTIC SOLAR PANEL ZOOM MASK ================= */}
      <section ref={scene3Ref} className="min-h-[120vh] relative overflow-hidden flex flex-col justify-center items-center z-20 bg-gradient-to-b from-[#071A2D] to-[#0B2C45] py-24 px-6 border-b border-white/5 always-dark-container">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Zooming Solar Panel Mockup Box */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[450px] w-full">
            <motion.div 
              style={{ 
                scale: panelScale,
                rotateX: panelRotateX,
                perspective: 1000
              }}
              className="w-full max-w-[580px] aspect-[4/3] rounded-3xl border border-white/15 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-xl relative overflow-hidden group"
            >
              {/* Glass Reflection Highlight layer */}
              <motion.div 
                style={{ left: reflectionX }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent w-[50%] skew-x-12 pointer-events-none z-10"
              />

              {/* Silicon cells grid drawing mockup */}
              <div className="w-full h-full border border-white/5 rounded-2xl grid grid-cols-6 grid-rows-8 gap-1.5 p-3 bg-slate-950 relative overflow-hidden">
                {/* Sunlight flare glow */}
                <motion.div 
                  style={{ opacity: panelGlowOpacity }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(253,184,19,0.18)_0%,_transparent_65%)] pointer-events-none"
                />

                {[...Array(48)].map((_, i) => (
                  <div key={i} className="bg-slate-900/90 rounded border border-white/[0.03] relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.03]" />
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.03]" />
                    {/* Metallic busbars */}
                    <div className="w-full h-[2px] bg-zinc-700/35 absolute top-1/3" />
                    <div className="w-full h-[2px] bg-zinc-700/35 absolute top-2/3" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Description Text */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-lg text-secondary text-xs font-black uppercase tracking-widest"
            >
              <Sun className="w-3.5 h-3.5 animate-spin-slow" style={{ animationDuration: '12s' }} />
              <span>Optimum Solar Capture</span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight"
            >
              Precision Form Engineered
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-zinc-400 text-sm sm:text-base font-semibold leading-relaxed"
            >
              Deploying 72-cell Waaree monocrystalline bifacial PV hardware configured strictly at 35.6° solar incline targets. Maximum mechanical density delivers full solar conversion yields under high summer heat and shade configuration limits.
            </motion.p>
          </div>

        </div>
      </section>

      {/* ================= SCENE 4: ENERGY JOURNEY (ANIMATED SVG PATHS) ================= */}
      <section className="py-24 border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              Dynamic Architecture
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.92, rotate: -0.5, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 12 }}
              className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight"
            >
              The Grid Autonomy Pipeline
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-sm font-semibold leading-relaxed"
            >
              Witness how smart technology captures, converts, and balances energy dynamically for constant power and zero electricity costs.
            </motion.p>
          </div>

          {/* SVG Animated Flow Component */}
          <div className="relative w-full py-10 bg-white/[0.01] rounded-3xl border border-white/5 p-6 sm:p-10 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-gold/5 pointer-events-none" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              
              <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 shadow-xl relative group hover:border-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-lg shadow-gold/5 group-hover:scale-105 transition-transform">
                  <Sun className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="font-extrabold text-white text-base font-heading">1. Sun Source</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-semibold">Constant solar radiation strikes the atmosphere, supplying clean energy particles.</p>
              </div>

              <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 shadow-xl relative group hover:border-secondary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg shadow-secondary/5 group-hover:scale-105 transition-transform">
                  <Cpu className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base font-heading">2. Solar Panels</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-semibold">Photovoltaic silicon cells absorb photons, generating active raw DC electricity.</p>
              </div>

              <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 shadow-xl relative group hover:border-secondary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg shadow-secondary/5 group-hover:scale-105 transition-transform">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base font-heading">3. Smart Inverter</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-semibold">V-Marc cables route DC power into Deye/Enphase inverters to compile clean AC grids.</p>
              </div>

              <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 shadow-xl relative group hover:border-secondary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg shadow-secondary/5 group-hover:scale-105 transition-transform">
                  <BatteryCharging className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base font-heading">4. LFP Battery</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-semibold">Excess energy charges lithium iron phosphate batteries for 16ms lag power failover protection.</p>
              </div>

              <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 shadow-xl relative group hover:border-secondary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg shadow-secondary/5 group-hover:scale-105 transition-transform">
                  <HomeIcon className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base font-heading">5. Smart Home</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-semibold">Loads run directly on solar/battery power, prioritizing zero grid consumption daily.</p>
              </div>

              <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 shadow-xl relative group hover:border-gold/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-lg shadow-gold/5 group-hover:scale-105 transition-transform">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base font-heading">6. Net Savings</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-semibold">Extra generation exports to UPPCL net-meter grid system, creating monthly utility check credits.</p>
              </div>

            </div>

            {/* Animated Connecting SVG Lines */}
            <div className="hidden lg:block absolute inset-x-6 top-[92px] h-8 pointer-events-none z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="12%" y1="50%" x2="23%" y2="50%" stroke="var(--accent-gold)" strokeWidth="2.5" strokeDasharray="6 6" className="energy-flow-line" />
                <line x1="28%" y1="50%" x2="40%" y2="50%" stroke="var(--accent-primary)" strokeWidth="2.5" strokeDasharray="6 6" className="energy-flow-line" />
                <line x1="45%" y1="50%" x2="57%" y2="50%" stroke="var(--accent-primary)" strokeWidth="2.5" strokeDasharray="6 6" className="energy-flow-line" />
                <line x1="62%" y1="50%" x2="74%" y2="50%" stroke="var(--accent-primary)" strokeWidth="2.5" strokeDasharray="6 6" className="energy-flow-line" />
                <line x1="79%" y1="50%" x2="90%" y2="50%" stroke="var(--accent-primary)" strokeWidth="2.5" strokeDasharray="6 6" className="energy-flow-line" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCENE 5: PROJECTS (FULLSCREEN VIEWPORT SLIDES) ================= */}
      <section id="projects" className="bg-slate-950 relative z-20 border-b border-white/5">
        
        {/* Sticky Header Section */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
          <div className="text-left space-y-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              Completed Commissions
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-black font-heading text-pure-white tracking-tight"
            >
              Engineering Showcase
            </motion.h2>
          </div>
        </div>

        {/* Fullscreen Projects Viewport List */}
        <div className="w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="w-full h-screen relative flex items-end p-8 sm:p-16 overflow-hidden sticky top-0"
            >
              {/* Fullscreen Photo Background with Ken Burns zoom effect */}
              <div className="absolute inset-0 z-0">
                <motion.img 
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  src={`/images/${project.image}`} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-75"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>

              {/* Overlaid details positioned at bottom left */}
              <div className="relative z-10 space-y-6 max-w-2xl text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/20 border border-secondary/35 px-4 py-1.5 rounded-full backdrop-blur-md">
                    {project.location}
                  </span>
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest bg-gold/20 border border-gold/35 px-4 py-1.5 rounded-full backdrop-blur-md">
                    {project.metric}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black font-heading text-pure-white tracking-tight leading-none">
                  {project.title}
                </h3>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm text-zinc-200 font-extrabold gap-10">
                  <span>Capacity: {project.size}</span>
                  <span>Commissioned: {project.year}</span>
                </div>
              </div>

              {/* Bottom Subtle Overlay Indicator */}
              <div className="absolute top-6 right-8 text-white/5 text-9xl font-black select-none font-heading tracking-tighter">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SCENE 6: STATISTICS (HUGE NUMBERS & GLOWS) ================= */}
      <section className="py-24 bg-background border-b border-white/5 relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,174,239,0.04)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-16">
          <span className="section-badge">By The Numbers</span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">Proven Capacity Autonomy</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] text-center space-y-3 relative overflow-hidden group shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-secondary text-glow-blue leading-none">
              <AnimatedCounter value="2016" />
            </h3>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-2">Company Founded</p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] text-center space-y-3 relative overflow-hidden group shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-secondary text-glow-blue leading-none">
              <AnimatedCounter value="1000+" />
            </h3>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-2">Successful Installs</p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] text-center space-y-3 relative overflow-hidden group shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-secondary text-glow-blue leading-none">
              <AnimatedCounter value="15+ MW" />
            </h3>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-2">Capacity Commisioned</p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] text-center space-y-3 relative overflow-hidden group shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-secondary text-glow-blue leading-none">
              <AnimatedCounter value="98%" />
            </h3>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-2">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* ================= SCENE 6.5: GRID+ ECOSYSTEM PRODUCT INTERACTIVE SHOWCASE ================= */}
      <section className="py-24 bg-gradient-to-b from-background to-lightbg/10 border-b border-white/5 relative z-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(0,174,239,0.03)_0%,_transparent_75%)] pointer-events-none blur-3xl" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(253,184,19,0.02)_0%,_transparent_75%)] pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              Our Products
            </motion.span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
              Reliable Solar Products <br />
              <span className="text-slate-800/80 dark:text-white/80 font-medium">Designed for </span>
              <Highlight color="blue">Homes, Businesses, and Industries</Highlight>
            </h2>
          </div>

          {/* Interactive Tilt Showcase */}
          <div className="relative max-w-5xl mx-auto flex flex-col items-center justify-center pt-8">
            
            {/* The Main 3D Tilt Card containing the compiled image and hotspots */}
            <TiltCard 
              maxTilt={5} 
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-white/[0.01] shadow-2xl p-4 sm:p-8 backdrop-blur-sm group flex items-center justify-center"
            >
              {/* Specular light flash overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Glowing background boundary */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-secondary/10 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

              {/* The Product Image Group */}
              <div className="relative w-full h-auto flex items-center justify-center overflow-hidden rounded-2xl select-none">
                <img 
                  src="/images/a1img0202.jpg" 
                  alt="GRID+ Brand Hardware Ecosystem" 
                  className="w-full max-w-3xl object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-[1.01] duration-700 ease-out"
                  loading="lazy"
                />

                {/* Hotspot 1: LFP Battery Cabinet (Center-left) */}
                <div className="absolute" style={{ top: "68%", left: "41.5%" }}>
                  <div className="relative flex items-center justify-center group/hotspot">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-secondary opacity-40"></span>
                    <button className="relative w-4 h-4 rounded-full bg-secondary border border-white flex items-center justify-center shadow-lg cursor-pointer focus:outline-none transition-transform duration-300 group-hover/hotspot:scale-125 z-10" />
                    
                    {/* Tooltip Popup */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-56 p-3 rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-md shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 transition-all duration-300 z-30 text-left always-dark-container">
                      <h4 className="text-xs font-black text-secondary uppercase tracking-wider">GRID+ LFP Battery Tower</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 font-semibold leading-relaxed">High-capacity modular storage with 16ms zero-lag power backup.</p>
                    </div>
                  </div>
                </div>

                {/* Hotspot 2: Smart Hybrid Inverter (Right) */}
                <div className="absolute" style={{ top: "72%", left: "61.5%" }}>
                  <div className="relative flex items-center justify-center group/hotspot">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-secondary opacity-40"></span>
                    <button className="relative w-4 h-4 rounded-full bg-secondary border border-white flex items-center justify-center shadow-lg cursor-pointer focus:outline-none transition-transform duration-300 group-hover/hotspot:scale-125 z-10" />
                    
                    {/* Tooltip Popup */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-56 p-3 rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-md shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 transition-all duration-300 z-30 text-left always-dark-container">
                      <h4 className="text-xs font-black text-secondary uppercase tracking-wider">GRID+ Smart Inverter</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 font-semibold leading-relaxed">Advanced power coordination and net-metering synchronization.</p>
                    </div>
                  </div>
                </div>

                {/* Hotspot 3: EV Charger (Far Left) */}
                <div className="absolute" style={{ top: "52%", left: "34%" }}>
                  <div className="relative flex items-center justify-center group/hotspot">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gold opacity-40"></span>
                    <button className="relative w-4 h-4 rounded-full bg-gold border border-white flex items-center justify-center shadow-lg cursor-pointer focus:outline-none transition-transform duration-300 group-hover/hotspot:scale-125 z-10" />
                    
                    {/* Tooltip Popup */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-56 p-3 rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-md shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 transition-all duration-300 z-30 text-left always-dark-container">
                      <h4 className="text-xs font-black text-gold uppercase tracking-wider">GRID+ Smart EV Charger</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 font-semibold leading-relaxed">Fast-charging solar-integrated charger with dynamic load balancing.</p>
                    </div>
                  </div>
                </div>

                {/* Hotspot 4: Heat Pump Unit (Center-back) */}
                <div className="absolute" style={{ top: "48%", left: "54%" }}>
                  <div className="relative flex items-center justify-center group/hotspot">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white opacity-20"></span>
                    <button className="relative w-4 h-4 rounded-full bg-zinc-650 border border-white flex items-center justify-center shadow-lg cursor-pointer focus:outline-none transition-transform duration-300 group-hover/hotspot:scale-125 z-10" />
                    
                    {/* Tooltip Popup */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-56 p-3 rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-md shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 transition-all duration-300 z-30 text-left always-dark-container">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">GRID+ Coordinator</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 font-semibold leading-relaxed">Eco-friendly high-performance climate control management.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge Left */}
              <div className="absolute -bottom-6 left-4 sm:left-8 z-20 max-w-[180px] sm:max-w-xs transition-transform duration-500 group-hover:-translate-y-1">
                <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-heading text-glow-blue">2500+</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-zinc-400 leading-relaxed font-extrabold uppercase tracking-wide">
                    Solar Battery Systems Installed in U.P.
                  </p>
                </div>
              </div>

              {/* Floating Stat Badge Right */}
              <div className="absolute -bottom-6 right-4 sm:right-8 z-20 max-w-[180px] sm:max-w-xs transition-transform duration-500 group-hover:-translate-y-1">
                <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-gold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-heading text-glow-gold">3000+</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-zinc-400 leading-relaxed font-extrabold uppercase tracking-wide">
                    PV Inverters Installed in the Last Three Years
                  </p>
                </div>
              </div>
            </TiltCard>
            
          </div>
        </div>
      </section>

      {/* ================= SCENE 7: PRODUCTS (3D FLOATING GLASSMISM CARDS) ================= */}
      <section className="py-24 bg-lightbg/20 border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.93, rotate: -0.5, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 12 }}
              className="space-y-3 text-left"
            >
              <span className="section-badge">Product Lineup</span>
              <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">Premium Architecture Materials</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                to="/products"
                className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-secondary group/catalog"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-4 h-4 transform group-hover/catalog:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
            {(categories || []).slice(0, 4).map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 65, damping: 13 }}
                className="h-full"
              >
                <TiltCard maxTilt={8} className="flex flex-col justify-between h-[360px] p-8 border border-white/5 relative overflow-hidden group">
                  {/* Shiny specular card gradient layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
                  
                  <div className="space-y-6">
                    {/* Category Image Box */}
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-350">
                      <img 
                        src={`/images/${cat.image}`} 
                        alt="" 
                        className="w-full h-full object-contain filter drop-shadow-md" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-black font-heading text-white transition-colors group-hover:text-secondary">
                        {cat.name}
                      </h4>
                      <p className="text-sm text-zinc-400 font-semibold leading-relaxed line-clamp-3">
                        {cat.description || "Premium standard engineering hardware components optimized for maximum lifespan output threshold."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <Link 
                      to={`/products/${cat.id}`} 
                      className="text-[10px] font-black uppercase tracking-widest text-secondary inline-flex items-center space-x-1 group/btn"
                    >
                      <span>Explore items</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SCENE 8: TESTIMONIALS (LARGE FLOATING GLASS WINDOWS) ================= */}
      <section className="py-24 border-b border-white/5 relative z-20 bg-gradient-to-b from-lightbg/20 to-background">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              Customer Stories
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.92, rotate: -0.5, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 12 }}
              className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight"
            >
              Trusted by Fatehpur
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-sm font-semibold leading-relaxed"
            >
              Read what homeowners and commercial clients say about transitioning to clean solar electricity.
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[320px] sm:h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonials.map((t, idx) => idx === activeTestimonial && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.45 }}
                  className="absolute w-full p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-md flex flex-col justify-between h-full text-left"
                >
                  <div className="space-y-4">
                    {/* Star ratings */}
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <div className="relative">
                      <Quote className="absolute -top-4 -left-4 w-9 h-9 text-secondary/5 -z-10" />
                      <p className="text-sm sm:text-base text-zinc-300 font-medium italic leading-relaxed pl-2">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Author profile */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary font-black text-sm uppercase">
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white leading-tight">{t.author}</h4>
                        <p className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">{t.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest">
                      {t.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Slider Pagination dots */}
          <div className="flex justify-center items-center gap-2 mt-8 z-30 relative">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-350 focus:outline-none ${
                  idx === activeTestimonial ? 'bg-secondary w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SCENE 9: BEFORE / AFTER INTERACTIVE COMPARISON SLIDER ================= */}
      <section className="py-24 bg-background border-b border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="section-badge">Comparative Value</span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">The <Highlight color="blue">Grid Shift</Highlight> Dynamics</h2>
            <p className="text-zinc-400 text-sm font-semibold leading-relaxed">
              Drag the glowing slider horizontally to witness the direct energy transition from high bills to zero grid dependency.
            </p>
          </div>

          {/* Draggable Slider Container */}
          <div 
            ref={beforeAfterRef}
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
            className="max-w-4xl mx-auto h-[400px] sm:h-[480px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize bg-slate-950"
          >
            {/* BEFORE PANEL (Without Solar) */}
            <div className="absolute inset-0 w-full h-full bg-slate-950 flex flex-col justify-center items-center p-8 sm:p-12 text-center z-0 always-dark-container">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.03)_0%,_transparent_75%)] pointer-events-none" />
              
              <div className="max-w-md space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-rose-950/20 border border-rose-500/30 flex items-center justify-center text-rose-550 mx-auto animate-pulse">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black font-heading text-rose-550 tracking-tight">WITHOUT SOLAR</h3>
                <div className="space-y-2 text-zinc-400 text-sm font-semibold leading-relaxed">
                  <p>• 100% dependency on local UPPCL utility tariff fluctuations.</p>
                  <p>• High monthly expenses with compounding electrical cost cycles.</p>
                  <p>• Zero electrical load backup during direct grid transmission outages.</p>
                </div>
              </div>
            </div>

            {/* AFTER PANEL (With Solar) - Clipped dynamically by width */}
            <div 
              style={{ width: `${sliderPercent}%` }}
              className="absolute inset-y-0 left-0 h-full bg-lightbg flex flex-col justify-center items-center p-8 sm:p-12 text-center z-10 overflow-hidden border-r border-white/10"
            >
              {/* Force the child to retain the parent's fixed size to prevent squishing */}
              <div className="absolute inset-y-0 left-0 w-[896px] h-full flex flex-col justify-center items-center p-8 sm:p-12 text-center pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,174,239,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,174,239,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,174,239,0.05)_0%,_transparent_75%)] pointer-events-none" />

                <div className="max-w-md space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 border border-secondary/35 flex items-center justify-center text-secondary mx-auto">
                    <Sun className="w-8 h-8 animate-spin-slow" style={{ animationDuration: '8s' }} />
                  </div>
                  <h3 className="text-3xl font-black font-heading text-secondary tracking-tight">WITH TDS SOLAR</h3>
                  <div className="space-y-2 text-zinc-300 text-sm font-semibold leading-relaxed">
                    <p className="text-gold font-extrabold">• Up to 100% savings on monthly grid bill payouts.</p>
                    <p>• Bidirectional net-metering credits earned for extra export.</p>
                    <p>• 16ms zero-lag failover protection with modular battery systems.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER BAR DRAG HANDLE */}
            <div 
              style={{ left: `${sliderPercent}%` }}
              className="absolute inset-y-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-secondary via-white to-gold z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-secondary flex items-center justify-center shadow-2xl relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-secondary animate-pulse">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-secondary/15 animate-ping" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SCENE 6: FEATURE WHY CHOOSE TDS (SUPPORTIVE) ================= */}
      <section className="py-24 border-b border-white/5 relative z-20 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              Why TDS Solar
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.92, rotate: -0.5, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 12 }}
              className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight"
            >
              Engineering Industrial Excellence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-sm font-semibold leading-relaxed"
            >
              We deliver structured material configurations built to last 25+ years with zero execution flaws.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, type: "spring", stiffness: 60 }}
              className="h-full"
            >
              <TiltCard maxTilt={5} className="p-8 space-y-5 border border-white/5 relative group h-full">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-350">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-heading text-white">Genuine Certified Hardware</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-semibold">
                  Direct authorized distributor setups guarantee that every single PV panel, microinverter, and earthing structure carries official tier-1 factory certifications.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 60 }}
              className="h-full"
            >
              <TiltCard maxTilt={5} className="p-8 space-y-5 border border-white/5 relative group h-full">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 border border-secondary/20 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-350">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-heading text-white">Maximized Peak Efficiency</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-semibold">
                  By optimizing layout parameters and deploying specialized high-efficiency bifacial infrastructure, our setups capture up to 22% more solar radiation daily.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, type: "spring", stiffness: 60 }}
              className="h-full"
            >
              <TiltCard maxTilt={5} className="p-8 space-y-5 border border-white/5 relative group h-full">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/20 text-gold flex items-center justify-center group-hover:scale-105 transition-transform duration-350">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-heading text-white">UPPCL Net-Metering Compliant</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-semibold">
                  Full grid integration paperwork and technical standards support. Send excess power generated back to the UPPCL grid seamlessly to ensure negative electricity bills.
                </p>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SCENE 2 (ADDITIONAL): TRUST SECTION: INFINITE LOGO MARQUEE ================= */}
      <section className="py-12 border-b border-white/5 bg-background relative z-20">
        <div className="w-full text-center mb-6">
          <span className="text-[10px] font-black text-zinc-555 uppercase tracking-widest">
            Authorized Hardware & Integration Collaborations
          </span>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-content">
            {partners.concat(partners).map((partner, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center px-8 py-3 bg-white/5 border border-white/5 rounded-2xl min-w-[150px] sm:min-w-[180px] h-16 group hover:border-secondary/25 hover:bg-white/10 transition-all duration-350"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-[80%] max-w-[85%] object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-350"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION SECTION ================= */}
      <section className="py-24 bg-lightbg/20 border-b border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              Support Hub
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.92, rotate: -0.5, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 12 }}
              className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : idx)}
                    className="w-full p-6 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="font-extrabold text-white text-base sm:text-lg pr-4 font-heading">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform duration-350 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm text-zinc-400 font-semibold leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </motion.div>
  );
}