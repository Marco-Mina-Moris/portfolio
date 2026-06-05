"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Mail, ChevronDown, Github, Linkedin, Phone } from "lucide-react";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } } };
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const techBadges = [
    {
        label: "Flutter",
        icon: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
        position: "top-right" as const,
    },
    {
        label: "Firebase",
        icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        position: "bottom-right" as const,
    },
    {
        label: "Dart",
        icon: "https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg",
        position: "bottom-left" as const,
    },
];

const badgePositions: Record<string, React.CSSProperties> = {
    "top-right": { top: "8%", right: "-18%", },
    "bottom-right": { bottom: "18%", right: "-20%", },
    "bottom-left": { bottom: "12%", left: "-18%", },
};

const badgeAnimations: Record<string, { y: number[]; x: number[]; duration: number }> = {
    "top-right": { y: [-6, 6, -6], x: [4, -4, 4], duration: 5 },
    "bottom-right": { y: [5, -7, 5], x: [-3, 5, -3], duration: 6 },
    "bottom-left": { y: [-5, 8, -5], x: [5, -3, 5], duration: 5.5 },
};

const socialLinks = [
    { href: "https://github.com/Marco-Mina-Moris", Icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/Marco-Mina-Moris", Icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:marcominamories@gmail.com", Icon: Mail, label: "Email" },
    { href: "tel:+201287035405", Icon: Phone, label: "Phone" },
];

