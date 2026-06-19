import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBtsList } from "../api/client";

interface Card {
  frame: string; tag: string; title: string; meta: string; caption: string; ar: string; slug: string;
}
interface YearGroup { year: string; count: number; cards: Card[]; }

const PLACEHOLDER_YEARS: YearGroup[] = [
  {
    year: "2026", count: 6, cards: [
      { frame: "F-2401", tag: "DOC", title: "Tides of the Delta", meta: "Mar 2026 · Niger Delta, NG", caption: "Waiting out the rain under a tarp with the boat crew. Three hours, one usable hour of light.", ar: "4/5", slug: "tides-of-the-delta" },
      { frame: "F-2412", tag: "AD", title: "Velocity", meta: "Feb 2026 · Tarmac 7, Lisbon", caption: "The car would not start for the hero shot. The driver pushed it into frame himself.", ar: "16/11", slug: "velocity" },
      { frame: "F-2418", tag: "LIVE", title: "Arena Opening", meta: "Feb 2026 · Kigali", caption: "Cable run at 5am before the doors. Forty cameras, one chance.", ar: "3/4", slug: "arena-opening" },
      { frame: "F-2425", tag: "DOC", title: "Mother Tongue", meta: "Jan 2026 · Oaxaca, MX", caption: "She taught us the word for dusk before we rolled. It is in the title now.", ar: "1/1", slug: "mother-tongue" },
      { frame: "F-2430", tag: "CON", title: "Studio Diaries", meta: "Jan 2026 · Studio B", caption: "Vertical rig test. The gaffer is somewhere behind that flag.", ar: "9/13", slug: "studio-diaries" },
      { frame: "F-2433", tag: "AD", title: "Lumen Skincare", meta: "Jan 2026 · Cape Town", caption: "Macro on a water droplet for two days. Worth it.", ar: "4/5", slug: "lumen-skincare" },
    ],
  },
  {
    year: "2025", count: 5, cards: [
      { frame: "F-2298", tag: "LIVE", title: "Sound Garden Fest", meta: "Nov 2025 · Accra", caption: "FOH tower at golden hour, fifteen minutes before forty thousand people.", ar: "16/10", slug: "sound-garden-fest" },
      { frame: "F-2310", tag: "DOC", title: "The Salt Road", meta: "Sep 2025 · Danakil", caption: "Hottest place we have ever shot. The camera bodies needed shade more than we did.", ar: "3/4", slug: "the-salt-road" },
      { frame: "F-2322", tag: "AD", title: "Aurora Bank", meta: "Aug 2025 · Set 4", caption: "Practical neon, built overnight by the art department. It buzzed all take.", ar: "1/1", slug: "aurora-bank" },
      { frame: "F-2334", tag: "CON", title: "One Take", meta: "Jul 2025 · Rooftop", caption: "Steadicam op got the whole thing in a single pass on the fourth try.", ar: "9/14", slug: "one-take" },
      { frame: "F-2349", tag: "DOC", title: "Granite", meta: "May 2025 · Aberdeen", caption: "Quarry at first light. The dust gives the light something to hold onto.", ar: "5/4", slug: "granite" },
    ],
  },
];

