import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, MessageCircle, ArrowUp, Send, CheckCircle, ShieldCheck } from "lucide-react";
import { ADVISOR_INFO } from "../data";
import { saveConsultation } from "../lib/supabase";

interface InteractiveFeaturesProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function InteractiveFeatures({ isOpen, onClose, onOpen }: InteractiveFeaturesProps) {
  const [scrollYValue, setScrollYValue] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Form states inside the Consultation Modal
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    interest: "Both",
    preferredTime: "Morning",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Monitor screen scroll position for triggers
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollYValue(currentScroll);

      // Mobile check (under 768px matches mobile sticky layout)
      const isMobile = window.innerWidth < 768;

      setShowStickyCTA(isMobile && currentScroll > 600);
      setShowBackToTop(currentScroll > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to initialize state correctly
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleModalSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Field Validations
    if (!formData.fullName.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Phone Number is required.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid Email address.");
      return;
    }
    if (!formData.city.trim()) {
      setFormError("City is required.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      // 1. Database Storage inside Supabase
      await saveConsultation({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        service: formData.interest,
        preferredTime: formData.preferredTime,
        source: "modal_popup"
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        interest: "Both",
        preferredTime: "Morning",
      });
    } catch (dbError: any) {
      console.error("Supabase submission error:", dbError);
      setFormError(`Database error: Could not record consultation in Supabase ('drddmxtnaglvljymavfe'). Make sure that you have added a 'consultations', 'bookings', or 'leads' table.`);
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Close success state & reset modal
  const handleCloseModal = () => {
    onClose();
    // Delay resetting success state slightly for beautiful transition
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormError("");
    }, 300);
  };

  return (
    <>
      {/* =======================================================
          1. FLOATING WHATSAPP BUTTON WITH PULSE AND TOOLTIP
          ======================================================= */}
      <div
        className={`fixed z-45 transition-all duration-300 ${
          showStickyCTA 
            ? "bottom-24 right-4 md:bottom-8 md:right-8" 
            : "bottom-6 right-4 md:bottom-8 md:right-8"
        }`}
      >
        <div className="relative group">
          {/* Pulse Concentric Outer Rings (WhatsApp green) */}
          <span className="absolute -inset-2 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none duration-1000"></span>
          <span className="absolute -inset-4 rounded-full bg-[#25D366]/10 animate-pulse pointer-events-none duration-1500"></span>

          {/* Core Green Anchor Key Button */}
          <a
            href="https://wa.me/919098820694?text=Hi%20Dr.%20Soni!%20I%27d%20like%20to%20discuss%20insurance%20options."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            onClick={() => setTooltipVisible(false)}
            className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 border border-[#25D366] cursor-pointer"
            aria-label="Chat with Dr. Soni on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
          </a>

          {/* CSS/HTML Hover Tooltip */}
          <AnimatePresence>
            {(tooltipVisible || tooltipVisible) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-navy border border-gold/40 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-2xl whitespace-nowrap hidden sm:block select-none pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Chat with Dr. Soni</span>
                </div>
                {/* Micro tooltip arrow pointing right */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-6 border-y-transparent border-l-6 border-l-navy"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =======================================================
          2. SCROLL BACK TO TOP BUTTON
          ======================================================= */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={scrollToTop}
            className={`fixed z-45 w-12 h-12 rounded-full bg-navy border-2 border-gold text-gold hover:bg-gold hover:text-charcoal shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer flex items-center justify-center ${
              showStickyCTA 
                ? "bottom-24 right-20 md:bottom-28 md:right-8" 
                : "bottom-6 right-20 md:bottom-28 md:right-8"
            }`}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 font-bold" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =======================================================
          3. SCROLL-ACTIVATED MOBILE STICKY CTA BAR (MOBILE ONLY)
          ======================================================= */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-48 bg-navy/95 border-t border-gold/25 backdrop-blur-md px-4 py-3.5 flex items-center justify-center shadow-[0_-8px_30px_rgba(0,0,0,0.3)] md:hidden pointer-events-auto"
          >
            <button
              onClick={onOpen}
              className="w-full h-12 min-h-[48px] bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-bold rounded-lg text-sm tracking-wider uppercase shadow-[0_4px_15px_rgba(212,175,55,0.35)] active:scale-98 transition-all hover:brightness-105 flex items-center justify-center gap-2 cursor-pointer border border-gold"
            >
              <span>📞 Book Free Consultation</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================
          4. FREE CONSULTATION DIALOG MODAL
          ======================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-navy/75 backdrop-blur-md pointer-events-auto"
            />

            {/* Modal Box Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-navy border-2 border-gold rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.15)] overflow-hidden z-20 pointer-events-auto flex flex-col my-auto"
            >
              {/* Premium Luxury Gold Top Strip Accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"></div>

              {/* Modal Core Contents */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col relative">
                
                {/* Secure Close button (Requires min 48px target tap size) */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:text-gold hover:bg-white/10 active:scale-90 transition-all border border-white/5 hover:border-gold/30 cursor-pointer z-20"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Switch view if success submitted */}
                {!submitSuccess ? (
                  <>
                    {/* Header */}
                    <div className="text-left mb-6 max-w-[85%]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-gold" />
                        <span className="text-[10px] text-gold uppercase tracking-widest font-bold">
                          100% Confidential Request
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                        Book Free Consultation
                      </h3>
                      <p className="font-sans text-xs text-white/60 mt-1 leading-relaxed">
                        Customize protective wealth, retirement policies, and critical care benchmarks securely.
                      </p>
                    </div>

                    {/* Inline Form Error Handler */}
                    <AnimatePresence>
                      {formError && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-300 text-xs font-semibold"
                        >
                          {formError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Input Forms */}
                    <form onSubmit={handleModalSubmit} className="space-y-4 text-left">
                      
                      {/* Name Row */}
                      <div>
                        <label htmlFor="modal-name" className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="modal-name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-4 h-11 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans placeholder-white/30"
                          required
                        />
                      </div>

                      {/* Phone & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="modal-phone" className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="modal-phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. 98100 XXXXX"
                            className="w-full px-4 h-11 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans placeholder-white/30"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="modal-email" className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="modal-email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. ramesh@example.com"
                            className="w-full px-4 h-11 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans placeholder-white/30"
                            required
                          />
                        </div>
                      </div>

                      {/* City & Preferred Call Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="modal-city" className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            id="modal-city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Gurugram"
                            className="w-full px-4 h-11 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans placeholder-white/30"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="modal-time" className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                            Preferred Call Time
                          </label>
                          <select
                            id="modal-time"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="w-full px-3 h-11 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans cursor-pointer dropdown-dark"
                          >
                            <option value="Morning" className="bg-navy text-white">Morning (9 AM - 12 PM)</option>
                            <option value="Afternoon" className="bg-navy text-white">Afternoon (12 PM - 4 PM)</option>
                            <option value="Evening" className="bg-navy text-white font-medium">Evening (4 PM - 8 PM)</option>
                            <option value="AnyTime" className="bg-navy text-white">Any Time (Flexible)</option>
                          </select>
                        </div>
                      </div>

                      {/* Insurance Interest Dropdown selection */}
                      <div>
                        <label htmlFor="modal-interest" className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                          Insurance Interest
                        </label>
                        <select
                          id="modal-interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          className="w-full px-3 h-11 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans cursor-pointer dropdown-dark"
                        >
                          <option value="Life" className="bg-navy text-white">Life Insurance (Kotak Life Plans)</option>
                          <option value="Health" className="bg-navy text-white">Health Insurance (Care Health Covers)</option>
                          <option value="Both" className="bg-navy text-white font-semibold">Both Life & Health Protection</option>
                          <option value="Retirement" className="bg-navy text-white">Retirement Asset Planning</option>
                        </select>
                      </div>

                      {/* Modal Footer submit button (Min 48px target zone) */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full h-12 min-h-[48px] rounded font-semibold font-sans uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 mt-6 ${
                          isSubmitting
                            ? "bg-navy-light/50 text-white/50 cursor-not-allowed border border-white/10"
                            : "bg-gold text-charcoal hover:bg-gold-light border border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-100 hover:scale-[1.02] cursor-pointer"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div>
                            <span>Logging Secure Intake...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Call Back</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Form Submitted Success View */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <CheckCircle className="w-16 h-16 text-gold mb-5 animate-pulse" />
                    
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                      Thank you!
                    </h3>
                    
                    <p className="font-sans text-white/85 text-[15px] font-medium leading-relaxed mt-3 max-w-[320px]">
                      We will connect with you within 24 hours.
                    </p>

                    <p className="font-sans text-xs text-white/50 mt-1">
                      A confirmation has been routed safely to our desk.
                    </p>

                    {/* OK button to dismiss (Min 48px target) */}
                    <button
                      onClick={handleCloseModal}
                      className="mt-8 h-12 min-h-[48px] px-8 rounded bg-navy-light/40 hover:bg-gold hover:text-charcoal border border-gold/40 text-gold font-bold tracking-wide transition-all uppercase text-xs cursor-pointer active:scale-95 flex items-center justify-center"
                    >
                      Dismiss View
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
