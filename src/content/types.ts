export type Block = { type: 'p' | 'h' | 'li'; text: string };
export type Post = {
  slug: string;
  title: string;
  date: string;
  category: 'News' | 'Blog' | 'Results';
  excerpt: string;
  cover: string | null;
  images: string[];
  hasVideo: boolean;
  blocks: Block[];
};
export type Album = { title: string; text: string; images: string[]; video: string | null };
