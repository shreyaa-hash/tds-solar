import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { news } from '../data/websiteData';
import Highlight from '../components/Highlight';

export default function News() {
  return (
    <div className="bg-background text-primary pt-14 min-h-screen relative overflow-hidden">
      
      {/* Background overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,174,239,0.03)_0%,_transparent_75%)]" />
        <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(0,174,239,0.02)_0%,_transparent_75%)]" />
      </div>

      {/* Banner */}
      {/* --- ULTRA-COMPACT NEWS HEADER --- */}
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
              SOLAR EXPLORATION BLOG
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
              Latest <Highlight color="blue">News</Highlight>
            </motion.h1>
          </div>
          
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-left relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/news/${post.id}`}
                className="group glass-panel rounded-3xl p-6 hover:border-secondary/20 transition-all flex flex-col h-full relative block shadow-sm"
              >
                {/* Glowing border highlight */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/5 to-transparent group-hover:via-secondary/40 transition-all duration-500" />
                
                {/* Image Box */}
                <div className="bg-lightbg border border-primary/5 rounded-2xl aspect-[16/10] overflow-hidden mb-6 relative shadow-sm">
                  <img
                    src={`/images/${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Meta */}
                <div className="flex-grow space-y-3">
                  <div className="flex items-center space-x-2 text-darkslate text-xs font-semibold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-darkslate font-bold uppercase tracking-wider">
                    {post.tagline}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mt-2">
                    {post.summary}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-primary/5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
