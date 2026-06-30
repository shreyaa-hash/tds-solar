import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, ShieldAlert, Award } from 'lucide-react';

export default function ProjectGallery() {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "50kW Industrial Net-Meter System",
      location: "Fatehpur Rice Mill, U.P.",
      specs: "100+ Waaree Mono PERC Modules, Deye On-Grid Inverter, Chemical Earthing Protection",
      metric: "75% Bill Reduction",
      detail: "Custom C-Channel framing engineered to withstand heavy storms. The project was completed in 14 days, including grid synchronization with UPPCL net-metering approval.",
      image: "1776392691908918.jpg"
    },
    {
      title: "15kW Residential Hybrid Setup",
      location: "VIP Road HQ, Fatehpur, U.P.",
      specs: "Servotec Hybrid Solar Inverter, LFP Battery Bank, Live smartphone module monitoring",
      metric: "100% Grid Autonomy",
      detail: "Designed to provide zero-lag seamless back-up power for a large clinic facility. Eliminates power outage failures entirely using CAN communication batteries.",
      image: "3-45.jpg"
    },
    {
      title: "100kW Commercial Rooftop Solar",
      location: "Kanpur Cold Storage Plant, U.P.",
      specs: "Deye String Inverters, high-tensile impact tempered safety structures",
      metric: "25+ Yr System Lifetime",
      detail: "Massive rooftop installation running heavy industrial refrigeration compressors under low solar radiation conditions.",
      image: "4.24-420.jpg"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="section-badge mb-2">
          Engineering Showcase
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Completed Projects
        </h2>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          TDS Solar Energy has successfully executed over 1000 solar installations across Uttar Pradesh. Explore our featured residential and industrial systems.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-zinc-900/60 border border-white/5 backdrop-blur-md rounded-full max-w-xl mx-auto mb-12 overflow-x-auto">
        {projects.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setActiveProject(idx)}
            className={`flex-1 whitespace-nowrap text-xs py-2 px-4 rounded-full font-medium transition-all ${
              activeProject === idx ? 'bg-white text-black shadow-lg font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {p.title.split(' ')[0]} {p.title.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center glass-panel rounded-3xl p-8 lg:p-12">
        <div className="lg:col-span-5 space-y-6 text-left">
          <div>
            <span className="text-[10px] text-secondary font-bold tracking-widest uppercase bg-secondary/10 border border-secondary/20 px-2.5 py-1 rounded-full">
              {projects[activeProject].location}
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mt-4">
              {projects[activeProject].title}
            </h3>
          </div>
          
          <p className="text-zinc-300 text-sm font-light leading-relaxed">
            {projects[activeProject].detail}
          </p>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Performance Metric</p>
              <p className="text-xl font-bold text-secondary mt-0.5">{projects[activeProject].metric}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Specifications</p>
              <p className="text-xs text-zinc-300 font-medium leading-relaxed mt-0.5">{projects[activeProject].specs}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-white/5 relative group/img">
          <img
            src={`/images/${projects[activeProject].image}`}
            alt={projects[activeProject].title}
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
