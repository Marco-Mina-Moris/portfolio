"use client";

import { useEffect, useRef } from "react";

interface Dot {
    x: number; y: number;
    vx: number; vy: number;
    size: number; opacity: number;
}

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf: number;
        const dots: Dot[] = [];
        const COUNT = 55;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < COUNT; i++) {
            dots.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.18,
                vy: -Math.random() * 0.25 - 0.05,
                size: Math.random() * 1.4 + 0.4,
                opacity: Math.random() * 0.35 + 0.08,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach((d) => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.y < -4) { d.y = canvas.height + 4; d.x = Math.random() * canvas.width; }
                if (d.x < -4) d.x = canvas.width + 4;
                if (d.x > canvas.width + 4) d.x = -4;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(84,197,248,${d.opacity})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
                opacity: 0.7,
            }}
            aria-hidden="true"
        />
    );
}
