import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroCarousel, { HeroSlide } from "../components/HeroCarousel";
import LogoStrip from "../components/LogoStrip";
import WorkRow from "../components/WorkRow";
import type { Tile } from "../components/WorkRow";
import VideoLightbox from "../components/VideoLightbox";
import InquiryForm from "../components/InquiryForm";
import NewsletterSignup from "../components/NewsletterSignup";
import { fetchProjects } from "../api/client";

// ─── Static fallback data (shown while API is loading or unavailable) ────────

const FALLBACK_HERO: HeroSlide[] = [
  { title: "The Meristem Experience", category: "Documentary", videoUrl: "https://youtu.be/98_snbBDTBY", thumbnailUrl: "/thumbnails/Meristem Hero 01.jpg" },
  { title: "Vibe Out", category: "Commercial", videoUrl: "https://youtu.be/4XwVc0h2V4s" },
  { title: "PITCH2WIN-5", category: "Live", videoUrl: "https://youtu.be/IHClDRhUB0c" },
  { title: "Light Up Kastina", category: "Documentary", videoUrl: "https://youtu.be/ttGgLQLEVTc" },
  { title: "Hybrid Motors | New Era", category: "Commercial", videoUrl: "https://youtu.be/8XFEpFjr4Tk" },
  { title: "SELF-WORTH: The Documentary", category: "Documentary", videoUrl: "https://vimeo.com/509390876", thumbnailUrl: "/thumbnails/SELF-WORTH 06.jpg" },
  { title: "Africa's Tech Demo Day", category: "Live", videoUrl: "https://youtu.be/m_qFswFxZfE" },
];

