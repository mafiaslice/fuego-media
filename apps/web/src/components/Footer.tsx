import { Link } from "react-router-dom";

const hov = (color: string) => ({
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = color),
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "#e7e1d2"),
});

const hovOpacity = {
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = "1"),
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.opacity = "0.6"),
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/onefuego",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@onefuego",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/onefuegomedia",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/onefuego",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

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
            one mission - turn your brand into something people actually want to watch, share and talk about.
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
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: "#e7e1d2", opacity: 0.6, display: "flex", alignItems: "center", transition: "opacity .2s" }}
                {...hovOpacity}
              >
                {s.icon}
              </a>
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
