import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Category, Collection, Item, Post, SearchData, Term } from '../types'

type BookmarkRow = {
  slug: string
  title: string
  link: string
  description: string
  tags: string[]
  thumbnail: string | null
  favicon: string | null
  category_slug: string
  verified: boolean
  featured_position: number | null
  pick_position: number | null
  created_at: string
  // From 0002_details.sql; optional so the app still runs before that migration.
  about?: string
  features?: string[]
  pricing?: string
  platforms?: string[]
  screenshots?: string[]
}
type CategoryRow = { slug: string; name: string; description: string }
type CollectionRow = { slug: string; title: string; description: string; position: number; bookmark_slugs: string[] }
type PostRow = { slug: string; title: string; excerpt: string; tag: string; body: string; bookmark_slugs: string[]; published_at: string }
type TermRow = { slug: string; term: string; definition: string; bookmark_slugs: string[] }

const REVALIDATE_SECONDS = 300

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see README).')
  }
  return createClient(url, key, {
    auth: { persistSession: false },
    // Cache every read for a few minutes so pages stay static between dashboard edits.
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: REVALIDATE_SECONDS } }) },
  })
}

async function rows<T>(table: string): Promise<T[]> {
  const { data, error } = await db().from(table).select('*')
  if (error) throw new Error(`Loading ${table} failed: ${error.message}`)
  return data as T[]
}

const byPosition = (key: 'featured_position' | 'pick_position') => (a: BookmarkRow, b: BookmarkRow) =>
  (a[key] ?? 0) - (b[key] ?? 0)

// Everything the site shows, loaded once per request (React cache) and from Next's fetch cache otherwise.
export const getData = cache(async () => {
  const [bRows, cRows, kRows, pRows, tRows] = await Promise.all([
    rows<BookmarkRow>('bookmarks'),
    rows<CategoryRow>('categories'),
    rows<CollectionRow>('collections'),
    rows<PostRow>('posts'),
    rows<TermRow>('glossary_terms'),
  ])

  const catName = new Map(cRows.map((c) => [c.slug, c.name]))
  const toItem = (r: BookmarkRow): Item => ({
    Title: r.title,
    Link: r.link,
    Description: r.description,
    Tags: r.tags.join(', '),
    Thumbnail: r.thumbnail ?? '',
    Favicon: r.favicon ?? '',
    Category: catName.get(r.category_slug) ?? r.category_slug,
    slug: r.slug,
    categorySlug: r.category_slug,
    tagList: r.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
    domain: r.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
    verified: r.verified,
    createdAt: r.created_at,
    about: r.about ?? '',
    features: r.features ?? [],
    pricing: r.pricing ?? '',
    platforms: r.platforms ?? [],
    screenshots: r.screenshots ?? [],
  })

  // Oldest first, matching the original file order; "recent" is the reverse.
  const sorted = [...bRows].sort((a, b) => a.created_at.localeCompare(b.created_at))
  const bookmarks = sorted.map(toItem)
  const bySlug = new Map(bookmarks.map((b) => [b.slug, b]))
  const pick = (slugs: string[]) => slugs.map((s) => bySlug.get(s)).filter((b): b is Item => !!b)

  const counts = new Map<string, number>()
  bookmarks.forEach((b) => counts.set(b.categorySlug, (counts.get(b.categorySlug) || 0) + 1))
  const categories: Category[] = cRows
    .filter((c) => counts.has(c.slug))
    .map((c) => ({ name: c.name, slug: c.slug, description: c.description, count: counts.get(c.slug)! }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

  const collections: Collection[] = [...kRows]
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ slug: c.slug, title: c.title, description: c.description, items: pick(c.bookmark_slugs) }))

  const posts: Post[] = [...pRows]
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .map((p) => {
      const paragraphs = p.body.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
      const words = paragraphs.join(' ').split(/\s+/).length
      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        tag: p.tag,
        paragraphs,
        items: pick(p.bookmark_slugs),
        readTime: `${Math.max(1, Math.round(words / 200))} min read`,
      }
    })

  const glossary: Term[] = [...tRows]
    .sort((a, b) => a.term.localeCompare(b.term))
    .map((t) => ({ slug: t.slug, term: t.term, definition: t.definition, items: pick(t.bookmark_slugs) }))

  const featured = sorted.filter((r) => r.featured_position !== null).sort(byPosition('featured_position')).map((r) => bySlug.get(r.slug)!)
  const picks = sorted.filter((r) => r.pick_position !== null).sort(byPosition('pick_position')).map((r) => bySlug.get(r.slug)!)
  const recent = [...bookmarks].reverse()

  const inCategory = (slug: string) => bookmarks.filter((b) => b.categorySlug === slug)

  // Shared tags say more about purpose than a shared category does.
  const similar = (b: Item, n = 5) => {
    const score = (x: Item) => (x.categorySlug === b.categorySlug ? 1 : 0) + 2 * x.tagList.filter((t) => b.tagList.includes(t)).length
    return bookmarks
      .filter((x) => x.slug !== b.slug && score(x) > 0)
      .sort((x, y) => score(y) - score(x))
      .slice(0, n)
  }

  // Shared tags first (any category), so "More inspiration" widens beyond the sidebar's "Similar".
  const moreInspiration = (b: Item, exclude: Item[], n = 4) => {
    const skip = new Set([b.slug, ...exclude.map((x) => x.slug)])
    const pool = bookmarks.filter((x) => !skip.has(x.slug))
    const related = pool.filter((x) => x.tagList.some((t) => b.tagList.includes(t)))
    return [...related, ...pool.filter((x) => !related.includes(x))].slice(0, n)
  }

  const search: SearchData = { bookmarks, featured: picks.length ? picks : featured, categories, collections, posts, glossary }

  return {
    bookmarks,
    categories,
    collections,
    posts,
    glossary,
    featured,
    picks,
    recent,
    search,
    getBookmark: (slug: string) => bySlug.get(slug),
    getCategory: (slug: string) => categories.find((c) => c.slug === slug),
    getCollection: (slug: string) => collections.find((c) => c.slug === slug),
    getPost: (slug: string) => posts.find((p) => p.slug === slug),
    getTerm: (slug: string) => glossary.find((t) => t.slug === slug),
    collectionsFor: (b: Item) => collections.filter((c) => c.items.some((x) => x.slug === b.slug)),
    inCategory,
    similar,
    moreInspiration,
  }
})
