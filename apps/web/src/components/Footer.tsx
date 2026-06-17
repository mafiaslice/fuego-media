import { Link } from "react-router-dom";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

const EXPLORE_LINKS = [
  { label: "Documentary", to: "/documentary" },
  { label: "Commercials", to: "/commercials" },
  { label: "Live", to: "/live" },
  { label: "Content", to: "/content" },
  { label: "Contact", href: "mailto:hello@fuegomedia.com" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--maroon)",
        borderTop: "1px solid rgba(194,160,106,0.2)",
        padding: "4rem 2.5rem 2rem",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "var(--bone)",
            letterSpacing: "0.15em",
          }}
        >
          FUEGO
        </Link>

        {/* Social links */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--bone)",
                opacity: 0.6,
                transition: "opacity 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--bone)";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6";
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Explore column */}
      <div style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "1rem",
          }}
        >
          Explore
        </p>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {EXPLORE_LINKS.map((link) =>
            "to" in link ? (
              <Link
                key={link.label}
                to={link.to!}
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  color: "var(--bone)",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")
                }
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  color: "var(--bone)",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")
                }
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(231,225,210,0.1)",
          paddingTop: "1.5rem",
          fontSize: "0.7rem",
          color: "var(--bone)",
          opacity: 0.4,
          letterSpacing: "0.06em",
        }}
      >
        © 2024 Fuego Media. All rights reserved.
      </div>
    </footer>
  );
}
