import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(), // documentary | commercial | live | content
  client: text("client").notNull(),
  duration: text("duration").notNull(),
  aspect: text("aspect").notNull(), // landscape | vertical
  thumbnail_url: text("thumbnail_url").notNull(),
  video_url: text("video_url").notNull(),
  is_live: boolean("is_live").default(true).notNull(),
  sort_order: integer("sort_order").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const bts_entries = pgTable("bts_entries", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  project: text("project").notNull(),
  category: text("category").notNull(),
  event_date: date("event_date").notNull(),
  location: text("location").notNull(),
  cover_url: text("cover_url").notNull(),
  notes: text("notes").notNull(),
  quote: text("quote"),
  credits: text("credits").notNull(),
  sort_order: integer("sort_order").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const bts_images = pgTable("bts_images", {
  id: serial("id").primaryKey(),
  bts_entry_id: integer("bts_entry_id")
    .references(() => bts_entries.id)
    .notNull(),
  image_url: text("image_url").notNull(),
  caption: text("caption"),
  size: text("size").notNull(), // small | medium | large
  sort_order: integer("sort_order").default(0).notNull(),
});

export const project_inquiries = pgTable("project_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  project_type: text("project_type").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const newsletter_subscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
