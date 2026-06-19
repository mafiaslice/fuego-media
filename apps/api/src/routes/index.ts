import { Router } from "express";
import https from "https";
import { db } from "../db";
import {
  projects,
  bts_entries,
  bts_images,
  project_inquiries,
  newsletter_subscribers,
} from "../db/schema";
import { eq, desc, asc } from "drizzle-orm";

const router = Router();

// ─── Thumbnail helpers ────────────────────────────────────────────────────────

function ytId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

function headContentLength(url: string): Promise<number> {
  return new Promise(resolve => {
    const req = https.request(url, { method: "HEAD" }, r => {
      const len = parseInt(r.headers["content-length"] ?? "0", 10);
      resolve(isNaN(len) ? 0 : len);
    });
    req.on("error", () => resolve(0));
    req.setTimeout(6000, () => { req.destroy(); resolve(0); });
    req.end();
  });
}

async function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Fuego/1.0)" } }, r => {
      let body = "";
      r.on("data", c => { body += c; });
      r.on("end", () => { try { resolve(JSON.parse(body)); } catch (e) { reject(e); } });
    }).on("error", reject);
  });
}

// YouTube: try maxres → hq → mq → default until content-length > 3 KB
async function resolveYtThumbnail(id: string): Promise<string> {
  const sizes = ["maxresdefault", "hqdefault", "mqdefault", "default"];
  for (const size of sizes) {
    const url = `https://img.youtube.com/vi/${id}/${size}.jpg`;
    const len = await headContentLength(url);
    if (len > 3000) return url;
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// Vimeo: oEmbed API server-side
async function resolveVimeoThumbnail(videoUrl: string): Promise<string | null> {
  try {
    const data = await fetchJson(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`
    );
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

async function resolveThumbnail(videoUrl: string): Promise<string | null> {
  const yt = ytId(videoUrl);
  if (yt) return resolveYtThumbnail(yt);
  const vm = vimeoId(videoUrl);
  if (vm) return resolveVimeoThumbnail(videoUrl);
  return null;
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// GET /vimeo-thumbnail?url=https://vimeo.com/123456  (kept for legacy calls)
router.get("/vimeo-thumbnail", async (req, res) => {
  const url = req.query.url as string;
  if (!url) return res.status(400).json({ error: "url param required" });
  const thumb = await resolveVimeoThumbnail(url);
  if (!thumb) return res.status(502).json({ error: "vimeo fetch failed" });
  return res.json({ thumbnail_url: thumb });
});

// GET /projects/refresh-thumbnails
// Fetches & caches thumbnails for every project row in the DB.
router.get("/projects/refresh-thumbnails", async (req, res) => {
  try {
    const rows = await db.select().from(projects).orderBy(asc(projects.sort_order));
    const results: { id: number; slug: string; thumbnail_url: string | null; ok: boolean }[] = [];

    for (const row of rows) {
      const thumb = await resolveThumbnail(row.video_url);
      if (thumb) {
        await db.update(projects).set({ thumbnail_url: thumb }).where(eq(projects.id, row.id));
      }
      results.push({ id: row.id, slug: row.slug, thumbnail_url: thumb, ok: !!thumb });
      console.log(`[thumb] ${row.slug}: ${thumb ?? "FAILED"}`);
    }

    return res.json({ updated: results.filter(r => r.ok).length, total: rows.length, results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /projects
router.get("/projects", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const rows = await db
      .select()
      .from(projects)
      .where(category ? eq(projects.category, category) : undefined)
      .orderBy(asc(projects.sort_order));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /bts
router.get("/bts", async (req, res) => {
  try {
    const rows = await db.select().from(bts_entries).orderBy(desc(bts_entries.event_date));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /bts/:slug
router.get("/bts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [entry] = await db.select().from(bts_entries).where(eq(bts_entries.slug, slug));
    if (!entry) return res.status(404).json({ error: "Not found" });
    const images = await db
      .select().from(bts_images)
      .where(eq(bts_images.bts_entry_id, entry.id))
      .orderBy(asc(bts_images.sort_order));
    return res.json({ ...entry, images });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /inquiries
router.post("/inquiries", async (req, res) => {
  try {
    const { name, email, project_type, message } = req.body as {
      name: string; email: string; project_type: string; message: string;
    };
    const [record] = await db.insert(project_inquiries).values({ name, email, project_type, message }).returning();
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /newsletter
router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body as { email: string };
    await db.insert(newsletter_subscribers).values({ email }).onConflictDoNothing({ target: newsletter_subscribers.email });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
