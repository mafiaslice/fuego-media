import { useState } from "react";
import { Link } from "react-router-dom";
import VideoLightbox from "../components/VideoLightbox";

const SERVICES = [
  { num: "01", title: "Line producing", body: "Budgets, schedules, permits, insurance and logistics — run tight, reported clearly." },
  { num: "02", title: "Crew & kit", body: "Vetted directors, DPs and operators with camera, lighting and grip to match the spec." },
  { num: "03", title: "Direction & DP", body: "A director and cinematographer who can take your boards and make them better on the day." },
  { num: "04", title: "Live & multicam", body: "Switching, comms and record for events, broadcasts and streamed activations." },
  { num: "05", title: "Post & finishing", body: "Edit, sound, colour and motion — delivered to every spec sheet you send us." },
  { num: "06", title: "Versioning", body: "Cutdowns, aspect ratios, captions and localisation for every market and placement." },
];

export default function ForAgenciesPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", width: "100%", background: "#160407", minHeight: "100vh" }}>

      {/* Header */}
      <section style={{ padding: "clamp(120px,16vh,190px) clamp(18px,5vw,72px) clamp(40px,5vw,60px)", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", marginBottom: "clamp(22px,3vw,34px)" }}>
          <Link to="/" style={{ color: "rgba(231,225,210,.5)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#c2a06a")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(231,225,210,.5)")}>Fuego</Link>
          <span style={{ opacity: .5 }}>/</span>
          <span style={{ color: "#c2a06a" }}>For Agencies</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(48px,8.4vw,118px)", lineHeight: .92, letterSpacing: "-.015em", color: "#f3eee0", maxWidth: "14ch" }}>
          Your production arm.
        </h1>
        <p style={{ margin: "clamp(20px,2.6vw,30px) 0 0", maxWidth: 660, fontSize: "clamp(17px,2vw,22px)", lineHeight: 1.55, color: "rgba(231,225,210,.74)", fontWeight: 300 }}>
          White-label or credited — whichever the brief needs. You hold the client and the idea; we deliver the production, on spec and on schedule.
        </p>
      </section>

      {/* Lead copy */}
      <section style={{ padding: "clamp(36px,4vw,60px) clamp(18px,5vw,72px) clamp(50px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "clamp(24px,3.4vw,42px)", lineHeight: 1.26, color: "#ece5d6" }}>
          When a pitch lands and the timeline is already tight, agencies bring us in to own execution — from line-producing and crew to direction, post and delivery — so the work ships at the standard you sold.
        </p>
      </section>

      {/* Services grid */}
      <section style={{ padding: "clamp(46px,6vw,90px) clamp(18px,5vw,72px)", background: "#1f0609", borderTop: "1px solid rgba(231,225,210,.08)", borderBottom: "1px solid rgba(231,225,210,.08)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: "clamp(26px,3vw,42px)" }}>As your production partner</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "clamp(20px,2.4vw,40px)" }}>
            {SERVICES.map(s => (
              <div key={s.num} style={{ borderTop: "1px solid rgba(231,225,210,.16)", paddingTop: 20 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,1.8vw,22px)", color: "#c2a06a" }}>{s.num}</span>
                <h3 style={{ margin: "10px 0 10px", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(23px,2.5vw,30px)", color: "#f3eee0" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "rgba(231,225,210,.64)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency reel */}
      <section style={{ padding: "clamp(50px,6vw,90px) clamp(18px,5vw,72px)", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: "clamp(22px,2.6vw,34px)" }}>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1, color: "#f3eee0" }}>The agency reel</h2>
          <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", whiteSpace: "nowrap" as const }}>Cut for partners · 1:45</span>
        </div>
        <button
          onClick={() => setLightbox("Fuego — Agency Reel 2026")}
          style={{
            position: "relative", width: "100%", aspectRatio: "21/8", minHeight: 240,
            border: "1px solid rgba(231,225,210,.12)", borderRadius: 5, overflow: "hidden",
            cursor: "pointer", padding: 0,
            background: "radial-gradient(120% 140% at 30% 25%, #6e1626 0%, #3a0b16 50%, #150406 100%)",
            transition: "filter .35s",
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.06)")}
          onMouseLeave={e => (e.currentTarget.style.filter = "none")}
        >
          <span style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0 1px,transparent 1px 3px)" }} />
          <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,4,7,.2), rgba(20,4,7,.5))" }} />
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "clamp(60px,6vw,80px)", height: "clamp(60px,6vw,80px)", borderRadius: "50%", background: "#c2a06a" }}>
              <span style={{ width: 0, height: 0, borderLeft: "22px solid #1c0509", borderTop: "14px solid transparent", borderBottom: "14px solid transparent", marginLeft: 6 }} />
            </span>
          </span>
        </button>
      </section>

      {/* Bring us in */}
      <section id="bring-us-in" style={{ padding: "clamp(56px,7vw,110px) clamp(18px,5vw,72px)", background: "#520a18", borderTop: "1px solid rgba(231,225,210,.1)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 clamp(34px,4vw,56px)", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(34px,5.4vw,72px)", lineHeight: 1, color: "#f3eee0" }}>Bring us in</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(28px,3.5vw,56px)", marginBottom: "clamp(40px,5vw,64px)" }}>
            {[
              { n: "01", title: "Send the brief", body: "Deck, script or a paragraph. NDA on request, same day." },
              { n: "02", title: "Scope & quote", body: "A treatment, crew plan and line-itemed budget within 48 hours." },
              { n: "03", title: "We shoot, you ship", body: "Credited or white-label. You present the work as yours." },
            ].map(p => (
              <div key={p.n}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2vw,24px)", color: "#c2a06a" }}>{p.n}</span>
                <h3 style={{ margin: "12px 0 8px", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(21px,2.2vw,26px)", color: "#f3eee0" }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "rgba(231,225,210,.72)" }}>{p.body}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 16, alignItems: "center" }}>
            <a
              href="mailto:partners@fuego.media"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#c2a06a", color: "#1c0509", fontWeight: 600, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" as const, padding: "15px 26px", borderRadius: 2, textDecoration: "none", transition: "background .25s,transform .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#d6b884"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#c2a06a"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              partners@fuego.media
            </a>
            <Link
              to="/#start"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(231,225,210,.4)", color: "#e7e1d2", fontWeight: 600, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" as const, padding: "14px 24px", borderRadius: 2, textDecoration: "none", transition: "background .25s,border-color .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(231,225,210,.1)"; e.currentTarget.style.borderColor = "#e7e1d2"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(231,225,210,.4)"; }}
            >
              Send a brief →
            </Link>
          </div>
        </div>
      </section>

      {lightbox && <VideoLightbox title={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
