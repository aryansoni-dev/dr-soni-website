import { useState, MouseEvent, FormEvent } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { ADVISOR_INFO } from "../data";
import { saveSubscriber } from "../lib/supabase";

export default function Footer() {
  const currentYear = 2026;
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const quickLinks = [
    { name: "Top Focus", href: "#home" },
    { name: "Biography Profile", href: "#about" },
    { name: "Offered Services", href: "#services" },
    { name: "Corporate Partners", href: "#partners" },
    { name: "Client Reviews", href: "#testimonials" },
    { name: "Book Consultation", href: "#contact" },
  ];

  const handleScrollClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Store in Supabase Subscribers list (safely handles missing tables)
    try {
      await saveSubscriber(email);
    } catch (sbErr) {
      console.warn("Could not save to Supabase subscribers list:", sbErr);
    }

    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-navy text-white pt-20 pb-10 border-t border-gold/20 relative overflow-hidden">
      {/* Structural ambient details */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Bio and brand */}
          <div className="md:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-charcoal font-bold text-lg select-none">
                JS
              </div>
              <div>
                <p className="font-serif font-bold text-xl text-white tracking-wide">{ADVISOR_INFO.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">
                  {ADVISOR_INFO.title}
                </p>
              </div>
            </div>

            <p className="font-sans text-white/75 font-light text-sm leading-relaxed max-w-sm">
              "{ADVISOR_INFO.tagline}"
            </p>

            <div className="space-y-1.5 text-xs text-white/50">
              <p className="font-semibold text-gold tracking-wider uppercase text-[10px]">Senior Channel Partner:</p>
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <span className="text-white/80">Kotak Life Insurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <span className="text-white/80">Care Health Insurance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Fast navigation links */}
          <div className="md:col-span-2 space-y-6 text-left">
            <h4 className="font-serif text-base font-bold text-white tracking-wide border-b border-gold/10 pb-2 uppercase text-xs">
              Explore Portal
            </h4>
            <ul className="grid grid-cols-1 gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollClick(e, link.href)}
                    className="font-sans text-sm text-white/70 hover:text-gold transition-colors block py-0.5 selection:bg-gold/30"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct reach options */}
          <div className="md:col-span-3 space-y-6 text-left">
            <h4 className="font-serif text-base font-bold text-white tracking-wide border-b border-gold/10 pb-2 uppercase text-xs">
              Direct Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80 font-light leading-relaxed">
                  <strong className="text-white block font-medium">Office Address:</strong>
                  {ADVISOR_INFO.location}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80 font-light leading-relaxed">
                  <strong className="text-white block font-medium">Telephone Hotline:</strong>
                  <a href={`tel:${ADVISOR_INFO.phoneRaw}`} className="hover:text-gold transition-colors block mt-0.5 font-medium">
                    {ADVISOR_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4.5 h-4.5 text-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80 font-light leading-relaxed">
                  <strong className="text-white block font-medium">Secure Email:</strong>
                  <a href={`mailto:${ADVISOR_INFO.email}`} className="hover:text-gold transition-colors break-all block mt-0.5 font-medium">
                    {ADVISOR_INFO.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="md:col-span-3 space-y-6 text-left">
            <h4 className="font-serif text-base font-bold text-white tracking-wide border-b border-gold/10 pb-2 uppercase text-xs">
              Advisor Insights
            </h4>
            <div className="space-y-3.5">
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                Subscribe to receive elite strategies on tax benefits, inflation control, estate safeguarding, and medical pool designs.
              </p>

              {isSubscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg flex items-start gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold">Subscription Confirmed</p>
                    <p className="mt-0.5 opacity-85">You are now registered for premium insurance tips.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2 mt-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter legal email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-sans bg-white/5 border border-white/10 rounded-lg placeholder-white/30 text-white pl-3.5 pr-10 py-3.5 focus:border-gold focus:outline-none transition-all focus:ring-1 focus:ring-gold"
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-all duration-300 cursor-pointer"
                      aria-label="Submit Email ID"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs py-3 rounded-lg uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer btn-premium-border"
                  >
                    Get Insurance Tips
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar containing legal and copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light">
          <p className="text-center sm:text-left">
            © {currentYear} {ADVISOR_INFO.name}. All Rights Reserved. Coordinated in Gurugram, India.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-gold/50 font-normal">IRDAI Certified Insurance Agent</span>
            <span>Confidentiality Guaranteed</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
