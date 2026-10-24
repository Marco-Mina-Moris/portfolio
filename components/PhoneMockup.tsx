"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { BatteryFull, ChevronLeft, ChevronRight, Play, Signal, Wifi } from "lucide-react";
import { EASE } from "./Reveal";

/** Logical viewport the live Flutter build is laid out at, then scaled down to fit the frame. */
const DEVICE_WIDTH = 390;
const SWIPE_THRESHOLD = 60;

interface PhoneMockupProps {
    name: string;
    color: string;
    screens: string[];
    demoUrl?: string;
    bars?: [string, string];
}

type Mode = "screens" | "live";

export default function PhoneMockup({ name, color, screens, demoUrl, bars }: PhoneMockupProps) {
    const hasScreens = screens.length > 0;
    // The running app is the point; screenshots are the fallback (and the only option without a web build).
    const [mode, setMode] = useState<Mode>(demoUrl ? "live" : "screens");

    return (
        <div className="phone-panel" style={{ "--c": color } as React.CSSProperties}>
            {hasScreens && demoUrl && (
                <div className="filters phone-tabs" role="tablist" aria-label={`${name} preview mode`}>
                    {(["live", "screens"] as const).map((m) => (
                        <button
                            key={m}
                            type="button"
                            role="tab"
                            aria-selected={mode === m}
                            className={`filter${mode === m ? " is-active" : ""}`}
                            onClick={() => setMode(m)}
                        >
                            {mode === m && <motion.span layoutId="phone-tab-pill" className="filter__pill" transition={{ duration: 0.35, ease: EASE }} />}
                            {m === "screens" ? "Screenshots" : <><span className="live-dot" aria-hidden="true" /> Live app</>}
                        </button>
                    ))}
                </div>
            )}

            {mode === "screens" ? <ScreensView name={name} screens={screens} /> : <LiveView name={name} demoUrl={demoUrl!} poster={screens[0]} bars={bars} />}
        </div>
    );
}

/** Colors of the system bars, matched to the edge of the screen currently shown. */
interface BarTone {
    top: string;
    bottom: string;
    topDark: boolean;
    bottomDark: boolean;
}

/** Samples the top and bottom rows of a loaded screenshot so the status bar and home indicator blend into the app. */
function sampleTone(img: HTMLImageElement): BarTone | null {
    try {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 2;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return null;
        const x = img.naturalWidth * 0.04;
        ctx.drawImage(img, x, 2, 1, 1, 0, 0, 1, 1);
        ctx.drawImage(img, x, img.naturalHeight - 3, 1, 1, 0, 1, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 2).data;
        const color = (o: number) => `rgb(${d[o]}, ${d[o + 1]}, ${d[o + 2]})`;
        const isDark = (o: number) => 0.299 * d[o] + 0.587 * d[o + 1] + 0.114 * d[o + 2] < 140;
        return { top: color(0), bottom: color(4), topDark: isDark(0), bottomDark: isDark(4) };
    } catch {
        return null;
    }
}

function isDarkHex(hex: string) {
    const n = parseInt(hex.replace("#", ""), 16);
    return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 140;
}

function toneFromBars([top, bottom]: [string, string]): BarTone {
    return { top, bottom, topDark: isDarkHex(top), bottomDark: isDarkHex(bottom) };
}

/** iPhone-style frame: status bar and home indicator are drawn here, so screens and the live app fill only the content area (390×780). */
function PhoneFrame({ children, label, tone }: { children: React.ReactNode; label: string; tone?: BarTone | null }) {
    const style = tone
        ? ({
              "--bar-top": tone.top,
              "--bar-top-fg": tone.topDark ? "#fff" : "#0b0d12",
              "--bar-bottom": tone.bottom,
              "--bar-bottom-fg": tone.bottomDark ? "rgba(255,255,255,0.85)" : "#0b0d12",
          } as React.CSSProperties)
        : undefined;

    return (
        <div className="phone" role="group" aria-roledescription="phone preview" aria-label={label} style={style}>
            <div className="phone__screen">
                <div className="phone__status" aria-hidden="true">
                    <span>9:41</span>
                    <span className="phone__status-icons">
                        <Signal size={13} strokeWidth={2.5} />
                        <Wifi size={13} strokeWidth={2.5} />
                        <BatteryFull size={16} strokeWidth={2} />
                    </span>
                </div>
                <div className="phone__content">{children}</div>
                <div className="phone__home" aria-hidden="true"><span /></div>
            </div>
            <span className="phone__island" aria-hidden="true" />
        </div>
    );
}

