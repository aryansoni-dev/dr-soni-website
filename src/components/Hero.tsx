import { MouseEvent, useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ADVISOR_INFO } from "../data";

// Self-contained scroll-activated animated count-up counter component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1200; // 1.2s counting period
          const stepTime = 16; // approx 60fps
          const increment = value / (duration / stepTime);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [value]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Hero({ onOpenConsultModal }: { onOpenConsultModal?: () => void }) {
  const { scrollY } = useScroll();
  
  // Parallax transform effect on the background and text wrapper elements
  const bgY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroContentY = useTransform(scrollY, [0, 800], [0, -40]);

  const handlerScrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHeroButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onOpenConsultModal) {
      e.preventDefault();
      onOpenConsultModal();
    } else {
      handlerScrollTo(e, "#contact");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-navy text-white pt-24 lg:pt-32 flex flex-col justify-between overflow-hidden"
    >
      {/* 1. Cinematic Ken Burns zoom background image layer */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] mix-blend-color-dodge scale-102"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1800')"
          }}
        />
      </motion.div>

      {/* 2. Dark gradient overlay (bottom 60% darkens to 85% opacity) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.85) 60%, rgba(15, 23, 42, 0.15) 100%)"
        }}
      ></div>

      {/* 3. Minimal floating particle dots (like stars) — very minimal, opacity 0.15 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-15" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${12 + (i * 7) % 78}%`,
              left: `${8 + (i * 11) % 84}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: 6 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Parallax layered diagonal geometric pattern in the background (very subtle, navy tones) */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none select-none opacity-30 overflow-hidden"
      >
        {/* Layered Diagonal Lines & Polygons */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[150%] h-[150%] rounded-none border-[1px] border-gold/5 rotate-12 transform-gpu"></div>
        <div className="absolute top-1/3 -left-1/3 w-[150%] h-[150%] rounded-none border-[1.5px] border-white/5 rotate-45 transform-gpu"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gold/10 blur-[130px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-navy-light/40 blur-[120px]"></div>
      </motion.div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none mix-blend-overlay"></div>

      <motion.div 
        style={{ y: heroContentY }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center py-10 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Text Content column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start max-w-[95%] md:max-w-none mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs sm:text-sm font-semibold tracking-wide w-fit uppercase"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>IRDAI Certified Professional Advisor</span>
            </motion.div>

            {/* 4. Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-[32px] leading-[1.15] sm:text-5xl md:text-[54px] lg:text-[72px] lg:leading-[1.1] font-extrabold tracking-[-0.02em] text-white max-w-[95%] md:max-w-none"
            >
              Your Trusted Guide to a Secure Future
            </motion.h1>

            {/* 5. Horizontal gold divider line between headline and subheadline */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light my-2 rounded-full mx-auto lg:mx-0"
            ></motion.div>

            {/* Subheadline matching description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-sm sm:text-base md:text-lg text-gold/90 font-semibold tracking-widest max-w-[90%] md:max-w-xl leading-relaxed uppercase"
            >
              Life & Health Insurance | Retirement Planning | Family Protection
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 pt-4 w-full md:w-auto px-4 md:px-0"
            >
              {/* 6a. Primary (filled gold) button */}
              <a
                href="#contact"
                onClick={handleHeroButtonClick}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-lg bg-gold text-charcoal hover:bg-gold-light font-sans text-base font-bold tracking-wide border border-gold hover:border-gold-light transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] w-full md:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy btn-premium-border"
                aria-label="Book a Free Consultation with Dr. Soni"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* 6b. Secondary (outline white) button */}
              <a
                href="#services"
                onClick={(e) => handlerScrollTo(e, "#services")}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 text-white font-sans text-base font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] w-full md:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy btn-premium-border"
                aria-label="Explore Our Insurance and Retirement Planning Services"
              >
                <span>Explore Our Services</span>
              </a>
            </motion.div>

            {/* Micro gold gradient accent decoration */}
            <div className="h-[2px] w-12 bg-gradient-to-r from-gold via-gold-light to-transparent mt-4"></div>
          </div>

          {/* Aesthetic portrait placeholder column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[380px] aspect-[4/5] rounded bg-white/5 p-3 border border-white/10 backdrop-blur-sm shadow-2xl"
            >
              {/* Gold frame corner deco */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold -mt-1 -ml-1"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold -mt-1 -mr-1"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold -mb-1 -ml-1"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold -mb-1 -mr-1"></div>

              <div className="w-full h-full rounded overflow-hidden relative group bg-navy">
                {/* Img of professional life advisor */}
                <img
                  src="https://res.cloudinary.com/dsi5y6qfd/image/upload/v1780506294/Untitled_design_rvwb2x.png"
                  alt="Dr. J Soni, certified Life Advisor and Professional Insurance Consultant in Gurugram, India"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-85"></div>

                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <p className="font-serif font-bold text-xl text-white tracking-wide">{ADVISOR_INFO.name}</p>
                  <p className="text-xs text-gold tracking-widest uppercase font-medium mt-0.5">
                    {ADVISOR_INFO.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Trust Element: Achievement Strip with 4 animated counters */}
      <div className="bg-navy-light/80 border-y border-gold/15 py-10 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col space-y-1">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold">
                <AnimatedCounter value={300} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm font-sans font-semibold text-white/80 tracking-wide uppercase">
                Families Protected
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold">
                <AnimatedCounter value={15} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm font-sans font-semibold text-white/80 tracking-wide uppercase">
                Years Experience
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold">
                <AnimatedCounter value={50} prefix="₹" suffix="Cr+" />
              </span>
              <span className="text-xs sm:text-sm font-sans font-semibold text-white/80 tracking-wide uppercase">
                Cover Placed
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold">
                <AnimatedCounter value={2} />
              </span>
              <span className="text-xs sm:text-sm font-sans font-semibold text-white/80 tracking-wide uppercase">
                Trusted Partners
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Trusted Partner Strip */}
      <div className="bg-navy border-b border-gold/10 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-semibold font-sans">
              Authorized Business Channel Partner
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {/* Kotak Life Insurance partner item */}
              <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold font-serif font-bold text-base">
                  K
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white tracking-wide font-serif">KOTAK LIFE</p>
                  <p className="text-[9px] uppercase tracking-widest text-gold font-medium">Channel Partner</p>
                </div>
              </div>

              {/* Care Health Insurance partner item */}
              <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold font-serif font-bold text-base">
                  C
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white tracking-wide font-serif">CARE HEALTH</p>
                  <p className="text-[9px] uppercase tracking-widest text-gold font-medium">Channel Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
