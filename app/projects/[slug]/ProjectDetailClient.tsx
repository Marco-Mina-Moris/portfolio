"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lock, X } from "lucide-react";
import Footer from "@/components/Footer";
import PhoneMockup from "@/components/PhoneMockup";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { EASE } from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { projects, type ProjectData } from "@/lib/projects-data";

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
    const [lightbox, setLightbox] = useState<string | null>(null);

    const index = projects.findIndex((p) => p.slug === project.slug);
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];

    const isClient = !!project.tag;
    const related = projects.filter((p) => p.slug !== project.slug && !!p.tag === isClient).slice(0, 3);
    const gallery = project.screenshots.filter((src) => src !== project.coverImage);
    const hasPublicRepo = !project.isPrivate && !!project.github;
    const screens = project.screens ?? [];
    const hasPhone = screens.length > 0 || !!project.demoUrl;

    const engagement = isClient ? `Client work · ${project.tag}` : project.isFreelance ? "Freelance" : "Personal project";
    const status = isClient ? "Completed · In store testing" : "Completed";

    const meta = [
        { label: "Category", value: project.label },
        { label: "Engagement", value: engagement },
        { label: "Platform", value: "Flutter · iOS & Android" },
        { label: "Year", value: project.year },
    ];

    const info = [
        { label: "Status", value: status },
        ...(isClient
            ? [
                  { label: "Google Play", value: "In testing" },
                  { label: "App Store", value: "In testing" },
              ]
            : []),
        { label: "Source code", value: hasPublicRepo ? "Public on GitHub" : "Private repository" },
    ];

    const projectInfo = (
        <Reveal className={hasPhone ? "pd-block pd-aside__card pd-aside__card--inline" : "pd-aside__card"}>
            <h2 className="pd-aside__title">Project info</h2>
            {info.map(({ label, value }) => (
                <div key={label} className="info-row">
                    <span className="info-row__label">{label}</span>
                    <span className="info-row__value">{value}</span>
                </div>
            ))}
            <div className="pd-aside__stack">
                <span className="info-row__label">Tech stack</span>
                <div className="tags">
                    {project.tech.map((t) => <span key={t} className="chip chip--tinted">{t}</span>)}
                </div>
            </div>
        </Reveal>
    );

    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [lightbox]);

    return (
        <div style={{ "--c": project.color } as React.CSSProperties}>
            <ScrollProgress />

            <header className="pd-header">
                <div className="wrap pd-header__inner">
                    <Link href="/#work" className="back-link">
                        <ArrowLeft size={16} /> All projects
                    </Link>
                    <Link href="/" className="brand" aria-label="Marco Mina — home">
                        <span className="brand__mark">MM</span>
                        <span className="brand__name">Marco Mina</span>
                    </Link>
                </div>
            </header>

            <main>
                <motion.section className="pd-hero" variants={stagger} initial="hidden" animate="visible">
                    <div className="pd-hero__glow" aria-hidden="true" />
                    <div className="wrap">
                        <motion.nav variants={fadeUp} className="crumbs" aria-label="Breadcrumb">
                            <Link href="/">Home</Link>
                            <span aria-hidden="true">/</span>
                            <Link href="/#work">Work</Link>
                            <span aria-hidden="true">/</span>
                            <span style={{ color: "var(--text-2)" }}>{project.name}</span>
                        </motion.nav>

                        <motion.div variants={fadeUp} className="pd-badges">
                            <span className={`status${isClient ? " status--warning" : ""}`}>
                                <span className="status__dot" />
                                {status}
                            </span>
                            <span className="chip chip--tinted" style={{ padding: "6px 12px" }}>{engagement}</span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="display pd-title">{project.name}</motion.h1>
                        <motion.p variants={fadeUp} className="pd-lead">{project.description}</motion.p>

                        <motion.div variants={fadeUp} className="pd-actions">
                            {hasPublicRepo ? (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                                    <Github size={16} /> View source <ArrowUpRight size={16} className="btn__arrow" />
                                </a>
                            ) : (
                                <span className="chip" style={{ height: 48, padding: "0 18px", fontSize: "0.8125rem" }}>
                                    <Lock size={14} /> Private client repository
                                </span>
                            )}
                            <Link href="/#contact" className="btn btn--primary">
                                Discuss a similar app <ArrowRight size={16} className="btn__arrow" />
                            </Link>
                        </motion.div>

                        <motion.dl variants={fadeUp} className="pd-meta">
                            {meta.map(({ label, value }) => (
                                <div key={label} className="pd-meta__item">
                                    <dt className="pd-meta__label">{label}</dt>
                                    <dd className="pd-meta__value">{value}</dd>
                                </div>
                            ))}
                        </motion.dl>

                        <motion.div variants={fadeUp} className="pd-cover">
                            <Image
                                src={project.coverImage}
                                alt={`${project.name} app preview`}
                                fill
                                priority
                                sizes="(min-width: 1280px) 1200px, 100vw"
                            />
                        </motion.div>
                    </div>
                </motion.section>

                <section className="section">
                    <div className="wrap pd-body">
                        <div>
                            <Reveal className="pd-block">
                                <h2 className="pd-h2">Overview</h2>
                                <p className="pd-prose">{project.longDescription}</p>
                            </Reveal>

                            <Reveal className="pd-block">
                                <h2 className="pd-h2">Key features</h2>
                                <ul className="features">
                                    {project.features.map((feature, i) => (
                                        <li key={feature} className="feature">
                                            <span className="feature__num">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="feature__text">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>

                            {gallery.length > 0 && (
                                <Reveal className="pd-block">
                                    <h2 className="pd-h2">Showcase</h2>
                                    <div className="gallery">
                                        {gallery.map((src, i) => (
                                            <button key={src} type="button" className="shot" onClick={() => setLightbox(src)} aria-label={`Enlarge ${project.name} screenshot ${i + 1}`}>
                                                <Image
                                                    src={src}
                                                    alt={`${project.name} screenshot ${i + 1}`}
                                                    width={1536}
                                                    height={1024}
                                                    sizes="(min-width: 1280px) 780px, 100vw"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </Reveal>
                            )}

                            {hasPhone && projectInfo}
                        </div>

                        <aside className={hasPhone ? "pd-aside pd-aside--phone" : "pd-aside"}>
                            {hasPhone ? (
                                <Reveal className="pd-phone">
                                    <PhoneMockup name={project.name} color={project.color} screens={screens} demoUrl={project.demoUrl} bars={project.phoneBars} />
                                </Reveal>
                            ) : (
                                projectInfo
                            )}
                        </aside>
                    </div>
                </section>

                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="wrap">
                        <Reveal className="pager">
                            <Link href={`/projects/${prev.slug}`} className="pager__link">
                                <span className="pager__dir"><ArrowLeft size={14} /> Previous</span>
                                <span className="pager__name">{prev.name}</span>
                            </Link>
                            <Link href={`/projects/${next.slug}`} className="pager__link pager__link--next">
                                <span className="pager__dir">Next <ArrowRight size={14} /></span>
                                <span className="pager__name">{next.name}</span>
                            </Link>
                        </Reveal>

                        <Reveal style={{ marginTop: 96 }}>
                            <span className="eyebrow">More {isClient ? "client apps" : "projects"}</span>
                            <h2 className="display sec-head__title" style={{ marginBottom: 40 }}>
                                Keep <span className="grad">exploring.</span>
                            </h2>
                        </Reveal>
                        <div className="work-grid work-grid--3">
                            {related.map((p, i) => (
                                <Reveal key={p.slug} delay={i * 0.06} style={{ height: "100%" }}>
                                    <ProjectCard project={p} sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer home={false} />
            <WhatsAppFAB />

            {lightbox && (
                <div className="lightbox" role="dialog" aria-modal="true" aria-label="Screenshot preview" onClick={() => setLightbox(null)}>
                    <button type="button" className="icon-btn lightbox__close" aria-label="Close preview" onClick={() => setLightbox(null)}>
                        <X size={20} />
                    </button>
                    <Image src={lightbox} alt={`${project.name} screenshot`} width={1536} height={1024} sizes="92vw" />
                </div>
            )}
        </div>
    );
}
