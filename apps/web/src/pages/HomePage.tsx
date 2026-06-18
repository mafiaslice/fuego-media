import { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import LogoStrip from "../components/LogoStrip";
import WorkRow from "../components/WorkRow";
import type { Tile } from "../components/WorkRow";
import VideoLightbox from "../components/VideoLightbox";
import InquiryForm from "../components/InquiryForm";
import NewsletterSignup from "../components/NewsletterSignup";

const HERO_SLIDES = [
  { title: "Tides of the Delta", category: "Documentary", bg: "radial-gradient(120% 120% at 70% 22%, #6e1626 0%, #3a0b16 46%, #150406 100%)" },
  { title: "Velocity", category: "Ad Campaign — Nissan", bg: "radial-gradient(120% 130% at 30% 30%, #54101f 0%, #2c0810 52%, #120406 100%)" },
  { title: "Independence Day, Live", category: "Live Events", bg: "linear-gradient(120deg, #1a0508 0%, #4a0f1c 56%, #150406 100%)" },
  { title: "Atlas Rising", category: "Documentary", bg: "radial-gradient(100% 120% at 80% 78%, #7a1a2c 0%, #45101d 42%, #130406 100%)" },
  { title: "Lumen, Spring Drop", category: "Commercial", bg: "linear-gradient(200deg, #2c0810 0%, #5a1226 60%, #190508 100%)" },
  { title: "City of Light", category: "Live Events", bg: "radial-gradient(120% 120% at 40% 70%, #631524 0%, #340b15 52%, #110406 100%)" },
  { title: "Echoes", category: "Short Film", bg: "linear-gradient(150deg, #160407 0%, #5a1226 70%, #2c0810 100%)" },
];

const mk = (titles: string[], tag: string, durs: string[], bg: string, extra?: Partial<Tile>): Tile[] =>
  titles.map((title, i) => ({ title, tag, dur: durs[i % durs.length], bg, ...extra }));

const DOC_TILES = mk(
  ["Tides of the Delta","The Salt Road","After the Harvest","Borderlands","Mother Tongue","The Last Ferry","Granite","Nightshift"],
  "Documentary",
  ["24:10","41:02","18:30","52:18","29:44","12:08","37:21","22:55"],
  "linear-gradient(150deg,#3a0b16 0%,#52101f 46%,#1f0609 100%)"
);

const AD_TILES = mk(
  ["Velocity","Lumen Skincare","Aurora Bank","Field & Co.","Pulse Energy","Maison No.5","Drift Eyewear","Terra Coffee"],
  "Commercial",
  ["0:60","0:30","1:20","0:45","0:90","0:30","0:60","0:50"],
  "linear-gradient(150deg,#46101d 0%,#5a1226 50%,#21070b 100%)"
);

const LIVE_TILES = mk(
  ["Independence Day Live","Sound Garden Fest","The Founders Summit","Night Market","Arena Opening","Gala '25","Marathon Live","Launch Keynote"],
  "Live Event",
  ["3:12:00","2:40:00","58:00","1:22:00","46:30","1:50:00","4:05:00","38:12"],
  "linear-gradient(150deg,#310a14 0%,#4d101e 52%,#170508 100%)",
  { isLive: true }
);

const CONTENT_TILES = mk(
  ["Behind the Lens","60s of Lagos","Shooting Velocity","Studio Diaries","Reel 014","Sound On","One Take","Golden Hour"],
  "Short / Reel",
  ["0:45","1:00","0:38","0:52","0:29","0:60","0:41","0:55"],
  "",
  { isContent: true }
);

export default function HomePage() {
  const [lightbox, setLightbox] = useState<{ title: string; videoUrl?: string } | null>(null);

  return (
    <div style={{ position: "relative", width: "100%", background: "#160407" }}>
      <HeroCarousel slides={HERO_SLIDES} onPlay={title => setLightbox({ title })} />

      <LogoStrip />

      <div style={{ padding: "clamp(40px,5vw,70px) 0 0" }}>
        <WorkRow num="01" title="Documentary" subtitle="Long-form & cinema" tiles={DOC_TILES} speed={0.3} onTileClick={t => setLightbox({ title: t.title })} />
        <WorkRow num="02" title="Ad Campaigns & Commercials" subtitle="Brands & launches" tiles={AD_TILES} speed={0.36} reverse onTileClick={t => setLightbox({ title: t.title })} />
        <WorkRow num="03" title="Live Events" subtitle="Concerts, ceremonies, keynotes" tiles={LIVE_TILES} speed={0.28} onTileClick={t => setLightbox({ title: t.title })} />
        <WorkRow num="04" title="Content, Shorts & Reels" subtitle="Vertical, shot for the feed" tiles={CONTENT_TILES} speed={0.34} darkBg onTileClick={t => setLightbox({ title: t.title })} />
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
