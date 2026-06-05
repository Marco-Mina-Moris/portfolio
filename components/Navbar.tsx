"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // default true (mobile-first SSR)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);

        const checkWidth = () => setIsMobile(window.innerWidth < 768);
        checkWidth();
        window.addEventListener("resize", checkWidth);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", checkWidth);
        };
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    background: scrolled ? "rgba(5,8,15,0.84)" : "transparent",
                    backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                    transition: "all 0.4s ease",
                    maxWidth: "100vw",
                }}
            >
                {scrolled && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(84,197,248,0.3) 30%, rgba(0,180,171,0.3) 70%, transparent)" }} />
                )}

                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>

                    {/* Logo + Available badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <a href="#" style={{ textDecoration: "none", flexShrink: 0 }}>
                            <span className="font-clash" style={{
                                fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "-0.03em", whiteSpace: "nowrap",
                                background: "linear-gradient(90deg, #54C5F8, #00B4AB, #A78BFA, #54C5F8)",
                                backgroundSize: "300% 100%", animation: "shimmer 4s linear infinite",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                                Marco Mina
                            </span>
                        </a>
                        <span className="available-badge" style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "3px 10px 3px 8px", borderRadius: "100px",
                            background: "rgba(16,185,129,0.08)",
                            border: "1px solid rgba(16,185,129,0.2)",
                            fontSize: "0.65rem", fontWeight: 600, color: "#10B981",
                            letterSpacing: "0.02em", whiteSpace: "nowrap",
                            fontFamily: "'JetBrains Mono', monospace",
                        }}>
                            <span style={{
                                position: "relative", width: "7px", height: "7px", flexShrink: 0,
                            }}>
                                <span style={{
                                    position: "absolute", inset: 0, borderRadius: "50%",
                                    background: "#10B981",
                                }} />
                                <span className="available-ping" style={{
                                    position: "absolute", inset: "-2px", borderRadius: "50%",
                                    background: "#10B981", opacity: 0.6,
                                }} />
                            </span>
                            Available
                        </span>
                    </div>

                    {/* Desktop nav — JS-controlled, only shown when not mobile */}
                    {!isMobile && (
                        <div style={{ display: "flex", gap: "32px", alignItems: "center", flex: 1, justifyContent: "center" }}>
                            {navLinks.map((link) => (
                                <button key={link.label} onClick={() => scrollTo(link.href)}
                                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,244,255,0.45)", fontSize: "0.875rem", fontWeight: 500, fontFamily: "'Inter', sans-serif", position: "relative", padding: "4px 0", transition: "color 0.25s", whiteSpace: "nowrap" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "#F0F4FF")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,244,255,0.45)")}>
                                    {link.label}
                                    <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", borderRadius: "1px", background: "linear-gradient(90deg, #54C5F8, #00B4AB)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s ease" }} className="nav-ul" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Right cluster */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        {/* Hire Me — desktop only */}
                        {!isMobile && (
                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                                style={{ textDecoration: "none", position: "relative", padding: "9px 20px", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF", background: "#05080F", display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
                                <span style={{ position: "absolute", inset: "-1px", borderRadius: "11px", background: "conic-gradient(from var(--border-angle, 0deg), #54C5F8 0%, #00B4AB 33%, #A78BFA 66%, #54C5F8 100%)", zIndex: -1 }} className="rotating-border" />
                                <span style={{ position: "absolute", inset: "1px", borderRadius: "9px", background: "#090D18", zIndex: 0 }} />
                                <span style={{ position: "relative", zIndex: 1 }}>Hire Me</span>
                            </a>
                        )}

                        {/* Hamburger — mobile only */}
                        {isMobile && (
                            <button onClick={() => setMobileOpen(!mobileOpen)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "#F0F4FF", padding: "8px", display: "flex", alignItems: "center" }}
                                aria-label="Toggle menu">
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99, background: "rgba(5,8,15,0.97)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 20px 32px", display: "flex", flexDirection: "column" }}>
                        {navLinks.map((link, i) => (
                            <button key={link.label} onClick={() => scrollTo(link.href)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,244,255,0.6)", fontSize: "1.125rem", fontWeight: 500, textAlign: "left", fontFamily: "'Inter', sans-serif", padding: "14px 0", borderBottom: i < navLinks.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                {link.label}
                            </button>
                        ))}
                        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                            style={{ textDecoration: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "0.9375rem", fontWeight: 600, color: "#05080F", background: "linear-gradient(135deg,#54C5F8,#00B4AB)", textAlign: "center", marginTop: "20px", display: "block" }}>
                            Hire Me
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}
        nav button:hover .nav-ul{transform:scaleX(1) !important;}
        @keyframes available-pulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(2.2);opacity:0}}
        .available-ping{animation:available-pulse 2s ease-in-out infinite;}
        @media(max-width:400px){.available-badge{padding:3px 6px !important;font-size:0 !important;gap:0 !important;}.available-badge span:last-child{display:none;}}
      `}</style>
        </>
    );
}
