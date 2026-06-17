import { useState, useEffect, useRef, useCallback } from "react";

interface CarouselTile {
  id: number;
  title: string;
  category: string;
  thumbnail_url: string;
}

interface HeroCarouselProps {
  tiles: CarouselTile[];
}

const CATEGORY_LABELS: Record<string, string> = {
  documentary: "Documentary",
  commercial: "Ad Campaign",
  live: "Live Event",
  content: "Content",
};

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #160407 0%, #2d0a10 50%, #1a0508 100%)",
  "linear-gradient(135deg, #0d0203 0%, #160407 50%, #2a0810 100%)",
  "linear-gradient(135deg, #1a0810 0%, #c2a06a22 50%, #160407 100%)",
];

export default function HeroCarousel({ tiles }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = Math.min(tiles.length, 12);
  const visibleTiles = tiles.slice(0, count);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + count) % count);
      setPaused(true);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => setPaused(false), 3000);
    },
    [count]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (count === 0) return;
    if (paused) {
      if (playTimer.current) clearInterval(playTimer.current);
      return;
    }
    playTimer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 2500);
    return () => {
      if (playTimer.current) clearInterval(playTimer.current);
    };
  }, [paused, count]);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      if (playTimer.current) clearInterval(playTimer.current);
    };
  }, []);

  if (count === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "85vh",
          background: PLACEHOLDER_GRADIENTS[0],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            color: "var(--bone)",
            opacity: 0.3,
          }}
        >
          FUEGO MEDIA
        </p>
      </div>
    );
  }

  const tile = visibleTiles[current];

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "85vh",
        overflow: "hidden",
        background: "var(--maroon)",
      }}
    >
      {/* Slides */}
      {visibleTiles.map((t, i) => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            backgroundImage: t.thumbnail_url
              ? `url(${t.thumbnail_url})`
              : PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(22,4,7,0.85) 0%, rgba(22,4,7,0.2) 60%, rgba(22,4,7,0.1) 100%)",
        }}
      />

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: "5rem",
          left: "3rem",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          {CATEGORY_LABELS[tile.category] ?? tile.category}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.1,
            maxWidth: "600px",
          }}
        >
          {tile.title}
        </h2>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        style={{
          position: "absolute",
          left: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          background: "rgba(22,4,7,0.5)",
          border: "1px solid rgba(231,225,210,0.2)",
          color: "var(--bone)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "rgba(194,160,106,0.3)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "rgba(22,4,7,0.5)")
        }
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        style={{
          position: "absolute",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          background: "rgba(22,4,7,0.5)",
          border: "1px solid rgba(231,225,210,0.2)",
          color: "var(--bone)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "rgba(194,160,106,0.3)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "rgba(22,4,7,0.5)")
        }
      >
        ›
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {visibleTiles.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "var(--gold)" : "rgba(231,225,210,0.3)",
              border: "none",
              padding: 0,
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
