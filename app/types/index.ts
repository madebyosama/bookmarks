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
};

export type Category = {
  name: string;
  slug: string;
  count: number;
  description: string;
};
