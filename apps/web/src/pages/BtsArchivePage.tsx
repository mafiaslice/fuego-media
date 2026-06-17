import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { BtsEntry } from "@fuego/shared";
import { fetchBtsList } from "../api/client";

function groupByYear(entries: BtsEntry[]): Record<string, BtsEntry[]> {
  return entries.reduce<Record<string, BtsEntry[]>>((acc, entry) => {
    const year = new Date(entry.event_date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(entry);
    return acc;
  }, {});
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Assign grid span classes for a contact-sheet feel
const SPAN_PATTERNS = [
  "1 / span 2 / 1 / span 2", // large: 2x2
  "auto / span 1",            // small
  "auto / span 1",            // small
  "auto / span 2",            // wide
  "auto / span 1",
  "auto / span 1",
];

export default function BtsArchivePage() {
  const { data = [], isLoading } = useQuery<BtsEntry[]>({
    queryKey: ["bts"],
    queryFn: () => fetchBtsList() as Promise<BtsEntry[]>,
  });

  const grouped = groupByYear(data);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div style={{ background: "var(--maroon)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "8rem 2.5rem 4rem", borderBottom: "1px solid rgba(194,160,106,0.15)" }}>
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
          Behind the Scenes
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.05,
          }}
        >
          Field Dispatches
        </h1>
      </div>

      {isLoading && (
        <p style={{ padding: "4rem 2.5rem", color: "var(--bone)", opacity: 0.4 }}>
          Loading...
        </p>
      )}

      {!isLoading && data.length === 0 && (
        <p style={{ padding: "4rem 2.5rem", color: "var(--bone)", opacity: 0.4 }}>
          No dispatches yet.
        </p>
      )}

      {years.map((year) => (
        <section key={year} style={{ padding: "4rem 2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 300,
              color: "var(--bone)",
              opacity: 0.25,
              marginBottom: "2rem",
              letterSpacing: "0.05em",
            }}
          >
            {year}
          </p>

          {/* Contact-sheet grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "0.75rem",
              gridAutoRows: "200px",
            }}
          >
            {grouped[year].map((entry, i) => {
              // Alternate sizing for visual interest
              const isLarge = i % 5 === 0;
              const isWide = i % 5 === 3;

              return (
                <Link
                  key={entry.id}
                  to={`/bts/${entry.slug}`}
                  style={{
                    position: "relative",
                    gridColumn: isLarge ? "span 2" : isWide ? "span 3" : "span 2",
                    gridRow: isLarge ? "span 2" : "span 1",
                    overflow: "hidden",
                    borderRadius: "2px",
                    display: "block",
                    background: "rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    const overlay = (e.currentTarget as HTMLElement).querySelector(
                      ".bts-overlay"
                    ) as HTMLElement | null;
                    if (overlay) overlay.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const overlay = (e.currentTarget as HTMLElement).querySelector(
                      ".bts-overlay"
                    ) as HTMLElement | null;
                    if (overlay) overlay.style.opacity = "0";
                  }}
                >
                  {/* Cover image */}
                  {entry.cover_url ? (
                    <img
                      src={entry.cover_url}
                      alt={entry.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "grayscale(20%)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(135deg, #1a0508 0%, #2d0a10 100%)`,
                      }}
                    />
                  )}

                  {/* Overlay */}
                  <div
                    className="bts-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(22,4,7,0.88) 0%, rgba(22,4,7,0.3) 60%, rgba(22,4,7,0.05) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isLarge ? "1.2rem" : "0.95rem",
                        fontWeight: 400,
                        color: "var(--bone)",
                        marginBottom: "0.25rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {entry.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {entry.project}
                    </p>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        color: "var(--bone)",
                        opacity: 0.5,
                      }}
                    >
                      {formatDate(entry.event_date)}
                    </p>
                  </div>

                  {/* Always-visible minimal label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "0.5rem 0.75rem",
                      background:
                        "linear-gradient(to top, rgba(22,4,7,0.6) 0%, transparent 100%)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-display)",
                        color: "var(--bone)",
                        opacity: 0.8,
                      }}
                    >
                      {entry.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
