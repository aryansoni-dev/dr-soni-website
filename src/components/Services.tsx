import { ComponentType } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  HeartPulse, 
  TrendingUp, 
  Users, 
  Briefcase, 
  GraduationCap,
  ArrowUpRight
} from "lucide-react";
import { SERVICES } from "../data";

const iconMap: { [key: string]: ComponentType<{ className?: string }> } = {
  ShieldCheck,
  HeartPulse,
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
};

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  
  const handleServiceClick = (serviceTitle: string) => {
    onSelectService(serviceTitle);
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[30%] left-[-10%] w-[30%] h-[30%] rounded-full bg-gold/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Header Block: centered with 3px gold decorative line above */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="w-10 h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded"></div>
          <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
            INTELLIGENT WEALTH SECURITY
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Bespoke Portfolios & Insurances
          </h2>
          <p className="font-sans text-white/70 font-light text-base leading-[1.7] max-w-[90%] mx-auto">
            Protect your life quality, manage tax efficiency, and shield descendants from volatility. 
            Dr. J Soni works client-by-client to build guaranteed, rock-solid structures.
          </p>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || ShieldCheck;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleServiceClick(service.title)}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:-translate-y-2 hover:border-t-2 hover:border-t-gold rounded p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left shadow-premium hover:shadow-[0_15px_30px_rgba(212,175,55,0.08)]"
              >
                {/* Micro accent light */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>

                <div>
                  {/* Icon Block */}
                  <div className="p-3.5 rounded bg-gold/10 text-gold w-fit mb-6 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-white tracking-wide group-hover:text-gold transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-white/65 font-light mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Call to action arrow link */}
                <div className="flex items-center gap-2 mt-8 text-xs font-semibold text-gold group-hover:text-white uppercase tracking-widest transition-colors duration-300">
                  <span>Enquire Advisory</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick action footer block */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-white/50">
            Unsure which protection model matches your scenario?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleServiceClick("Comprehensive Portfolio Audit");
              }}
              className="text-gold border-b border-gold/30 hover:border-gold pb-0.5 transition-colors font-medium ml-1"
            >
              Request a Comprehensive Portfolio Audit →
            </a>
          </p>
        </div>

      </motion.div>
    </section>
  );
}
