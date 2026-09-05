"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Github, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectData } from "@/lib/projects-data";
import { getOtherProjects } from "@/lib/projects-data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

function OtherProjectCard({ project }: { project: ProjectData }) {
    const [hovered, setHovered] = useState(false);
    return (
        <Link
            href={`/projects/${project.slug}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                textDecoration: "none",
                borderRadius: "16px", overflow: "hidden",
                background: "rgba(255,255,255,0.025)",
                border: hovered ? `1px solid ${project.color}50` : "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)", transition: "all 0.35s ease",
                boxShadow: hovered ? `0 0 40px ${project.color}10, 0 8px 32px rgba(0,0,0,0.3)` : "none",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                display: "block",
            }}
        >
            {/* Cover thumbnail */}
            <div style={{ height: "100px", position: "relative", overflow: "hidden" }}>
                <img
                    src={project.coverImage}
                    alt={project.name}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px 12px 0 0", display: "block" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to top, rgba(9,13,24,0.85), transparent)" }} />
            </div>
            <div style={{ padding: "14px 16px" }}>
                <span className="font-mono-code" style={{ color: project.color, fontSize: "0.65rem", fontWeight: 500 }}>{project.label} · {project.year}</span>
                <p style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.8rem", lineHeight: 1.5, marginTop: "6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                    {project.description}
                </p>
            </div>
        </Link>
    );
}

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
    const otherProjects = getOtherProjects(project.slug);
    const [lightbox, setLightbox] = useState<string | null>(null);

    return (
        <div className="noise-overlay" style={{ background: "#05080F", minHeight: "100vh", position: "relative" }}>
            {/* Lightbox Modal */}
            {lightbox && (
                <div onClick={() => setLightbox(null)} style={{
                    position: "fixed", inset: 0, zIndex: 9999,
                    background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "zoom-out", padding: "24px",
                }}>
                    <img src={lightbox} alt="Screenshot" style={{
                        maxWidth: "90vw", maxHeight: "90vh", borderRadius: "16px",
                        border: `2px solid ${project.color}40`,
                        boxShadow: `0 0 60px ${project.color}20`,
                    }} />
                </div>
            )}
            <div className="dot-grid" style={{ position: "fixed", inset: 0, opacity: 0.35, pointerEvents: "none", zIndex: 0 }} />

            {/* Ambient orbs */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "5%", left: "10%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${project.color}1F 0%, transparent 70%)`, filter: "blur(60px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${project.color}0A 0%, transparent 70%)`, filter: "blur(60px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
                {/* Top nav bar */}
                <nav style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="container-pad" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Link href="/#projects" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(240,244,255,0.55)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#54C5F8")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,244,255,0.55)")}>
                            <ArrowLeft size={16} />
                            Back to Portfolio
                        </Link>
                        <Link href="/" className="font-clash" style={{ color: "#54C5F8", textDecoration: "none", fontSize: "1rem", fontWeight: 600 }}>
                            Marco Mina
                        </Link>
                    </div>
                </nav>

                {/* Hero section */}
                <motion.section variants={stagger} initial="hidden" animate="visible" style={{ paddingTop: "60px", paddingBottom: "48px", position: "relative" }}>
                    {/* Dynamic ambient glow behind title/description */}
                    <div style={{
                        position: "absolute",
                        top: "-20px",
                        left: "10px",
                        width: "80%",
                        maxWidth: "600px",
                        height: "100%",
                        background: `radial-gradient(circle at 20% 30%, ${project.color}24 0%, transparent 70%)`,
                        filter: "blur(90px)",
                        pointerEvents: "none",
                        zIndex: 0,
                    }} />
                    <div className="container-pad" style={{ position: "relative", zIndex: 1 }}>
                        {/* Type + year badge */}
                        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "100px", background: `${project.color}12`, border: `1px solid ${project.color}30`, fontSize: "0.72rem", fontWeight: 600, color: project.color, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                                {project.label}
                            </span>
                            {project.isFreelance && (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "100px", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", fontSize: "0.72rem", fontWeight: 600, color: "#10B981", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                                    Freelance Project
                                </span>
                            )}
                            {project.tag && (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "100px", background: "rgba(129, 140, 248, 0.12)", border: "1px solid rgba(129, 140, 248, 0.3)", fontSize: "0.72rem", fontWeight: 600, color: "#818CF8", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {project.tag} Client Work
                                </span>
                            )}
                            <span className="font-mono-code" style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.75rem" }}>{project.year}</span>
                        </motion.div>

                        {/* Project name */}
                        <motion.h1 variants={fadeUp} className="font-clash" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#F0F4FF", lineHeight: 1.05, marginBottom: "24px" }}>
                            {project.name}
                        </motion.h1>

                        {/* Short description */}
                        <motion.p variants={fadeUp} style={{ color: "rgba(240,244,255,0.5)", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", lineHeight: 1.7, maxWidth: "700px", marginBottom: "32px" }}>
                            {project.description}
                        </motion.p>

                        {/* Deployment & Release Launchpad */}
                        <motion.div variants={fadeUp} style={{ marginBottom: "36px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                <span style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: project.color,
                                    boxShadow: `0 0 10px ${project.color}`,
                                }} />
                                <span style={{
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "rgba(240,244,255,0.45)",
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}>
                                    {project.tag === "Marketopia" ? "Repository & Store Availability" : "Project Links & Availability"}
                                </span>
                            </div>

                            <div style={{
                                display: "inline-flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                alignItems: "center",
                                padding: "6px",
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                backdropFilter: "blur(20px)",
                                maxWidth: "100%",
                            }}>
                                {/* GitHub Button (Active CTA) */}
                                {project.github && project.github !== "#" && project.github !== "" && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="launchpad-btn launchpad-btn-github"
                                        style={{
                                            textDecoration: "none",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            height: "54px",
                                            padding: "0 18px",
                                            borderRadius: "14px",
                                            background: `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)`,
                                            border: `1px solid ${project.color}66`,
                                            boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 25px ${project.color}1f, inset 0 1px 0 rgba(255,255,255,0.15)`,
                                            backdropFilter: "blur(20px)",
                                            cursor: "pointer",
                                            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = project.color;
                                            e.currentTarget.style.boxShadow = `0 8px 30px ${project.color}45, 0 0 35px ${project.color}30, inset 0 1px 0 rgba(255,255,255,0.25)`;
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = `${project.color}66`;
                                            e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.3), 0 0 25px ${project.color}1f, inset 0 1px 0 rgba(255,255,255,0.15)`;
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                    >
                                        <div style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "9px",
                                            background: `${project.color}18`,
                                            border: `1px solid ${project.color}40`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}>
                                            <Github size={18} style={{ color: project.color }} />
                                        </div>
                                        <span className="font-clash" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F0F4FF", letterSpacing: "-0.01em" }}>
                                            GitHub
                                        </span>
                                        <div style={{
                                            width: "22px",
                                            height: "22px",
                                            borderRadius: "50%",
                                            background: `${project.color}18`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginLeft: "2px",
                                        }}>
                                            <ExternalLink size={12} style={{ color: project.color }} />
                                        </div>
                                    </a>
                                )}

                                {/* Store Badges for Client Apps */}
                                {project.tag === "Marketopia" && (
                                    <>
                                        {/* Google Play Store Badge */}
                                        <div
                                            className="launchpad-btn launchpad-btn-store"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "12px",
                                                height: "54px",
                                                padding: "0 16px",
                                                borderRadius: "14px",
                                                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)",
                                                border: "1px solid rgba(255,255,255,0.09)",
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                                                backdropFilter: "blur(20px)",
                                                userSelect: "none",
                                                cursor: "default",
                                                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)";
                                                e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,158,11,0.18), inset 0 1px 0 rgba(255,255,255,0.12)";
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }}
                                            title={`Google Play Store — تطبيق ${project.name} قيد الاختبار`}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}>
                                                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.436V3.25c0-.547.22-1.043.61-1.436z" fill="#00D3FF"/>
                                                <path d="M17.207 8.586l-3.415 3.414 3.415 3.414 3.864-2.208c1.1-.628 1.1-1.782 0-2.412L17.207 8.586z" fill="#FFCE00"/>
                                                <path d="M13.792 12L3.61 1.814A2.08 2.08 0 0 1 4.75 1.5c.61 0 1.22.25 1.72.54l10.737 6.546-3.415 3.414z" fill="#00F076"/>
                                                <path d="M13.792 12l3.415 3.414-10.737 6.546c-.5.29-1.11.54-1.72.54-.42 0-.82-.09-1.14-.314L13.792 12z" fill="#FF3A44"/>
                                            </svg>
                                            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                                                <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(240,244,255,0.42)", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                                                    GET IT ON
                                                </span>
                                                <span className="font-clash" style={{ fontSize: "0.92rem", fontWeight: 700, color: "#F0F4FF", letterSpacing: "-0.01em" }}>
                                                    Google Play
                                                </span>
                                            </div>
                                            <div style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                padding: "4px 10px",
                                                borderRadius: "100px",
                                                background: "rgba(245,158,11,0.13)",
                                                border: "1px solid rgba(245,158,11,0.32)",
                                                marginLeft: "4px",
                                            }}>
                                                <span className="pulse-amber-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B" }} />
                                                <span style={{ fontSize: "0.64rem", fontWeight: 700, color: "#FBBF24", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>
                                                    In Testing · قيد الاختبار
                                                </span>
                                            </div>
                                        </div>

                                        {/* App Store Badge */}
                                        <div
                                            className="launchpad-btn launchpad-btn-store"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "12px",
                                                height: "54px",
                                                padding: "0 16px",
                                                borderRadius: "14px",
                                                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)",
                                                border: "1px solid rgba(255,255,255,0.09)",
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                                                backdropFilter: "blur(20px)",
                                                userSelect: "none",
                                                cursor: "default",
                                                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = "rgba(56,189,248,0.45)";
                                                e.currentTarget.style.boxShadow = "0 6px 24px rgba(56,189,248,0.18), inset 0 1px 0 rgba(255,255,255,0.12)";
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }}
                                            title={`Apple App Store — تطبيق ${project.name} قيد الاختبار`}
                                        >
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#F0F4FF" style={{ flexShrink: 0, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}>
                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.94 2.73 1.01.08 2.04-.48 2.66-1.23z"/>
                                            </svg>
                                            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                                                <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(240,244,255,0.42)", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                                                    DOWNLOAD ON
                                                </span>
                                                <span className="font-clash" style={{ fontSize: "0.92rem", fontWeight: 700, color: "#F0F4FF", letterSpacing: "-0.01em" }}>
                                                    App Store
                                                </span>
                                            </div>
                                            <div style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                padding: "4px 10px",
                                                borderRadius: "100px",
                                                background: "rgba(56,189,248,0.13)",
                                                border: "1px solid rgba(56,189,248,0.32)",
                                                marginLeft: "4px",
                                            }}>
                                                <span className="pulse-blue-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38BDF8" }} />
                                                <span style={{ fontSize: "0.64rem", fontWeight: 700, color: "#38BDF8", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>
                                                    In Testing · قيد الاختبار
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Cover image (nested inside same section to avoid layout split) */}
                        <motion.div variants={fadeUp} style={{
                            borderRadius: "20px", overflow: "hidden", position: "relative",
                            border: "1px solid rgba(255,255,255,0.07)",
                        }}>
                            <img
                                src={project.coverImage}
                                alt={project.name}
                                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px", display: "block" }}
                            />
                        </motion.div>
                    </div>
                </motion.section>

                {/* Content sections */}
                <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ paddingTop: "72px", paddingBottom: "72px" }}>
                    <div className="container-pad">
                        <div id="project-detail-grid">
                            {/* Main content */}
                            <div>
                                {/* About */}
                                <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
                                    <h2 className="font-clash" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                                        About This Project
                                    </h2>
                                    <p style={{ color: "rgba(240,244,255,0.48)", fontSize: "0.95rem", lineHeight: 1.85, maxWidth: "680px" }}>
                                        {project.longDescription}
                                    </p>
                                </motion.div>

                                {/* Key Features */}
                                <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
                                    <h2 className="font-clash" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "20px", letterSpacing: "-0.02em" }}>
                                        Key Features
                                    </h2>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                        {project.features.map((feature, i) => (
                                            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                                                <CheckCircle2 size={18} style={{ color: project.color, flexShrink: 0, marginTop: "2px" }} />
                                                <span style={{ color: "rgba(240,244,255,0.55)", fontSize: "0.9rem", lineHeight: 1.6 }}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Screenshots Gallery */}
                                {project.screenshots && project.screenshots.length > 0 && (
                                <motion.div variants={fadeUp}>
                                    <h2 className="font-clash" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "20px", letterSpacing: "-0.02em" }}>
                                        Screenshots
                                    </h2>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "14px" }}>
                                        {project.screenshots.map((src, i) => (
                                            <div key={i} className="screenshot-card" style={{
                                                borderRadius: "14px", overflow: "hidden", position: "relative",
                                                border: `1px solid ${project.color}25`,
                                                background: "rgba(255,255,255,0.02)",
                                                cursor: "pointer",
                                                transition: "all 0.35s ease",
                                            }}
                                            onClick={() => setLightbox(src)}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${project.name} screenshot ${i + 1}`}
                                                    style={{ width: "100%", height: "auto", display: "block", borderRadius: "13px", transition: "transform 0.4s ease" }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <motion.aside variants={fadeUp}>
                                <div style={{
                                    borderRadius: "16px", padding: "24px",
                                    background: "rgba(255,255,255,0.025)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    backdropFilter: "blur(20px)",
                                    position: "sticky", top: "24px",
                                }}>
                                    <h3 className="font-clash" style={{ fontSize: "1rem", fontWeight: 600, color: "#F0F4FF", marginBottom: "20px" }}>
                                        Project Info
                                    </h3>

                                    {/* Info rows */}
                                    {[
                                        { label: "Type", value: project.label },
                                        ...(project.isFreelance ? [{ label: "Client/Context", value: "Freelance Project" }] : []),
                                        ...(project.tag ? [{ label: "Agency / Client", value: project.tag }] : []),
                                        ...(project.tag === "Marketopia" ? [
                                            { label: "Google Play", value: "In Testing (قيد الاختبار)" },
                                            { label: "App Store", value: "In Testing (قيد الاختبار)" },
                                        ] : []),
                                        { label: "Year", value: project.year },
                                        { label: "Status", value: project.tag === "Marketopia" ? "Completed · Store Testing" : "Completed" },
                                    ].map(({ label, value }) => (
                                        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                            <span style={{ color: "rgba(240,244,255,0.35)", fontSize: "0.8rem" }}>{label}</span>
                                            <span style={{ color: "rgba(240,244,255,0.7)", fontSize: "0.8rem", fontWeight: 500 }}>{value}</span>
                                        </div>
                                    ))}

                                    {/* Tech stack */}
                                    <div style={{ marginTop: "20px" }}>
                                        <span style={{ color: "rgba(240,244,255,0.35)", fontSize: "0.75rem", display: "block", marginBottom: "10px" }}>Tech Stack</span>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                            {project.tech.map(t => (
                                                <span key={t} style={{
                                                    padding: "4px 10px", borderRadius: "6px", fontSize: "0.68rem", fontWeight: 500,
                                                    color: project.color, background: `${project.color}12`, border: `1px solid ${project.color}28`,
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>
                    </div>
                </motion.section>

                {/* Other projects */}
                <section style={{ paddingBottom: "80px" }}>
                    <div className="container-pad">
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px" }}>
                            <h2 className="font-clash" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#F0F4FF", marginBottom: "8px", letterSpacing: "-0.03em" }}>
                                View Other <span className="text-gradient">Projects</span>
                            </h2>
                            <p style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.9rem", marginBottom: "28px" }}>
                                Explore more of my work
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
                                {otherProjects.map(p => (
                                    <OtherProjectCard key={p.slug} project={p} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0", textAlign: "center" }}>
                    <div className="container-pad">
                        <span className="font-mono-code" style={{ color: "rgba(240,244,255,0.25)", fontSize: "0.72rem" }}>
                            Built with Next.js · Marco Mina © {new Date().getFullYear()}
                        </span>
                    </div>
                </footer>
            </div>

            <style>{`
                @keyframes pulse-amber {
                    0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px rgba(245,158,11,0.8); }
                    50% { transform: scale(0.85); opacity: 0.5; box-shadow: 0 0 2px rgba(245,158,11,0.3); }
                }
                @keyframes pulse-blue {
                    0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px rgba(56,189,248,0.8); }
                    50% { transform: scale(0.85); opacity: 0.5; box-shadow: 0 0 2px rgba(56,189,248,0.3); }
                }
                .pulse-amber-dot {
                    animation: pulse-amber 2s infinite ease-in-out;
                }
                .pulse-blue-dot {
                    animation: pulse-blue 2s infinite ease-in-out;
                }

                @keyframes mesh-shift{0%{filter:hue-rotate(0deg) brightness(1)}100%{filter:hue-rotate(15deg) brightness(1.08)}}

                .screenshot-card:hover {
                    border-color: ${project.color}50 !important;
                    box-shadow: 0 0 30px ${project.color}15;
                    transform: translateY(-3px);
                }
                .screenshot-card:hover img {
                    transform: scale(1.03);
                }

                #project-detail-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                }

                @media(min-width: 900px) {
                    #project-detail-grid {
                        grid-template-columns: 1fr 300px;
                        gap: 48px;
                    }
                }

                @media(min-width: 1200px) {
                    #project-detail-grid {
                        grid-template-columns: 1fr 340px;
                        gap: 64px;
                    }
                }
            `}</style>
        </div>
    );
}
