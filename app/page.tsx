import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Particles from "@/components/Particles";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <div className="noise-overlay" style={{ background: "#05080F", minHeight: "100vh", position: "relative" }}>
      <Particles />
      <CursorGlow />
      <ScrollProgress />
      <WhatsAppFAB />
      <div className="dot-grid" style={{ position: "fixed", inset: 0, opacity: 0.35, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
