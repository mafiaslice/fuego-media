import { useState, type FormEvent } from "react";
import { postInquiry } from "../api/client";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid rgba(194,160,106,0.4)",
  borderRadius: "2px",
  padding: "0.85rem 1rem",
  color: "var(--bone)",
  fontSize: "0.85rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.65rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--gold)",
  marginBottom: "0.4rem",
};

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project_type: "Documentary",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await postInquiry(form);
      setStatus("success");
      setForm({ name: "", email: "", project_type: "Documentary", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            fontWeight: 300,
            color: "var(--bone)",
            marginBottom: "1rem",
          }}
        >
          Thank you.
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--bone)",
            opacity: 0.7,
          }}
        >
          We'll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle} htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            style={inputStyle}
            onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--gold)")}
            onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = "rgba(194,160,106,0.4)")
            }
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--gold)")}
            onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = "rgba(194,160,106,0.4)")
            }
          />
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle} htmlFor="project_type">Project Type</label>
        <select
          id="project_type"
          name="project_type"
          value={form.project_type}
          onChange={handleChange}
          style={{
            ...inputStyle,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c2a06a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            cursor: "pointer",
          }}
          onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--gold)")}
          onBlur={(e) =>
            ((e.target as HTMLSelectElement).style.borderColor = "rgba(194,160,106,0.4)")
          }
        >
          <option value="Documentary">Documentary</option>
          <option value="Ad Campaign">Ad Campaign</option>
          <option value="Live Event">Live Event</option>
          <option value="Content">Content</option>
        </select>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <label style={labelStyle} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={5}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={(e) =>
            ((e.target as HTMLTextAreaElement).style.borderColor = "var(--gold)")
          }
          onBlur={(e) =>
            ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(194,160,106,0.4)")
          }
        />
      </div>

      {status === "error" && (
        <p
          style={{
            fontSize: "0.78rem",
            color: "#e07070",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          background: "transparent",
          border: "1px solid var(--gold)",
          color: "var(--gold)",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "1rem",
          borderRadius: "2px",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          opacity: status === "loading" ? 0.6 : 1,
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading") {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--maroon)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
        }}
      >
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
