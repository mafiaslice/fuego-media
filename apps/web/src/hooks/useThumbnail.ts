import { useState, useEffect } from "react";
import { ytId, ytThumbUrl, vimeoId } from "../utils/video";

const vimeoCache = new Map<string, string>();
const pending = new Set<string>();

export function useThumbnail(videoUrl: string): string | null {
  const [thumb, setThumb] = useState<string | null>(() => {
    const yt = ytId(videoUrl);
    if (yt) return ytThumbUrl(yt);
    const vm = vimeoId(videoUrl);
    if (vm && vimeoCache.has(vm)) return vimeoCache.get(vm)!;
    return null;
  });

  useEffect(() => {
    const vm = vimeoId(videoUrl);
    if (!vm || vimeoCache.has(vm) || pending.has(vm)) return;
    pending.add(vm);
    fetch(`/api/vimeo-thumbnail?url=${encodeURIComponent(`https://vimeo.com/${vm}`)}`)
      .then(r => r.json())
      .then(data => {
        if (data.thumbnail_url) {
          vimeoCache.set(vm, data.thumbnail_url);
          setThumb(data.thumbnail_url);
        }
      })
      .catch(() => {})
      .finally(() => pending.delete(vm));
  }, [videoUrl]);

  return thumb;
}
