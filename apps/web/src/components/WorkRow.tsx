import { useEffect, useRef } from "react";

export interface Tile {
  title: string;
  tag: string;
  dur: string;
  bg: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  isLive?: boolean;
  isContent?: boolean;
}

interface Props {
  num: string;
  title: string;
  subtitle: string;
  tiles: Tile[];
  speed?: number;
  reverse?: boolean;
  darkBg?: boolean;
  onTileClick: (tile: Tile) => void;
}

export default function WorkRow({ num, title, subtitle, tiles, speed = 0.3, reverse = false, darkBg = false, onTileClick }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let offset = 0, paused = false, dragging = false, lastX = 0, moved = 0, half = 0, running = true;
    const dir = reverse ? -1 : 1;

    const measure = () => { half = track.scrollWidth / 2; };
    const wrap = track.parentElement!;

    wrap.addEventListener("mouseenter", () => { paused = true; });
    wrap.addEventListener("mouseleave", () => { if (!dragging) paused = false; });
    wrap.addEventListener("pointerdown", (e) => { dragging = true; paused = true; lastX = e.clientX; moved = 0; });
    const onMove = (e: PointerEvent) => { if (dragging) { const dx = e.clientX - lastX; offset += dx; moved += Math.abs(dx); lastX = e.clientX; } };
    const onUp = () => { if (dragging) { dragging = false; paused = false; } };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    wrap.addEventListener("click", (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

    const step = () => {
      if (!running) return;
      if (half === 0) measure();
      if (!paused) offset -= dir * speed;
      if (half > 0) { while (offset <= -half) offset += half; while (offset > 0) offset -= half; }
      track.style.transform = `translate3d(${offset}px,0,0)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(() => { measure(); step(); });

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [speed, reverse]);

  const isContent = tiles[0]?.isContent;

  return (
    <section style={{
      padding: "clamp(30px,4vw,54px) 0",
      ...(darkBg ? {
        marginTop: "clamp(24px,3vw,40px)",
        background: "linear-gradient(180deg,#3a0a14 0%,#2a0810 100%)",
        borderTop: "1px solid rgba(231,225,210,.1)",
        paddingTop: "clamp(46px,6vw,86px)",
        paddingBottom: "clamp(46px,6vw,86px)",
      } : {}),
    }}>
      <div style={{
        padding: "0 clamp(18px,5vw,72px)",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        gap: 20, marginBottom: "clamp(20px,2.6vw,34px)",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(16px,2vw,22px)", color: "#c2a06a" }}>{num}</span>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(32px,5vw,62px)", lineHeight: 1, color: "#f3eee0" }}>{title}</h2>
        </div>
        <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", whiteSpace: "nowrap" as const }}>{subtitle}</span>
      </div>

      <div style={{
        overflow: "hidden", cursor: "grab",
        WebkitMaskImage: "linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent)",
        maskImage: "linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent)",
      }}>
        <div ref={trackRef} style={{
          display: "flex",
          gap: isContent ? "clamp(14px,1.6vw,26px)" : "clamp(14px,1.5vw,24px)",
          width: "max-content",
          padding: "0 clamp(18px,5vw,72px)",
          willChange: "transform",
        }}>
          {[...tiles, ...tiles].map((t, i) => (
            isContent ? (
              <button
                key={i}
                onClick={() => onTileClick(t)}
                style={{
                  position: "relative", flex: "0 0 auto",
                  width: "clamp(220px,26vw,288px)", aspectRatio: "9/16",
                  border: "1px solid rgba(231,225,210,.12)", padding: 0,
                  cursor: "pointer", overflow: "hidden", borderRadius: 4,
                  background: "#220609", transition: "transform .4s ease, box-shadow .4s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 26px 56px rgba(0,0,0,.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg,#561124 0%,#350b16 55%,#160407 100%)", transformOrigin: "center", animation: "fuegoKenburns 9s ease-in-out infinite alternate" }} />
                <span style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 22%, transparent 40%, rgba(11,3,5,.7) 100%)" }} />
                {t.thumbnailUrl && <img src={t.thumbnailUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
                <span style={{ position: "absolute", left: 13, top: 13, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.85)", background: "rgba(20,4,7,.5)", padding: "4px 9px", borderRadius: 20 }}>▶ Auto</span>
                <span style={{ position: "absolute", right: 13, top: 13, width: 26, height: 26, borderRadius: "50%", background: "rgba(20,4,7,.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(231,225,210,.85)" }}>🔇</span>
                <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, textAlign: "left" as const, padding: "18px 16px", background: "linear-gradient(0deg, rgba(13,3,5,.88), transparent)" }}>
                  <span style={{ display: "block", fontSize: 10.5, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: 5 }}>{t.tag}</span>
                  <span style={{ display: "block", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2.3vw,26px)", lineHeight: 1.06, color: "#f3eee0" }}>{t.title}</span>
                </span>
              </button>
            ) : (
              <button
                key={i}
                onClick={() => onTileClick(t)}
                style={{
                  position: "relative", flex: "0 0 auto",
                  width: "clamp(300px,33vw,440px)", aspectRatio: "16/9",
                  border: "1px solid rgba(231,225,210,.1)", padding: 0,
                  cursor: "pointer", overflow: "hidden", borderRadius: 3,
                  background: t.bg,
                  transition: "transform .4s ease, box-shadow .4s ease, filter .4s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 22px 50px rgba(0,0,0,.45)"; e.currentTarget.style.filter = "brightness(1.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.filter = "none"; }}
              >
                <span style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px)" }} />
                <span style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 50% 26%, transparent 38%, rgba(12,3,5,.62) 100%)" }} />
                {t.thumbnailUrl && <img src={t.thumbnailUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
                {t.isLive && (
                  <span style={{ position: "absolute", left: 14, top: 13, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#e7e1d2", background: "rgba(122,16,28,.62)", padding: "4px 9px", borderRadius: 3 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e7e1d2", display: "inline-block" }} />
                    Live
                  </span>
                )}
                <span style={{ position: "absolute", right: 14, top: 13, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "rgba(231,225,210,.78)", background: "rgba(20,4,7,.42)", padding: "4px 9px", borderRadius: 3, fontVariantNumeric: "tabular-nums" }}>{t.dur}</span>
                <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, textAlign: "left" as const, padding: "18px 18px 16px", background: "linear-gradient(0deg, rgba(15,4,6,.82), transparent)" }}>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: 5 }}>{t.tag}</span>
                  <span style={{ display: "block", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.04, color: "#f3eee0" }}>{t.title}</span>
                </span>
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
