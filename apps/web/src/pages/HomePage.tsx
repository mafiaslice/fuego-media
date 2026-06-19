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
  { title: "The Meristem Experience", category: "Documentary", videoUrl: "https://vimeo.com/687825882" },
  { title: "Vibe Out", category: "Commercial", videoUrl: "https://youtu.be/4XwVc0h2V4s" },
  { title: "Pitch2Win 5", category: "Live", videoUrl: "https://youtu.be/x4-UnmXpSJ0" },
  { title: "Light Up Katsina", category: "Documentary", videoUrl: "https://youtu.be/ttGgLQLEVTc" },
  { title: "New Era", category: "Commercial", videoUrl: "https://youtu.be/8XFEpFjr4Tk" },
  { title: "Art X Lagos Night", category: "Live", videoUrl: "https://youtu.be/m_qFswFxZfE" },
  { title: "The Tristate", category: "Documentary", videoUrl: "https://youtu.be/Vyr1sKM-F3Q" },
];

const FALLBACK_DOC: Tile[] = [
  { title: "The Meristem Experience", tag: "Documentary", dur: "5:50", bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://vimeo.com/687825882" },
  { title: "Untitled Doc 2",          tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/8YcDib-6VyM" },
  { title: "Untitled Doc 3",          tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://vimeo.com/456369605" },
  { title: "Light Up Katsina",        tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/ttGgLQLEVTc" },
  { title: "Untitled Doc 5",          tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/tQyUo7tpHMs" },
  { title: "Untitled Doc 6",          tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/wksh0o5TPG0" },
  { title: "Untitled Doc 7",          tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/br1CsL2fAF4" },
  { title: "Untitled Doc 8",          tag: "Documentary", dur: "",     bg: "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)", videoUrl: "https://youtu.be/TwUiS7w6a5Y" },
];

const FALLBACK_AD: Tile[] = [
  { title: "Untitled Ad 1", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/r-EEjcj4Mo0" },
  { title: "Untitled Ad 2", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/J1BiUgo6Z2g" },
  { title: "Untitled Ad 3", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/wwSJoU1BsG0" },
  { title: "New Era",       tag: "Commercial", dur: "0:22", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/8XFEpFjr4Tk" },
  { title: "Untitled Ad 5", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/4GTlXI2JXvI" },
  { title: "Untitled Ad 6", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/bQew7K2TjHs" },
  { title: "Vibe Out",      tag: "Commercial", dur: "0:31", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://youtu.be/4XwVc0h2V4s" },
  { title: "Untitled Ad 8", tag: "Commercial", dur: "", bg: "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)", videoUrl: "https://vimeo.com/689239033" },
];

const FALLBACK_LIVE: Tile[] = [
  { title: "Untitled Live 1",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/OuY8U83i9Eo" },
  { title: "Untitled Live 2",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/FX_H4rpbqz0" },
  { title: "Untitled Live 3",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/OOYXbuKRUjo" },
  { title: "Untitled Live 4",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/IHClDRhUB0c" },
  { title: "Untitled Live 5",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/qmhIAsWY6As" },
  { title: "Untitled Live 6",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/_9em3L7rNLI" },
  { title: "Untitled Live 7",  tag: "Live Event", dur: "", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/TntCtWAiLNA" },
  { title: "Art X Lagos Night", tag: "Live Event", dur: "1:02", bg: "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)", videoUrl: "https://youtu.be/m_qFswFxZfE" },
];

const FALLBACK_CONTENT: Tile[] = [
  { title: "Untitled Reel 1", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://vimeo.com/689242851" },
  { title: "Untitled Reel 2", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://vimeo.com/384234664" },
  { title: "Untitled Reel 3", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/qVRrSplQWQM" },
  { title: "Untitled Reel 4", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/lrL45YPZ600" },
  { title: "Untitled Reel 5", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/9XNDit4iAJk" },
  { title: "Untitled Reel 6", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/vKf9kik9JeA" },
  { title: "Untitled Reel 7", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://youtube.com/shorts/XPW8WYdtlUc" },
  { title: "Untitled Reel 8", tag: "Short / Reel", dur: "", bg: "", isContent: true, videoUrl: "https://vimeo.com/689253404" },
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
  return { title: p.title, category: CAT_LABEL[p.category] ?? p.category, videoUrl: p.video_url };
}

function apiToTile(p: any): Tile {
  const isContent = p.category === "content";
  return {
    title: p.title,
    tag: CAT_LABEL[p.category] ?? p.category,
    dur: p.duration ?? "",
    bg: CAT_BG[p.category] ?? "",
    videoUrl: p.video_url,
    isLive: !!p.is_live,
    isContent,
  };
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

      <div style={{ padding: "clamp(40px,5vw,70px) 0 0" }}>
        <WorkRow num="01" title="Documentary" subtitle="Long-form & cinema"
          tiles={docTiles} speed={0.3}
          onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />

        <WorkRow num="02" title="Ad Campaigns & Commercials" subtitle="Brands & launches"
          tiles={adTiles} speed={0.36} reverse
          onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />

        <WorkRow num="03" title="Live Events" subtitle="Concerts, ceremonies, keynotes"
          tiles={liveTiles} speed={0.28}
          onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />

        <WorkRow num="04" title="Content, Shorts & Reels" subtitle="Vertical, shot for the feed"
          tiles={reelTiles} speed={0.34} darkBg
          onTileClick={t => setLightbox({ title: t.title, videoUrl: t.videoUrl })} />
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
