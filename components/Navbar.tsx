"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 16);
            // Back at the top (hero): no section link is active.
            if (window.scrollY < window.innerHeight * 0.5) setActive("");
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        // Highlight the link of the section crossing the middle of the viewport.
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        navLinks.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        const onResize = () => window.innerWidth >= 1024 && setOpen(false);
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
                <div className="wrap nav__inner">
                    <a href="#top" className="brand" aria-label="Marco Mina — back to top" onClick={() => setOpen(false)}>
                        <span className="brand__mark">MM</span>
                        <span className="brand__name">Marco Mina</span>
                    </a>

                    <nav className="nav__links" aria-label="Primary">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`nav__link${active === link.href ? " is-active" : ""}`}
                                aria-current={active === link.href ? "true" : undefined}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="nav__actions">
                    <ThemeToggle />
                    <a href="#contact" className="btn btn--primary btn--sm nav__cta">
                        Let&apos;s talk <ArrowUpRight size={16} className="btn__arrow" />
                    </a>

                    <button
                        type="button"
                        className="icon-btn nav__toggle"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        id="mobile-menu"
                        className="mobile-menu"
                        aria-label="Mobile"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navLinks.map((link, i) => (
                            <a key={link.href} href={link.href} className="mobile-menu__link" onClick={() => setOpen(false)}>
                                {link.label}
                                <span>0{i + 1}</span>
                            </a>
                        ))}
                        <a href="#contact" className="btn btn--primary" onClick={() => setOpen(false)}>
                            Let&apos;s talk <ArrowUpRight size={16} />
                        </a>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
