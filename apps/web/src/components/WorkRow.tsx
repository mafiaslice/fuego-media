import { useEffect, useRef } from "react";
import { useThumbnail } from "../hooks/useThumbnail";

export interface Tile {
  title: string;
  tag: string;
  dur: string;
  bg: string;
  videoUrl?: string;
  thumbnailUrl?: string;   // pre-cached from DB; skips browser fetch when set
  isLive?: boolean;
  isContent?: boolean;
}

interface Props {
  tiles: Tile[];
  speed?: number;
  reverse?: boolean;
  darkBg?: boolean;
  showTitles?: boolean;
  onTileClick: (tile: Tile) => void;
}

function ThumbnailImg({ thumbnailUrl, videoUrl, style }: {
  thumbnailUrl?: string;
  videoUrl?: string;
  style: React.CSSProperties;
}) {
  const derived = useThumbnail(thumbnailUrl ? "" : (videoUrl ?? ""));
  const src = thumbnailUrl || derived;
  if (!src) return null;
  return <img src={src} alt="" style={style} />;
}

// Tag + optional title stacked flush, no gap, bottom-left
function TileLabel({ tag, title, showTitle, padding }: { tag: string; title: string; showTitle: boolean; padding: number }) {
  return (
    <div style={{
      position: "absolute",
      left: padding,
      bottom: padding,
      right: padding,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 3,
    }}>
      <span style={{ fontSize: 9, fontWeight: 400, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.7)", lineHeight: 1 }}>
        {tag}
      </span>
      {showTitle && (
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".03em", color: "rgba(231,225,210,.95)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", lineHeight: 1 }}>
          {title}
        </span>
      )}
    </div>
  );
}

export default function WorkRow({ tiles, speed = 0.3, reverse = false, darkBg = false, showTitles = false, onTileClick }: Props) {
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

    window.addEventListener("resize", measure);
    return () => {
      running = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", measure);
    };
  }, [speed, reverse]);

  const isContent = tiles[0]?.isContent;
  const doubled = [...tiles, ...tiles];

  return (
    <section style={{
      paddingBottom: "clamp(20px,3vw,36px)",
      paddingTop: 0,
      ...(darkBg ? {
        marginTop: "clamp(16px,2vw,28px)",
        background: "linear-gradient(180deg,#3a0a14 0%,#2a0810 100%)",
        borderTop: "1px solid rgba(231,225,210,.1)",
        paddingTop: "clamp(28px,4vw,52px)",
        paddingBottom: "clamp(28px,4vw,52px)",
      } : {}),
    }}>
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
          {doubled.map((t, i) => (
            isContent ? (
              <button key={i} onClick={() => onTileClick(t)} style={{
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
                <ThumbnailImg thumbnailUrl={t.thumbnailUrl} videoUrl={t.videoUrl} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(13,3,5,.65) 0%, transparent 45%)" }} />
                {/* Content/reel tiles: tag only, no title */}
                <TileLabel tag={t.tag} title={t.title} showTitle={false} padding={12} />
              </button>
            ) : (
              <button key={i} onClick={() => onTileClick(t)} style={{
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
                <ThumbnailImg thumbnailUrl={t.thumbnailUrl} videoUrl={t.videoUrl} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(12,3,5,.6) 0%, transparent 40%)" }} />
                <TileLabel tag={t.tag} title={t.title} showTitle={showTitles} padding={14} />
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
