import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Documentary", to: "/documentary" },
  { label: "Commercials", to: "/commercials" },
  { label: "Live", to: "/live" },
  { label: "Content", to: "/content" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const isBts = location.pathname.startsWith("/bts");

  const navBg = scrolled || !isHome
    ? "rgba(18,4,6,.92)"
    : "transparent";
  const navBlur = scrolled || !isHome
    ? "saturate(140%) blur(16px)"
    : "blur(0px)";
  const navBorder = scrolled || !isHome
    ? "1px solid rgba(231,225,210,.12)"
    : "1px solid transparent";

  const activeColor = isBts ? "#b5485c" : "#c2a06a";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 20, flexWrap: "wrap" as const,
      padding: "14px clamp(18px,5vw,72px)",
      transition: "background .45s ease, border-color .45s ease, backdrop-filter .45s ease",
      background: navBg,
      backdropFilter: navBlur,
      WebkitBackdropFilter: navBlur,
      borderBottom: navBorder,
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
        <img src="/assets/logo-ivory.png" alt="Fuego Media" style={{ height: 40, width: "auto", display: "block" }} />
      </Link>

      <nav style={{
        display: "flex", alignItems: "center",
        gap: "clamp(14px,2.4vw,34px)",
        flex: "1 1 auto", justifyContent: "center", minWidth: 0,
      }}>
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" as const,
                color: isActive ? activeColor : "rgba(231,225,210,.62)",
                textDecoration: "none", whiteSpace: "nowrap" as const,
                transition: "color .25s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#e7e1d2"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = isActive ? activeColor : "rgba(231,225,210,.62)"}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{
        flex: "0 0 auto", display: "flex", alignItems: "center",
        gap: "clamp(10px,1.6vw,22px)", position: "relative", zIndex: 60,
      }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "transparent", border: 0, cursor: "pointer",
              fontFamily: "'Raleway'", fontSize: 12, letterSpacing: ".16em",
              textTransform: "uppercase" as const,
              color: ["/about", "/bts", "/for-agencies"].some(p => location.pathname.startsWith(p))
                ? activeColor
                : "rgba(231,225,210,.62)",
              transition: "color .25s", padding: "6px 2px",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#e7e1d2"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = ["/about", "/bts", "/for-agencies"].some(p => location.pathname.startsWith(p)) ? activeColor : "rgba(231,225,210,.62)"}
          >
            More <span style={{ fontSize: 9, opacity: .85, transform: "translateY(1px)", display: "inline-block" }}>&#9662;</span>
          </button>

          {menuOpen && (
            <>
              <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 55 }} />
              <div style={{
                position: "absolute", top: "calc(100% + 15px)", right: 0, zIndex: 61,
                minWidth: 212,
                background: isBts ? "#1a1815" : "#2c0810",
                border: "1px solid rgba(231,225,210,.14)",
                borderRadius: 5, padding: 7,
                boxShadow: "0 20px 54px rgba(0,0,0,.55)",
              }}>
                {[
                  { label: "About", to: "/about" },
                  { label: "BTS — The Field Notebook", to: "/bts" },
                  { label: "For Agencies", to: "/for-agencies" },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block", padding: "11px 14px", borderRadius: 3,
                      fontSize: 13, letterSpacing: ".03em",
                      color: location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                        ? activeColor
                        : "#e7e1d2",
                      textDecoration: "none", transition: "background .2s,color .2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(231,225,210,.07)";
                      (e.currentTarget as HTMLElement).style.color = activeColor;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = location.pathname === link.to ? activeColor : "#e7e1d2";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <Link
          to="/#start"
          onClick={e => {
            if (location.pathname === "/") {
              e.preventDefault();
              document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{
            flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 9,
            background: "#c2a06a", color: "#1c0509", fontWeight: 500,
            fontSize: 12.5, letterSpacing: ".1em", textTransform: "uppercase" as const,
            padding: "11px 20px", borderRadius: 2, textDecoration: "none",
            transition: "transform .25s ease, background .25s ease",
            boxShadow: "0 6px 22px rgba(0,0,0,.28)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#d6b884";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "#c2a06a";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
