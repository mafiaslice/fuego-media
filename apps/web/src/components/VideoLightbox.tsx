import { useEffect } from "react";
import { getEmbedUrl } from "../utils/video";

interface Props {
  title: string;
  videoUrl?: string;
  onClose: () => void;
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
        background: "rgba(9,2,4,.9)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px,4vw,56px)",
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 1040 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a" }}>Now playing</span>
            <h3 style={{ margin: "6px 0 0", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(26px,4vw,42px)", lineHeight: 1, color: "#f3eee0" }}>{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ flex: "0 0 auto", width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(231,225,210,.3)", background: "transparent", color: "#e7e1d2", fontSize: 20, cursor: "pointer", transition: "background .25s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(231,225,210,.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >&times;</button>
        </div>

        <div style={{
          position: "relative", width: "100%", aspectRatio: "16/9",
          borderRadius: 6, overflow: "hidden",
          border: "1px solid rgba(231,225,210,.16)",
          background: "#0a0204",
        }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: ".1em", color: "rgba(231,225,210,.4)" }}>No video URL</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
