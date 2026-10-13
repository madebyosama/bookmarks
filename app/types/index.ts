export type Bookmark = {
  Title: string;
  Link: string;
  Description: string;
  Tags: string;
  Thumbnail: string;
  Category: string;
  Favicon: string;
};

export type Item = Bookmark & {
  slug: string;
  categorySlug: string;
  tagList: string[];
  domain: string;
  verified: boolean;
  createdAt: string;
  about: string;
  features: string[];
  pricing: string;
  platforms: string[];
  screenshots: string[];
  tagline: string;
  subscriber: boolean;
  deal: string;
  dealCode: string;
};

export type Category = { name: string; slug: string; count: number; description: string };
export type Collection = { slug: string; title: string; description: string; items: Item[] };
export type Post = { slug: string; title: string; excerpt: string; tag: string; paragraphs: string[]; items: Item[]; readTime: string; date: string };
export type Term = { slug: string; term: string; definition: string; items: Item[] };

// What the client-side search palette needs.
export type SearchData = {
  bookmarks: Item[];
  featured: Item[];
  categories: Category[];
  collections: Collection[];
  posts: Post[];
  glossary: Term[];
};
