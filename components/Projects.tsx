"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { projects } from "@/lib/projects-data";

/* Per-project brand accent config */
const cardAccents: Record<string, { accent: string; hoverBorder: string; gradientDark: string }> = {
    scorepulse:      { accent: "#00A8FF", hoverBorder: "rgba(0,168,255,0.4)",   gradientDark: "#1E3A5F" },
    murshid:         { accent: "#2563EB", hoverBorder: "rgba(37,99,235,0.4)",   gradientDark: "#0B1E3C" },
    "food-delivery": { accent: "#FF6B35", hoverBorder: "rgba(255,107,53,0.4)",  gradientDark: "#4A1E00" },
    shoply:          { accent: "#FF8C00", hoverBorder: "rgba(255,140,0,0.4)",    gradientDark: "#3D2200" },
    evently:         { accent: "#4A7BF7", hoverBorder: "rgba(74,123,247,0.4)",   gradientDark: "#1A2B5F" },
    news:            { accent: "#A78BFA", hoverBorder: "rgba(167,139,250,0.4)",  gradientDark: "#1F1A2F" },
};

function BentoCard({ project, featured }: { project: typeof projects[0]; featured?: boolean }) {
    const [hovered, setHovered] = useState(false);
    const cardHeight = featured ? 420 : 380;
    const imagePercent = featured ? 60 : 55;

    const accent = cardAccents[project.slug] ?? { accent: project.color, hoverBorder: `${project.color}66`, gradientDark: "#05080F" };

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="bento-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "block",
                height: `${cardHeight}px`,
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
                border: hovered
                    ? `1px solid ${accent.hoverBorder}`
                    : "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                transition: "border-color 0.4s ease",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
            }}
        >
            {/* Animated top border on hover */}
            {hovered && (
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px", zIndex: 10,
                    background: `linear-gradient(90deg, transparent, ${accent.accent}, #A78BFA, ${accent.accent}, transparent)`,
                    backgroundSize: "200% 100%", animation: "grad-slide 2s linear infinite",
                }} />
            )}

            {/* Image area */}
            <div style={{
                height: `${imagePercent}%`,
                position: "relative",
                overflow: "hidden",
            }}>
                <img
                    src={project.coverImage}
                    alt={project.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: project.objectPosition ?? (featured ? "center" : "top"),
                        display: "block",
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.4s ease",
                    }}
                />
                {/* Gradient overlay at bottom of image */}
                <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: featured ? "80px" : "60px",
                    background: `linear-gradient(to top, ${accent.gradientDark}, transparent)`,
                    pointerEvents: "none",
                }} />
            </div>

            {/* Content area */}
            <div style={{
                height: `${100 - imagePercent}%`,
                padding: featured ? "20px 24px" : "16px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
            }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                        <h3 className="font-clash" style={{
                            fontSize: featured ? "1.35rem" : "1.1rem",
                            fontWeight: 700,
                            letterSpacing: "-0.025em",
                            color: "#F0F4FF",
                            lineHeight: 1.2,
                            margin: 0,
                        }}>
                            {project.name}
                        </h3>
                        {project.isFreelance && (
                            <span className="font-mono-code" style={{
                                padding: "2px 8px",
                                borderRadius: "100px",
                                fontSize: "0.62rem",
                                fontWeight: 600,
                                color: "#10B981",
                                background: "rgba(16,185,129,0.12)",
                                border: "1px solid rgba(16,185,129,0.25)",
                                letterSpacing: "0.02em",
                            }}>
                                Freelance
                            </span>
                        )}
                        {featured && (
                            <span className="font-mono-code" style={{
                                padding: "2px 8px",
                                borderRadius: "100px",
                                fontSize: "0.62rem",
                                fontWeight: 500,
                                color: accent.accent,
                                background: `${accent.accent}14`,
                                border: `1px solid ${accent.accent}30`,
                            }}>
                                {project.year}
                            </span>
                        )}
                    </div>
                    <p style={{
                        color: "rgba(240,244,255,0.42)",
                        fontSize: featured ? "0.875rem" : "0.82rem",
                        lineHeight: 1.6,
                        marginBottom: "12px",
                        display: "-webkit-box",
                        WebkitLineClamp: featured ? 3 : 2,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                    } as React.CSSProperties}>
                        {project.description}
                    </p>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {project.tech.map(t => (
                            <span key={t} style={{
                                padding: "3px 9px",
                                borderRadius: "6px",
                                fontSize: "0.64rem",
                                fontWeight: 500,
                                color: accent.accent,
                                background: `${accent.accent}10`,
                                border: `1px solid ${accent.accent}28`,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* View Project button — appears on hover */}
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "6px 14px",
                            borderRadius: "100px",
                            background: hovered ? `${accent.accent}1F` : "transparent",
                            border: hovered ? `1px solid ${accent.hoverBorder}` : "1px solid transparent",
                            color: accent.accent,
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            opacity: hovered ? 1 : 0,
                            transform: hovered ? "translateX(0)" : "translateX(8px)",
                            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                            flexShrink: 0,
                        }}
                    >
                        View Project <ArrowUpRight size={12} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function Projects() {
    // Row 1: ScorePulse (index 0) — full width
    // Row 2: Murshid (index 1) + Food Delivery (index 2)
    // Row 3: Shoply (index 3) + Evently (index 4)
    // Row 4: News (index 5) — full width
    const featuredProject = projects[0];
    const row2 = [projects[1], projects[2]];
    const row3 = [projects[3], projects[4]];
    const lastProject = projects[5];

    return (
        <section id="projects">
            <div className="bento-container">
                {/* Section Header */}
                <div id="projects-header" style={{ position: "relative" }}>
                    <span className="section-ghost-number">02</span>
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                            <span className="font-mono-code" style={{ color: "#54C5F8", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.06em" }}>02.</span>
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(84,197,248,0.28), transparent)" }} />
                        </div>
                        <h2 className="font-clash" style={{ fontSize: "clamp(1.875rem,5vw,3.75rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#F0F4FF", marginBottom: "12px", lineHeight: 1.05 }}>
                            Featured <span className="text-gradient">Projects</span>
                        </h2>
                        <p style={{ color: "rgba(240,244,255,0.42)", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", maxWidth: "480px", lineHeight: 1.75 }}>
                            Production apps built with clean architecture and real-world problem solving.
                        </p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="bento-grid">
                    {/* Row 1: Full width featured */}
                    <div className="bento-full">
                        <BentoCard project={featuredProject} featured />
                    </div>

                    {/* Row 2: Two equal cards */}
                    {row2.map(p => (
                        <div key={p.slug} className="bento-half">
                            <BentoCard project={p} />
                        </div>
                    ))}

                    {/* Row 3: Two equal cards */}
                    {row3.map(p => (
                        <div key={p.slug} className="bento-half">
                            <BentoCard project={p} />
                        </div>
                    ))}

                    {/* Row 4: Full width */}
                    <div className="bento-full">
                        <BentoCard project={lastProject} />
                    </div>
                </div>
            </div>

            <style>{`
                #projects { padding: 40px 0; }
                #projects-header { margin-bottom: 32px; }

                .bento-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .bento-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                }

                .bento-full { grid-column: 1 / -1; }
                .bento-half { grid-column: 1 / -1; }

                /* Stack on mobile, 2-col on tablet+ */
                @media (min-width: 768px) {
                    .bento-grid {
                        grid-template-columns: repeat(12, 1fr);
                    }
                    .bento-full { grid-column: 1 / -1; }
                    .bento-half { grid-column: span 6; }
                    .bento-container { padding: 0 40px; }
                }

                @media (min-width: 1024px) {
                    #projects { padding: 80px 0; }
                    #projects-header { margin-bottom: 48px; }
                    .bento-container { padding: 0 80px; }
                }

                /* Mobile card height overrides */
                @media (max-width: 767px) {
                    .bento-card { height: auto !important; min-height: 320px; }
                }

                @keyframes grad-slide {
                    0%   { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>
        </section>
    );
}
