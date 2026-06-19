import { useState, type FormEvent } from "react";
import { postNewsletter } from "../api/client";

export default function NewsletterSignup() {
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try { await postNewsletter(fd.get("email") as string); } catch { /* ok */ }
    setDone(true);
  };

  return (
    <section style={{
      padding: "clamp(40px,5vw,70px) clamp(18px,5vw,72px)",
      background: "#1f0609",
      borderTop: "1px solid rgba(231,225,210,.08)",
    }}>
      <div style={{
        maxWidth: 1000, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 28, flexWrap: "wrap" as const,
      }}>
        <div style={{ maxWidth: 440 }}>
          <h3 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: "clamp(26px,3.4vw,38px)", color: "#f3eee0" }}>
            The Fuego dispatch
          </h3>
          <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "rgba(231,225,210,.6)" }}>
            New work and the occasional behind-the-scenes. No noise.
          </p>
        </div>

        {done ? (
          <span style={{ fontSize: 14, color: "#c2a06a", letterSpacing: ".06em" }}>✓ You're subscribed.</span>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: "flex", alignItems: "stretch", gap: 0,
            flex: "1 1 320px", maxWidth: 440,
            border: "1px solid rgba(231,225,210,.2)", borderRadius: 3, overflow: "hidden",
          }}>
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              style={{
                flex: "1 1 auto", background: "rgba(20,4,7,.35)", border: 0,
                padding: "15px 16px", color: "#f3eee0", fontFamily: "'Raleway'",
                fontSize: 15, outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                flex: "0 0 auto", background: "#e7e1d2", color: "#1c0509",
                border: 0, padding: "0 22px", fontSize: 18, cursor: "pointer",
                transition: "background .25s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.background = "#e7e1d2")}
            >
              →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
