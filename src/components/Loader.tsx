import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 2 seconds timer to trigger the fade-out transition
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b1628] select-none pointer-events-auto"
          role="status"
          aria-live="polite"
          aria-label="Loading Dr. J Soni Advisory Website"
        >
          <div className="text-center flex flex-col items-center max-w-sm px-4">
            
            {/* Playfair Display Title "Dr. J Soni" */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-cream tracking-wide cursor-default"
            >
              Dr. J Soni
            </motion.h1>

            {/* DM Mono Subtitle "Life Advisor" */}
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="font-mono text-xs sm:text-sm font-semibold tracking-[4px] uppercase text-gold mt-2.5"
            >
              Life Advisor
            </motion.p>

            {/* Horizontal Gold Loading Bar (Fills left to right) */}
            <div className="w-48 h-[3px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
