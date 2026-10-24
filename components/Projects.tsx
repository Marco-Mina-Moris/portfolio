"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Reveal, { EASE } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/projects-data";

const filters = [
    { id: "all", label: "All work", match: () => true },
    { id: "client", label: "Client apps", match: (p: (typeof projects)[number]) => !!p.tag },
    { id: "independent", label: "Freelance & personal", match: (p: (typeof projects)[number]) => !p.tag },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function Projects() {
    const [filter, setFilter] = useState<FilterId>("all");
    const visible = projects.filter(filters.find((f) => f.id === filter)!.match);

    return (
        <section id="work" className="section">
            <div className="wrap">
                <SectionHeading
                    index="02"
                    eyebrow="Selected work"
                    title={<>Apps I&apos;ve designed, built <span className="grad">&amp; shipped.</span></>}
                    description="Client apps delivered with Marketopia alongside freelance and personal products — each built with Clean Architecture and a real backend."
                />

                <Reveal>
                    <div className="filters" role="group" aria-label="Filter projects">
                        {filters.map((f) => {
                            const isActive = f.id === filter;
                            return (
                                <button
                                    key={f.id}
                                    type="button"
                                    className={`filter${isActive ? " is-active" : ""}`}
                                    aria-pressed={isActive}
                                    onClick={() => setFilter(f.id)}
                                >
                                    {isActive && (
                                        <motion.span layoutId="filter-pill" className="filter__pill" transition={{ duration: 0.4, ease: EASE }} />
                                    )}
                                    {f.label}
                                    <span className="filter__count">{projects.filter(f.match).length}</span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <motion.div layout className="work-grid">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((project, i) => (
                            <motion.div
                                key={project.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.4, ease: EASE }}
                            >
                                {/* Cards rise in from below with a slight tilt, staggered across each row. */}
                                <motion.div
                                    style={{ height: "100%" }}
                                    initial={{ opacity: 0, y: 80, rotateX: 12, scale: 0.94 }}
                                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 1, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