const FALLBACK_DOC: Tile[] = [
  { title: "Bloom Network",          tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://vimeo.com/687825882",   thumbnailUrl: "/thumbnails/Bloom Network 01.jpg" },
  { title: "Founders Experience",    tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/8YcDib-6VyM" },
  { title: "Shaldag Fisheries",      tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://vimeo.com/456369605",   thumbnailUrl: "/thumbnails/Shaldag Fisheries 03.jpg" },
  { title: "Light Up Kastina",       tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/ttGgLQLEVTc" },
  { title: "Nord Automobiles",       tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/tQyUo7tpHMs" },
  { title: "The Sterling Experience",tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/wksh0o5TPG0" },
  { title: "Light Is Energy",        tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/br1CsL2fAF4" },
  { title: "Embrace Equity",         tag: "Documentary", dur: "", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/TwUiS7w6a5Y" },
];

const FALLBACK_AD: Tile[] = [
  { title: "ORAIMO | Guchi",             tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/r-EEjcj4Mo0" },
  { title: "Velvet Nights | Funky Tiger", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/J1BiUgo6Z2g" },
  { title: "Pooler App | Woodcore",       tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/wwSJoU1BsG0" },
  { title: "Hybrid Motors | New Era",     tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/8XFEpFjr4Tk" },
  { title: "POOLER BaaS",                 tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/4GTlXI2JXvI" },
  { title: "Feed Your Genius | 500Chow",  tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/bQew7K2TjHs" },
  { title: "Vibe Out",                    tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/4XwVc0h2V4s" },
  { title: "GINJAAAH | Coca-Cola",        tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://vimeo.com/689239033", thumbnailUrl: "/thumbnails/Coca-Cola Ginja 08.jpg" },
];

const FALLBACK_LIVE: Tile[] = [
  { title: "Art X Lagos | Fair",          tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/OuY8U83i9Eo", thumbnailUrl: "/thumbnails/Art X.jpg" },
  { title: "OyaMakeWeGroove8",            tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/FX_H4rpbqz0" },
  { title: "OMWG 7",                      tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/OOYXbuKRUjo" },
  { title: "PITCH2WIN-5",                 tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/IHClDRhUB0c" },
  { title: "INNOV8 FEST | Credit Direct", tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/qmhIAsWY6As", thumbnailUrl: "/thumbnails/Credit Direct 05.jpg" },
  { title: "Scrum Day Nigeria 2026",      tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/_9em3L7rNLI" },
  { title: "PBN PoolDown",               tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/TntCtWAiLNA" },
  { title: "Africa's Tech Demo Day",     tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/m_qFswFxZfE" },
];

const FALLBACK_CONTENT: Tile[] = [
  { title: "Untitled Reel 1", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://vimeo.com/689242851",                thumbnailUrl: "/thumbnails/Ginja 1.jpg" },
  { title: "Untitled Reel 2", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://vimeo.com/384234664",                thumbnailUrl: "/thumbnails/Nivea.jpg" },
  { title: "Untitled Reel 3", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/qVRrSplQWQM" },
  { title: "Untitled Reel 4", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/lrL45YPZ600" },
  { title: "Untitled Reel 5", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/9XNDit4iAJk" },
  { title: "Untitled Reel 6", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/vKf9kik9JeA" },
  { title: "Untitled Reel 7", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/XPW8WYdtlUc" },
  { title: "Untitled Reel 8", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://vimeo.com/689253404",                thumbnailUrl: "/thumbnails/Ginja 2.jpg" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CAT_LABEL: Record<string, string> = {
  documentary: "Documentary",
  commercial: "Commercial",
  live: "Live Event",
  content: "Short / Reel",
};

const CAT_BG: Record<string, string> = {
  documentary: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)",
  commercial:  "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)",
  live:        "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)",
  content:     "",
};

function apiToSlide(p: any): HeroSlide {
  return { title: p.title, category: CAT_LABEL[p.category] ?? p.category, videoUrl: p.video_url, thumbnailUrl: p.thumbnail_url || undefined };
}

function apiToTile(p: any): Tile {
  const isContent = p.category === "content";
  return {
    title: p.title,
    tag: CAT_LABEL[p.category] ?? p.category,
    dur: p.duration ?? "",
    bg: CAT_BG[p.category] ?? "",
    videoUrl: p.video_url,
    thumbnailUrl: p.thumbnail_url || undefined,
    isLive: !!p.is_live,
    isContent,
  };
}

// ─── Section header component ─────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{
      padding: "0 clamp(18px,5vw,72px)",
      marginBottom: 12,
    }}>
      <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: "clamp(1rem,1.65vw,1.25rem)", letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(231,225,210,.88)" }}>
        {title}
      </span>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [lightbox, setLightbox] = useState<{ title: string; videoUrl?: string } | null>(null);

  const { data: allProjects } = useQuery({ queryKey: ["projects"], queryFn: () => fetchProjects() });
  const { data: docProjects }  = useQuery({ queryKey: ["projects", "documentary"], queryFn: () => fetchProjects("documentary") });
  const { data: adProjects }   = useQuery({ queryKey: ["projects", "commercial"],  queryFn: () => fetchProjects("commercial") });
  const { data: liveProjects } = useQuery({ queryKey: ["projects", "live"],         queryFn: () => fetchProjects("live") });
  const { data: reelProjects } = useQuery({ queryKey: ["projects", "content"],      queryFn: () => fetchProjects("content") });

  const heroSlides: HeroSlide[] = allProjects?.length ? allProjects.map(apiToSlide) : FALLBACK_HERO;
  const docTiles:  Tile[]       = docProjects?.length  ? docProjects.map(apiToTile)  : FALLBACK_DOC;
  const adTiles:   Tile[]       = adProjects?.length   ? adProjects.map(apiToTile)   : FALLBACK_AD;
  const liveTiles: Tile[]       = liveProjects?.length ? liveProjects.map(apiToTile) : FALLBACK_LIVE;
  const reelTiles: Tile[]       = reelProjects?.length ? reelProjects.map(apiToTile) : FALLBACK_CONTENT;

  return (
    <div style={{ position: "relative", width: "100%", background: "#160407" }}>
      <HeroCarousel
        slides={heroSlides}
        onPlay={(videoUrl, title) => setLightbox({ title, videoUrl })}
      />

      <LogoStrip />

      <div style={{ padding: "clamp(52px,6vw,88px) 0 0" }}>
        <SectionHeader title="Documentary" />
        <WorkRow tiles={docTiles} speed={0.3} showTitles
          onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />

        <div style={{ marginTop: "clamp(36px,5vw,64px)" }}>
          <SectionHeader title="Ad Campaigns & Commercials" />
          <WorkRow tiles={adTiles} speed={0.36} reverse showTitles
            onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />
        </div>

        <div style={{ marginTop: "clamp(36px,5vw,64px)" }}>
          <SectionHeader title="Live Events" />
          <WorkRow tiles={liveTiles} speed={0.28} showTitles
            onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />
        </div>

        <div style={{ marginTop: "clamp(36px,5vw,64px)" }}>
          <SectionHeader title="Content, Shorts & Reels" />
          <WorkRow tiles={reelTiles} speed={0.34} darkBg showTitles
            onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />
        </div>
      </div>

      <InquiryForm />
      <NewsletterSignup />

      {lightbox && (
        <VideoLightbox
          title={lightbox.title}
          videoUrl={lightbox.videoUrl}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
