import { useState, useEffect, useRef, useCallback } from "react";
import { useThumbnail } from "../hooks/useThumbnail";

export interface HeroSlide {
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface Props {
  slides: HeroSlide[];
  onPlay: (videoUrl: string, title: string) => void;
}

function SlideBg({ slide, active, phase }: { slide: HeroSlide; active: boolean; phase: "rest" | "play" }) {
  const derived = useThumbnail(slide.thumbnailUrl ? "" : slide.videoUrl);
  const thumb = slide.thumbnailUrl || derived;
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: thumb ? `url("${thumb}")` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#160407",
      transform: `scale(${active && phase === "play" ? 1.09 : 1.0})`,
      transition: "transform 6s ease-out",
      willChange: "transform",
    }}>
      {!thumb && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 70% 22%, #6e1626 0%, #3a0b16 46%, #150406 100%)" }} />
      )}
    </div>
  );
}

export default function HeroCarousel({ slides, onPlay }: Props) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"rest" | "play">("rest");
  const paused = useRef(false);
  const t1 = useRef<ReturnType<typeof setTimeout>>();
  const t2 = useRef<ReturnType<typeof setTimeout>>();

  const schedule = useCallback(() => {
    clearTimeout(t1.current); clearTimeout(t2.current);
    if (paused.current) return;
    t1.current = setTimeout(() => {
      setPhase("play");
      t2.current = setTimeout(() => {
        setIdx(i => (i + 1) % slides.length);
        setPhase("rest");
        schedule();
      }, 3400);
    }, 2400);
  }, [slides.length]);

  useEffect(() => {
    schedule();
    return () => { clearTimeout(t1.current); clearTimeout(t2.current); };
  }, [schedule]);

  const goTo = (i: number) => {
    clearTimeout(t1.current); clearTimeout(t2.current);
    setIdx(i); setPhase("rest");
    schedule();
  };

  const cur = slides[idx] ?? slides[0];
  if (!cur) return null;
  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  return (
    <section
      id="top"
      onMouseEnter={() => { paused.current = true; clearTimeout(t1.current); clearTimeout(t2.current); }}
      onMouseLeave={() => { paused.current = false; schedule(); }}
      style={{ position: "relative", height: "100vh", minHeight: 600, width: "100%", overflow: "hidden", background: "#160407" }}
    >
      {slides.map((s, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          opacity: i === idx ? 1 : 0,
          zIndex: i === idx ? 2 : 1,
          transition: "opacity 1.3s ease",
          pointerEvents: "none",
        }}>
          <SlideBg slide={s} active={i === idx} phase={phase} />
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0 1px, transparent 1px 3px)", mixBlendMode: "overlay" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,4,7,.52) 0%, rgba(20,4,7,0) 28%, rgba(20,4,7,.18) 58%, rgba(20,4,7,.94) 100%)" }} />
        </div>
      ))}

      {/* Bottom content */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 20,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        gap: 28, flexWrap: "wrap" as const,
        padding: "0 clamp(18px,5vw,72px) clamp(40px,6vh,72px)",
      }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a" }}>{cur.category}</span>
            <span style={{ width: 34, height: 1, background: "rgba(231,225,210,.4)" }} />
            <span style={{ fontSize: 13, letterSpacing: ".12em", color: "rgba(231,225,210,.6)", fontVariantNumeric: "tabular-nums" }}>{counter}</span>
          </div>
          <h1 style={{
            margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 500,
            fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.1, letterSpacing: "-.01em",
            color: "#f3eee0",
          }}>
            {cur.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30 }}>
            <button
              onClick={() => onPlay(cur.videoUrl, cur.title)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 13,
                background: "rgba(231,225,210,.06)", border: "1px solid rgba(231,225,210,.5)",
                color: "#e7e1d2", padding: "13px 24px 13px 18px", borderRadius: 40,
                cursor: "pointer", fontFamily: "'Raleway'", fontSize: 13, fontWeight: 400,
                letterSpacing: ".14em", textTransform: "uppercase" as const,
                transition: "background .25s, border-color .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(231,225,210,.14)"; e.currentTarget.style.borderColor = "#e7e1d2"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(231,225,210,.06)"; e.currentTarget.style.borderColor = "rgba(231,225,210,.5)"; }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: "#c2a06a" }}>
                <span style={{ width: 0, height: 0, borderLeft: "11px solid #1c0509", borderTop: "7px solid transparent", borderBottom: "7px solid transparent", marginLeft: 3 }} />
              </span>
              Play film
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => goTo((idx - 1 + slides.length) % slides.length)} aria-label="Previous"
            style={{ width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(231,225,210,.28)", background: "rgba(20,4,7,.3)", color: "#e7e1d2", cursor: "pointer", fontSize: 18, transition: "background .25s,border-color .25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(231,225,210,.12)"; e.currentTarget.style.borderColor = "rgba(231,225,210,.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(20,4,7,.3)"; e.currentTarget.style.borderColor = "rgba(231,225,210,.28)"; }}
          >←</button>
          <button onClick={() => goTo((idx + 1) % slides.length)} aria-label="Next"
            style={{ width: 50, height: 50, borderRadius: "50%", border: "1px solid rgba(231,225,210,.28)", background: "rgba(20,4,7,.3)", color: "#e7e1d2", cursor: "pointer", fontSize: 18, transition: "background .25s,border-color .25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(231,225,210,.12)"; e.currentTarget.style.borderColor = "rgba(231,225,210,.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(20,4,7,.3)"; e.currentTarget.style.borderColor = "rgba(231,225,210,.28)"; }}
          >→</button>
        </div>
      </div>

      {/* Tick marks */}
      <div style={{
        position: "absolute",
        left: "clamp(18px,5vw,72px)", right: "clamp(18px,5vw,72px)",
        bottom: 26, zIndex: 20, display: "flex", gap: 8,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            style={{ flex: "1 1 0", height: 3, border: 0, padding: 0, cursor: "pointer", borderRadius: 2, background: i === idx ? "#c2a06a" : "rgba(231,225,210,.22)", transition: "background .4s" }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", left: "50%", bottom: 96, zIndex: 15, animation: "fuegoFloat 2.8s ease-in-out infinite", pointerEvents: "none" }}>
        <span style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.45)" }}>Scroll</span>
      </div>
    </section>
  );
}