function CircularAvatar() {
    const [imgError, setImgError] = useState(false);

    return (
        <div id="hero-avatar-wrapper" style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {/* Rotating glow ring */}
            <div id="hero-glow-ring" />

            {/* Main circle */}
            <div style={{
                width: "380px", height: "380px", borderRadius: "50%", overflow: "hidden", position: "relative", zIndex: 2,
                background: "linear-gradient(135deg, #0D1B4B 0%, #2D1B69 100%)",
                border: "2px solid rgba(84,197,248,0.4)",
                boxShadow: "0 0 40px rgba(84,197,248,0.15), 0 0 80px rgba(45,27,105,0.3)",
            }}>
                {!imgError ? (
                    <img
                        src="/avatar.jpg"
                        alt="Marco Mina"
                        onError={() => setImgError(true)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
                        <span className="font-clash" style={{ fontSize: "4rem", fontWeight: 700, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #54C5F8 0%, #00B4AB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MM</span>
                        <span className="font-mono-code" style={{ fontSize: "0.6rem", color: "rgba(240,244,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Marco Mina</span>
                    </div>
                )}
            </div>

            {/* Floating tech badges */}
            {techBadges.map((badge) => {
                const anim = badgeAnimations[badge.position];
                return (
                    <motion.div
                        key={badge.label}
                        animate={{ y: anim.y, x: anim.x }}
                        transition={{ repeat: Infinity, duration: anim.duration, ease: "easeInOut" }}
                        style={{
                            position: "absolute", zIndex: 3,
                            ...badgePositions[badge.position],
                            width: "48px", height: "48px", borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "#FFFFFF",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.12)",
                        }}
                    >
                        <img src={badge.icon} alt={badge.label} width={32} height={32} style={{ display: "block", objectFit: "contain" }} />
                    </motion.div>
                );
            })}
        </div>
    );
}

export default function Hero() {
    return (
        <section
            id="home"
            className="relative overflow-hidden flex items-center pt-20 pb-10"
        >
            {/* ── Gradient orbs ── */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div className="orb-a" style={{ position: "absolute", top: "8%", left: "10%", width: "clamp(280px, 45vw, 600px)", height: "clamp(280px, 45vw, 600px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(84,197,248,0.14) 0%, transparent 70%)", filter: "blur(50px)" }} />
                <div className="orb-b" style={{ position: "absolute", top: "45%", right: "5%", width: "clamp(200px, 35vw, 440px)", height: "clamp(200px, 35vw, 440px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,171,0.12) 0%, transparent 70%)", filter: "blur(50px)" }} />
                <div className="orb-c" style={{ position: "absolute", bottom: "12%", left: "38%", width: "clamp(160px, 25vw, 340px)", height: "clamp(160px, 25vw, 340px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)", filter: "blur(60px)" }} />
                <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
            </div>

            <div className="container-pad" style={{ position: "relative", zIndex: 1, width: "100%", paddingTop: "80px", paddingBottom: "20px" }}>

                {/* ── Two-column layout: text (left) | avatar (right) ── */}
                <div id="hero-layout">

                    {/* ── Left: text ── */}
                    <motion.div id="hero-text" variants={stagger} initial="hidden" animate="visible">

                        {/* Hello greeting */}
                        <motion.div variants={fadeUp} style={{ marginBottom: "12px" }}>
                            <span style={{ fontSize: "1rem", color: "rgba(240,244,255,0.45)", fontWeight: 400 }}>
                                Hello, I&apos;m
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.div variants={fadeUp}>
                            <h1 className="font-clash hero-h1" style={{ color: "#F0F4FF", fontWeight: 700, marginBottom: "8px" }}>
                                Marco Mina
                            </h1>
                        </motion.div>

                        {/* Colored subtitle */}
                        <motion.div variants={fadeUp}>
                            <h2 className="font-clash" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 600, color: "#54C5F8", letterSpacing: "-0.02em", marginBottom: "24px", lineHeight: 1.2 }}>
                                Flutter Mobile Developer
                            </h2>
                        </motion.div>

                        {/* Bio */}
                        <motion.p variants={fadeUp} style={{ color: "rgba(240,244,255,0.48)", fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "36px" }}>
                            A dedicated Flutter developer skilled in building high-performance
                            cross-platform mobile apps. Proficient in Clean Architecture, BLoC state
                            management, Firebase, and REST APIs — committed to delivering innovative,
                            user-friendly solutions.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
                            <a href="#projects"
                                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 26px", borderRadius: "12px", fontSize: "0.9375rem", fontWeight: 600, color: "#05080F", background: "linear-gradient(135deg, #54C5F8 0%, #00B4AB 100%)", whiteSpace: "nowrap", transition: "all 0.3s ease" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(84,197,248,0.55)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
                                View Projects <ArrowRight size={16} />
                            </a>
                            <a href="/cv/Marco-Mina-Moris-CV.pdf"
                                download="Marco-Mina-Moris-CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 26px", borderRadius: "12px", fontSize: "0.9375rem", fontWeight: 600, color: "rgba(240,244,255,0.72)", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", whiteSpace: "nowrap", transition: "all 0.3s ease" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(84,197,248,0.45)"; (e.currentTarget as HTMLAnchorElement).style.color = "#F0F4FF"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,244,255,0.72)"; }}>
                                ⬇ Download CV
                            </a>
                        </motion.div>

                        {/* Social icons row */}
                        <motion.div variants={fadeUp} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            {socialLinks.map(({ href, Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    style={{
                                        width: "40px", height: "40px", borderRadius: "10px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "rgba(240,244,255,0.5)",
                                        transition: "all 0.3s ease",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(84,197,248,0.4)";
                                        (e.currentTarget as HTMLAnchorElement).style.color = "#54C5F8";
                                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(84,197,248,0.08)";
                                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,244,255,0.5)";
                                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </motion.div>

                    </motion.div>

                    {/* ── Right: Circular Avatar ── */}
                    <motion.div
                        id="hero-photo"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <CircularAvatar />
                    </motion.div>

                </div>

                {/* Scroll indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginTop: "48px" }}>
                    <span className="font-mono-code" style={{ color: "rgba(240,244,255,0.2)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Scroll</span>
                    <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}>
                        <ChevronDown size={15} style={{ color: "rgba(84,197,248,0.45)" }} />
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}

        @keyframes rotateGlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        #hero-avatar-wrapper {
          width: 380px;
          height: 380px;
        }

        #hero-glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          border-radius: 50%;
          z-index: 1;
          background: conic-gradient(
            from 0deg,
            rgba(84,197,248,0.5),
            rgba(45,27,105,0.2),
            rgba(84,197,248,0.1),
            rgba(0,180,171,0.4),
            rgba(45,27,105,0.2),
            rgba(84,197,248,0.5)
          );
          animation: rotateGlow 8s linear infinite;
          filter: blur(6px);
        }

        /* Mobile: stacked */
        #hero-layout { display: flex; flex-direction: column; gap: 48px; align-items: center; }
        #hero-text { width: 100%; }
        #hero-photo { width: 100%; display: flex; justify-content: center; order: -1; }

        /* Scale avatar down on small screens */
        @media(max-width:479px) {
          #hero-avatar-wrapper { transform: scale(0.7); }
        }
        @media(min-width:480px) and (max-width:767px) {
          #hero-avatar-wrapper { transform: scale(0.8); }
        }

        /* Desktop lg: side-by-side */
        @media(min-width:1024px) {
          #home { display: flex; align-items: center; padding-top: 72px; padding-bottom: 40px; }
          #hero-layout { flex-direction: row; align-items: center; justify-content: space-between; gap: 48px; }
          #hero-text { flex: 0 0 54%; max-width: 54%; }
          #hero-photo { flex: 0 0 42%; max-width: 42%; justify-content: center; align-items: center; order: 0; }
          #hero-avatar-wrapper { transform: scale(0.85); }
        }
        @media(min-width:1280px) {
          #home { display: flex; align-items: center; padding-left: 96px; padding-right: 96px; padding-top: 40px; padding-bottom: 40px; }
          #hero-text { max-width: 650px; }
          #hero-avatar-wrapper { transform: scale(1); }
        }

        @media(min-width:1600px) {
          #home { padding-top: 20px; padding-bottom: 40px; }
          #hero-avatar-wrapper { transform: scale(1.1); }
        }

        @media(min-width:1920px) {
          #home { padding-left: 128px; padding-right: 128px; }
          #hero-text { flex: 0 0 54%; max-width: 700px; }
        }
      `}</style>
        </section>
    );
}
