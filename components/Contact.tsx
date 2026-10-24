"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { Magnetic, SplitWords } from "./motion";
import { site, whatsappUrl } from "@/lib/site-data";

const links = [
    { label: "LinkedIn", value: "Marco Mina", href: site.linkedin, Icon: Linkedin },
    { label: "GitHub", value: site.githubHandle, href: site.github, Icon: Github },
    { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}`, Icon: Phone },
    { label: "Location", value: site.location, href: "https://maps.google.com/?q=Banha,Qalyubia,Egypt", Icon: MapPin },
];

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${site.email}`;
        }
    };

    return (
        <section id="contact" className="section">
            <div className="wrap">
                <Reveal className="contact-card">
                    <span className="eyebrow">06 — Contact</span>
                    <h2 className="display contact-card__title">
                        <SplitWords segments={["Have an app in mind?", { text: "Let's build it.", className: "grad" }]} stagger={0.08} />
                    </h2>
                    <p className="contact-card__lead">
                        I&apos;m open to freelance projects, full-time roles, and collaborations. Tell me what you&apos;re
                        building and how I can help.
                    </p>

                    <div className="contact-card__actions">
                        <Magnetic>
                            <a href={`mailto:${site.email}`} className="btn btn--primary btn--shine">
                                <Mail size={16} /> {site.email}
                            </a>
                        </Magnetic>
                        <button type="button" className="icon-btn" onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"} title="Copy email">
                            {copied ? <Check size={18} style={{ color: "var(--success)" }} /> : <Copy size={18} />}
                        </button>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                            WhatsApp <ArrowUpRight size={16} className="btn__arrow" />
                        </a>
                    </div>
                    <span aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                        {copied ? "Email address copied to clipboard" : ""}
                    </span>

                    <div className="contact-links">
                        {links.map(({ label, value, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                className="contact-link"
                                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                <span className="contact-link__icon"><Icon size={18} /></span>
                                <span className="contact-link__text">
                                    <span className="contact-link__label">{label}</span>
                                    <span className="contact-link__value" style={{ display: "block" }}>{value}</span>
                                </span>
                            </a>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
