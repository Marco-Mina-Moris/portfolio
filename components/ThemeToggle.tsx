"use client";

import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";
export const THEME_KEY = "theme";

/**
 * Runs in <head> before first paint: saved choice, else the system preference.
 * Keeps the page from flashing the wrong theme on load.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

function applyTheme(next: Theme) {
    document.documentElement.dataset.theme = next;
    try {
        localStorage.setItem(THEME_KEY, next);
    } catch {
        /* private mode: theme still switches for this visit */
    }
}

/** Sun/moon button. Both icons are rendered and CSS shows the right one, so server and client markup match. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const next: Theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduce || !("startViewTransition" in document)) {
            applyTheme(next);
            return;
        }

        // Circular reveal of the new theme, growing from the button.
        const x = e.clientX || window.innerWidth - 40;
        const y = e.clientY || 36;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const transition = document.startViewTransition(() => applyTheme(next));
        transition.ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
            );
        });
    };

    return (
        <button type="button" className={`icon-btn theme-toggle ${className}`} onClick={toggle} aria-label="Toggle light and dark theme" title="Toggle theme">
            <Sun size={18} className="icon-sun" aria-hidden="true" />
            <Moon size={18} className="icon-moon" aria-hidden="true" />
        </button>
    );
}
