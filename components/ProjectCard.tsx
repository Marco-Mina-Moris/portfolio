"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePointerTilt } from "./motion";
import type { ProjectData } from "@/lib/projects-data";

const MAX_TECH = 4;
const MotionLink = motion.create(Link);

interface ProjectCardProps {
    project: ProjectData;
    sizes?: string;
}

export default function ProjectCard({ project, sizes = "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" }: ProjectCardProps) {
    const badge = project.tag ? `Client · ${project.tag}` : project.isFreelance ? "Freelance" : null;
    const shownTech = project.tech.slice(0, MAX_TECH);
    const hiddenTech = project.tech.length - shownTech.length;
    const tilt = usePointerTilt(5);

    return (
        <MotionLink
            href={`/projects/${project.slug}`}
            className="project-card"
            style={{ ...tilt.style, ["--c" as string]: project.color }}
            {...tilt.handlers}
        >
            <motion.span className="project-card__light" style={{ background: tilt.light }} aria-hidden="true" />
            <div className="project-card__media">
                <Image
                    src={project.coverImage}
                    alt={`${project.name} app preview`}
                    fill
                    sizes={sizes}
                    style={{ objectPosition: "center" }}
                />
                {badge && <span className="project-card__badge">{badge}</span>}
                {project.demoUrl && (
                    <span className="project-card__badge project-card__badge--live"><span className="live-dot" aria-hidden="true" />Live demo</span>
                )}
            </div>

            <div className="project-card__body">
                <div className="project-card__meta">
                    <span>{project.label}</span>
                    <span>{project.year}</span>
                </div>
                <h3 className="project-card__title">
                    <span>{project.name}</span>
                    <span className="project-card__arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
                </h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="tags project-card__tech">
                    {shownTech.map((t) => <span key={t} className="chip">{t}</span>)}
                    {hiddenTech > 0 && <span className="chip">+{hiddenTech}</span>}
                </div>
            </div>
        </MotionLink>
    );
}
