import { Link } from "react-router-dom";

const VALUE_PROPS = [
  {
    title: "Discretion",
    copy: "We understand that when you bring us in, it is your agency's name on the work. We operate with complete discretion — no social posts, no case studies, no portfolio credits without your explicit sign-off. Your client relationship is yours.",
  },
  {
    title: "Scale",
    copy: "Whether you need a two-person documentary crew for an intimate brand story or a full multi-camera production for a national campaign launch, we scale to the brief. Our network of collaborators means we can staff appropriately for any project size without the overhead of a full-time roster.",
  },
  {
    title: "Craft",
    copy: "Agency clients expect perfection, and they should. Every deliverable that leaves our facility has been through a rigorous quality control process. Color, sound, format, spec compliance — we do not cut corners, and we do not deliver work we would not put our own name on.",
  },
];

export default function ForAgenciesPage() {
  return (
    <div style={{ background: "var(--maroon)", minHeight: "100vh" }}>
      {/* Hero */}
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
          Agency Partners
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.0,
            maxWidth: "800px",
          }}
        >
          Your Production Arm
        </h1>
      </div>

      {/* Intro */}
      <div style={{ padding: "5rem 2.5rem", maxWidth: "760px" }}>
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
          The best agencies know when to bring in specialists. We have built Fuego's
          agency practice around a single principle: you should never have to explain us
          to your client. We show up on brand, on brief, on budget, and on time. When
          it works — and it always works — nobody needs to know we were there.
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--bone)",
            lineHeight: 1.8,
            opacity: 0.72,
          }}
        >
          We have served as the invisible production arm for boutique creative agencies,
          global networks, and independent consultancies. Our experience spans broadcast
          campaigns, digital-native content, live brand activations, and long-form
          documentary commissions. In every case, the relationship with the end client
          remains yours.
        </p>
      </div>

      {/* Value props */}
      <div
        style={{
          padding: "0 2.5rem 6rem",
          maxWidth: "1100px",
          margin: "0 auto",
          borderTop: "1px solid rgba(194,160,106,0.1)",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            padding: "3rem 0 2.5rem",
          }}
        >
          Why Fuego
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "3rem",
          }}
        >
          {VALUE_PROPS.map((vp) => (
            <div key={vp.title}>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--gold)",
                  marginBottom: "1.5rem",
                  opacity: 0.6,
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 300,
                  color: "var(--bone)",
                  marginBottom: "1rem",
                }}
              >
                {vp.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "var(--bone)",
                  opacity: 0.68,
                }}
              >
                {vp.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          padding: "5rem 2.5rem",
          textAlign: "center",
          borderTop: "1px solid rgba(194,160,106,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 300,
            color: "var(--bone)",
            marginBottom: "2rem",
          }}
        >
          Let's talk about your next campaign.
        </p>
        <Link
          to="/#inquiry"
          style={{
            display: "inline-block",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "0.9rem 2.5rem",
            borderRadius: "2px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--maroon)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
          }}
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
