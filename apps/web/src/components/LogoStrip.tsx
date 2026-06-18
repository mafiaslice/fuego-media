import { useEffect, useRef } from "react";

const BRANDS = [
  "Meridian","Aurora","NorthGov","Pulse","Lumen","Vantage","Field & Co.","Orbit","Maison",
];

export default function LogoStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let offset = 0;
    let running = true;
    let half = 0;

    const measure = () => { half = track.scrollWidth / 2; };
    measure();

    const step = () => {
      if (!running) return;
      if (half === 0) measure();
      offset -= 0.32;
      if (half > 0) {
        while (offset <= -half) offset += half;
        while (offset > 0) offset -= half;
      }
      track.style.transform = `translate3d(${offset}px,0,0)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    window.addEventListener("resize", measure);
    return () => { running = false; window.removeEventListener("resize", measure); };
  }, []);

  const cards = [...BRANDS, ...BRANDS];

  return (
    <section style={{
      background: "#520a18",
      padding: "clamp(34px,5vw,56px) 0",
      borderTop: "1px solid rgba(231,225,210,.1)",
      borderBottom: "1px solid rgba(0,0,0,.3)",
    }}>
      <div style={{
        textAlign: "center", fontSize: 12, letterSpacing: ".26em",
        textTransform: "uppercase" as const,
        color: "rgba(231,225,210,.62)", marginBottom: "clamp(26px,3.4vw,40px)",
      }}>
        Trusted by brands, broadcasters &amp; governments
      </div>
      <div style={{
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
        maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
      }}>
        <div ref={trackRef} style={{
          display: "flex", gap: "clamp(18px,2.2vw,34px)",
          width: "max-content", willChange: "transform", padding: "0 17px",
        }}>
          {cards.map((name, i) => (
            <div key={i} style={{
              flex: "0 0 auto",
              width: "clamp(160px,18vw,212px)",
              height: "clamp(78px,9vw,108px)",
              border: "1px solid rgba(231,225,210,.22)",
              borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(231,225,210,.03)",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2.4vw,28px)", letterSpacing: ".04em", color: "rgba(231,225,210,.7)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
