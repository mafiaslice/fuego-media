import { useState } from "react";
import { Link } from "react-router-dom";

const TEAM = [
  { name: "A. Reyes", role: "Founder / Director" },
  { name: "M. Okonkwo", role: "Head of Production" },
  { name: "L. Haddad", role: "Director of Photography" },
  { name: "S. Vance", role: "Lead Editor" },
];

const hov = (color: string) => ({
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.borderColor = color),
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.borderColor = "rgba(231,225,210,.16)"),
});

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  void menuOpen; void setMenuOpen;

  return (
    <div style={{ position: "relative", width: "100%", background: "#160407", minHeight: "100vh" }}>

      {/* Header */}
      <section style={{ padding: "clamp(120px,16vh,190px) clamp(18px,5vw,72px) clamp(20px,3vw,40px)", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", marginBottom: "clamp(22px,3vw,34px)" }}>
          <Link to="/" style={{ color: "rgba(231,225,210,.5)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#c2a06a")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(231,225,210,.5)")}>Fuego</Link>
          <span style={{ opacity: .5 }}>/</span>
          <span style={{ color: "#c2a06a" }}>About</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(54px,10vw,140px)", lineHeight: .9, letterSpacing: "-.015em", color: "#f3eee0" }}>About Fuego</h1>
      </section>

      {/* Lead statement */}
      <section style={{ padding: "clamp(20px,3vw,40px) clamp(18px,5vw,72px) clamp(50px,7vw,90px)", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 400, fontSize: "clamp(28px,4.4vw,56px)", lineHeight: 1.18, letterSpacing: "-.01em", color: "#ece5d6" }}>
          Fuego is a video production studio for brands, individuals, corporates and governments. We make documentary, commercials, live events and short-form — and we make all of it under one roof, with one standard.
        </p>
        <p style={{ margin: "clamp(28px,3vw,40px) 0 0", maxWidth: 680, fontSize: 17, lineHeight: 1.75, color: "rgba(231,225,210,.7)" }}>
          We started as a small documentary crew and never lost the instincts that came with it: get the access, earn the trust, and protect the story in the edit. Whether the brief is a feature or a fifteen-second spot, the discipline is the same.
        </p>
      </section>

      {/* What we do */}
      <section style={{ padding: "clamp(46px,6vw,90px) clamp(18px,5vw,72px)", background: "#1f0609", borderTop: "1px solid rgba(231,225,210,.08)", borderBottom: "1px solid rgba(231,225,210,.08)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: "clamp(26px,3vw,40px)" }}>What we do</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(20px,2.5vw,40px)" }}>
            {[
              { label: "Documentary", to: "/documentary", desc: "Features, series and short docs. Access-led storytelling, cut for the long run." },
              { label: "Commercials", to: "/commercials", desc: "Brand films and spots, from strategy and boards through to final grade." },
              { label: "Live Events", to: "/live", desc: "Multi-camera coverage of concerts, ceremonies and keynotes — clean on the night." },
              { label: "Content", to: "/content", desc: "Vertical shorts and reels, shot in batches and built native to the feed." },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                style={{ textDecoration: "none", display: "block", borderTop: "1px solid rgba(231,225,210,.16)", paddingTop: 20, transition: "border-color .3s" }}
                {...hov("#c2a06a")}
              >
                <span style={{ display: "block", fontFamily: "'Raleway',sans-serif", fontSize: "clamp(26px,2.8vw,34px)", color: "#f3eee0", marginBottom: 10 }}>{item.label}</span>
                <span style={{ display: "block", fontSize: 14.5, lineHeight: 1.6, color: "rgba(231,225,210,.62)" }}>{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={{ padding: "clamp(50px,7vw,100px) clamp(18px,5vw,72px)", maxWidth: 1180, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 clamp(34px,4vw,56px)", fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.6vw,58px)", lineHeight: 1, color: "#f3eee0" }}>How we work</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(28px,3.5vw,56px)" }}>
          {[
            { n: "01", title: "Access before cameras", body: "We earn the room first. The best footage is the footage people forget is being shot." },
            { n: "02", title: "One team, end to end", body: "Director, DP and editor are in the same conversation from brief to delivery. Nothing gets lost in a handoff." },
            { n: "03", title: "Protect the story", body: "We cut for meaning over spectacle, and we will tell you when a cheaper idea is the better one." },
          ].map(p => (
            <div key={p.n}>
              <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,2vw,24px)", color: "#c2a06a" }}>{p.n}</span>
              <h3 style={{ margin: "12px 0 10px", fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.4vw,28px)", color: "#f3eee0" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(231,225,210,.66)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "clamp(40px,5vw,70px) clamp(18px,5vw,72px)", background: "#520a18", borderTop: "1px solid rgba(231,225,210,.1)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "clamp(24px,3vw,48px)" }}>
          {[
            { n: "2014", label: "Founded" },
            { n: "400+", label: "Projects delivered" },
            { n: "21", label: "Countries shot in" },
          ].map(s => (
            <div key={s.n}>
              <span style={{ display: "block", fontFamily: "'Raleway',sans-serif", fontSize: "clamp(48px,7vw,86px)", lineHeight: .9, color: "#f3eee0" }}>{s.n}</span>
              <span style={{ display: "block", marginTop: 10, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.66)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "clamp(50px,7vw,100px) clamp(18px,5vw,72px)", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: "clamp(28px,3.4vw,46px)" }}>
          <h2 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.6vw,58px)", lineHeight: 1, color: "#f3eee0" }}>The team</h2>
          <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", whiteSpace: "nowrap" as const }}>Leadership</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: "clamp(18px,2vw,30px)" }}>
          {TEAM.map(m => (
            <div key={m.name}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", border: "1px solid rgba(231,225,210,.12)", borderRadius: 3, overflow: "hidden", background: "linear-gradient(150deg,#3a0b16,#2a0810)" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(135deg,rgba(231,225,210,.05) 0 2px,transparent 2px 12px)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "ui-monospace,Menlo,monospace", fontSize: 11, letterSpacing: ".12em", color: "rgba(231,225,210,.4)" }}>PORTRAIT</div>
              </div>
              <span style={{ display: "block", marginTop: 14, fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", color: "#f3eee0" }}>{m.name}</span>
              <span style={{ display: "block", marginTop: 3, fontSize: 13, letterSpacing: ".04em", color: "rgba(231,225,210,.6)" }}>{m.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: "clamp(46px,6vw,84px) clamp(18px,5vw,72px)", background: "#1f0609", borderTop: "1px solid rgba(231,225,210,.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" as const }}>
          <h2 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1.02, color: "#f3eee0", maxWidth: 640 }}>
            Have something you want the world to feel?
          </h2>
          <Link
            to="/#start"
            onClick={e => { if (window.location.pathname === "/") { e.preventDefault(); document.getElementById("start")?.scrollIntoView({ behavior: "smooth" }); } }}
            style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 10, background: "#c2a06a", color: "#1c0509", fontWeight: 600, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" as const, padding: "15px 26px", borderRadius: 2, textDecoration: "none", transition: "background .25s,transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#d6b884"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#c2a06a"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Start a project →
          </Link>
        </div>
      </section>

    </div>
  );
}
