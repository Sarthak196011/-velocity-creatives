import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandTicker from "@/components/BrandTicker";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="mesh-bg" />
      <div className="noise" />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <BrandTicker />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}