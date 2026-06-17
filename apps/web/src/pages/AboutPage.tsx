const TEAM = [
  { name: "Alejandro Reyes", role: "Director & Founder" },
  { name: "Sasha Moreau", role: "Executive Producer" },
  { name: "Tomás Vidal", role: "Director of Photography" },
  { name: "Priya Nair", role: "Head of Post Production" },
  { name: "Marcus Feld", role: "Sound Designer" },
  { name: "Leila Ortega", role: "Production Coordinator" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--maroon)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          padding: "8rem 2.5rem 5rem",
          borderBottom: "1px solid rgba(194,160,106,0.15)",
          maxWidth: "900px",
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
          Our Story
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
          About Fuego Media
        </h1>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: "720px",
          padding: "5rem 2.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.75,
            marginBottom: "2rem",
            opacity: 0.9,
          }}
        >
          Fuego Media is an independent production company founded on the belief that the
          most compelling stories are the ones that refuse to be simplified. We work across
          documentary, commercial, live events, and short-form content — not because we
          lack focus, but because we believe the discipline of one informs the craft of
          all.
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.8,
            marginBottom: "2rem",
            opacity: 0.75,
          }}
        >
          We started as a two-person crew with one camera and an unshakeable conviction
          that good work speaks for itself. Years later, that conviction has not changed.
          What has changed is our capacity — our team, our equipment, our network of
          collaborators — but never our commitment to the image. Every project we take on
          is treated as if it is the only project we are working on.
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.8,
            opacity: 0.75,
          }}
        >
          We are based in Los Angeles, but our work takes us wherever the story lives.
          We have shot in forty-two countries, across six continents, in conditions ranging
          from studio-controlled perfection to documentary chaos. We are equally at home in
          both. What we are not at home with is mediocrity — and that is the only thing
          that has ever defined us.
        </p>
      </div>

      {/* Team */}
      <div
        style={{
          padding: "0 2.5rem 6rem",
          borderTop: "1px solid rgba(194,160,106,0.1)",
          maxWidth: "1100px",
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
            padding: "3rem 0 2rem",
          }}
        >
          The Team
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {TEAM.map((member) => (
            <div key={member.name}>
              {/* Placeholder avatar */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: "linear-gradient(135deg, #1e0509 0%, #2a0b12 100%)",
                  borderRadius: "3px",
                  marginBottom: "1rem",
                  border: "1px solid rgba(194,160,106,0.1)",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: "var(--bone)",
                  marginBottom: "0.2rem",
                }}
              >
                {member.name}
              </p>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  opacity: 0.8,
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
