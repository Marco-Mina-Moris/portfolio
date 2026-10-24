"use client";

import { motion } from "framer-motion";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SectionHeadingProps {
    index: string;
    eyebrow: string;
    title: React.ReactNode;
    description?: React.ReactNode;
}

/** Eyebrow types in, the title rises out of a mask, the description follows. */
export default function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
    return (
        <motion.div className="sec-head" initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-80px" }}>
            <div>
                <motion.span
                    className="eyebrow"
                    variants={{ hidden: { opacity: 0, x: -16 }, shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EXPO } } }}
                >
                    {index} — {eyebrow}
                </motion.span>
                <h2 className="display sec-head__title">
                    <span className="mask">
                        <motion.span
                            style={{ display: "block" }}
                            variants={{ hidden: { y: "105%", skewY: 4 }, shown: { y: "0%", skewY: 0, transition: { duration: 1, delay: 0.08, ease: EXPO } } }}
                        >
                            {title}
                        </motion.span>
                    </span>
                </h2>
            </div>
            {description && (
                <motion.p
                    className="sec-head__desc"
                    variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25, ease: EXPO } } }}
                >
                    {description}
                </motion.p>
            )}
        </motion.div>
    );
}
