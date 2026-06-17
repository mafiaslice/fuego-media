import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Documentary", to: "/documentary" },
  { label: "Commercials", to: "/commercials" },
  { label: "Live", to: "/live" },
  { label: "Content", to: "/content" },
];

const MORE_LINKS = [
  { label: "About", to: "/about" },
  { label: "BTS", to: "/bts" },
  { label: "For Agencies", to: "/for-agencies" },
];

export default function Nav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartProject = () => {
    if (window.location.pathname === "/") {
      const el = document.getElementById("inquiry");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#inquiry");
    }
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--maroon)",
        borderBottom: "1px solid rgba(194,160,106,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        height: "64px",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.8rem",
          fontWeight: 700,
          color: "var(--bone)",
          letterSpacing: "0.15em",
        }}
      >
        FUEGO
      </Link>

      {/* Center links */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--bone)",
              opacity: 0.85,
              transition: "opacity 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--bone)";
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* More dropdown */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <button
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--bone)",
              opacity: 0.85,
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            More
            <span style={{ fontSize: "0.6rem", marginTop: "1px" }}>▾</span>
          </button>

          {moreOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 12px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#1e0509",
                border: "1px solid rgba(194,160,106,0.25)",
                borderRadius: "4px",
                padding: "0.5rem 0",
                minWidth: "150px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMoreOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.6rem 1.2rem",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--bone)",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(194,160,106,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--bone)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleStartProject}
        style={{
          background: "transparent",
          border: "1px solid var(--gold)",
          color: "var(--gold)",
          fontFamily: "var(--font-body)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "0.55rem 1.3rem",
          borderRadius: "2px",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--maroon)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
        }}
      >
        Start a Project
      </button>
    </nav>
  );
}
