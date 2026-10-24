import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, site } from "@/lib/site-data";

export default function Footer({ home = true }: { home?: boolean }) {
    const prefix = home ? "" : "/";

    return (
        <footer className="footer">
            <div className="wrap footer__inner">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="brand__mark">MM</span>
                    <div>
                        <div className="brand__name">{site.name}</div>
                        <div className="footer__copy">© {new Date().getFullYear()} · {site.role}</div>
                    </div>
                </div>

                <nav className="footer__links" aria-label="Footer">
                    {navLinks.map((l) => <a key={l.href} href={`${prefix}${l.href}`}>{l.label}</a>)}
                </nav>

                <div style={{ display: "flex", gap: 10 }}>
                    <a href={site.github} className="icon-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
                    <a href={site.linkedin} className="icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
                    <a href={`mailto:${site.email}`} className="icon-btn" aria-label="Email"><Mail size={18} /></a>
                    <a href={`${prefix}#top`} className="icon-btn" aria-label="Back to top"><ArrowUp size={18} /></a>
                </div>
            </div>
        </footer>
    );
}
