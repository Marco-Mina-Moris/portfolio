"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
    // Feeds the cursor position to whichever .card is under it, for the CSS border spotlight.
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const onMove = (e: PointerEvent) => {
            const card = (e.target as Element | null)?.closest?.<HTMLElement>(".card, .contact-link, .feature");
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
