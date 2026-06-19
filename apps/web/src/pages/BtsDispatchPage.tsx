import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBtsEntry, fetchBtsList } from "../api/client";

interface Still { frame: string; ar: string; cap: string; }

const DISPATCH = {
  frame: "F-2401",
  title: "Three hours of rain",
  project: "Tides of the Delta",
  category: "Documentary",
  date: "March 2026",
  location: "Niger Delta, Nigeria",
  noteA: "We had one window of light and the sky did not cooperate. The boat crew waited it out with us under a single tarp, trading stories we could not use but would not trade back. When the rain broke, we had maybe forty minutes of the gold we came for.",
  noteB: "Most of these frames never make a cut. They are the in-between: the lens fogging, the gaffer asleep on a cooler, the subject laughing before the take that mattered. Kept here, unretouched, because this is what the work actually looks like.",
  quote: "You do not film the delta. You wait for it to decide you are allowed to.",
  quoteBy: "A. Reyes, Director",
  credits: [
    { role: "Dir", who: "A. Reyes" },
    { role: "DP", who: "L. Haddad" },
    { role: "Sound", who: "K. Mensah" },
    { role: "Edit", who: "S. Vance" },
  ],
  prevTitle: "Cable run at 5am",
  prevSlug: "arena-opening",
  nextTitle: "The word for dusk",
  nextSlug: "mother-tongue",
  stills: [
    { frame: "001", ar: "3/2", cap: "First light, before the crew was up." },
    { frame: "004", ar: "4/5", cap: "Waiting out the rain. Hour two." },
    { frame: "009", ar: "3/2", cap: "" },
    { frame: "011", ar: "1/1", cap: "The tarp. Our entire set, for a while." },
    { frame: "016", ar: "5/4", cap: "Lens kept fogging in the humidity." },
    { frame: "019", ar: "2/3", cap: "He laughed right before the take." },
    { frame: "023", ar: "3/2", cap: "" },
    { frame: "027", ar: "4/5", cap: "Gold, finally. Forty minutes of it." },
    { frame: "031", ar: "16/10", cap: "Wrap. The water took the light back." },
  ] as Still[],
};

