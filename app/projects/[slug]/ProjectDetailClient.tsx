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

                        {/* Action buttons */}
                        <motion.div variants={fadeUp} style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", fontSize: "0.9rem", fontWeight: 600, color: "#05080F", background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}CC 100%)`, transition: "all 0.3s ease" }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 28px ${project.color}55`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                                <Github size={16} /> View on GitHub
                            </a>
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
                                        { label: "Year", value: project.year },
                                        { label: "Status", value: "Completed" },
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

                                    {/* GitHub link */}
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                            marginTop: "24px", padding: "11px", borderRadius: "12px",
                                            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                                            color: "rgba(240,244,255,0.7)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600,
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.color}50`; e.currentTarget.style.color = "#F0F4FF"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(240,244,255,0.7)"; }}>
                                        <Github size={15} /> Source Code <ExternalLink size={12} />
                                    </a>
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
