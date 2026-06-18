import { Link } from "react-router-dom";

const hov = (color: string) => ({
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = color),
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "#e7e1d2"),
});

export default function Footer() {
  return (
    <footer style={{ background: "#120406", padding: "clamp(50px,6vw,84px) clamp(18px,5vw,72px) 36px" }}>
      <div style={{
        maxWidth: 1240, margin: "0 auto",
        display: "flex", flexWrap: "wrap" as const,
        gap: 40, justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div style={{ maxWidth: 340 }}>
          <Link to="/">
            <img src="/assets/logo-ivory.png" alt="Fuego Media" style={{ height: 54, width: "auto", display: "block", marginBottom: 20 }} />
          </Link>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(231,225,210,.55)" }}>
            A video production studio for brands, individuals, corporates and governments. Documentary, commercials, live events and short-form.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
          <span style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.4)" }}>Explore</span>
          {[
            { label: "Documentary", to: "/documentary" },
            { label: "Commercials", to: "/commercials" },
            { label: "Live Events", to: "/live" },
            { label: "Content", to: "/content" },
          ].map(link => (
            <Link key={link.to} to={link.to} style={{ fontSize: 15, color: "#e7e1d2", textDecoration: "none" }} {...hov("#c2a06a")}>{link.label}</Link>
          ))}
          <a href="/#start" style={{ fontSize: 15, color: "#e7e1d2", textDecoration: "none" }} {...hov("#c2a06a")}>Contact</a>
        </div>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
          <span style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.4)" }}>Follow</span>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 18 }}>
            {["Instagram","YouTube","Vimeo","LinkedIn","TikTok"].map(s => (
              <a key={s} href="#" style={{ fontSize: 14, letterSpacing: ".04em", color: "#e7e1d2", textDecoration: "none" }} {...hov("#c2a06a")}>{s}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: 1240, margin: "clamp(40px,5vw,64px) auto 0",
        paddingTop: 24, borderTop: "1px solid rgba(231,225,210,.1)",
        display: "flex", flexWrap: "wrap" as const,
        gap: 14, justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 13, color: "rgba(231,225,210,.45)" }}>© 2026 Fuego Media. All rights reserved.</span>
        <Link to="/" style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.55)", textDecoration: "none" }} {...hov("#c2a06a")}>
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
