import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data";

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Testimonials() {
  // We double the testimonials list for the seamless marquee effect
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-20 bg-navy text-white border-b border-gold/10 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-navy-light/40 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full font-sans">
        
        {/* Header block: centered with 3px gold decorative line above */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 px-4 sm:px-6 lg:px-8">
          <div className="w-10 h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded"></div>
          <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
            CLIENT ADVOCACY & TRUST
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Endorsed by Families & Leaders
          </h2>
          <p className="font-sans text-white/70 font-light text-base leading-[1.7] max-w-[90%] mx-auto">
            Real feedback from clients who have secured their estates and protected their health 
            through Dr. J Soni’s custom-engineered blueprints.
          </p>
        </div>

        {/* =======================================================
            UNIFIED: Infinite Auto-Scrolling Marquee Track (All Viewports)
            ======================================================= */}
        <div className="block w-full overflow-hidden py-4 select-none relative">
          {/* Left/Right fading edge overlays for beautiful visual transition */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none"></div>

          {/* Marquee track */}
          <div className="flex w-max animate-marquee py-2 hover:[animation-play-state:paused]">
            {marqueeItems.map((testimonial, idx) => {
              const uniqueId = `carousel-${testimonial.id}-${idx}`;
              return (
                <div
                  key={uniqueId}
                  className="w-[290px] sm:w-[380px] flex-shrink-0 mx-2 sm:mx-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-5 sm:p-6 relative flex flex-col justify-between items-start text-left hover:border-gold/30 hover:bg-white/[0.06] shadow-premium transition-all duration-300"
                >
                  {/* Subtle quote mark (") decorative element behind each card */}
                  <div className="absolute -top-3 right-6 text-gold/5 font-serif text-[100px] sm:text-[120px] font-bold select-none pointer-events-none leading-none h-fit">
                    ”
                  </div>

                  <div className="w-full">
                    {/* Badge and Star Rating row */}
                    <div className="flex items-center justify-between w-full mb-5 gap-2 relative z-10">
                      {/* 5-star gold rating */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                        ))}
                      </div>

                      {/* Small Verified Client badge */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Verified Client
                      </span>
                    </div>

                    {/* Body Text in italics */}
                    <p className="font-sans text-white/80 text-sm sm:text-[15px] font-light italic leading-[1.7] mb-6 relative z-10">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Profile Separated Footer */}
                  <div className="w-full border-t border-white/10 pt-4 mt-auto flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-gold bg-gold/10 text-gold flex items-center justify-center font-serif font-bold text-sm shadow-sm select-none flex-shrink-0">
                      {getInitials(testimonial.name)}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-serif font-bold text-sm text-white tracking-wide truncate">
                        {testimonial.name}
                      </span>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-0.5 truncate font-sans">
                        {testimonial.city} • <span className="text-gold-light font-bold lowercase">{testimonial.relationship}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Google review micro banner */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-white/60 font-medium px-4">
          <span className="inline-flex items-center gap-0.5 text-gold">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <Star className="w-4 h-4 fill-gold text-gold" />
            <Star className="w-4 h-4 fill-gold text-gold" />
            <Star className="w-4 h-4 fill-gold text-gold" />
            <Star className="w-4 h-4 fill-gold text-gold" />
          </span>
          <span className="text-center font-sans">5.0 Star Rated on Google Business Profile based in Gurugram, Haryana.</span>
        </div>

      </div>
    </section>
  );
}
