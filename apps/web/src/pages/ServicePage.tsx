import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@fuego/shared";
import { fetchProjects } from "../api/client";
import VideoLightbox from "../components/VideoLightbox";
import InquiryForm from "../components/InquiryForm";

interface Props { category: Category; }

const CONFIG: Record<Category, {
  label: string; positioning: string;
  reelLabel: string; statementA: string; statementB: string;
  tileBg: string; defaultType: string; categoryLower: string;
}> = {
  documentary: {
    label: "Documentary",
    categoryLower: "documentary",
    positioning: "Long-form films, built to be trusted and made to outlast the news cycle. We embed, we listen, and we shoot until the truth shows up.",
    reelLabel: "Documentary reel — 2026",
    statementA: "Documentary is where we earn our reputation. A subject lets you into their life once — our job is to be worth that trust and to hand back something honest, not flattering.",
    statementB: "Small crews, long lead times, real access. We research before we roll, cut for story over spectacle, and finish with a colour and sound pass that respects the room it was shot in.",
    tileBg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)",
    defaultType: "Documentary",
  },
  commercial: {
    label: "Commercials",
    categoryLower: "commercial",
    positioning: "Brand films and spots, from strategy and boards through to final grade. Every second earns its place.",
    reelLabel: "Commercial reel — 2026",
    statementA: "A great spot starts before the camera rolls. We work from the brief, not the storyboard, because the idea is what survives the edit.",
    statementB: "Director, DP and editor in the same room from day one. We move fast without cutting corners, and deliver every version your media plan needs.",
    tileBg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)",
    defaultType: "Ad campaign / commercial",
  },
  live: {
    label: "Live Events",
    categoryLower: "live event",
    positioning: "Multi-camera coverage of concerts, ceremonies and keynotes — clean on the night, cut for archive and broadcast.",
    reelLabel: "Live events reel — 2026",
    statementA: "Live production has no second take. We plan obsessively so the crew can react instinctively when the moment happens.",
    statementB: "Switching, comms and record infrastructure from thirty cameras down to two. We have done the arenas and the rooftops — the discipline is the same.",
    tileBg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)",
    defaultType: "Live event",
  },
  content: {
    label: "Content, Shorts & Reels",
    categoryLower: "content",
    positioning: "Vertical shorts and reels, shot in batches and built native to the feed. Volume without sacrificing the frame.",
    reelLabel: "Content reel — 2026",
    statementA: "Short-form is not an afterthought. The same attention to light, composition and story — compressed into the time the algorithm gives you.",
    statementB: "We shoot in batches, deliver on schedule, and version every asset for every placement. One shoot, a month of content.",
    tileBg: "linear-gradient(165deg,#561124 0%,#350b16 55%,#160407 100%)",
    defaultType: "Content, shorts & reels",
  },
};

