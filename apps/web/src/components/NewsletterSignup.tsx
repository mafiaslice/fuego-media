import { useState, type FormEvent } from "react";
import { postNewsletter } from "../api/client";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await postNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "0.75rem",
        }}
      >
        Field Notes
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
          fontWeight: 300,
          color: "var(--bone)",
          marginBottom: "0.75rem",
        }}
      >
        Stay on Set
      </h3>
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--bone)",
          opacity: 0.6,
          marginBottom: "1.5rem",
          lineHeight: 1.6,
        }}
      >
        BTS dispatches, new work, and occasional notes from the field.
      </p>

      {status === "success" ? (
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--gold)",
            letterSpacing: "0.08em",
          }}
        >
          You're on the list.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "0.75rem", maxWidth: "400px", margin: "0 auto" }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid rgba(194,160,106,0.4)",
              borderRadius: "2px",
              padding: "0.75rem 1rem",
              color: "var(--bone)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-body)",
              outline: "none",
            }}
            onFocus={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = "var(--gold)")
            }
            onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = "rgba(194,160,106,0.4)")
            }
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              background: "var(--gold)",
              border: "none",
              color: "var(--maroon)",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0.75rem 1.25rem",
              borderRadius: "2px",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p
          style={{
            fontSize: "0.72rem",
            color: "#e07070",
            marginTop: "0.75rem",
          }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
