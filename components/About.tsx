import { ArrowRight, Download, Languages, Layers, Palette, ServerCog } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/lib/site-data";

const principles = [
    { Icon: Layers, title: "Scalable architecture", text: "Clean Architecture, MVVM, and the repository pattern — so features stay easy to add, test, and hand over." },
    { Icon: Palette, title: "Pixel-perfect UI", text: "Faithful translation of Figma mockups and brand identities into smooth, native-feeling interfaces." },
    { Icon: ServerCog, title: "Real backends", text: "Production Laravel & REST APIs, Firebase, Supabase realtime, maps, and payment gateways like Paymob." },
    { Icon: Languages, title: "Arabic & English", text: "Bilingual apps with proper RTL/LTR mirroring, localization, and typography built in from day one." },
];

export default function About() {
    return (
        <section id="about" className="section">
            <div className="wrap">
                <SectionHeading
                    index="01"
                    eyebrow="About"
                    title={<>Engineering apps people <span className="grad">enjoy using.</span></>}
                />

                <div className="about">
                    <Reveal className="about__text">
                        <p>
                            I&apos;m a <strong>Flutter Mobile Developer</strong> who cares as much about how an app is built
                            as how it feels. Over the past two years I&apos;ve gone from intensive training at ITI and NTI
                            to shipping <strong>real client apps</strong> — cafe ordering, e-commerce, medical supplies,
                            home services, and EdTech.
                        </p>
                        <p>
                            Today I build and ship iOS &amp; Android apps at <strong>Stitch for Technology Solutions</strong> —
                            REST APIs, push notifications, chatbot interfaces, and CI/CD releases to Google Play and the
                            App Store. I&apos;ve also taught Flutter as a technical instructor, which keeps my fundamentals
                            sharp and my code easy to explain.
                        </p>
                        <p>
                            I&apos;m open to <strong>freelance projects</strong> and <strong>full-time roles</strong> where
                            I can own features end-to-end, from UI to API integration to store release.
                        </p>
                        <div className="about__actions">
                            <a href="#contact" className="btn btn--primary">
                                Start a conversation <ArrowRight size={16} className="btn__arrow" />
                            </a>
                            <a href={site.cv} download={site.cvFileName} className="btn btn--ghost">
                                <Download size={16} /> Résumé
                            </a>
                        </div>
                    </Reveal>

                    <div className="principles">
                        {principles.map(({ Icon, title, text }, i) => (
                            <Reveal key={title} className="card" delay={i * 0.06}>
                                <span className="card__icon"><Icon size={20} /></span>
                                <h3 className="card__title">{title}</h3>
                                <p className="card__text">{text}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
