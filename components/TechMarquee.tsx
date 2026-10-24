"use client";

import { useRef } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";
import { techStack } from "@/lib/site-data";

const BASE_SPEED = 2.2; // % of the track per second

/** Keeps v inside [min, max) so the two identical groups loop seamlessly. */
const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

/** Tech strip that drifts on its own and speeds up / flips direction with the visitor's scrolling. */
export default function TechMarquee() {
    const reduce = useReducedMotion();
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
    const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
    const direction = useRef(-1);
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        if (reduce) return;
        const b = boost.get();
        if (b < 0) direction.current = 1;
        else if (b > 0) direction.current = -1;
        const move = direction.current * BASE_SPEED * (delta / 1000);
        baseX.set(baseX.get() + move + move * Math.abs(b));
    });

    return (
        <div className="marquee" role="region" aria-label="Technologies I work with">
            <motion.div className="marquee__track" style={{ x }}>
                {[0, 1].map((copy) => (
                    <ul key={copy} className="marquee__group" aria-hidden={copy === 1 ? true : undefined}>
                        {techStack.map((tech) => (
                            <li key={tech} className="marquee__item">{tech}</li>
                        ))}
                    </ul>
                ))}
            </motion.div>
        </div>
    );
}
