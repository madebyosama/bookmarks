import raw from '../data/bookmarks'
import * as content from '../data/content'
import { Category, Item } from '../types'

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const bookmarks: Item[] = raw.map((b) => ({
  ...b,
  Tags: b.Tags || '',
  Category: b.Category || '',
  Description: b.Description || '',
  slug: slugify(b.Title),
  categorySlug: slugify(b.Category || ''),
  tagList: (b.Tags || '').split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
  domain: b.Link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
}))

const bySlug = new Map(bookmarks.map((b) => [b.slug, b]))

export const getBookmark = (slug: string) => bySlug.get(slug)

// Fails the build on a typo in content.ts instead of silently dropping a bookmark.
export function pick(slugs: string[]): Item[] {
  return slugs.map((s) => {
    const b = bySlug.get(s)
    if (!b) throw new Error(`Unknown bookmark slug "${s}" in app/data/content.ts`)
    return b
  })
}

const counts = new Map<string, number>()
bookmarks.forEach((b) => b.Category && counts.set(b.Category, (counts.get(b.Category) || 0) + 1))

export const categories: Category[] = Array.from(counts, ([name, count]) => ({
  name,
  slug: slugify(name),
  count,
  description: content.categoryDescriptions[name] || '',
})).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
export const inCategory = (slug: string) => bookmarks.filter((b) => b.categorySlug === slug)

export const featured = pick(content.featuredSlugs)
export const picks = pick(content.pickSlugs)
// bookmarks.tsx is append-only, so the tail is the newest.
export const recent = bookmarks.slice(-8).reverse()

export const collections = content.collections.map((c) => ({ ...c, items: pick(c.bookmarks) }))
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug)
export const collectionsFor = (b: Item) => collections.filter((c) => c.bookmarks.includes(b.slug))

export const posts = content.posts.map((p) => ({
  ...p,
  items: pick(p.bookmarks),
  readTime: `${Math.max(1, Math.round(p.body.join(' ').split(/\s+/).length / 200))} min read`,
}))
export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

export const glossary = content.glossary
  .map((t) => ({ ...t, items: pick(t.bookmarks) }))
  .sort((a, b) => a.term.localeCompare(b.term))
export const getTerm = (slug: string) => glossary.find((t) => t.slug === slug)

export function topTags(items: Item[], n = 16) {
  const c = new Map<string, number>()
  items.forEach((b) => b.tagList.forEach((t) => c.set(t, (c.get(t) || 0) + 1)))
  return Array.from(c, ([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, n)
}

export function similar(b: Item, n = 5) {
  // Shared tags say more about purpose than a shared category does.
  const score = (x: Item) =>
    (x.Category === b.Category ? 1 : 0) + 2 * x.tagList.filter((t) => b.tagList.includes(t)).length
  return bookmarks
    .filter((x) => x.slug !== b.slug && score(x) > 0)
    .sort((x, y) => score(y) - score(x))
    .slice(0, n)
}

// Shared tags first (any category), so "More inspiration" widens beyond the sidebar's "Similar".
export function moreInspiration(b: Item, exclude: Item[], n = 4) {
  const skip = new Set([b.slug, ...exclude.map((x) => x.slug)])
  const pool = bookmarks.filter((x) => !skip.has(x.slug))
  const related = pool.filter((x) => x.tagList.some((t) => b.tagList.includes(t)))
  return [...related, ...pool.filter((x) => !related.includes(x))].slice(0, n)
}
