const BASE = "/api";

export const fetchProjects = (category?: string): Promise<unknown> =>
  fetch(`${BASE}/projects${category ? `?category=${category}` : ""}`).then((r) =>
    r.json()
  );

export const fetchBtsList = (): Promise<unknown> =>
  fetch(`${BASE}/bts`).then((r) => r.json());

export const fetchBtsEntry = (slug: string): Promise<unknown> =>
  fetch(`${BASE}/bts/${slug}`).then((r) => r.json());

export const postInquiry = (data: unknown): Promise<unknown> =>
  fetch(`${BASE}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const postNewsletter = (email: string): Promise<unknown> =>
  fetch(`${BASE}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then((r) => r.json());
