import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { projects } from "./schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const PROJECTS = [
  // ── Documentary ──────────────────────────────────────────────────────────
  { slug: "the-meristem-experience", title: "The Meristem Experience", category: "documentary", client: "Meristem",              duration: "5:50", aspect: "landscape", thumbnail_url: "", video_url: "https://vimeo.com/687825882",                     is_live: false, sort_order: 101 },
  { slug: "untitled-doc-2",          title: "Untitled Doc 2",          category: "documentary", client: "",                     duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/8YcDib-6VyM",                    is_live: false, sort_order: 102 },
  { slug: "untitled-doc-3",          title: "Untitled Doc 3",          category: "documentary", client: "",                     duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://vimeo.com/456369605",                     is_live: false, sort_order: 103 },
  { slug: "light-up-katsina",        title: "Light Up Katsina",        category: "documentary", client: "A'Solar",              duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/ttGgLQLEVTc",                   is_live: false, sort_order: 104 },
  { slug: "untitled-doc-5",          title: "Untitled Doc 5",          category: "documentary", client: "",                     duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/tQyUo7tpHMs",                   is_live: false, sort_order: 105 },
  { slug: "untitled-doc-6",          title: "Untitled Doc 6",          category: "documentary", client: "",                     duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/wksh0o5TPG0",                   is_live: false, sort_order: 106 },
  { slug: "untitled-doc-7",          title: "Untitled Doc 7",          category: "documentary", client: "",                     duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/br1CsL2fAF4",                   is_live: false, sort_order: 107 },
  { slug: "untitled-doc-8",          title: "Untitled Doc 8",          category: "documentary", client: "",                     duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/TwUiS7w6a5Y",                   is_live: false, sort_order: 108 },

  // ── Commercial ───────────────────────────────────────────────────────────
  { slug: "untitled-ad-1",  title: "Untitled Ad 1",  category: "commercial", client: "",                       duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/r-EEjcj4Mo0",    is_live: false, sort_order: 201 },
  { slug: "untitled-ad-2",  title: "Untitled Ad 2",  category: "commercial", client: "",                       duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/J1BiUgo6Z2g",    is_live: false, sort_order: 202 },
  { slug: "untitled-ad-3",  title: "Untitled Ad 3",  category: "commercial", client: "",                       duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/wwSJoU1BsG0",    is_live: false, sort_order: 203 },
  { slug: "new-era",        title: "New Era",        category: "commercial", client: "Hybrid Motors Nigeria",  duration: "0:22", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/8XFEpFjr4Tk",    is_live: false, sort_order: 204 },
  { slug: "untitled-ad-5",  title: "Untitled Ad 5",  category: "commercial", client: "",                       duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/4GTlXI2JXvI",    is_live: false, sort_order: 205 },
  { slug: "untitled-ad-6",  title: "Untitled Ad 6",  category: "commercial", client: "",                       duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/bQew7K2TjHs",    is_live: false, sort_order: 206 },
  { slug: "vibe-out",       title: "Vibe Out",       category: "commercial", client: "PUME",                   duration: "0:31", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/4XwVc0h2V4s",    is_live: false, sort_order: 207 },
  { slug: "untitled-ad-8",  title: "Untitled Ad 8",  category: "commercial", client: "",                       duration: "",     aspect: "landscape", thumbnail_url: "", video_url: "https://vimeo.com/689239033",     is_live: false, sort_order: 208 },

  // ── Live ─────────────────────────────────────────────────────────────────
  { slug: "untitled-live-1",  title: "Untitled Live 1",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/OuY8U83i9Eo",  is_live: false, sort_order: 301 },
  { slug: "untitled-live-2",  title: "Untitled Live 2",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/FX_H4rpbqz0",  is_live: false, sort_order: 302 },
  { slug: "untitled-live-3",  title: "Untitled Live 3",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/OOYXbuKRUjo",  is_live: false, sort_order: 303 },
  { slug: "untitled-live-4",  title: "Untitled Live 4",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/IHClDRhUB0c",  is_live: false, sort_order: 304 },
  { slug: "untitled-live-5",  title: "Untitled Live 5",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/qmhIAsWY6As",  is_live: false, sort_order: 305 },
  { slug: "untitled-live-6",  title: "Untitled Live 6",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/_9em3L7rNLI",  is_live: false, sort_order: 306 },
  { slug: "untitled-live-7",  title: "Untitled Live 7",  category: "live", client: "",     duration: "", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/TntCtWAiLNA",  is_live: false, sort_order: 307 },
  { slug: "art-x-lagos-night", title: "Art X Lagos Night", category: "live", client: "ArtX", duration: "1:02", aspect: "landscape", thumbnail_url: "", video_url: "https://youtu.be/m_qFswFxZfE", is_live: false, sort_order: 308 },

  // ── Content / Reels ──────────────────────────────────────────────────────
  { slug: "untitled-reel-1", title: "Untitled Reel 1", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://vimeo.com/689242851",                      is_live: false, sort_order: 401 },
  { slug: "untitled-reel-2", title: "Untitled Reel 2", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://vimeo.com/384234664",                      is_live: false, sort_order: 402 },
  { slug: "untitled-reel-3", title: "Untitled Reel 3", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://youtube.com/shorts/qVRrSplQWQM",           is_live: false, sort_order: 403 },
  { slug: "untitled-reel-4", title: "Untitled Reel 4", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://youtube.com/shorts/lrL45YPZ600",           is_live: false, sort_order: 404 },
  { slug: "untitled-reel-5", title: "Untitled Reel 5", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://youtube.com/shorts/9XNDit4iAJk",           is_live: false, sort_order: 405 },
  { slug: "untitled-reel-6", title: "Untitled Reel 6", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://youtube.com/shorts/vKf9kik9JeA",           is_live: false, sort_order: 406 },
  { slug: "untitled-reel-7", title: "Untitled Reel 7", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://youtube.com/shorts/XPW8WYdtlUc",           is_live: false, sort_order: 407 },
  { slug: "untitled-reel-8", title: "Untitled Reel 8", category: "content", client: "", duration: "", aspect: "vertical", thumbnail_url: "", video_url: "https://vimeo.com/689253404",                      is_live: false, sort_order: 408 },
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