const PLACEHOLDER_TILES: Record<Category, { title: string; tag: string; dur: string }[]> = {
  documentary: [
    { title: "Tides of the Delta", tag: "Feature documentary", dur: "24:10" },
    { title: "The Salt Road", tag: "Series — 3 parts", dur: "41:02" },
    { title: "After the Harvest", tag: "Short documentary", dur: "18:30" },
    { title: "Borderlands", tag: "Feature documentary", dur: "52:18" },
    { title: "Mother Tongue", tag: "Short documentary", dur: "29:44" },
    { title: "The Last Ferry", tag: "Branded doc", dur: "12:08" },
    { title: "Granite", tag: "Feature documentary", dur: "37:21" },
    { title: "Nightshift", tag: "Short documentary", dur: "22:55" },
    { title: "The Quiet Coast", tag: "Series — 2 parts", dur: "33:40" },
  ],
  commercial: [
    { title: "Velocity", tag: "Commercial", dur: "0:60" },
    { title: "Lumen Skincare", tag: "Commercial", dur: "0:30" },
    { title: "Aurora Bank", tag: "Brand film", dur: "1:20" },
    { title: "Field & Co.", tag: "Commercial", dur: "0:45" },
    { title: "Pulse Energy", tag: "Brand film", dur: "0:90" },
    { title: "Maison No.5", tag: "Commercial", dur: "0:30" },
    { title: "Drift Eyewear", tag: "Commercial", dur: "0:60" },
    { title: "Terra Coffee", tag: "Brand film", dur: "0:50" },
    { title: "Nova Watches", tag: "Commercial", dur: "0:60" },
  ],
  live: [
    { title: "Independence Day Live", tag: "Live Event", dur: "3:12:00" },
    { title: "Sound Garden Fest", tag: "Live Event", dur: "2:40:00" },
    { title: "The Founders Summit", tag: "Live Event", dur: "58:00" },
    { title: "Night Market", tag: "Live Event", dur: "1:22:00" },
    { title: "Arena Opening", tag: "Live Event", dur: "46:30" },
    { title: "Gala '25", tag: "Live Event", dur: "1:50:00" },
    { title: "Marathon Live", tag: "Live Event", dur: "4:05:00" },
    { title: "Launch Keynote", tag: "Live Event", dur: "38:12" },
    { title: "City Broadcast", tag: "Live Event", dur: "2:10:00" },
  ],
  content: [
    { title: "Behind the Lens", tag: "Short / Reel", dur: "0:45" },
    { title: "60s of Lagos", tag: "Short / Reel", dur: "1:00" },
    { title: "Shooting Velocity", tag: "Short / Reel", dur: "0:38" },
    { title: "Studio Diaries", tag: "Short / Reel", dur: "0:52" },
    { title: "Reel 014", tag: "Short / Reel", dur: "0:29" },
    { title: "Sound On", tag: "Short / Reel", dur: "1:00" },
    { title: "One Take", tag: "Short / Reel", dur: "0:41" },
    { title: "Golden Hour", tag: "Short / Reel", dur: "0:55" },
    { title: "Field Notes", tag: "Short / Reel", dur: "0:48" },
  ],
};

