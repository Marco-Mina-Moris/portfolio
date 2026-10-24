"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
    animate,
    motion,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ──────────────────────────────────────────────────────────────
   SplitWords — masked word-by-word reveal for short headlines.
   Each word slides up from behind a clip; screen readers get the
   plain sentence via aria-label.
   ────────────────────────────────────────────────────────────── */
type Segment = string | { text: string; className?: string };

interface SplitWordsProps {
    segments: Segment[];
    /** "load" animates immediately, "view" when scrolled into view. */
    trigger?: "load" | "view";
    delay?: number;
    stagger?: number;
    /** With trigger "load": hold the words hidden until this turns true. */
    play?: boolean;
}

export function SplitWords({ segments, trigger = "view", delay = 0, stagger = 0.06, play = true }: SplitWordsProps) {
    const words = segments.flatMap((seg) => {
        const { text, className } = typeof seg === "string" ? { text: seg, className: undefined } : seg;
        return text.split(" ").filter(Boolean).map((word) => ({ word, className }));
    });
    const label = words.map((w) => w.word).join(" ");
    const animateProps = trigger === "load" ? { animate: play ? "shown" : "hidden" } : { whileInView: "shown", viewport: { once: true, margin: "-80px" } };

    return (
        <motion.span aria-label={label} role="text" initial="hidden" {...animateProps} transition={{ staggerChildren: stagger, delayChildren: delay }}>
            {words.map(({ word, className }, i) => (
                <Fragment key={i}>
                    <span className="split-word" aria-hidden="true">
                        <motion.span
                            className={className}
                            style={{ display: "inline-block" }}
                            variants={{
                                hidden: { y: "110%", rotate: 4 },
                                shown: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EXPO } },
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                    {/* The space must sit outside the inline-block mask, or the browser drops it. */}
                    {i < words.length - 1 && " "}
                </Fragment>
            ))}
        </motion.span>
    );
}

/* ──────────────────────────────────────────────────────────────
   CountUp — numbers roll up from 0 when they enter the viewport.
   ────────────────────────────────────────────────────────────── */
export function CountUp({ to, duration = 1.6, delay = 0 }: { to: number; duration?: number; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const reduce = useReducedMotion();
    const [value, setValue] = useState(reduce ? to : 0);

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, to, { duration, delay, ease: EXPO, onUpdate: (v) => setValue(Math.round(v)) });
        return () => controls.stop();
    }, [inView, reduce, to, duration, delay]);

    return <span ref={ref}>{value}</span>;
}

/* ──────────────────────────────────────────────────────────────
   Magnetic — the element leans toward the cursor (focal CTAs only).
   ────────────────────────────────────────────────────────────── */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const reduce = useReducedMotion();
    const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });
    const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });

    const onMove = (e: React.PointerEvent) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span ref={ref} style={{ x, y, display: "inline-flex" }} onPointerMove={onMove} onPointerLeave={reset}>
            {children}
        </motion.span>
    );
}

/* ──────────────────────────────────────────────────────────────
   usePointerTilt — 3D tilt + a cursor-following light for cards.
   Writes --mx/--my (light position) and returns rotate values.
   ────────────────────────────────────────────────────────────── */
export function usePointerTilt(maxDeg = 8) {
    const reduce = useReducedMotion();
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const sx = useSpring(px, { stiffness: 160, damping: 18 });
    const sy = useSpring(py, { stiffness: 160, damping: 18 });
    const rotateX = useTransform(sy, [0, 1], [maxDeg, -maxDeg]);
    const rotateY = useTransform(sx, [0, 1], [-maxDeg, maxDeg]);
    const lightX = useTransform(px, (v) => `${v * 100}%`);
    const lightY = useTransform(py, (v) => `${v * 100}%`);
    const light = useMotionTemplate`radial-gradient(420px circle at ${lightX} ${lightY}, rgba(59, 130, 246, 0.16), transparent 45%)`;

    const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
    };
    const onPointerLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return {
        handlers: { onPointerMove, onPointerLeave },
        style: reduce ? {} : { rotateX, rotateY, transformPerspective: 1100 },
        light: light as MotionValue<string>,
    };
}

/* ──────────────────────────────────────────────────────────────
   DrawLine — wraps a list and draws an accent line down its left
   edge in step with the scroll position.
   ────────────────────────────────────────────────────────────── */
export function DrawLine({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <div ref={ref} className="draw-line">
            <span className="draw-line__track" aria-hidden="true">
                <motion.span className="draw-line__fill" style={{ scaleY }} />
            </span>
            {children}
        </div>
    );
}
