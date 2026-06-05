export default function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "28px 32px",
        }}>
            <div style={{
                maxWidth: "1280px", margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: "12px",
            }}>
                <span style={{ color: "rgba(240,244,255,0.28)", fontSize: "0.8125rem", fontFamily: "'JetBrains Mono', monospace" }}>
                    © 2026 Marco Mina · Flutter Developer
                </span>
            </div>
        </footer>
    );
}
