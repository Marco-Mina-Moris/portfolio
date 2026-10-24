"use client";

import { motion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
}

/** Fades and lifts its children into view once, the first time they scroll on screen. */
export default function Reveal({ children, className, style, delay = 0 }: RevealProps) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}
