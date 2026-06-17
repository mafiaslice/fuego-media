import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@fuego/shared";
import { fetchProjects } from "../api/client";
import HeroCarousel from "../components/HeroCarousel";
import LogoStrip from "../components/LogoStrip";
import WorkRow from "../components/WorkRow";
import VideoLightbox from "../components/VideoLightbox";
import InquiryForm from "../components/InquiryForm";
import NewsletterSignup from "../components/NewsletterSignup";

export default function HomePage() {
  const { data = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetchProjects() as Promise<Project[]>,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const documentaries = data.filter((p) => p.category === "documentary");
  const commercials = data.filter((p) => p.category === "commercial");
  const live = data.filter((p) => p.category === "live");
  const content = data.filter((p) => p.category === "content");

  const hereTiles = data.slice(0, 12).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    thumbnail_url: p.thumbnail_url,
  }));

  return (
    <div style={{ background: "var(--maroon)" }}>
      {/* Hero */}
      <HeroCarousel tiles={hereTiles} />

      {/* Logo strip */}
      <LogoStrip />

      {/* Work rows */}
      <section style={{ padding: "2rem 0" }}>
        <WorkRow
          title="Documentary"
          projects={documentaries}
          onTileClick={setSelectedProject}
        />
        <WorkRow
          title="Ad Campaigns & Commercials"
          projects={commercials}
          onTileClick={setSelectedProject}
        />
        <WorkRow
          title="Live Events"
          projects={live}
          onTileClick={setSelectedProject}
        />
        <WorkRow
          title="Content Shorts & Reels"
          projects={content}
          onTileClick={setSelectedProject}
        />
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <VideoLightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Divider */}
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "var(--gold)",
          margin: "4rem auto",
          opacity: 0.5,
        }}
      />

      {/* Inquiry */}
      <section
        id="inquiry"
        style={{
          padding: "5rem 2.5rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textAlign: "center",
            marginBottom: "0.75rem",
          }}
        >
          Get in Touch
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "var(--bone)",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Start a Project
        </h2>
        <InquiryForm />
      </section>

      {/* Divider */}
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "var(--gold)",
          margin: "0 auto 0",
          opacity: 0.5,
        }}
      />

      {/* Newsletter */}
      <section
        style={{
          padding: "5rem 2.5rem",
          borderTop: "1px solid rgba(231,225,210,0.08)",
        }}
      >
        <NewsletterSignup />
      </section>
    </div>
  );
}
