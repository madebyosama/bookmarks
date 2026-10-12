import { Item } from '../types'

export function topTags(items: Item[], n = 16) {
  const c = new Map<string, number>()
  items.forEach((b) => b.tagList.forEach((t) => c.set(t, (c.get(t) || 0) + 1)))
  return Array.from(c, ([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, n)
}