export default function BtsDispatchPage() {
  const { slug } = useParams<{ slug: string }>();
  const [still, setStill] = useState<{ frame: string; cap: string } | null>(null);

  const { data: entry } = useQuery({
    queryKey: ["bts", slug],
    queryFn: () => fetchBtsEntry(slug!),
    enabled: !!slug,
  });

  const { data: allEntries } = useQuery({ queryKey: ["bts"], queryFn: fetchBtsList });

  const d = entry ?? DISPATCH;

  const stills: Still[] = entry?.images?.map((img: { image_url: string; caption: string; size: string }) => ({
    frame: img.image_url,
    ar: img.size === "large" ? "16/10" : img.size === "medium" ? "4/5" : "1/1",
    cap: img.caption ?? "",
  })) ?? DISPATCH.stills;

  const allSlugs: string[] = allEntries?.map((e: { slug: string }) => e.slug) ?? [];
  const curIdx = allSlugs.indexOf(slug ?? "");
  const prevSlug = curIdx > 0 ? allSlugs[curIdx - 1] : DISPATCH.prevSlug;
  const nextSlug = curIdx >= 0 && curIdx < allSlugs.length - 1 ? allSlugs[curIdx + 1] : DISPATCH.nextSlug;
  const prevTitle = allEntries?.[curIdx - 1]?.title ?? DISPATCH.prevTitle;
  const nextTitle = allEntries?.[curIdx + 1]?.title ?? DISPATCH.nextTitle;

  return (
    <div style={{ position: "relative", width: "100%", background: "#100f0d", minHeight: "100vh" }}>
      <div style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.022) 0.5px, transparent 0.5px)", backgroundSize: "3px 3px" }}>

        {/* Masthead */}
        <section style={{ padding: "clamp(118px,15vh,176px) clamp(18px,5vw,72px) clamp(30px,3.5vw,44px)", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "rgba(228,221,207,.45)", marginBottom: "clamp(22px,3vw,32px)" }}>
            <Link to="/bts" style={{ color: "rgba(228,221,207,.45)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#b5485c")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(228,221,207,.45)")}>Field Notebook</Link>
            <span style={{ opacity: .5 }}>/</span>
            <span style={{ color: "#b5485c" }}>Dispatch {d.frame}</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(44px,7.4vw,104px)", lineHeight: .94, letterSpacing: "-.01em", color: "#efe9dc" }}>{d.title}</h1>
          <div style={{ marginTop: "clamp(26px,3vw,40px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 18, borderTop: "1px solid rgba(228,221,207,.14)", paddingTop: 22 }}>
            {[
              { label: "Project", value: d.project },
              { label: "Category", value: d.category, tag: true },
              { label: "Date", value: d.date },
              { label: "Location", value: d.location },
            ].map(item => (
              <div key={item.label}>
                <span style={{ display: "block", fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(228,221,207,.42)", marginBottom: 7 }}>{item.label}</span>
                {item.tag ? (
                  <span style={{ display: "inline-block", fontSize: 12, letterSpacing: ".06em", color: "#efe9dc", border: "1px solid rgba(181,72,92,.6)", background: "rgba(122,26,44,.25)", padding: "4px 11px", borderRadius: 3 }}>{item.value}</span>
                ) : (
                  <span style={{ display: "block", fontSize: 15, color: "#e4ddcf" }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section style={{ padding: "clamp(20px,3vw,40px) clamp(18px,5vw,72px) clamp(40px,5vw,64px)", maxWidth: 760, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "#b5485c", marginBottom: 18 }}>Notes</span>
          <p style={{ margin: "0 0 20px", fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.72, color: "rgba(228,221,207,.82)" }}>{d.noteA}</p>
          <p style={{ margin: 0, fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.72, color: "rgba(228,221,207,.82)" }}>{d.noteB}</p>
        </section>

        {/* Contact sheet */}
        <section style={{ padding: "clamp(20px,3vw,40px) clamp(18px,5vw,72px) clamp(40px,5vw,70px)", maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: "clamp(22px,2.6vw,34px)" }}>
            <h2 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 1, color: "#efe9dc" }}>Contact sheet</h2>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".08em", color: "rgba(228,221,207,.4)", whiteSpace: "nowrap" as const }}>{stills.length} frames · unretouched</span>
          </div>
          <div style={{ columns: "clamp(200px,23vw,280px)", columnGap: "clamp(12px,1.4vw,18px)" }}>
            {stills.map((s, i) => (
              <button
                key={i}
                onClick={() => setStill({ frame: s.frame, cap: s.cap || "No caption — raw frame." })}
                style={{ breakInside: "avoid", display: "inline-block", width: "100%", marginBottom: "clamp(12px,1.4vw,18px)", padding: 0, border: 0, background: "transparent", cursor: "pointer", textAlign: "left" as const }}
              >
                <div
                  style={{ position: "relative", width: "100%", aspectRatio: s.ar, overflow: "hidden", border: "1px solid rgba(228,221,207,.1)", background: "linear-gradient(158deg,#2a261f 0%,#1a1714 55%,#100f0d 100%)", transition: "filter .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "none")}
                >
                  <span style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 0.5px, transparent 0.5px)", backgroundSize: "2.5px 2.5px" }} />
                  <span style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 50% 35%, transparent 48%, rgba(8,7,6,.55) 100%)" }} />
                  <span style={{ position: "absolute", left: 9, top: 8, fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, letterSpacing: ".06em", color: "rgba(228,221,207,.5)" }}>{s.frame}</span>
                </div>
                {s.cap && <span style={{ display: "block", padding: "8px 2px 0", fontSize: 12.5, lineHeight: 1.5, color: "rgba(228,221,207,.6)" }}>{s.cap}</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Pull quote */}
        {d.quote && (
          <section style={{ padding: "clamp(46px,6vw,86px) clamp(18px,5vw,72px)", maxWidth: 980, margin: "0 auto", textAlign: "center" as const }}>
            <span style={{ display: "block", fontFamily: "'Raleway',sans-serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px,4vw,46px)", lineHeight: 1.28, color: "#efe9dc" }}>"{d.quote}"</span>
            <span style={{ display: "block", marginTop: 24, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#b5485c" }}>{d.quoteBy}</span>
          </section>
        )}

        {/* Credits */}
        <section style={{ padding: "0 clamp(18px,5vw,72px) clamp(40px,5vw,70px)", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ borderTop: "1px solid rgba(228,221,207,.14)", paddingTop: 22, display: "flex", flexWrap: "wrap" as const, gap: "10px 34px" }}>
            {d.credits.map((cr: { role: string; who: string }) => (
              <span key={cr.role} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: ".04em", color: "rgba(228,221,207,.6)" }}>
                <span style={{ color: "rgba(228,221,207,.4)" }}>{cr.role}</span>&nbsp; {cr.who}
              </span>
            ))}
          </div>
        </section>

        {/* Prev / Next */}
        <section style={{ padding: "clamp(20px,3vw,40px) clamp(18px,5vw,72px) clamp(50px,6vw,90px)", maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            <Link
              to={`/bts/${prevSlug}`}
              style={{ display: "block", border: "1px solid rgba(228,221,207,.12)", borderRadius: 4, padding: "22px 24px", textDecoration: "none", transition: "border-color .3s,background .3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#b5485c"; e.currentTarget.style.background = "rgba(122,26,44,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(228,221,207,.12)"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ display: "block", fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#b5485c", marginBottom: 9 }}>← Previous dispatch</span>
              <span style={{ display: "block", fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", color: "#efe9dc" }}>{prevTitle}</span>
            </Link>
            <Link
              to={`/bts/${nextSlug}`}
              style={{ display: "block", border: "1px solid rgba(228,221,207,.12)", borderRadius: 4, padding: "22px 24px", textDecoration: "none", transition: "border-color .3s,background .3s", textAlign: "right" as const }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#b5485c"; e.currentTarget.style.background = "rgba(122,26,44,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(228,221,207,.12)"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ display: "block", fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#b5485c", marginBottom: 9 }}>Next dispatch →</span>
              <span style={{ display: "block", fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", color: "#efe9dc" }}>{nextTitle}</span>
            </Link>
          </div>
          <div style={{ textAlign: "center" as const, marginTop: 24 }}>
            <Link to="/bts" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(228,221,207,.55)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#b5485c")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(228,221,207,.55)")}>All dispatches</Link>
          </div>
        </section>

      </div>

      {/* Still lightbox */}
      {still && (
        <div
          onClick={() => setStill(null)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(6,5,4,.9)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,56px)" }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 900 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/2", border: "1px solid rgba(228,221,207,.16)", overflow: "hidden", background: "linear-gradient(158deg,#2a261f,#15130f 60%,#0c0b09)" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.045) 0.5px, transparent 0.5px)", backgroundSize: "2.5px 2.5px" }} />
              <span style={{ position: "absolute", left: 14, top: 12, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".08em", color: "rgba(228,221,207,.6)" }}>FRAME {still.frame}</span>
              <button
                onClick={() => setStill(null)}
                aria-label="Close"
                style={{ position: "absolute", right: 12, top: 12, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(228,221,207,.3)", background: "rgba(13,12,11,.5)", color: "#e4ddcf", fontSize: 18, cursor: "pointer", transition: "background .25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(228,221,207,.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(13,12,11,.5)")}
              >&times;</button>
            </div>
            <p style={{ margin: "14px 2px 0", fontSize: 14, lineHeight: 1.6, color: "rgba(228,221,207,.7)" }}>{still.cap}</p>
          </div>
        </div>
      )}
    </div>
  );
}
