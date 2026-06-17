const CLIENTS = [
  "CLIENT 01",
  "CLIENT 02",
  "CLIENT 03",
  "CLIENT 04",
  "CLIENT 05",
  "CLIENT 06",
  "CLIENT 07",
  "CLIENT 08",
];

export default function LogoStrip() {
  // Duplicate for seamless loop
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div
      style={{
        background: "var(--bone)",
        overflow: "hidden",
        padding: "1.2rem 0",
        borderTop: "1px solid rgba(22,4,7,0.15)",
        borderBottom: "1px solid rgba(22,4,7,0.15)",
      }}
    >
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-track {
          display: flex;
          animation: scrollLeft 20s linear infinite;
          width: max-content;
        }
        .logo-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="logo-track">
        {items.map((client, i) => (
          <div
            key={i}
            style={{
              padding: "0 3.5rem",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--maroon)",
              opacity: 0.5,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "3.5rem",
            }}
          >
            {client}
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--gold)",
                display: "inline-block",
                opacity: 0.6,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
