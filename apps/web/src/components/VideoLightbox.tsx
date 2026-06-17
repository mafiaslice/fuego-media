import { useEffect } from "react";
import type { Project } from "@fuego/shared";

interface VideoLightboxProps {
  project: Project;
  onClose: () => void;
}

function getEmbedUrl(url: string): string {
  // YouTube: handle youtu.be short links and full watch URLs
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1`;

  const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1`;

  // Vimeo: handle vimeo.com/12345 and player.vimeo.com/video/12345
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;

  // Fallback: return raw url
  return url;
}

export default function VideoLightbox({ project, onClose }: VideoLightboxProps) {
  const embedUrl = getEmbedUrl(project.video_url);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "1px solid rgba(231,225,210,0.3)",
          color: "var(--bone)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1001,
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(231,225,210,0.3)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--bone)";
        }}
      >
        ✕
      </button>

      {/* Video container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(90vw, 1100px)",
          aspectRatio: "16 / 9",
          background: "#000",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
        }}
      >
        <iframe
          src={embedUrl}
          title={project.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>

      {/* Caption below */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            color: "var(--bone)",
            marginBottom: "0.2rem",
          }}
        >
          {project.title}
        </p>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {project.client}
        </p>
      </div>
    </div>
  );
}
