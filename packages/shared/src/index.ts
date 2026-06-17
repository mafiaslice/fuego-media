export type Category = "documentary" | "commercial" | "live" | "content";
export type Aspect = "landscape" | "vertical";
export type ImageSize = "small" | "medium" | "large";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: Category;
  client: string;
  duration: string;
  aspect: Aspect;
  thumbnail_url: string;
  video_url: string;
  is_live: boolean;
  sort_order: number;
  created_at: string;
}

export interface BtsImage {
  id: number;
  bts_entry_id: number;
  image_url: string;
  caption: string | null;
  size: ImageSize;
  sort_order: number;
}

export interface BtsEntry {
  id: number;
  slug: string;
  title: string;
  project: string;
  category: string;
  event_date: string;
  location: string;
  cover_url: string;
  notes: string;
  quote: string | null;
  credits: string;
  sort_order: number;
  created_at: string;
  images?: BtsImage[];
}

export interface ProjectInquiry {
  id: number;
  name: string;
  email: string;
  project_type: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  created_at: string;
}
