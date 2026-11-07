import media from '../content/generated/media.json';

type MediaInfo = { w: number; h: number; from: string[] };
const lib = media as Record<string, MediaInfo>;

export const img = (name: string) => `/media/img/${name}.webp`;
export const thumb = (name: string) => `/media/thumb/${name}.webp`;
export const video = (name: string) => `/media/video/${name}.mp4`;
export const poster = (name: string) => `/media/video/${name}.jpg`;
export const doc = (file: string) => `/media/docs/${file}`;

export function ratio(name: string): number {
  const m = lib[name];
  return m ? m.w / m.h : 4 / 3;
}

/** Every image that came from a given page or post on the old website. */
export function fromSource(slug: string): string[] {
  return Object.keys(lib).filter((k) => lib[k].from.includes(slug));
}

export const mediaCount = Object.keys(lib).length;
