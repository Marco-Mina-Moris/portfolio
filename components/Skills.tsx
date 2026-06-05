"use client";

const skills = [
    { icon: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg", name: "Flutter & Dart", color: "#54C5F8", description: "Expert UI with custom widgets, animations, Custom Paint, and Flutter Web for cross-platform delivery.", tags: ["Widgets", "Animations", "Custom UI", "Flutter Web"] },
    { icon: "bloc", name: "State Management", color: "#00B4AB", description: "Scalable app state with BLoC, Cubit, Provider, and Riverpod across production-grade projects.", tags: ["BLoC", "Cubit", "Provider", "Riverpod"] },
    { icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", name: "Firebase", color: "#F59E0B", description: "Auth, Firestore real-time database, Crashlytics monitoring, and FCM push notifications.", tags: ["Auth", "Firestore", "Crashlytics", "FCM"] },
    { icon: "clean-arch", name: "Architecture", color: "#A78BFA", description: "Clean Architecture, MVVM, SOLID principles, and proven design patterns for maintainable codebases.", tags: ["Clean Architecture", "MVVM", "SOLID", "Design Patterns"] },
    { icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", name: "APIs & Storage", color: "#34D399", description: "REST API integration with Dio & Retrofit, local persistence with Hive and Sqflite.", tags: ["REST API", "Retrofit", "Hive", "SqlLite", "Dio"] },
    { icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg", name: "Dev Tools", color: "#F472B6", description: "Git, GitHub, Figma, Postman, Android Studio, Fastlane, and CI/CD pipelines.", tags: ["Git", "GitHub", "Figma", "Postman", "CI/CD"] },
];

function SkillCard({ skill }: { skill: typeof skills[0] }) {
    return (
        <div style={{ position: "relative", borderRadius: "20px", padding: "24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", cursor: "default", overflow: "hidden", transition: "all 0.35s ease" }}>
            <div className="animated-top-border" />
            <div style={{ position: "absolute", top: 0, left: 0, width: "140px", height: "140px", background: `radial-gradient(circle at top left, ${skill.color}14, transparent 65%)`, borderRadius: "20px 0 0 0", pointerEvents: "none" }} />
            <div style={{ width: "50px", height: "50px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", background: `${skill.color}14`, border: `1px solid ${skill.color}30`, marginBottom: "18px", boxShadow: `0 0 20px ${skill.color}16` }}>
                {skill.icon === "bloc" ? (
                    <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #54C5F8, #00B4AB)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#05080F", fontFamily: "monospace" }}>BLoC</div>
                ) : skill.icon === "clean-arch" ? (
                    <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6C63FF, #4A47A3)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", fontFamily: "monospace", textAlign: "center", lineHeight: "1.2" }}>Clean Arch</div>
                ) : (
                    <img src={skill.icon} alt={skill.name} width={40} height={40} style={{ objectFit: "contain" }} />
                )}
            </div>
            <h3 className="font-clash" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#F0F4FF", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                {skill.name}
            </h3>
            <p style={{ color: "rgba(240,244,255,0.42)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "16px" }}>
                {skill.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skill.tags.map(tag => (
                    <span key={tag} style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "0.68rem", fontWeight: 500, color: skill.color, background: `${skill.color}10`, border: `1px solid ${skill.color}28`, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <section id="skills">
            <div className="container-pad">
                <div id="skills-header" style={{ position: "relative" }}>
                    <span className="section-ghost-number">01</span>
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                            <span className="font-mono-code" style={{ color: "#54C5F8", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.06em" }}>01.</span>
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(84,197,248,0.28), transparent)" }} />
                        </div>
                        <h2 className="font-clash" style={{ fontSize: "clamp(1.875rem,5vw,3.75rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#F0F4FF", marginBottom: "12px", lineHeight: 1.05 }}>
                            Technical <span className="text-gradient">Skills</span>
                        </h2>
                        <p style={{ color: "rgba(240,244,255,0.42)", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", maxWidth: "480px", lineHeight: 1.75 }}>
                            A modern toolkit built through hands-on projects and intensive training.
                        </p>
                    </div>
                </div>
                <div id="skills-grid">
                    {skills.map((s) => <SkillCard key={s.name} skill={s} />)}
                </div>
            </div>
            <style>{`
        #skills { padding: 40px 0; }
        #skills-header { margin-bottom: 32px; }
        #skills-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media(min-width:640px)  { #skills-grid { grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px) { #skills { padding: 80px 0; } #skills-header { margin-bottom: 48px; } #skills-grid { grid-template-columns: repeat(3,1fr); } }
      `}</style>
        </section>
    );
}
