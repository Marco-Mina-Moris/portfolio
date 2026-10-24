"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Site-wide fixed background: slow-drifting blue/indigo light fields that shift a little with scroll,
 * a fine film grain (prevents gradient banding), and an edge vignette. Pure gradients, no blur filters.
 */
export default function Backdrop() {
    const { scrollYProgress } = useScroll();
    const shiftA = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
    const shiftB = useTransform(scrollYProgress, [0, 1], ["0vh", "25vh"]);

    return (
        <div className="backdrop" aria-hidden="true">
            <motion.div className="backdrop__layer" style={{ y: shiftA }}>
                <span className="backdrop__orb backdrop__orb--a" />
                <span className="backdrop__orb backdrop__orb--c" />
            </motion.div>
            <motion.div className="backdrop__layer" style={{ y: shiftB }}>
                <span className="backdrop__orb backdrop__orb--b" />
                <span className="backdrop__orb backdrop__orb--d" />
            </motion.div>
            <span className="backdrop__grain" />
            <span className="backdrop__vignette" />
        </div>
    );
}
