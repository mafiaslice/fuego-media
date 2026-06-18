import { useEffect } from "react";

interface Props {
  title: string;
  videoUrl?: string;
  onClose: () => void;
}

function getEmbedUrl(url: string): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
}

export default function VideoLightbox({ title, videoUrl, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(9,2,4,.86)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px,4vw,56px)",
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 1040 }}>
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: 16, marginBottom: 14,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a" }}>Now playing</span>
            <h3 style={{ margin: "6px 0 0", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(26px,4vw,42px)", lineHeight: 1, color: "#f3eee0" }}>{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              flex: "0 0 auto", width: 46, height: 46, borderRadius: "50%",
              border: "1px solid rgba(231,225,210,.3)", background: "transparent",
              color: "#e7e1d2", fontSize: 20, cursor: "pointer",
              transition: "background .25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(231,225,210,.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            &times;
          </button>
        </div>

        <div style={{
          position: "relative", width: "100%", aspectRatio: "16/9",
          borderRadius: 6, overflow: "hidden",
          border: "1px solid rgba(231,225,210,.16)",
          background: "linear-gradient(150deg,#3a0b16,#52101f 50%,#1a0508)",
        }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <>
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(135deg,rgba(231,225,210,.04) 0 2px,transparent 2px 11px)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 18 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 74, height: 74, borderRadius: "50%", background: "rgba(194,160,106,.92)" }}>
                  <span style={{ width: 0, height: 0, borderLeft: "22px solid #1c0509", borderTop: "14px solid transparent", borderBottom: "14px solid transparent", marginLeft: 6 }} />
                </span>
                <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 12, letterSpacing: ".1em", color: "rgba(231,225,210,.6)" }}>[ YouTube / Vimeo embed loads here ]</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
