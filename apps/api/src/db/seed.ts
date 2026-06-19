import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { projects } from "./schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const PROJECTS = [
  // ── Documentary ──────────────────────────────────────────────────────────
  { slug: "bloom-network",           title: "Bloom Network",            category: "documentary", client: "Meristem",             duration: "", aspect: "landscape", thumbnail_url: "/thumbnails/Bloom Network 01.jpg",     video_url: "https://vimeo.com/687825882",           is_live: false, sort_order: 101 },
  { slug: "founders-experience",     title: "Founders Experience",      category: "documentary", client: "",                     duration: "", aspect: "landscape", thumbnail_url: "",                                      video_url: "https://youtu.be/8YcDib-6VyM",          is_live: false, sort_order: 102 },
  { slug: "shaldag-fisheries",       title: "Shaldag Fisheries",        category: "documentary", client: "",                     duration: "", aspect: "landscape", thumbnail_url: "/thumbnails/Shaldag Fisheries 03.jpg",  video_url: "https://vimeo.com/456369605",           is_live: false, sort_order: 103 },
  { slug: "light-up-kastina",        title: "Light Up Kastina",         category: "documentary", client: "A'Solar",              duration: "", aspect: "landscape", thumbnail_url: "",                                      video_url: "https://youtu.be/ttGgLQLEVTc",         is_live: false, sort_order: 104 },
  { slug: "nord-automobiles",        title: "Nord Automobiles",         category: "documentary", client: "",                     duration: "", aspect: "landscape", thumbnail_url: "",                                      video_url: "https://youtu.be/tQyUo7tpHMs",         is_live: false, sort_order: 105 },
  { slug: "the-sterling-experience", title: "The Sterling Experience",  category: "documentary", client: "Sterling Bank",         duration: "", aspect: "landscape", thumbnail_url: "",                                      video_url: "https://youtu.be/wksh0o5TPG0",         is_live: false, sort_order: 106 },
  { slug: "light-is-energy",         title: "Light Is Energy",          category: "documentary", client: "",                     duration: "", aspect: "landscape", thumbnail_url: "",                                      video_url: "https://youtu.be/br1CsL2fAF4",         is_live: false, sort_order: 107 },
  { slug: "embrace-equity",          title: "Embrace Equity",           category: "documentary", client: "",                     duration: "", aspect: "landscape", thumbnail_url: "",                                      video_url: "https://youtu.be/TwUiS7w6a5Y",         is_live: false, sort_order: 108 },

  // ── Commercial ───────────────────────────────────────────────────────────
  { slug: "oraimo-guchi",              title: "ORAIMO | Guchi",             category: "commercial", client: "Oraimo",         duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/r-EEjcj4Mo0",    is_live: false, sort_order: 201 },
  { slug: "velvet-nights-funky-tiger", title: "Velvet Nights | Funky Tiger", category: "commercial", client: "Funky Tiger",   duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/J1BiUgo6Z2g",    is_live: false, sort_order: 202 },
  { slug: "pooler-app-woodcore",       title: "Pooler App | Woodcore",       category: "commercial", client: "Woodcore",      duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/wwSJoU1BsG0",    is_live: false, sort_order: 203 },
  { slug: "hybrid-motors-new-era",     title: "Hybrid Motors | New Era",     category: "commercial", client: "Hybrid Motors", duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/8XFEpFjr4Tk",    is_live: false, sort_order: 204 },
  { slug: "pooler-baas",               title: "POOLER BaaS",                 category: "commercial", client: "Pooler",        duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/4GTlXI2JXvI",    is_live: false, sort_order: 205 },
  { slug: "feed-your-genius-500chow",  title: "Feed Your Genius | 500Chow",  category: "commercial", client: "500Chow",       duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/bQew7K2TjHs",    is_live: false, sort_order: 206 },
  { slug: "vibe-out",                  title: "Vibe Out",                    category: "commercial", client: "PUME",          duration: "", aspect: "landscape", thumbnail_url: "",                                     video_url: "https://youtu.be/4XwVc0h2V4s",    is_live: false, sort_order: 207 },
  { slug: "ginjaaah-coca-cola",        title: "GINJAAAH | Coca-Cola",        category: "commercial", client: "Coca-Cola",     duration: "", aspect: "landscape", thumbnail_url: "/thumbnails/Coca-Cola Ginja 08.jpg",  video_url: "https://vimeo.com/689239033",     is_live: false, sort_order: 208 },

  // ── Live ─────────────────────────────────────────────────────────────────
  { slug: "art-x-lagos-fair",          title: "Art X Lagos | Fair",          category: "live", client: "ArtX",          duration: "", aspect: "landscape", thumbnail_url: "/thumbnails/Art X.jpg",              video_url: "https://youtu.be/OuY8U83i9Eo",  is_live: false, sort_order: 301 },
  { slug: "oyamakewegrove8",           title: "OyaMakeWeGroove8",            category: "live", client: "",              duration: "", aspect: "landscape", thumbnail_url: "",                                   video_url: "https://youtu.be/FX_H4rpbqz0",  is_live: false, sort_order: 302 },
  { slug: "omwg-7",                    title: "OMWG 7",                      category: "live", client: "",              duration: "", aspect: "landscape", thumbnail_url: "",                                   video_url: "https://youtu.be/OOYXbuKRUjo",  is_live: false, sort_order: 303 },
  { slug: "pitch2win-5",               title: "PITCH2WIN-5",                 category: "live", client: "",              duration: "", aspect: "landscape", thumbnail_url: "",                                   video_url: "https://youtu.be/IHClDRhUB0c",  is_live: false, sort_order: 304 },
  { slug: "innov8-fest-credit-direct", title: "INNOV8 FEST | Credit Direct", category: "live", client: "Credit Direct", duration: "", aspect: "landscape", thumbnail_url: "/thumbnails/Credit Direct 05.jpg",  video_url: "https://youtu.be/qmhIAsWY6As",  is_live: false, sort_order: 305 },
  { slug: "scrum-day-nigeria-2026",    title: "Scrum Day Nigeria 2026",      category: "live", client: "",              duration: "", aspect: "landscape", thumbnail_url: "",                                   video_url: "https://youtu.be/_9em3L7rNLI",  is_live: false, sort_order: 306 },
  { slug: "pbn-pooldown",              title: "PBN PoolDown",                category: "live", client: "PBN",           duration: "", aspect: "landscape", thumbnail_url: "",                                   video_url: "https://youtu.be/TntCtWAiLNA",  is_live: false, sort_order: 307 },
  { slug: "africas-tech-demo-day",     title: "Africa's Tech Demo Day",      category: "live", client: "",              duration: "", aspect: "landscape", thumbnail_url: "",                                   video_url: "https://youtu.be/m_qFswFxZfE",  is_live: false, sort_order: 308 },

  // ── Content / Reels ──────────────────────────────────────────────────────
  { slug: "untitled-reel-1", title: "Untitled Reel 1", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "/thumbnails/Ginja 1.jpg",  video_url: "https://vimeo.com/689242851",              is_live: false, sort_order: 401 },
  { slug: "untitled-reel-2", title: "Untitled Reel 2", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "/thumbnails/Nivea.jpg",    video_url: "https://vimeo.com/384234664",              is_live: false, sort_order: 402 },
  { slug: "untitled-reel-3", title: "Untitled Reel 3", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "",                          video_url: "https://youtube.com/shorts/qVRrSplQWQM",  is_live: false, sort_order: 403 },
  { slug: "untitled-reel-4", title: "Untitled Reel 4", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "",                          video_url: "https://youtube.com/shorts/lrL45YPZ600",  is_live: false, sort_order: 404 },
  { slug: "untitled-reel-5", title: "Untitled Reel 5", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "",                          video_url: "https://youtube.com/shorts/9XNDit4iAJk",  is_live: false, sort_order: 405 },
  { slug: "untitled-reel-6", title: "Untitled Reel 6", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "",                          video_url: "https://youtube.com/shorts/vKf9kik9JeA",  is_live: false, sort_order: 406 },
  { slug: "untitled-reel-7", title: "Untitled Reel 7", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "",                          video_url: "https://youtube.com/shorts/XPW8WYdtlUc",  is_live: false, sort_order: 407 },
  { slug: "untitled-reel-8", title: "Untitled Reel 8", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "/thumbnails/Ginja 2.jpg",  video_url: "https://vimeo.com/689253404",              is_live: false, sort_order: 408 },
];

async function seed() {
  console.log("Clearing projects table…");
  await db.delete(projects);

  console.log(`Inserting ${PROJECTS.length} projects…`);
  const inserted = await db.insert(projects).values(PROJECTS).returning();
  console.log(`✓ Inserted ${inserted.length} rows`);

  for (const p of inserted) {
    console.log(`  [${p.id}] ${p.category.padEnd(12)} ${p.title}`);
  }

  await pool.end();
}

seed().catch(err => { console.error(err); process.exit(1); });
