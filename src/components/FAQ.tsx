import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the difference between Kotak Life and Care Health Insurance?",
    answer: "Kotak Life covers life risk (term, endowment, ULIP), while Care Health covers medical expenses for you and your family. Both are essential for complete protection."
  },
  {
    question: "How do I choose the right life insurance plan?",
    answer: "We analyse your income, dependents, liabilities, and goals before recommending a plan — always tailored to your specific situation."
  },
  {
    question: "Is a free consultation really free?",
    answer: "Yes, completely. There is no obligation to buy anything during the consultation."
  },
  {
    question: "Can I get insurance for my parents as well?",
    answer: "Yes. Care Health Insurance offers dedicated senior and family floater plans that can include parents up to age 65."
  },
  {
    question: "How long does the insurance buying process take?",
    answer: "Most policies are issued within 2–5 working days after documentation is complete."
  },
  {
    question: "What documents do I need to get started?",
    answer: "Typically Aadhaar, PAN card, recent passport photo, and income proof. We guide you through the exact requirements for your chosen plan."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-cream/30 relative overflow-hidden border-b border-gold/15">
      {/* Premium subtle background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%) pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block: centered with 3px gold decorative line above */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="w-10 h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light mx-auto rounded"></div>
          <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">
            HAVE QUESTIONS?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-[#3a5278] text-base leading-relaxed max-w-[95%] mx-auto font-medium">
            Find answers to common questions about life insurance, health plans, and the strategic advisory process.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-gold/15 rounded-xl overflow-hidden bg-white shadow-premium transition-all hover:border-gold/30"
              >
                {/* Header Question Bar */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left selection:bg-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span className="font-serif text-base sm:text-lg font-bold text-navy select-none leading-snug">
                      {item.question}
                    </span>
                  </div>

                  {/* Gold arrow rotating 180° on open */}
                  <div className="flex-shrink-0 ml-2">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full bg-gold/10 border border-gold/15 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-colors btn-premium-border"
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </motion.div>
                  </div>
                </button>

                {/* Animated expandable body height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-7 pt-0 border-t border-gold/10">
                        <p className="font-sans text-sm sm:text-base text-charcoal/80 font-light leading-relaxed text-left selection:bg-gold selection:text-charcoal pl-8 mt-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
