"use client";

import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";

const links = [
    { label: "Email", sub: "marcominamories@gmail.com", href: "mailto:marcominamories@gmail.com", Icon: Mail, color: "#54C5F8" },
    { label: "GitHub", sub: "Marco-Mina-Moris", href: "https://github.com/Marco-Mina-Moris", Icon: Github, color: "#E8EDF5" },
    { label: "LinkedIn", sub: "Marco Mina", href: "https://linkedin.com/in/Marco-Mina-Moris", Icon: Linkedin, color: "#0A66C2" },
    { label: "Phone", sub: "+201287035405", href: "tel:+201287035405", Icon: Phone, color: "#34D399" },
    { label: "Location", sub: "Banha, Qalyubia, Egypt", href: "https://maps.google.com/?q=Banha,Qalyubia,Egypt", Icon: MapPin, color: "#F472B6" },
];

export default function Contact() {
    return (
        <section id="contact" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "-40px", left: "50%", transform: "translateX(-50%)", width: "min(800px, 100vw)", height: "280px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(84,197,248,0.06) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

            <div className="container-pad" style={{ textAlign: "center", position: "relative" }}>
                <span className="section-ghost-number" style={{ left: "50%", transform: "translateX(-50%)" }}>04</span>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "50px", height: "1px", background: "linear-gradient(to right, transparent, rgba(84,197,248,0.4))" }} />
                    <span className="font-mono-code" style={{ color: "#54C5F8", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.06em" }}>04.</span>
                    <div style={{ width: "50px", height: "1px", background: "linear-gradient(to left, transparent, rgba(84,197,248,0.4))" }} />
                </div>

                <h2
                    className="font-clash"
                    style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.045em", color: "#F0F4FF", lineHeight: 1.04, marginBottom: "20px", position: "relative", zIndex: 1 }}
                >
                    Let&apos;s build something{" "}<span className="text-gradient">great.</span>
                </h2>

                <p style={{ color: "rgba(240,244,255,0.44)", fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 48px", position: "relative", zIndex: 1 }}>
                    I&apos;m open to new opportunities — freelance, full-time, or internships.
                    If you need a Flutter developer, let&apos;s talk.
                </p>

                <div id="contact-links" style={{ position: "relative", zIndex: 1 }}>
                    {links.map(({ label, sub, href, Icon, color }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", padding: "14px 20px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", transition: "all 0.3s ease" }}
                        >
                            <div style={{ width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: `${color}14`, border: `1px solid ${color}30`, flexShrink: 0, boxShadow: `0 0 14px ${color}10` }}>
                                <Icon size={18} style={{ color }} />
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ color: "#F0F4FF", fontSize: "0.875rem", fontWeight: 600 }}>{label}</div>
                                <div className="font-mono-code" style={{ color: "rgba(240,244,255,0.32)", fontSize: "0.7rem", marginTop: "1px" }}>{sub}</div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Download CV button */}
                <div style={{ marginTop: "40px", position: "relative", zIndex: 1 }}>
                    <a
                        href="/cv/Marco-Mina-Moris-CV.pdf"
                        download="Marco-Mina-Moris-CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-download-btn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "14px 32px",
                            borderRadius: "12px",
                            background: "transparent",
                            border: "1px solid #54C5F8",
                            color: "#54C5F8",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                        }}
                    >
                        ⬇ Download CV
                    </a>
                </div>
            </div>
            <style>{`
              #contact { padding: 40px 0 32px; }
              #contact-links { display: grid; grid-template-columns: 1fr; gap: 12px; }
              @media(min-width:600px) { #contact-links { grid-template-columns: repeat(2,1fr); } }
              @media(min-width:900px) { #contact-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; } #contact-links > a { min-width: 180px; } }
              @media(min-width:1024px) { #contact { padding: 80px 0 60px; } }
              .cv-download-btn:hover { background: rgba(84,197,248,0.1) !important; box-shadow: 0 0 24px rgba(84,197,248,0.15); transform: translateY(-2px); }
            `}</style>
        </section>
    );
}
