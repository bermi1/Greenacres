import media from '../content/generated/media.json';
import fullList from '../content/generated/full.json';

type MediaInfo = { w: number; h: number; from: string[] };
const lib = media as Record<string, MediaInfo>;

export const BASE = import.meta.env.BASE_URL;
/** The shareable preview ships full-size files only for large hero and feature photos. */
const PREVIEW = import.meta.env.VITE_PREVIEW === '1';
const FULL = new Set(fullList as string[]);

export const thumb = (name: string) => `${BASE}media/thumb/${name}.webp`;
export const img = (name: string) => (PREVIEW && !FULL.has(name) ? thumb(name) : `${BASE}media/img/${name}.webp`);
export const video = (name: string) => `${BASE}media/video/${name}.mp4`;
export const poster = (name: string) => `${BASE}media/video/${name}.jpg`;
export const doc = (file: string) => `${BASE}media/docs/${file}`;
export const brand = (file: string) => `${BASE}brand/${file}`;

export function ratio(name: string): number {
  const m = lib[name];
  return m ? m.w / m.h : 4 / 3;
}

/** Every image that came from a given page or post on the old website. */
export function fromSource(slug: string): string[] {
  return Object.keys(lib).filter((k) => lib[k].from.includes(slug));
}

export const mediaCount = Object.keys(lib).length;