export default function BtsArchivePage() {
  const { data: entries } = useQuery({ queryKey: ["bts"], queryFn: fetchBtsList });

  const years: YearGroup[] = entries?.length
    ? (() => {
        const grouped: Record<string, Card[]> = {};
        for (const e of entries) {
          const y = new Date(e.event_date).getFullYear().toString();
          if (!grouped[y]) grouped[y] = [];
          grouped[y].push({ frame: e.id, tag: e.category.toUpperCase().slice(0, 4), title: e.title, meta: `${new Date(e.event_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} · ${e.location}`, caption: e.notes?.split("\n")[0] ?? "", ar: "4/5", slug: e.slug });
        }
        return Object.entries(grouped).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, cards]) => ({ year, count: cards.length, cards }));
      })()
    : PLACEHOLDER_YEARS;

  return (
    <div style={{ position: "relative", width: "100%", background: "#100f0d", minHeight: "100vh" }}>
      <div style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.022) 0.5px, transparent 0.5px)", backgroundSize: "3px 3px" }}>

        {/* Header */}
        <section style={{ padding: "clamp(120px,16vh,180px) clamp(18px,5vw,72px) clamp(30px,4vw,50px)", maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "rgba(228,221,207,.45)", marginBottom: "clamp(22px,3vw,32px)" }}>
            <Link to="/" style={{ color: "rgba(228,221,207,.45)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#b5485c")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(228,221,207,.45)")}>Fuego</Link>
            <span style={{ opacity: .5 }}>/</span>
            <span style={{ color: "#b5485c" }}>Field Notebook</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(46px,8.4vw,118px)", lineHeight: .92, letterSpacing: "-.01em", color: "#efe9dc", maxWidth: "18ch" }}>The Field Notebook</h1>
          <p style={{ margin: "clamp(20px,2.4vw,30px) 0 0", maxWidth: 620, fontSize: 16, lineHeight: 1.7, color: "rgba(228,221,207,.62)" }}>
            The reel is the highlight. This is the raw archive — dated frames from years on set, the ones that never make the cut but tell the truth about how the work gets made.
          </p>
        </section>

        {/* Year groups */}
        {years.map(yr => (
          <section key={yr.year} style={{ padding: "clamp(28px,3.5vw,52px) clamp(18px,5vw,72px)", maxWidth: 1320, margin: "0 auto" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 18,
              marginBottom: "clamp(22px,2.6vw,36px)",
              position: "sticky", top: 64,
              background: "#100f0d", padding: "8px 0", zIndex: 5,
            }}>
              <span style={{ width: 9, height: 9, background: "#7a1a2c", borderRadius: "50%", flex: "0 0 auto" }} />
              <h2 style={{ margin: 0, fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(38px,6vw,76px)", lineHeight: .9, color: "#efe9dc", fontVariantNumeric: "tabular-nums" }}>{yr.year}</h2>
              <span style={{ flex: "1 1 auto", height: 1, background: "rgba(228,221,207,.14)" }} />
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: ".1em", color: "rgba(228,221,207,.4)", whiteSpace: "nowrap" as const }}>{yr.count} dispatches</span>
            </div>

            <div style={{ columns: "clamp(220px,25vw,300px)", columnGap: "clamp(12px,1.4vw,20px)" }}>
              {yr.cards.map(c => (
                <Link
                  key={c.frame}
                  to={`/bts/${c.slug}`}
                  style={{ breakInside: "avoid", display: "inline-block", width: "100%", marginBottom: "clamp(20px,2vw,30px)", textDecoration: "none", transition: "filter .3s, transform .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: c.ar, overflow: "hidden", border: "1px solid rgba(228,221,207,.1)", background: "linear-gradient(158deg,#28241e 0%,#1a1714 55%,#100f0d 100%)" }}>
                    <span style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 0.5px, transparent 0.5px)", backgroundSize: "2.5px 2.5px" }} />
                    <span style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 50% 30%, transparent 45%, rgba(8,7,6,.6) 100%)" }} />
                    <span style={{ position: "absolute", left: 10, top: 9, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".08em", color: "rgba(228,221,207,.55)" }}>{c.frame}</span>
                    <span style={{ position: "absolute", right: 10, top: 9, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".06em", color: "#b5485c" }}>{c.tag}</span>
                  </div>
                  <div style={{ padding: "13px 2px 0" }}>
                    <span style={{ display: "block", fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,2.1vw,25px)", lineHeight: 1.08, color: "#efe9dc" }}>{c.title}</span>
                    <span style={{ display: "block", marginTop: 6, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".04em", color: "rgba(228,221,207,.5)" }}>{c.meta}</span>
                    <span style={{ display: "block", marginTop: 9, fontSize: 13.5, lineHeight: 1.55, color: "rgba(228,221,207,.66)" }}>{c.caption}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ height: "clamp(40px,6vw,80px)" }} />
      </div>
    </div>
  );
}
