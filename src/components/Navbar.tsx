import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { ADVISOR_INFO } from "../data";

export default function Navbar({ onOpenConsultModal }: { onOpenConsultModal?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Automatically sync active nav state during scroll
      const sections = ["#home", "#about", "#services", "#partners", "#testimonials", "#contact"];
      for (const section of sections) {
        const el = document.querySelector(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top occupies the main trigger viewport threshold
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Partners", href: "#partners" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavbarButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onOpenConsultModal) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      onOpenConsultModal();
    } else {
      handleLinkClick(e, "#contact");
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-navy/95 backdrop-blur-md shadow-lg border-b border-gold/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-md shadow-gold/20 flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="font-serif text-charcoal font-bold text-xl tracking-tight">JS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl text-white tracking-wide group-hover:text-gold transition-colors duration-200">
                {ADVISOR_INFO.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-medium">
                Life Advisor & Consultant
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav role="navigation" aria-label="Primary Desktop Navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-sans text-sm font-medium transition-all duration-200 relative group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm ${
                    isActive ? "text-gold" : "text-white/80 hover:text-gold"
                  }`}
                >
                  {link.name}
                  {/* Underline helper */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
          </nav>

          {/* CTAs (Visible on desktop + tablet md and up) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Hidden on md, shown on lg */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${ADVISOR_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-sm text-white hover:text-gold font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm"
                aria-label={`Call Dr. Soni at ${ADVISOR_INFO.phone}`}
              >
                <Phone className="w-4 h-4 text-gold animate-pulse" />
                <span>{ADVISOR_INFO.phone}</span>
              </a>
              <a
                href="#contact"
                onClick={handleNavbarButtonClick}
                className="px-5 py-2 rounded bg-navy text-white hover:bg-gold hover:text-charcoal font-sans text-sm font-semibold tracking-wide border border-gold/30 hover:border-gold transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy btn-premium-border"
              >
                Book Advisory
              </a>
            </div>
          </div>

          {/* Mobile Hamburguer Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${ADVISOR_INFO.phoneRaw}`}
              className="w-12 h-12 flex items-center justify-center text-gold hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-full"
              aria-label="Call Dr. Soni"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 flex items-center justify-center text-white hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-full"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 md:hidden bg-navy border-b border-gold/10 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-3.5 text-base font-medium rounded transition-all duration-200 min-h-[48px] flex items-center ${
                    activeSection === link.href
                      ? "bg-gold/10 text-gold font-semibold"
                      : "text-white/95 hover:bg-gold/10 hover:text-gold"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 px-4 space-y-4">
                <div className="flex items-center gap-3 text-white/80 min-h-[44px]">
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="font-medium text-sm">{ADVISOR_INFO.phone}</span>
                </div>
                <a
                  href="#contact"
                  onClick={handleNavbarButtonClick}
                  className="w-full h-12 flex items-center justify-center rounded bg-gold hover:bg-gold-light text-charcoal font-semibold tracking-wide transition-all shadow-md active:scale-95"
                >
                  Consult Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