function ScreensView({ name, screens }: { name: string; screens: string[] }) {
    const [[index, direction], setState] = useState<[number, number]>([0, 0]);
    const [tones, setTones] = useState<Record<string, BarTone>>({});
    const count = screens.length;

    const go = (dir: number) => setState(([i]) => [(i + dir + count) % count, dir]);
    const jump = (to: number) => setState(([i]) => [to, to > i ? 1 : -1]);

    // framer-motion still fires onTap when a drag is released, so ignore taps right after a drag.
    const lastDragEnd = useRef(0);

    const onDragEnd = (_: unknown, info: PanInfo) => {
        lastDragEnd.current = performance.now();
        if (info.offset.x < -SWIPE_THRESHOLD) go(1);
        else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
    };

    return (
        <>
            <div tabIndex={0} onKeyDown={onKeyDown} className="phone-focus" aria-label={`${name} screens — use arrow keys to browse`}>
                <PhoneFrame label={`${name} screen ${index + 1} of ${count}`} tone={tones[screens[index]]}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={index}
                            className="phone__slide"
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({ x: d >= 0 ? "100%" : "-100%" }),
                                center: { x: 0 },
                                exit: (d: number) => ({ x: d >= 0 ? "-30%" : "30%", opacity: 0.4 }),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: EASE }}
                            drag={count > 1 ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDragEnd={onDragEnd}
                            onTap={(e, info) => {
                                if (count < 2 || performance.now() - lastDragEnd.current < 250) return;
                                const rect = (e.target as HTMLElement).closest(".phone__content")!.getBoundingClientRect();
                                go(info.point.x - window.scrollX < rect.left + rect.width / 2 ? -1 : 1);
                            }}
                        >
                            <Image
                                src={screens[index]}
                                alt={`${name} — screen ${index + 1}`}
                                fill
                                sizes="300px"
                                draggable={false}
                                priority={index === 0}
                                onLoad={(e) => {
                                    const src = screens[index];
                                    const tone = sampleTone(e.currentTarget);
                                    if (tone) setTones((t) => (t[src] ? t : { ...t, [src]: tone }));
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </PhoneFrame>
            </div>

            {count > 1 && (
                <div className="phone-controls">
                    <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous screen"><ChevronLeft size={18} /></button>
                    <div className="phone-dots">
                        {screens.map((src, i) => (
                            <button
                                key={src}
                                type="button"
                                className={`phone-dot${i === index ? " is-active" : ""}`}
                                onClick={() => jump(i)}
                                aria-label={`Show screen ${i + 1}`}
                                aria-current={i === index ? "true" : undefined}
                            />
                        ))}
                    </div>
                    <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next screen"><ChevronRight size={18} /></button>
                </div>
            )}
            <p className="phone-caption">Swipe, tap, or use ← → to browse</p>
        </>
    );
}

const AUTO_LAUNCH_MIN_WIDTH = 1024;
const FIRST_FRAME_TIMEOUT = 20000;

function LiveView({ name, demoUrl, poster, bars }: { name: string; demoUrl: string; poster?: string; bars?: [string, string] }) {
    const screenRef = useRef<HTMLDivElement>(null);
    const [run, setRun] = useState(0); // 0 = not launched yet; bumping it remounts the iframe (restart)
    const [ready, setReady] = useState(false);
    const [tone, setTone] = useState<BarTone | null>(bars ? toneFromBars(bars) : null);
    const [scale, setScale] = useState(1);
    const [height, setHeight] = useState(780);

    const launch = () => {
        setReady(false);
        setRun((r) => r + 1);
    };

    // Lay the app out at a real phone width, then scale it to the frame so it looks and behaves like a device.
    useEffect(() => {
        const el = screenRef.current;
        if (!el) return;
        const update = () => {
            const s = el.clientWidth / DEVICE_WIDTH;
            setScale(s);
            setHeight(el.clientHeight / s);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // On desktop the phone sits beside the case study, so start the app as soon as it scrolls into view.
    // On small screens wait for a tap, so visitors on mobile data don't download a whole app unasked.
    useEffect(() => {
        const el = screenRef.current;
        if (!el || window.innerWidth < AUTO_LAUNCH_MIN_WIDTH) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setRun((r) => r || 1);
                io.disconnect();
            }
        }, { threshold: 0.3 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Keep the cover up until Flutter has painted its first frame, not just until index.html has loaded.
    const onFrameLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
        const win = e.currentTarget.contentWindow;
        const timer = window.setTimeout(() => setReady(true), FIRST_FRAME_TIMEOUT);
        try {
            win?.addEventListener("flutter-first-frame", () => {
                window.clearTimeout(timer);
                setReady(true);
            }, { once: true });
        } catch {
            window.clearTimeout(timer);
            setReady(true);
        }
    };

    return (
        <>
            <PhoneFrame label={`${name} live app`} tone={tone}>
                <div ref={screenRef} style={{ position: "absolute", inset: 0 }}>
                    {run > 0 && (
                        <iframe
                            key={run}
                            src={demoUrl}
                            title={`${name} — live Flutter app`}
                            className="phone__iframe"
                            style={{ width: DEVICE_WIDTH, height, transform: `scale(${scale})` }}
                            onLoad={onFrameLoad}
                            allow="clipboard-write; geolocation"
                        />
                    )}
                    <AnimatePresence>
                        {!ready && (
                            <motion.div className="phone__poster" initial={false} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                {poster && (
                                    <Image
                                        src={poster}
                                        alt=""
                                        fill
                                        sizes="300px"
                                        className="phone__poster-img"
                                        onLoad={(e) => setTone((t) => t ?? sampleTone(e.currentTarget))}
                                    />
                                )}
                                <div className="phone__poster-body">
                                    {run > 0 ? (
                                        <>
                                            <span className="phone__spinner" aria-hidden="true" />
                                            <span className="phone__poster-text">Starting {name}…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="phone__poster-title">{name}</span>
                                            <span className="phone__poster-text">Run the real Flutter app right here in your browser.</span>
                                            <button type="button" className="btn btn--primary btn--sm" onClick={launch}>
                                                <Play size={14} /> Launch live app
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </PhoneFrame>
        </>
    );
}
