import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Award, Globe, ArrowRight } from "lucide-react";

interface PartnersProps {
  onOpenConsultModal?: () => void;
}

export default function Partners({ onOpenConsultModal }: PartnersProps) {
  // Smooth scroll helper fallback
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (onOpenConsultModal) {
      onOpenConsultModal();
    } else {
      const contactSec = document.getElementById("contact");
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="partners" className="py-20 bg-cream relative overflow-hidden border-b border-gold/15">
      {/* Decorative premium vector frames */}
      <div className="absolute top-0 right-0 w-80 h-80 border-r border-t border-gold/10 rounded-tr-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 border-l border-b border-gold/10 rounded-bl-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =======================================================
            HEADER BLOCK (Section Heading & Authoritative Sub-heading)
            ======================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="w-10 h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded"></div>
          <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
            Authorised Distribution Portfolio
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy">
            Our Trusted Partners
          </h2>
          <p className="font-sans text-[#3a5278] text-base leading-relaxed max-w-[95%] mx-auto font-medium">
            As an authorised channel partner, Dr. J Soni brings you access to India's most trusted insurance providers.
          </p>
        </div>

        {/* =======================================================
            TWO LARGE, PREMIUM SIDE-BY-SIDE PARTNER CARDS
            ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20">
          
          {/* Card 1: Kotak Life Insurance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="group bg-white border border-gold/15 rounded-xl p-8 sm:p-10 shadow-premium relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] hover:border-gold/40 transition-all duration-300"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-dark to-gold"></div>

            <div>
              {/* Brand Logo */}
              <div className="mb-6 flex justify-start">
                <div className="h-14 flex items-center justify-start select-none bg-white p-2 border border-gold/15 rounded-lg shadow-sm">
                  <img
                    src="https://res.cloudinary.com/dsi5y6qfd/image/upload/v1780375399/Untitled_design_etzaqy.png"
                    alt="Kotak Life Insurance Authorized Channel Partner Logo"
                    className="h-full object-contain max-w-[240px] rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Title & Subtitle Wrapper */}
              <div className="text-left mb-4">
                <span className="inline-block px-3 py-1 rounded bg-[#7e1718]/10 text-[#a12023] text-xs font-bold font-sans uppercase tracking-widest mb-2">
                  Channel Partner
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Kotak Life Insurance
                </h3>
              </div>

              {/* Short Description */}
              <p className="font-sans text-sm sm:text-base text-charcoal/85 font-light leading-relaxed mb-6 text-left">
                Term life, endowment, ULIPs, and child plans designed to empower individuals with tax benefits, critical protector riders, and long-term capital stability.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#3a5278] font-medium">99.13% Industry-best claims clearing support</span>
                </div>
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#3a5278] font-medium">Inflation-fighting guaranteed cash benefits</span>
                </div>
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#3a5278] font-medium">Custom high-net-worth estate preservation modules</span>
                </div>
              </div>
            </div>

            {/* Learn More → Gold Link */}
            <div className="pt-4 border-t border-gold/10 flex justify-between items-center">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 group/btn text-gold-dark hover:text-gold font-sans text-sm font-bold tracking-wider uppercase transition-all focus-visible:outline-none focus:ring-1 focus:ring-gold rounded cursor-pointer"
                aria-label="Learn more about Kotak Life Insurance with Dr. Soni"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
              </button>
              <span className="text-[10px] text-charcoal/40 font-mono">AUTHORIZED PARTNER ID: KLI70020705</span>
            </div>
          </motion.div>

          {/* Card 2: Care Health Insurance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group bg-white border border-gold/15 rounded-xl p-8 sm:p-10 shadow-premium relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] hover:border-gold/40 transition-all duration-300"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-dark to-gold"></div>

            <div>
              {/* Brand Logo */}
              <div className="mb-6 flex justify-start">
                <div className="h-14 flex items-center justify-start select-none bg-white p-2 border border-gold/15 rounded-lg shadow-sm">
                  <img
                    src="https://res.cloudinary.com/dsi5y6qfd/image/upload/v1780339201/care-health-insurance_tufzy5.webp"
                    alt="Care Health Insurance Authorized Channel Partner Logo"
                    className="h-full object-contain max-w-[240px] rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Title & Subtitle Wrapper */}
              <div className="text-left mb-4">
                <span className="inline-block px-3 py-1 rounded bg-[#008188]/10 text-[#008188] text-xs font-bold font-sans uppercase tracking-widest mb-2">
                  Channel Partner
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Care Health Insurance
                </h3>
              </div>

              {/* Short Description */}
              <p className="font-sans text-sm sm:text-base text-charcoal/85 font-light leading-relaxed mb-6 text-left">
                Individual, family floater, top-up, and senior plans configured to defend health savings from intensive treatments, inflation, and global critical diagnoses.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#3a5278] font-medium">Over 24,800+ cash-free network hospital channels</span>
                </div>
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#3a5278] font-medium">Guaranteed lifetime renewability & bonus cushions</span>
                </div>
                <div className="flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-[#3a5278] font-medium">Instant cashless claim sanctioning online</span>
                </div>
              </div>
            </div>

            {/* Learn More → Gold Link */}
            <div className="pt-4 border-t border-gold/10 flex justify-between items-center">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 group/btn text-gold-dark hover:text-gold font-sans text-sm font-bold tracking-wider uppercase transition-all focus-visible:outline-none focus:ring-1 focus:ring-gold rounded cursor-pointer"
                aria-label="Learn more about Care Health Insurance with Dr. Soni"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
              </button>
              <span className="text-[10px] text-charcoal/40 font-mono">AUTHORIZED PARTNER ID: 20989795</span>
            </div>
          </motion.div>

        </div>

        {/* =======================================================
            "WHY OUR PARTNERS?" TRUST BLOCK
            ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-navy border border-gold/25 rounded-2xl p-8 sm:p-12 max-w-5xl mx-auto shadow-premium relative overflow-hidden"
        >
          {/* Subtle luxurious background map texture or pattern */}
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none"></div>

          <div className="relative z-10 text-center">
            <span className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
              Why Our Partners?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mt-2 mb-10">
              Institutional Strengths Behind Your Policies
            </h3>

            {/* Grid of 3 trust points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-6">
              
              {/* Trust Point 1: Claim settlement ratio */}
              <div className="space-y-3.5 border-l border-gold/10 pl-6 relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white tracking-wider">
                  Claim Settlement Ratio
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                  Industry-leading claim clearance benchmarks (99%+ for Kotak Life), ensuring families face zero operational stress during hard moments.
                </p>
                <span className="text-[10px] font-mono text-gold/50 block font-semibold font-sans">UPDATED F.Y. 2024-2025</span>
              </div>

              {/* Trust Point 2: Award-winning plans */}
              <div className="space-y-3.5 border-l border-gold/10 pl-6 relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white tracking-wider">
                  Award-Winning Plans
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                  Direct underwritings designed around premier corporate and family templates that are recognized globally for comprehensive inflation resistance.
                </p>
                <span className="text-[10px] font-mono text-gold/50 block font-semibold font-sans">IRDAI COMPLIANT DESIGNS</span>
              </div>

              {/* Trust Point 3: Pan-India network */}
              <div className="space-y-3.5 border-l border-gold/10 pl-6 relative">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/25 flex items-center justify-center text-gold">
                  <Globe className="w-5.5 h-5.5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white tracking-wider">
                  Pan-India Network
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                  Access over 24,800+ cashless healthcare facilities and local branch assistance centers everywhere in India, ensuring instantaneous utility.
                </p>
                <span className="text-[10px] font-mono text-gold/50 block font-semibold font-sans">100% SECURED ROUTING</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
