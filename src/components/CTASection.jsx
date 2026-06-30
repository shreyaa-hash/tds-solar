import React from 'react';
import { ArrowRight, Calculator, FileText } from 'lucide-react';

export default function CTASection() {
  const estimatorUrl = "https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec";

  return (
    <section className="dark py-32 relative overflow-hidden bg-background text-primary border-t border-color">
      {/* Background glow blob */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,_rgba(0,174,239,0.06)_0%,_transparent_75%)] filter blur-5xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
        <span className="section-badge mb-2">
          Begin Your Transition
        </span>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
          Ready to Calculate Your Solar Savings?
        </h2>
        <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
          Use our dynamic Enterprise Cost Estimator to compute panel footprint size, potential payback years, and monthly grid savings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <a
            href={estimatorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-secondary text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-accent hover:scale-[1.02] shadow-[0_4px_25px_rgba(0,174,239,0.2)] transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4 text-white" />
            <span>Estimate System Size</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
          <a
            href="/contact-us"
            className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-medium text-sm px-8 py-3.5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-secondary" />
            <span>Consult an Engineer</span>
          </a>
        </div>
      </div>
    </section>
  );
}
