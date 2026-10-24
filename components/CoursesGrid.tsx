"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, BadgeCheck, Maximize2, X } from "lucide-react";
import Reveal from "./Reveal";
import type { Course } from "@/lib/site-data";

/** A course with only the certificates whose image exists, plus every issuer for the label. */
type CourseItem = Course & { issuers: string[] };

export default function CoursesGrid({ courses }: { courses: CourseItem[] }) {
    const [open, setOpen] = useState<{ course: CourseItem; index: number } | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    const shown = open && open.course.certificates[open.index];

    return (
        <>
            <div className="courses">
                {courses.map((course, i) => {
                    const [first] = course.certificates;
                    return (
                        <Reveal key={course.title} className="card course" delay={i * 0.06}>
                            {first ? (
                                <button
                                    type="button"
                                    className="course__cert"
                                    onClick={() => setOpen({ course, index: 0 })}
                                    aria-label={`View ${course.title} certificate${course.certificates.length > 1 ? "s" : ""}`}
                                >
                                    <Image src={first.src} alt="" fill sizes="(min-width: 768px) 560px, 100vw" />
                                    {course.certificates.length > 1 && (
                                        <span className="course__count">{course.certificates.length} certificates</span>
                                    )}
                                    <span className="course__zoom" aria-hidden="true"><Maximize2 size={14} /></span>
                                </button>
                            ) : (
                                <span className="card__icon"><Award size={20} /></span>
                            )}

                            <div className="course__meta">
                                <span className="course__provider">{course.provider}</span>
                                <span className="chip">{course.date}</span>
                            </div>
                            <h3 className="card__title">{course.title}</h3>
                            <p className="card__text">{course.description}</p>

                            <ul className="course__issuers" aria-label="Certified by">
                                {course.issuers.map((issuer) => (
                                    <li key={issuer}><BadgeCheck size={14} aria-hidden="true" /> {issuer}</li>
                                ))}
                            </ul>
                            {course.credentialId && (
                                <p className="course__credential">Credential ID · {course.credentialId}</p>
                            )}
                            <div className="tags">
                                {course.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            {open && shown && (
                <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${open.course.title} certificate`} onClick={() => setOpen(null)}>
                    <button type="button" className="icon-btn lightbox__close" aria-label="Close certificate" onClick={() => setOpen(null)}>
                        <X size={20} />
                    </button>
                    <div className="cert-viewer" onClick={(e) => e.stopPropagation()}>
                        {open.course.certificates.length > 1 && (
                            <div className="filters cert-viewer__tabs" role="tablist" aria-label="Certificates">
                                {open.course.certificates.map((cert, index) => (
                                    <button
                                        key={cert.src}
                                        type="button"
                                        role="tab"
                                        aria-selected={index === open.index}
                                        className={`filter${index === open.index ? " is-active" : ""}`}
                                        onClick={() => setOpen({ ...open, index })}
                                    >
                                        {index === open.index && <span className="filter__pill" />}
                                        {cert.issuer}
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Scans can be landscape or portrait, so let the browser size them within the viewport. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shown.src} alt={`${open.course.title} certificate issued by ${shown.issuer}, ${shown.date}`} />
                    </div>
                </div>
            )}
        </>
    );
}
