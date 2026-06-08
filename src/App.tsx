import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Partners from "./components/Partners";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InteractiveFeatures from "./components/InteractiveFeatures";
import SupabaseSyncPortal from "./components/SupabaseSyncPortal";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-charcoal selection:bg-gold selection:text-charcoal relative overflow-x-hidden antialiased">
      {/* Cinematic Load Overlay */}
      <Loader />

      <Navbar onOpenConsultModal={() => setIsModalOpen(true)} />
      <main>
        <Hero onOpenConsultModal={() => setIsModalOpen(true)} />
        <About />
        <Services onSelectService={setSelectedService} />
        <Partners onOpenConsultModal={() => setIsModalOpen(true)} />
        <Testimonials />
        <FAQ />
        <Contact 
          selectedService={selectedService} 
          setSelectedService={setSelectedService} 
        />
      </main>
      <Footer />

      {/* Interactive Floating elements & Consultation Modal */}
      <InteractiveFeatures 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onOpen={() => setIsModalOpen(true)} 
      />

      {/* Diagnostic & Synch Portal */}
      <SupabaseSyncPortal />
    </div>
  );
}

