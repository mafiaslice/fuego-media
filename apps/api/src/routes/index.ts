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

// GET /vimeo-thumbnail?url=https://vimeo.com/123456
router.get("/vimeo-thumbnail", async (req, res) => {
  const url = req.query.url as string;
  if (!url) return res.status(400).json({ error: "url param required" });
  try {
    const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
    const data = await new Promise<any>((resolve, reject) => {
      https.get(oembedUrl, r => {
        let body = "";
        r.on("data", c => { body += c; });
        r.on("end", () => { try { resolve(JSON.parse(body)); } catch { reject(new Error("parse error")); } });
      }).on("error", reject);
    });
    if (!data.thumbnail_url) return res.status(404).json({ error: "no thumbnail" });
    return res.json({ thumbnail_url: data.thumbnail_url });
  } catch (err) {
    return res.status(502).json({ error: "vimeo fetch failed" });
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
    const rows = await db
      .select()
      .from(bts_entries)
      .orderBy(desc(bts_entries.event_date));
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
    const [entry] = await db
      .select()
      .from(bts_entries)
      .where(eq(bts_entries.slug, slug));
    if (!entry) return res.status(404).json({ error: "Not found" });
    const images = await db
      .select()
      .from(bts_images)
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
