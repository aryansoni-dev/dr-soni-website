import { motion } from "motion/react";
import { Award, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { ADVISOR_INFO } from "../data";

export default function About() {
  const credentials = [
    {
      icon: Award,
      title: "Certified Life Advisor",
      desc: "Recognized industry standard for wealth & life safety systems."
    },
    {
      icon: Briefcase,
      title: "15+ Years Experience",
      desc: "Guiding diverse portfolios for corporate leaders and families."
    },
    {
      icon: GraduationCap,
      title: "Academic Background",
      desc: "Earned Doctorate of deep research expertise & master consulting credentials."
    }
  ];

  const corePillars = [
    "Inflation-Resistant Long-Term Growth",
    "Absolute Confidentiality & Dedicated Focus",
    "Pre-Vetted Claim Processing Oversight",
    "Direct Channel Partnership Priority Service"
  ];

  return (
    <section id="about" className="py-20 bg-cream/30 border-b border-gold/10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Heading: centered with 3px gold decorative line above */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="w-10 h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded"></div>
          <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
            MEET THE ADVISOR
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy">
            Biography Profile
          </h2>
          <p className="text-base sm:text-lg font-serif italic text-gold-dark font-medium">
            {ADVISOR_INFO.title}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Visual Column / Left */}
          <div className="relative pb-6 md:pb-0">
            <div className="relative rounded overflow-hidden shadow-premium border border-gold/15 bg-white p-4">
              <img
                src="https://res.cloudinary.com/dsi5y6qfd/image/upload/v1780375526/pexels-rdne-7821913_b0hmw1.jpg"
                alt="Dr. J Soni reviewing Kotak Life and Care Health insurance options with a corporate client"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover rounded shadow hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
            </div>

            {/* Overlapping Floating badge - highly responsive positions */}
            <div className="absolute bottom-1 right-2 md:-right-6 md:-bottom-6 bg-navy text-white p-4 md:p-6 rounded shadow-premium border border-gold/20 max-w-[230px] sm:max-w-[280px]">
              <p className="font-serif text-2xl md:text-3xl font-bold text-gold">15+</p>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/70 font-semibold mt-1">
                Years of Strategic Advisory Care
              </p>
              <p className="text-[11px] md:text-xs text-white/50 mt-1 md:mt-2 leading-relaxed">
                Empowering individuals in Gurugram, Delhi NCR, and beyond to build unshakeable core plans.
              </p>
            </div>
          </div>

          {/* Text Content Column / Right */}
          <div className="flex flex-col space-y-6 text-left mt-8 lg:mt-0">
            <div className="font-sans text-[#3a5278] space-y-4 text-sm sm:text-base leading-[1.7] font-light">
              <p>
                Dr. J Soni is a distinguished life advisor, author, and premium insurance consultant dedicated to 
                curating robust safety architectures for high-net-worth individuals, young professionals, and legacy families. 
                With an elite 15-year record of execution, Dr. Soni operates at the intersection of systematic risk minimization 
                and comprehensive multi-generational wealth safety.
              </p>
              <p>
                As a senior authorized channel partner of both <strong className="text-navy font-semibold">Kotak Life Insurance</strong> 
                and <strong className="text-navy font-semibold">Care Health Insurance</strong>, Dr. Soni bridges the institutional gap, 
                granting clients priority underwriting pipelines, customized insurance structures, and pre-vetted claim processing oversight.
              </p>
            </div>


            {/* Credentials / Grid Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {credentials.map((cred, index) => {
                const IconComponent = cred.icon;
                return (
                  <div 
                    key={index} 
                    className="p-4 rounded bg-white border border-gold/10 hover:border-gold/30 transition-all shadow-premium flex flex-col items-start text-left"
                  >
                    <div className="p-2 rounded bg-gold/10 text-gold mb-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <p className="font-serif font-bold text-sm text-charcoal">{cred.title}</p>
                    <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{cred.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Core pillars checklist */}
            <div className="pt-6 border-t border-gold/10 space-y-3">
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 font-bold">
                OUR FIDUCIARY PILLARS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {corePillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-charcoal/90">
                    <CheckCircle2 className="w-4.5 h-4.5 text-gold flex-shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
