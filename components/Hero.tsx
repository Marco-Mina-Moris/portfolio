"use client";

import { useRef } from "react";
import Image from "next/image";
import {
    motion,
    useMotionTemplate,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Smartphone } from "lucide-react";
import { EASE } from "./Reveal";
import { CountUp, Magnetic, SplitWords, usePointerTilt } from "./motion";
import { useIntroDone } from "./Intro";
import { projects, clientProjects } from "@/lib/projects-data";
import { experiences, site } from "@/lib/site-data";

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.6 } } };
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const socials = [
    { href: site.github, Icon: Github, label: "GitHub" },
    { href: site.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${site.email}`, Icon: Mail, label: "Email" },
];

const currentRole = experiences.find((e) => e.current) ?? experiences[0];

const stats = [
    { value: projects.length, suffix: "", label: "Mobile apps built" },
    { value: clientProjects.length, suffix: "", label: "Client apps delivered" },
    { value: 2, suffix: "+", label: "Years building with Flutter" },
    { value: experiences.length, suffix: "", label: "Roles & training programs" },
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const ready = useIntroDone(); // hero choreography starts as the intro curtain lifts
    const show = ready ? "visible" : "hidden";

    // Spotlight that trails the cursor across the hero.
    const mx = useSpring(50, { stiffness: 60, damping: 20 });
    const my = useSpring(20, { stiffness: 60, damping: 20 });
    const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(59, 130, 246, 0.16), transparent 60%)`;
    const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
    };

    // Scroll-out: the copy drifts up and fades, the portrait moves slower (depth).
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);

    const tilt = usePointerTilt(7);

    return (
        <section id="top" className="hero" ref={sectionRef} onPointerMove={onPointerMove}>
            <div className="hero__bg" aria-hidden="true">
                <motion.div className="hero__grid" style={{ y: glowY }} />
                <div className="hero__glow" />
                <motion.div className="hero__spotlight" style={{ background: spotlight }} />
            </div>

            <div className="wrap">
                <div className="hero__layout">
                    <motion.div variants={stagger} initial="hidden" animate={show} style={{ y: copyY, opacity: copyOpacity }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
                            <span className="status">
                                <span className="status__dot" />
                                Available for freelance &amp; full-time roles
                            </span>
                        </motion.div>

                        <h1 className="display hero__title">
                            <SplitWords
                                trigger="load"
                                play={ready}
                                delay={0.2}
                                stagger={0.07}
                                segments={[
                                    "I build polished,",
                                    { text: "production-ready", className: "nowrap" },
                                    { text: "mobile apps", className: "grad" },
                                    "with Flutter.",
                                ]}
                            />
                        </h1>

                        <motion.p variants={fadeUp} className="hero__lead">
                            I&apos;m <strong>Marco Mina</strong>, a Flutter developer from Egypt, currently building mobile apps at {currentRole.company}.
                            I ship cross-platform apps for iOS &amp; Android — from pixel-perfect, bilingual UI to
                            Clean Architecture, real REST backends, and payments.
                        </motion.p>

                        <motion.div variants={fadeUp} className="hero__actions">
                            <Magnetic>
                                <a href="#work" className="btn btn--primary btn--shine">
                                    View my work <ArrowRight size={16} className="btn__arrow" />
                                </a>
                            </Magnetic>
                            <a href={site.cv} download={site.cvFileName} className="btn btn--ghost">
                                <Download size={16} /> Download CV
                            </a>
                            <span className="hero__divider" aria-hidden="true" />
                            <div className="hero__socials">
                                {socials.map(({ href, Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="icon-btn"
                                        aria-label={label}
                                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div style={{ y: portraitY }}>
                        <motion.div
                            className="portrait"
                            initial={{ opacity: 0, y: 60, scale: 0.92, rotate: 2 }}
                            animate={ready ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : { opacity: 0, y: 60, scale: 0.92, rotate: 2 }}
                            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.div className="portrait__frame" style={tilt.style} {...tilt.handlers}>
                                <Image
                                    src="/avatar.jpg"
                                    alt="Portrait of Marco Mina"
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 400px, (min-width: 480px) 400px, 90vw"
                                />
                                <motion.span className="portrait__light" style={{ background: tilt.light }} aria-hidden="true" />
                                <span className="portrait__tag">Flutter · iOS &amp; Android</span>
                                <motion.div
                                    className="portrait__card"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                                    transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                                >
                                    <span className="portrait__card-icon"><Smartphone size={20} /></span>
                                    <div>
                                        <div className="portrait__card-title">{currentRole.role}</div>
                                        <div className="portrait__card-sub">Currently at {currentRole.company}</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.dl
                    className="stats"
                    initial="hidden"
                    animate={show}
                    transition={{ staggerChildren: 0.1, delayChildren: 1.1 }}
                >
                    {stats.map((s) => (
                        <motion.div key={s.label} className="stat" variants={fadeUp}>
                            <dt className="stat__label">{s.label}</dt>
                            <dd className="stat__value">
                                <CountUp to={s.value} delay={0.15} />
                                {s.suffix && <sup>{s.suffix}</sup>}
                            </dd>
                        </motion.div>
                    ))}
                </motion.dl>
            </div>
        </section>
    );
}
