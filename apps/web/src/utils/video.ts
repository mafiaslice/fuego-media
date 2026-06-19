export function ytId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

export function ytThumbUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function ytEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`;
}

export function vimeoEmbedUrl(id: string): string {
  return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&controls=0`;
}

export function getEmbedUrl(url: string): string | null {
  const yt = ytId(url);
  if (yt) return ytEmbedUrl(yt);
  const vm = vimeoId(url);
  if (vm) return vimeoEmbedUrl(vm);
  return null;
}

export function getSyncThumbnail(url: string): string | null {
  const yt = ytId(url);
  return yt ? ytThumbUrl(yt) : null;
}
