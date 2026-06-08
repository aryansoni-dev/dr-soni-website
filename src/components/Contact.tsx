import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Send
} from "lucide-react";
import { ADVISOR_INFO } from "../data";
import { saveConsultation } from "../lib/supabase";

interface ContactProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

export default function Contact({ selectedService, setSelectedService }: ContactProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    preferredDate: "",
    preferredTime: "morning",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Synch local selected option when global context changes
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(""); // Clear errors as user types
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setFormError("Please fill in both your full name and phone number so we can request a callback.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      // 1. Store directly in Supabase using the fault-tolerant service helper
      await saveConsultation({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        service: formData.service || "General Inquiry",
        message: formData.message,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        source: "contact_form",
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form save for service
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        service: selectedService || "",
        message: "",
        preferredDate: "",
        preferredTime: "morning",
      });
      // Reset success banner after 8 seconds
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (dbError: any) {
      console.error("Supabase integration error:", dbError);
      setFormError(`Connection issue: Could not record consultation in your Supabase database ('drddmxtnaglvljymavfe'). Please verify that your Supabase tables resemble a schema with columns: full_name, phone, email, and preferred_time.`);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative luxury radial background spotlights */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[100px] pointer-events-none"></div>

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
            SECURE CONFIDENTIAL PORTAL
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
            Establish Your Capital Defense Plan
          </h2>
          <p className="font-sans text-[#3a5278] text-base leading-relaxed max-w-[95%] mx-auto font-medium">
            Reach out to book a strict, confidential discussion. Dr. J Soni will analyze your existing covers, 
            identify blind spots, and propose customized, conflict-free blueprints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Contact Details Column / Left */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Structured Contact Options */}
            <div className="space-y-6">
              
              {/* Phone item */}
              <a 
                href={`tel:${ADVISOR_INFO.phoneRaw}`} 
                className="group flex items-start gap-4 p-4 rounded-lg border border-gold/15 bg-white shadow-premium hover:border-gold/40 hover:bg-cream/20 transition-all duration-300"
              >
                <div className="p-3 bg-gold/10 text-gold rounded-full group-hover:bg-gold group-hover:text-charcoal transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 font-sans">
                    Direct Call Hotline
                  </p>
                  <p className="font-serif font-bold text-base sm:text-lg text-charcoal mt-1 group-hover:text-gold-dark transition-colors">
                    {ADVISOR_INFO.phone}
                  </p>
                  <p className="text-xs text-charcoal/50 mt-0.5 font-sans">Priority call forwarding setup</p>
                </div>
              </a>

              {/* WhatsApp item */}
              <a 
                href={`https://wa.me/91${ADVISOR_INFO.whatsapp}?text=Hello%20Dr.%20Soni,%20I'd%20like%20to%20schedule%20a%20consultation.`} 
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 p-4 rounded-lg border border-gold/15 bg-white shadow-premium hover:border-gold/40 hover:bg-cream/20 transition-all duration-300"
              >
                <div className="p-3 bg-[#25D366]/10 text-emerald-600 rounded-full group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 font-sans">
                    WhatsApp Advisory Line
                  </p>
                  <p className="font-serif font-bold text-base sm:text-lg text-charcoal mt-1 group-hover:text-emerald-600 transition-colors">
                    {ADVISOR_INFO.whatsapp}
                  </p>
                  <p className="text-xs text-charcoal/50 mt-0.5 font-sans">Instantly start a safe chat</p>
                </div>
              </a>

              {/* Email item */}
              <a 
                href={`mailto:${ADVISOR_INFO.email}`} 
                className="group flex items-start gap-4 p-4 rounded-lg border border-gold/15 bg-white shadow-premium hover:border-gold/40 hover:bg-cream/20 transition-all duration-300"
              >
                <div className="p-3 bg-gold/10 text-gold rounded-full group-hover:bg-gold group-hover:text-charcoal transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 font-sans">
                    Official Email Mailbox
                  </p>
                  <p className="font-serif font-medium text-sm sm:text-base text-charcoal mt-1 group-hover:text-gold-dark transition-colors break-all">
                    {ADVISOR_INFO.email}
                  </p>
                  <p className="text-xs text-charcoal/50 mt-0.5 font-sans">Responses within 12 business hours</p>
                </div>
              </a>

            </div>

            {/* Geographical details */}
            <div className="pt-6 border-t border-gold/15 space-y-4">
              <div className="flex items-start gap-3 text-sm text-charcoal/80">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal font-semibold">Location / Office Address:</strong>
                  <p className="mt-0.5 text-charcoal/70 font-sans">{ADVISOR_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-charcoal/80">
                <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal font-semibold">Consultation Hours:</strong>
                  <p className="mt-0.5 text-charcoal/70 font-sans">{ADVISOR_INFO.officeHours}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Form Card / Right */}
          <div className="lg:col-span-7">
            <div className="bg-cream/40 border border-gold/15 p-8 sm:p-10 rounded-lg shadow-premium relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full"></div>
              
              <div className="text-left mb-8">
                <span className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
                  SECURE BOOKING SYSTEM
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
                  Draft Consultation Request
                </h3>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60 font-light mt-1">
                  All requests remain stored securely and strictly confidential.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full name input */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="e.g. Ramesh Singh"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-white text-charcoal text-sm border border-gold/20 focus:border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold transition-all font-sans"
                    />
                  </div>

                  {/* Mobile number input */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                      Mobile Number (India) *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-white text-charcoal text-sm border border-gold/20 focus:border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email address input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. user@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-white text-charcoal text-sm border border-gold/20 focus:border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold transition-all font-sans"
                    />
                  </div>

                  {/* Portfolio category selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                      Required Protection Focus
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-white text-charcoal text-sm border border-gold/20 focus:border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold transition-all appearance-none cursor-pointer font-sans dropdown-white"
                    >
                      <option value="">-- Choose Category --</option>
                      <option value="Life Insurance">Life Insurance Coverage</option>
                      <option value="Health Insurance">Health Insurance Coverage</option>
                      <option value="Retirement Planning">Retirement & Annuity Planning</option>
                      <option value="Family Protection">Comprehensive Family Protection</option>
                      <option value="Wealth Management">Wealth Building Products</option>
                      <option value="Child Future Planning">Child Future & Education Plan</option>
                      <option value="Comprehensive Portfolio Audit">Comprehensive Portfolio Audit</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="preferredDate" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-white text-charcoal text-sm border border-gold/20 focus:border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold transition-all cursor-pointer font-sans"
                    />
                  </div>

                  {/* Time slot preference */}
                  <div className="space-y-1.5">
                    <label htmlFor="preferredTime" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center justify-center h-11 bg-white border border-gold/20 rounded cursor-pointer select-none text-xs hover:border-gold transition-all font-sans">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="morning"
                          checked={formData.preferredTime === "morning"}
                          onChange={handleInputChange}
                          className="mr-2 accent-gold"
                        />
                        <span>Morning (10 - 2)</span>
                      </label>
                      <label className="flex items-center justify-center h-11 bg-white border border-gold/20 rounded cursor-pointer select-none text-xs hover:border-gold transition-all font-sans">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="evening"
                          checked={formData.preferredTime === "evening"}
                          onChange={handleInputChange}
                          className="mr-2 accent-gold"
                        />
                        <span>Evening (2 - 7)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Brief Message Input */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-charcoal/70 uppercase font-sans">
                    Brief Scenario description (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Describe any existing policies or key retirement milestones you plan to achieve..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-charcoal text-sm border border-gold/20 focus:border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold transition-all resize-none font-sans"
                  ></textarea>
                </div>

                {/* Inline Error messages instead of popups */}
                <AnimatePresence>
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-red-50 border border-red-100 text-red-800 text-xs rounded font-medium flex items-center gap-2 mb-4 font-sans"
                    >
                      <span>{formError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action Button with premium navy-to-gold glowing transition effect & border expansion effect */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-12 min-h-[48px] rounded font-sans text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 btn-premium-border select-none ${
                    isSubmitting
                      ? "bg-navy/50 cursor-not-allowed text-white/50"
                      : "bg-navy hover:bg-gold text-white hover:text-charcoal border border-navy hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-[1.01] cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying & Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 ml-1" />
                      <span>Request Priority Callback</span>
                    </>
                  )}
                </button>
              </form>

              {/* Status Indicator Success Toast */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="mt-6 p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif font-bold text-sm">Consultation Reserved Successfully</p>
                      <p className="font-sans text-xs mt-1 text-emerald-700 leading-relaxed font-light">
                        Dr. J Soni’s desk has received your scenario. A representative will contact you via mobile 
                        within the next few hours to confirm your premium appointment details.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
