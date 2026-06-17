import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Category, Project } from "@fuego/shared";
import { fetchProjects } from "../api/client";
import VideoLightbox from "../components/VideoLightbox";

interface ServicePageProps {
  category: Category;
}

const CATEGORY_META: Record<
  Category,
  {
    label: string;
    philosophy: string;
    process: string;
  }
> = {
  documentary: {
    label: "Documentary",
    philosophy:
      "For us, documentary is not observation — it is participation. We enter the worlds of our subjects with patience and without agenda, letting stories surface at their own pace. The camera becomes a quiet collaborator, present long enough to earn moments that cannot be staged. We believe the most powerful documentary work lives in contradiction: in the gap between what people say and what they feel, between the world as it is and the world as it could be. Every frame is a commitment to truth, and every edit a negotiation with complexity.",
    process:
      "Our documentary process begins months before a single frame is shot. Research, relationship-building, and pre-production are treated as creative acts in themselves. We work in small, nimble teams — typically a director, cinematographer, and sound recordist — to reduce footprint and maximize intimacy. In post, we collaborate closely with editors and composers who understand that documentary rhythm is earned, not manufactured. The result is work that respects its subjects, challenges its audience, and endures.",
  },
  commercial: {
    label: "Ad Campaigns & Commercials",
    philosophy:
      "We believe commercial work is not lesser work. The constraint of a 30-second frame, the demand of a brand brief, the pressure of a launch date — these are not obstacles. They are the conditions under which we discover what we're truly capable of. Great commercial filmmaking is an act of translation: taking a brand's values and a human truth and finding the image that holds both at once. We bring the same visual rigor and narrative instinct to a product spot that we bring to a feature documentary.",
    process:
      "From concept through delivery, we run commercial productions with the efficiency of a seasoned crew and the ambition of a boutique studio. Pre-production begins with a deep immersion in the brand: its history, its audience, its aspiration. We develop treatments that push beyond the brief while honoring its intent. On set, we work fast without sacrificing craft. In color and sound, we finish to broadcast standard. Deliverables arrive on time, in every format required.",
  },
  live: {
    label: "Live Events",
    philosophy:
      "Live is the one format that cannot be undone. There is no second take, no reshooting the cutaway, no fixing it in post. This irreversibility is what makes live event filmmaking so clarifying. You must be present, prepared, and willing to make decisions in real time that you will live with forever. We love that. Live events reveal a team's true character — and ours is one of calm, adaptability, and uncompromising attention to what is happening right now in front of the lens.",
    process:
      "Multi-camera live coverage requires coordination that most production companies underestimate. We begin with a thorough site visit and technical rider, mapping sight lines, power requirements, and communication protocols weeks in advance. On the day, our A/V director leads a team that has rehearsed every transition. We shoot for both the live cut and a post-produced archive cut, ensuring that what you have at day's end is both an immediate deliverable and a lasting artifact.",
  },
  content: {
    label: "Content Shorts & Reels",
    philosophy:
      "Short-form content is where the next generation of audiences lives, and we take it as seriously as any long-form work. The challenge is not brevity — it is density. Every second must earn its place. We apply the same compositional discipline, the same attention to light and sound, the same commitment to authentic performance that defines our larger productions. The result is content that does not feel like content: it feels like something you want to watch again.",
    process:
      "Content production at Fuego is built for velocity without sacrificing quality. We maintain a roster of agile one- and two-person crews trained for vertical formats, social platforms, and the unpredictable conditions of run-and-gun shooting. Turnaround windows are tight by design. We build scalable workflows — from shoot to edit to delivery — that allow brands and creators to publish consistently without losing the visual standard their audience expects.",
  },
};

function ProjectTile({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const isVertical = project.aspect === "vertical";
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        aspectRatio: isVertical ? "9 / 16" : "16 / 9",
        borderRadius: "3px",
        overflow: "hidden",
        cursor: "pointer",
        background: "rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => {
        const overlay = (e.currentTarget as HTMLElement).querySelector(
          ".sp-overlay"
        ) as HTMLElement | null;
        if (overlay) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const overlay = (e.currentTarget as HTMLElement).querySelector(
          ".sp-overlay"
        ) as HTMLElement | null;
        if (overlay) overlay.style.opacity = "0";
      }}
    >
      {project.thumbnail_url ? (
        <img
          src={project.thumbnail_url}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #1e0509 0%, #2d0a10 100%)",
          }}
        />
      )}
      <div
        className="sp-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(22,4,7,0.9) 0%, rgba(22,4,7,0.2) 60%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.2rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
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
    </div>
  );
}

export default function ServicePage({ category }: ServicePageProps) {
  const meta = CATEGORY_META[category];
  const { data = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects", category],
    queryFn: () => fetchProjects(category) as Promise<Project[]>,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div style={{ background: "var(--maroon)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          padding: "8rem 2.5rem 5rem",
          borderBottom: "1px solid rgba(194,160,106,0.15)",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "1rem",
          }}
        >
          Fuego Media
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
          }}
        >
          {meta.label}
        </h1>
      </div>

      {/* Project grid */}
      <section style={{ padding: "4rem 2.5rem" }}>
        {isLoading ? (
          <p style={{ color: "var(--bone)", opacity: 0.4, fontSize: "0.85rem" }}>
            Loading...
          </p>
        ) : data.length === 0 ? (
          <p style={{ color: "var(--bone)", opacity: 0.4, fontSize: "0.85rem" }}>
            No projects yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                category === "content"
                  ? "repeat(auto-fill, minmax(220px, 1fr))"
                  : "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1rem",
            }}
          >
            {data.map((project) => (
              <ProjectTile
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Editorial copy */}
      <section
        style={{
          padding: "5rem 2.5rem",
          borderTop: "1px solid rgba(194,160,106,0.1)",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.2rem",
            }}
          >
            What this means to us
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 300,
              color: "var(--bone)",
              lineHeight: 1.75,
              opacity: 0.85,
            }}
          >
            {meta.philosophy}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.2rem",
            }}
          >
            How we make it
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 300,
              color: "var(--bone)",
              lineHeight: 1.75,
              opacity: 0.85,
            }}
          >
            {meta.process}
          </p>
        </div>
      </section>

      {selectedProject && (
        <VideoLightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
