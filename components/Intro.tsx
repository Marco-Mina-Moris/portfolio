"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

const OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DIVE: [number, number, number, number] = [0.7, 0, 0.2, 1];
const NAME_LINES = ["MARCO", "MINA"];

/* Timeline (ms from mount). */
const BOOT_AT = 1050; // screen powers on
const READY_AT = 3100; // phone squares up to face the viewer
const DIVE_AT = 3500; // camera dives into the screen
const END_AT = 4500; // overlay removed, site fully visible

type Phase = "enter" | "boot" | "ready" | "dive" | "gone";

/* ── Tiny store so the hero can wait for the intro to finish ── */
let done = false;
/** Set once the intro has run in this page load, so client-side navigation back home doesn't replay it. */
let playedThisLoad = false;
const listeners = new Set<() => void>();
function finish() {
    if (done) return;
    done = true;
    listeners.forEach((l) => l());
}

export function useIntroDone() {
    return useSyncExternalStore(
        (cb) => {
            listeners.add(cb);
            return () => listeners.delete(cb);
        },
        () => done,
        () => false,
    );
}

/**
 * "Phone boot" opening: a phone flies in, its screen powers on and boots with the name,
 * then the camera dives into the screen until it fills the viewport and becomes the site.
 * Plays on every fresh load (not when navigating back home inside the site); click or any key skips it.
 */
