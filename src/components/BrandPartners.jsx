import React from 'react';
import { motion } from 'framer-motion';

export default function BrandPartners() {
  const brands = [
    { name: "Waaree", role: "Authorized Dealer", desc: "India's No. 1 Solar Manufacturer" },
    { name: "Deye", role: "Technology Partner", desc: "Advanced Hybrid & String Inverters" },
    { name: "Servotec", role: "Systems Integrator", desc: "Heavy Duty PCUs & Battery Storage" },
    { name: "Enphase Energy", role: "Authorized Partner", desc: "Module-Level Micro-Inverter Electronics" },
    { name: "V-Marc Cables", role: "Authorized Dealer", desc: "Premium FR-LSH Safety Electrical Wires" }
  ];

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="section-badge mb-2">
          Authorized Supply Chains
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Brands We Deal In
        </h2>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          TDS Solar Energy only partners with Tier-1 smart energy manufacturers, delivering genuine, high-performance warranties directly backed by original companies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {brands.map((brand, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-panel p-6 rounded-3xl text-left flex flex-col justify-between hover:border-secondary/20 transition-all duration-300 group"
          >
            <div className="space-y-4">
              <span className="text-[9px] bg-secondary/10 border border-secondary/20 text-secondary font-bold tracking-widest px-2.5 py-1 rounded-full uppercase inline-block">
                {brand.role}
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight leading-none group-hover:text-secondary transition-colors duration-300">
                {brand.name}
              </h4>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                {brand.desc}
              </p>
            </div>
            
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/20 group-hover:bg-secondary mt-6 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
