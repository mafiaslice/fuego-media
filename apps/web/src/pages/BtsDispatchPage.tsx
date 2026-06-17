import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { BtsEntry, BtsImage, ImageSize } from "@fuego/shared";
import { fetchBtsEntry, fetchBtsList } from "../api/client";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function colSpan(size: ImageSize): number {
  if (size === "large") return 3;
  if (size === "medium") return 2;
  return 1;
}

interface BtsEntryWithImages extends BtsEntry {
  images: BtsImage[];
}

export default function BtsDispatchPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: entry, isLoading } = useQuery<BtsEntryWithImages>({
    queryKey: ["bts", slug],
    queryFn: () => fetchBtsEntry(slug!) as Promise<BtsEntryWithImages>,
    enabled: !!slug,
  });

  const { data: allEntries = [] } = useQuery<BtsEntry[]>({
    queryKey: ["bts"],
    queryFn: () => fetchBtsList() as Promise<BtsEntry[]>,
  });

  if (isLoading) {
    return (
      <div
        style={{
          background: "var(--maroon)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--bone)", opacity: 0.4 }}>Loading...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div
        style={{
          background: "var(--maroon)",
          minHeight: "100vh",
          padding: "8rem 2.5rem",
        }}
      >
        <p style={{ color: "var(--bone)", opacity: 0.5 }}>Dispatch not found.</p>
      </div>
    );
  }

  const sortedEntries = [...allEntries].sort(
    (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );
  const currentIndex = sortedEntries.findIndex((e) => e.slug === slug);
  const prevEntry = currentIndex < sortedEntries.length - 1 ? sortedEntries[currentIndex + 1] : null;
  const nextEntry = currentIndex > 0 ? sortedEntries[currentIndex - 1] : null;

  const paragraphs = entry.notes.split(/\n\n+/).filter(Boolean);
  const images = entry.images ?? [];

  return (
    <div style={{ background: "var(--maroon)", minHeight: "100vh" }}>
      {/* Masthead */}
      <div
        style={{
          padding: "7rem 2.5rem 4rem",
          borderBottom: "1px solid rgba(194,160,106,0.12)",
          maxWidth: "900px",
        }}
      >
        <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              border: "1px solid rgba(194,160,106,0.35)",
              padding: "0.25rem 0.6rem",
              borderRadius: "2px",
            }}
          >
            {entry.category}
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              color: "var(--bone)",
              opacity: 0.45,
              letterSpacing: "0.06em",
            }}
          >
            {entry.location} — {formatDate(entry.event_date)}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.05,
            marginBottom: "0.75rem",
          }}
        >
          {entry.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 300,
            color: "var(--gold)",
            opacity: 0.8,
          }}
        >
          {entry.project}
        </p>
      </div>

      {/* Notes */}
      <div style={{ padding: "4rem 2.5rem", maxWidth: "720px" }}>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 300,
              color: "var(--bone)",
              lineHeight: 1.8,
              opacity: 0.82,
              marginBottom: i < paragraphs.length - 1 ? "1.5rem" : 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div style={{ padding: "0 2.5rem 4rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "0.75rem",
              gridAutoRows: "220px",
            }}
          >
            {images.map((img) => (
              <div
                key={img.id}
                style={{
                  gridColumn: `span ${colSpan(img.size as ImageSize)}`,
                  overflow: "hidden",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <img
                  src={img.image_url}
                  alt={img.caption ?? ""}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pull quote */}
      {entry.quote && (
        <div
          style={{
            padding: "4rem 2.5rem",
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            borderTop: "1px solid rgba(194,160,106,0.1)",
            borderBottom: "1px solid rgba(194,160,106,0.1)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--bone)",
              lineHeight: 1.55,
              opacity: 0.88,
            }}
          >
            &ldquo;{entry.quote}&rdquo;
          </p>
        </div>
      )}

      {/* Credits */}
      <div style={{ padding: "2.5rem 2.5rem 0", maxWidth: "720px" }}>
        <p
          style={{
            fontSize: "0.7rem",
            color: "var(--bone)",
            opacity: 0.38,
            letterSpacing: "0.06em",
            lineHeight: 1.7,
          }}
        >
          {entry.credits}
        </p>
      </div>

      {/* Prev / Next */}
      <div
        style={{
          padding: "4rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(194,160,106,0.1)",
          marginTop: "3rem",
        }}
      >
        {prevEntry ? (
          <Link
            to={`/bts/${prevEntry.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                opacity: 0.7,
              }}
            >
              ← Previous
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                color: "var(--bone)",
                opacity: 0.8,
              }}
            >
              {prevEntry.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextEntry ? (
          <Link
            to={`/bts/${nextEntry.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
              alignItems: "flex-end",
              textAlign: "right",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                opacity: 0.7,
              }}
            >
              Next →
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                color: "var(--bone)",
                opacity: 0.8,
              }}
            >
              {nextEntry.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