export default function ServicePage({ category }: Props) {
  const cfg = CONFIG[category];
  const [lightbox, setLightbox] = useState<{ title: string; videoUrl?: string } | null>(null);

  const { data: projects } = useQuery({
    queryKey: ["projects", category],
    queryFn: () => fetchProjects(category),
  });

  const tiles = projects?.length
    ? projects.map((p: { title: string; category: string; duration: string; thumbnail_url: string; video_url: string }) => ({
        title: p.title, tag: cfg.label, dur: p.duration,
        bg: cfg.tileBg, thumbnailUrl: p.thumbnail_url, videoUrl: p.video_url,
      }))
    : PLACEHOLDER_TILES[category].map(t => ({ ...t, bg: cfg.tileBg }));

  return (
    <div style={{ position: "relative", width: "100%", background: "#160407", minHeight: "100vh" }}>

      {/* Breadcrumb + header */}
      <section style={{ padding: "clamp(120px,16vh,190px) clamp(18px,5vw,72px) clamp(40px,5vw,64px)", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", marginBottom: "clamp(22px,3vw,34px)" }}>
          <Link to="/" style={{ color: "rgba(231,225,210,.5)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#c2a06a")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(231,225,210,.5)")}>Fuego</Link>
          <span style={{ opacity: .5 }}>/</span>
          <span style={{ color: "#c2a06a" }}>{cfg.label}</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(54px,10vw,140px)", lineHeight: .9, letterSpacing: "-.015em", color: "#f3eee0" }}>{cfg.label}</h1>
        <p style={{ margin: "clamp(20px,2.6vw,30px) 0 0", maxWidth: 680, fontSize: "clamp(17px,2vw,22px)", lineHeight: 1.5, color: "rgba(231,225,210,.74)", fontWeight: 300 }}>{cfg.positioning}</p>
      </section>

      {/* Showreel banner */}
      <section style={{ padding: "0 clamp(18px,5vw,72px) clamp(40px,5vw,70px)", maxWidth: 1320, margin: "0 auto" }}>
        <button
          onClick={() => setLightbox({ title: cfg.reelLabel })}
          style={{
            position: "relative", width: "100%", aspectRatio: "21/8", minHeight: 240,
            border: "1px solid rgba(231,225,210,.12)", borderRadius: 5, overflow: "hidden",
            cursor: "pointer", padding: 0,
            background: "radial-gradient(120% 140% at 70% 25%, #6e1626 0%, #3a0b16 48%, #150406 100%)",
            transition: "filter .35s",
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.06)")}
          onMouseLeave={e => (e.currentTarget.style.filter = "none")}
        >
          <span style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0 1px,transparent 1px 3px)" }} />
          <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,4,7,.25), rgba(20,4,7,.55))" }} />
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" as const, padding: "clamp(20px,3vw,34px)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "clamp(52px,5vw,66px)", height: "clamp(52px,5vw,66px)", borderRadius: "50%", background: "#c2a06a", flex: "0 0 auto" }}>
                <span style={{ width: 0, height: 0, borderLeft: "18px solid #1c0509", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", marginLeft: 5 }} />
              </span>
              <span style={{ textAlign: "left" as const }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: 4 }}>{cfg.reelLabel}</span>
                <span style={{ display: "block", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,3vw,38px)", lineHeight: 1, color: "#f3eee0" }}>Watch the reel</span>
              </span>
            </span>
            <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.6)" }}>2:40</span>
          </span>
        </button>
      </section>

      {/* Statement blocks */}
      <section style={{ padding: "clamp(40px,6vw,86px) clamp(18px,5vw,72px)", background: "#1f0609", borderTop: "1px solid rgba(231,225,210,.08)", borderBottom: "1px solid rgba(231,225,210,.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(34px,5vw,80px)" }}>
          <div>
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: 18 }}>What this means to us</span>
            <p style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.32, color: "#ece5d6" }}>{cfg.statementA}</p>
          </div>
          <div>
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: 18 }}>How we make it</span>
            <p style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.32, color: "#ece5d6" }}>{cfg.statementB}</p>
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section style={{ padding: "clamp(46px,6vw,90px) clamp(18px,5vw,72px)", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: "clamp(26px,3vw,42px)" }}>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1, color: "#f3eee0" }}>Selected work</h2>
          <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.5)", whiteSpace: "nowrap" as const }}>{tiles.length} films</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,330px),1fr))", gap: "clamp(14px,1.6vw,26px)" }}>
          {tiles.map((t, i) => (
            <button
              key={i}
              onClick={() => setLightbox({ title: t.title, videoUrl: (t as { videoUrl?: string }).videoUrl })}
              style={{
                position: "relative", width: "100%", aspectRatio: "16/9",
                border: "1px solid rgba(231,225,210,.1)", padding: 0, cursor: "pointer",
                overflow: "hidden", borderRadius: 3, background: t.bg,
                transition: "transform .4s ease, box-shadow .4s ease, filter .4s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 22px 50px rgba(0,0,0,.45)"; e.currentTarget.style.filter = "brightness(1.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.filter = "none"; }}
            >
              <span style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px)" }} />
              <span style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 50% 26%, transparent 38%, rgba(12,3,5,.62) 100%)" }} />
              {(t as { thumbnailUrl?: string }).thumbnailUrl && <img src={(t as { thumbnailUrl?: string }).thumbnailUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
              <span style={{ position: "absolute", right: 14, top: 13, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "rgba(231,225,210,.78)", background: "rgba(20,4,7,.42)", padding: "4px 9px", borderRadius: 3, fontVariantNumeric: "tabular-nums" }}>{t.dur}</span>
              <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, textAlign: "left" as const, padding: "18px 18px 16px", background: "linear-gradient(0deg, rgba(15,4,6,.82), transparent)" }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#c2a06a", marginBottom: 5 }}>{t.tag}</span>
                <span style={{ display: "block", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.04, color: "#f3eee0" }}>{t.title}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <InquiryForm
        defaultType={cfg.defaultType}
        headline={
          <h2 style={{ margin: "18px 0 0", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: "clamp(40px,6.4vw,82px)", lineHeight: .98, letterSpacing: "-.01em", color: "#f3eee0" }}>
            Have a {cfg.categoryLower}<br />in mind?
          </h2>
        }
      />

      {lightbox && (
        <VideoLightbox title={lightbox.title} videoUrl={lightbox.videoUrl} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
