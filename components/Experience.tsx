"use client";

const experiences = [
    {
        period: "Nov 2025 — Present",
        role: "Cross Platform Mobile App Developer",
        company: "Digital Egypt Pioneers Initiative (DEPI)",
        location: "Remote",
        description: "Developing cross-platform mobile apps with Flutter & Dart following Clean Architecture. Implementing BLoC/Cubit, REST APIs, Firebase, and Google Maps on real-world projects.",
        tags: ["Flutter", "BLoC", "Firebase", "Google Maps", "Clean Architecture"],
        color: "#54C5F8",
    },
    {
        period: "Jun 2025 — Aug 2025",
        role: "Mobile App Development Intern",
        company: "National Telecommunication Institute (NTI)",
        location: "Egypt",
        description: "120-hour internship in mobile development with Flutter and Dart. Focused on Clean Architecture, BLoC state management, backend integration, and app deployment processes.",
        tags: ["Flutter", "Dart", "BLoC", "Clean Architecture", "Deployment"],
        color: "#00B4AB",
    },
    {
        period: "Sep 2024 — Oct 2024",
        role: "Training Flutter Developer",
        company: "Information Technology Institute (ITI)",
        location: "Egypt",
        description: "60-hour intensive Flutter course covering OOP, Dart, Flutter basics, and Git version control. Delivered a complete app project as final output.",
        tags: ["Flutter", "Dart", "OOP", "Git"],
        color: "#A78BFA",
    },
];

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
    return (
        <div style={{ display: "flex", gap: 0, position: "relative" }}>
            {/* Left: date — hidden on mobile */}
            <div className="exp-left" style={{ width: "190px", flexShrink: 0, paddingRight: "36px", paddingTop: "8px", flexDirection: "column", alignItems: "flex-end" }}>
                <span className="font-mono-code" style={{ color: exp.color, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.04em", textAlign: "right", lineHeight: 1.5 }}>{exp.period}</span>
                <span style={{ color: "rgba(240,244,255,0.22)", fontSize: "0.67rem", marginTop: "2px" }}>{exp.location}</span>
            </div>

            {/* Timeline dot + line */}
            <div className="exp-dot-col" style={{ flexDirection: "column", alignItems: "center", marginRight: "28px", position: "relative" }}>
                <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: exp.color, boxShadow: `0 0 14px ${exp.color}70`, border: "2px solid #05080F", zIndex: 1, flexShrink: 0, marginTop: "8px" }} />
                {index < experiences.length - 1 && (
                    <div style={{ flex: 1, width: "1px", marginTop: "8px", background: `linear-gradient(to bottom, ${exp.color}40, rgba(255,255,255,0.04))` }} />
                )}
            </div>

            {/* Card */}
            <div style={{ flex: 1, paddingBottom: index < experiences.length - 1 ? "24px" : "0" }}>
                <div style={{ borderRadius: "18px", padding: "clamp(18px, 2vw, 26px)", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", transition: "all 0.3s ease" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, ${exp.color}70, transparent)`, borderRadius: "18px 18px 0 0" }} />
                    <div style={{ marginBottom: "10px" }}>
                        <span className="font-mono-code exp-mobile-period" style={{ color: exp.color, fontSize: "0.7rem" }}>{exp.period} · {exp.location}</span>
                    </div>
                    <h3 className="font-clash" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", fontWeight: 700, color: "#F0F4FF", letterSpacing: "-0.02em", marginBottom: "3px" }}>{exp.role}</h3>
                    <span style={{ color: exp.color, fontSize: "0.875rem", fontWeight: 600 }}>{exp.company}</span>
                    <p style={{ color: "rgba(240,244,255,0.42)", fontSize: "0.875rem", lineHeight: 1.75, margin: "12px 0 16px" }}>{exp.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {exp.tags.map(tag => <span key={tag} style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "0.67rem", fontWeight: 500, color: exp.color, background: `${exp.color}10`, border: `1px solid ${exp.color}22`, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>{tag}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Experience() {
    return (
        <section id="experience">
            <div className="container-pad">
                <div id="exp-header" style={{ position: "relative" }}>
                    <span className="section-ghost-number">03</span>
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                            <span className="font-mono-code" style={{ color: "#54C5F8", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.06em" }}>03.</span>
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(84,197,248,0.28), transparent)" }} />
                        </div>
                        <h2 className="font-clash" style={{ fontSize: "clamp(1.875rem,5vw,3.75rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#F0F4FF", marginBottom: "12px", lineHeight: 1.05 }}>Work <span className="text-gradient">Experience</span></h2>
                        <p style={{ color: "rgba(240,244,255,0.42)", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", maxWidth: "480px", lineHeight: 1.75 }}>
                            Hands-on experience in mobile development through internships and industry programs.
                        </p>
                    </div>
                </div>
                <div>
                    {experiences.map((exp, i) => <ExperienceItem key={exp.company} exp={exp} index={i} />)}
                </div>
            </div>
            <style>{`
              #experience { padding: 40px 0; }
              #exp-header { margin-bottom: 32px; }
              .exp-left { display: none !important; }
              .exp-dot-col { display: none !important; }
              .exp-mobile-period { display: inline; }
              @media(min-width:640px) {
                .exp-left { display: flex !important; }
                .exp-dot-col { display: flex !important; }
                .exp-mobile-period { display: none !important; }
              }
              @media(min-width:1024px) { #experience { padding: 80px 0; } #exp-header { margin-bottom: 48px; } }
            `}</style>
        </section>
    );
}
