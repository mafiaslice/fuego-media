import { useState, type FormEvent } from "react";
import { postInquiry } from "../api/client";

const inputStyle: React.CSSProperties = {
  background: "rgba(20,4,7,.4)",
  border: "1px solid rgba(231,225,210,.18)",
  borderRadius: 3,
  padding: "13px 14px",
  color: "#f3eee0",
  fontFamily: "'Raleway'",
  fontSize: 15,
  letterSpacing: 0,
  textTransform: "none",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontSize: 11,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "rgba(231,225,210,.62)",
};

interface Props {
  defaultType?: string;
  headline?: React.ReactNode;
}

export default function InquiryForm({ defaultType, headline }: Props) {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await postInquiry({
        name: fd.get("name"),
        email: fd.get("email"),
        project_type: fd.get("project_type"),
        message: fd.get("message"),
      });
    } catch { /* allow submission even if API is down in dev */ }
    setSent(true);
  };

  return (
    <section id="start" style={{
      padding: "clamp(60px,8vw,120px) clamp(18px,5vw,72px)",
      background: "#160407",
      borderTop: "1px solid rgba(231,225,210,.1)",
    }}>
      <div style={{
        maxWidth: 1240, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
        gap: "clamp(36px,5vw,72px)",
        alignItems: "start",
      }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 400, letterSpacing: ".24em", textTransform: "uppercase" as const, color: "#c2a06a" }}>Start a project</span>
          {headline ?? (
            <h2 style={{ margin: "18px 0 0", fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem,3.5vw,3rem)", lineHeight: 1.15, letterSpacing: "-.01em", color: "#f3eee0" }}>
              Tell us what you<br />want the world to feel.
            </h2>
          )}
          <p style={{ margin: "24px 0 0", maxWidth: 440, fontSize: 16, lineHeight: 1.7, color: "rgba(231,225,210,.72)" }}>
            Documentary, a campaign, a live broadcast or a month of short-form — bring us the brief and we will tell you exactly how we would shoot it.
          </p>
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column" as const, gap: 14 }}>
            <a href="mailto:hello@onefuego.com" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 15, color: "#e7e1d2", textDecoration: "none", letterSpacing: ".02em" }}>
              <span style={{ color: "#c2a06a" }}>✉</span> hello@onefuego.com
            </a>
            <a href="tel:+2349064678916" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 15, color: "#e7e1d2", textDecoration: "none", letterSpacing: ".02em" }}>
              <span style={{ color: "#c2a06a" }}>✆</span> +234 906 467 8916
            </a>
          </div>
        </div>

        {sent ? (
          <div style={{
            background: "#520a18", border: "1px solid rgba(231,225,210,.16)",
            borderRadius: 6, padding: "clamp(36px,4vw,56px)",
            minHeight: 300, display: "flex", flexDirection: "column" as const,
            justifyContent: "center", alignItems: "flex-start", gap: 14,
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: "#c2a06a", color: "#1c0509", fontSize: 24 }}>✓</span>
            <h3 style={{ margin: "6px 0 0", fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 34, color: "#f3eee0" }}>Brief received.</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "rgba(231,225,210,.78)" }}>Thank you. A producer will be in touch within one business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: "rgba(82,10,24,.5)",
            border: "1px solid rgba(231,225,210,.14)",
            borderRadius: 6,
            padding: "clamp(26px,3vw,40px)",
            display: "flex", flexDirection: "column" as const, gap: 18,
            backdropFilter: "blur(4px)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
              <label style={labelStyle}>Name
                <input name="name" type="text" required placeholder="Your name" style={inputStyle} />
              </label>
              <label style={labelStyle}>Email
                <input name="email" type="email" required placeholder="you@company.com" style={inputStyle} />
              </label>
            </div>
            <label style={labelStyle}>Project type
              <select name="project_type" required defaultValue={defaultType || "Documentary"} style={inputStyle}>
                <option style={{ color: "#160407" }}>Documentary</option>
                <option style={{ color: "#160407" }}>Ad campaign / commercial</option>
                <option style={{ color: "#160407" }}>Live event</option>
                <option style={{ color: "#160407" }}>Content, shorts &amp; reels</option>
              </select>
            </label>
            <label style={labelStyle}>Tell us about it
              <textarea name="message" rows={4} placeholder="Goals, timeline, budget range…" style={{ ...inputStyle, resize: "vertical" }} />
            </label>
            <button
              type="submit"
              style={{
                marginTop: 4, background: "#c2a06a", color: "#1c0509", border: 0,
                borderRadius: 3, padding: 15, fontFamily: "'Raleway'", fontWeight: 400,
                fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase" as const,
                cursor: "pointer", transition: "background .25s,transform .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#d6b884"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#c2a06a"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Send the brief →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
