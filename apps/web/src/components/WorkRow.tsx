import { useRef } from "react";
import type { Project } from "@fuego/shared";

interface WorkRowProps {
  title: string;
  projects: Project[];
  onTileClick: (project: Project) => void;
}

export default function WorkRow({ title, projects, onTileClick }: WorkRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  if (projects.length === 0) return null;

  return (
    <div style={{ padding: "3rem 0" }}>
      {/* Row title */}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 400,
          color: "var(--bone)",
          marginBottom: "1.5rem",
          paddingLeft: "2.5rem",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h2>

      {/* Scrollable row */}
      <div
        ref={rowRef}
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {projects.map((project) => (
          <Tile key={project.id} project={project} onClick={() => onTileClick(project)} />
        ))}
      </div>
    </div>
  );
}

function Tile({ project, onClick }: { project: Project; onClick: () => void }) {
  const isVertical = project.aspect === "vertical";
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => undefined);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        flexShrink: 0,
        width: isVertical ? "220px" : "380px",
        aspectRatio: isVertical ? "9 / 16" : "16 / 9",
        borderRadius: "3px",
        overflow: "hidden",
        cursor: "pointer",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      {/* Thumbnail */}
      {project.thumbnail_url ? (
        <img
          src={project.thumbnail_url}
          alt={project.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, #1e0509 0%, #2d0a10 100%)`,
          }}
        />
      )}

      {/* Video for content category */}
      {project.category === "content" && project.video_url && (
        <video
          ref={videoRef}
          src={project.video_url}
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
          onPlay={(e) => {
            (e.currentTarget as HTMLVideoElement).style.opacity = "1";
          }}
          onPause={(e) => {
            (e.currentTarget as HTMLVideoElement).style.opacity = "0";
          }}
        />
      )}

      {/* Hover overlay */}
      <div
        className="tile-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(22,4,7,0.9) 0%, rgba(22,4,7,0.2) 60%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1rem",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.opacity = "0";
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 400,
            color: "var(--bone)",
            marginBottom: "0.25rem",
          }}
        >
          {project.title}
        </p>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          {project.client}
        </p>
      </div>

      {/* Always-visible subtle overlay to reveal on hover */}
      <style>{`
        div:hover > .tile-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
