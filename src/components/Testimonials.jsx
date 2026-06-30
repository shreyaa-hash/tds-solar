import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "TDS Solar installed a 10kW hybrid system for our clinic. The 16ms zero-lag failover means our medical equipment runs uninterrupted during outages. Truly professional installation.",
      author: "Dr. A. K. Shukla",
      role: "Medical Director",
      location: "Fatehpur Clinic",
      rating: 5
    },
    {
      quote: "Reduced our factory's grid bill by 75%. Professional installation and seamless assistance with the UPPCL net-metering solar approval pipeline. Highly recommended dealer.",
      author: "Rajeev Singhal",
      role: "Factory Owner",
      location: "Singhal Industries, Kanpur",
      rating: 5
    },
    {
      quote: "The module-level monitoring with Enphase microinverters is fantastic. We can track each panel's generation on our smartphones. Excellent service and zero-degradation installation.",
      author: "Manoj Dwivedi",
      role: "Residential Client",
      location: "Fatehpur VIP Road",
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-950/20 border-t border-white/5">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,174,239,0.02)_0%,_transparent_75%)] filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="section-badge mb-2">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Trusted by Businesses & Homeowners
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Read what our clients say about their transition to smart grid-autonomy and clean energy generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-3 -left-3 w-8 h-8 text-secondary/5 -z-10" />
                    <p className="text-zinc-300 text-sm font-light leading-relaxed italic text-left">
                      "{t.quote}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{t.author}</h4>
                    <p className="text-[11px] text-zinc-500">{t.role}, <span className="text-secondary">{t.location}</span></p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
