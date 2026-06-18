import { useEffect, useRef } from "react";

const LOGOS = [
  { file: "0. Meristem.png",               alt: "Meristem" },
  { file: "1. Coca-Cola.png",               alt: "Coca-Cola" },
  { file: "2. Solana.png",                  alt: "Solana" },
  { file: "3. Sterling Bank.png",           alt: "Sterling Bank" },
  { file: "4. Lagos State Government.png",  alt: "Lagos State Government" },
  { file: "05. The Alternative Bank.png",   alt: "The Alternative Bank" },
  { file: "6. Glo.png",                     alt: "Glo" },
  { file: "7. Nivea.png",                   alt: "Nivea" },
  { file: "9. Credit Direct.png",           alt: "Credit Direct" },
  { file: "10. Brass Banking.png",          alt: "Brass Banking" },
  { file: "11. Woodcore.png",               alt: "Woodcore" },
  { file: "12. ArtX.png",                   alt: "ArtX" },
  { file: "13. Hybrid Motors Nigeria.png",  alt: "Hybrid Motors Nigeria" },
  { file: "14. Palton Morgan.png",          alt: "Palton Morgan" },
  { file: "15. ANAP Jets.png",              alt: "ANAP Jets" },
  { file: "16. Premia Business Network.png",alt: "Premia Business Network" },
  { file: "17. IVS Japan.png",              alt: "IVS Japan" },
  { file: "18. Tech Circle NG.png",         alt: "Tech Circle NG" },
  { file: "19. EarniPay.png",               alt: "EarniPay" },
  { file: "20. Ibom Innovation.png",        alt: "Ibom Innovation" },
  { file: "21. Value Hut.png",              alt: "Value Hut" },
  { file: "22. 500 Chow.png",               alt: "500 Chow" },
  { file: "23. Bits Music.png",             alt: "Bits Music" },
  { file: "24. DUNE.png",                   alt: "DUNE" },
  { file: "25. Jason Porsche.png",          alt: "Jason Porsche" },
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

  const cards = [...LOGOS, ...LOGOS];

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
          {cards.map((logo, i) => (
            <div key={i} style={{
              flex: "0 0 auto",
              width: "clamp(140px,16vw,196px)",
              height: "clamp(72px,8vw,100px)",
              border: "1px solid rgba(231,225,210,.14)",
              borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(231,225,210,.03)",
              padding: "clamp(12px,1.4vw,20px) clamp(14px,1.6vw,24px)",
            }}>
              <img
                src={`/logos/${encodeURIComponent(logo.file)}`}
                alt={logo.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  opacity: 0.72,
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