export default function Intro() {
    // Rendered on the server too, so the page never flashes before the intro covers it.
    const [phase, setPhase] = useState<Phase>(() => (playedThisLoad ? "gone" : "enter"));
    const [diveScale, setDiveScale] = useState(8);
    const screenRef = useRef<HTMLDivElement>(null);
    const skipRef = useRef<() => void>(() => {});

    useEffect(() => {
        if (playedThisLoad) return;
        playedThisLoad = true;

        // Only on a fresh load of the homepage itself, not when arriving here from another page of the site.
        const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        const landedHere = !nav || new URL(nav.name).pathname === window.location.pathname;

        if (!landedHere || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const raf = requestAnimationFrame(() => {
                setPhase("gone");
                finish();
            });
            return () => cancelAnimationFrame(raf);
        }

        const timers: number[] = [];
        const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
        const end = () => {
            timers.forEach(clearTimeout);
            setPhase("gone");
            finish();
            document.documentElement.style.overflow = "";
            window.removeEventListener("keydown", end);
        };

        document.documentElement.style.overflow = "hidden";
        window.addEventListener("keydown", end);
        skipRef.current = end;

        at(BOOT_AT, () => setPhase("boot"));
        at(READY_AT, () => {
            // Scale needed for the (now upright) screen to cover the whole viewport.
            const r = screenRef.current?.getBoundingClientRect();
            if (r) setDiveScale(Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.12);
            setPhase("ready");
        });
        at(DIVE_AT, () => {
            setPhase("dive");
            finish(); // hero choreography starts as the screen opens up
        });
        at(END_AT, end);

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener("keydown", end);
            document.documentElement.style.overflow = "";
        };
    }, []);

    const booted = phase !== "enter";
    const diving = phase === "dive";

    const phonePose =
        phase === "enter"
            ? { y: 0, rotateY: -16, rotateX: 10, rotateZ: -2, scale: 1, opacity: 1 }
            : phase === "boot"
              ? { y: 0, rotateY: -10, rotateX: 6, rotateZ: 0, scale: 1, opacity: 1 }
              : phase === "ready"
                ? { y: 0, rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1.04, opacity: 1 }
                : { y: 0, rotateY: 0, rotateX: 0, rotateZ: 0, scale: diveScale, opacity: 1 };

    const phoneTransition =
        phase === "enter"
            ? { duration: 1.1, ease: OUT }
            : phase === "dive"
              ? { duration: 1, ease: DIVE }
              : { duration: 0.8, ease: OUT };

    return (
        <AnimatePresence>
            {phase !== "gone" && (
                <motion.div
                    className="boot"
                    key="boot"
                    aria-hidden="true"
                    onClick={() => skipRef.current()}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {/* Backdrop: blue light that swells when the screen powers on, and fades during the dive */}
                    <motion.div
                        className="boot__bg"
                        animate={{ opacity: diving ? 0 : 1 }}
                        transition={{ duration: 0.6, delay: diving ? 0.35 : 0 }}
                    >
                        <motion.span
                            className="boot__glow"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: booted ? 1.15 : 0.85, opacity: booted ? 1 : 0.5 }}
                            transition={{ duration: 1.2, ease: OUT }}
                        />
                        <motion.span
                            className="boot__word"
                            initial={{ opacity: 0, letterSpacing: "0.6em" }}
                            animate={{ opacity: diving ? 0 : 1, letterSpacing: "0.32em" }}
                            transition={{ duration: 1.6, ease: OUT }}
                        >
                            MOBILE
                        </motion.span>
                        <motion.span
                            className="boot__status"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: diving ? 0 : 1 }}
                            transition={{ duration: 0.5, delay: diving ? 0 : 0.3 }}
                        >
                            {booted ? "// booting portfolio" : "// powering on"}
                        </motion.span>
                        <span className="boot__hint">Click to skip</span>
                    </motion.div>

                    {/* The phone */}
                    <div className="boot__scene">
                        <motion.div
                            className="boot__phone"
                            initial={{ y: "70vh", rotateY: -40, rotateX: 28, rotateZ: -10, scale: 0.7, opacity: 0 }}
                            animate={phonePose}
                            transition={phoneTransition}
                            style={{ transformPerspective: 1400 }}
                        >
                            <motion.div
                                className="boot__screen"
                                ref={screenRef}
                                animate={{ backgroundColor: diving ? "rgba(5, 5, 5, 0)" : "rgba(5, 5, 5, 1)" }}
                                transition={{ duration: 0.5, delay: diving ? 0.5 : 0 }}
                            >
                                {/* Power-on: a thin line of light opens into the full screen */}
                                <motion.span
                                    className="boot__power"
                                    initial={{ scaleX: 0, scaleY: 0.004, opacity: 0 }}
                                    animate={booted ? { scaleX: [0, 1, 1], scaleY: [0.004, 0.004, 1], opacity: [1, 1, 0] } : {}}
                                    transition={{ duration: 0.55, times: [0, 0.4, 1], ease: "easeOut" }}
                                />

                                <motion.div
                                    className="boot__ui"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: booted ? (diving ? 0 : 1) : 0 }}
                                    transition={{ duration: diving ? 0.45 : 0.4, delay: booted && !diving ? 0.3 : 0 }}
                                >
                                    <div className="boot__statusbar">
                                        <span>9:41</span>
                                        <span className="boot__island" />
                                        <span className="boot__battery" />
                                    </div>

                                    <div className="boot__content">
                                        <motion.span
                                            className="boot__mark"
                                            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
                                            animate={booted ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                                            transition={{ duration: 0.8, delay: 0.45, ease: OUT }}
                                        >
                                            MM
                                        </motion.span>

                                        <div className="boot__name">
                                            {NAME_LINES.map((line, li) => (
                                                <span key={line} className="boot__name-line">
                                                    {line.split("").map((ch, i) => (
                                                        <span key={i} className="boot__mask">
                                                            <motion.span
                                                                className={li === 1 ? "boot__char boot__char--accent" : "boot__char"}
                                                                initial={{ y: "110%" }}
                                                                animate={booted ? { y: "0%" } : {}}
                                                                transition={{ duration: 0.7, delay: 0.75 + li * 0.25 + i * 0.05, ease: OUT }}
                                                            >
                                                                {ch}
                                                            </motion.span>
                                                        </span>
                                                    ))}
                                                </span>
                                            ))}
                                        </div>

                                        <motion.span
                                            className="boot__role"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={booted ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: 1.25, ease: OUT }}
                                        >
                                            Flutter Mobile Developer
                                        </motion.span>
                                    </div>

                                    <div className="boot__progress">
                                        <motion.span
                                            className="boot__progress-fill"
                                            initial={{ scaleX: 0 }}
                                            animate={booted ? { scaleX: 1 } : {}}
                                            transition={{ duration: 1.35, delay: 0.6, ease: [0.45, 0, 0.25, 1] }}
                                        />
                                    </div>
                                    <span className="boot__home" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
