import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Courses from "@/components/Courses";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Intro from "@/components/Intro";
import { site } from "@/lib/site-data";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}/avatar.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Banha", addressRegion: "Qalyubia", addressCountry: "EG" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["Flutter", "Dart", "Mobile App Development", "Clean Architecture", "BLoC", "Riverpod", "Firebase"],
};

export default function Home() {
  return (
    <>
      <Intro />
      <a href="#main" className="skip-link">Skip to content</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Courses />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
