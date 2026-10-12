'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './Browse.module.css'
import page from '../../page.module.css'
import Icon from '../Icon/Icon'
import { CardGrid } from '../Card/Card'
import { filterByValue } from '../../utils/filterBookmarks'
import { topTags } from '../../utils/tags'
import { Item } from '../../types'

const suggestions = ['colors', 'icons', 'animations', 'fonts']

// Filter state lives in the URL (?q=&tag=&tag=&sort=) so results are shareable and survive Back.
export default function Browse({ items }: { items: Item[] }) {
  const pathname = usePathname()
  const params = useSearchParams()
  const tagsRef = useRef<HTMLDetailsElement>(null)

  const q = params.get('q') || ''
  const tags = params.getAll('tag')
  const sort = params.get('sort') || 'curated'

  const update = (next: { q?: string; tags?: string[]; sort?: string }) => {
    const p = new URLSearchParams()
    const nq = next.q ?? q
    const nt = next.tags ?? tags
    const ns = next.sort ?? sort
    if (nq) p.set('q', nq)
    nt.forEach((t) => p.append('tag', t))
    if (ns !== 'curated') p.set('sort', ns)
    const s = p.toString()
    // Native replaceState updates useSearchParams synchronously (Next ≥14.1), so typing never lags.
    window.history.replaceState(null, '', s ? `${pathname}?${s}` : pathname)
  }

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (tagsRef.current?.open && !tagsRef.current.contains(e.target as Node)) tagsRef.current.open = false
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  let list = filterByValue(
    items.filter((b) => tags.every((t) => b.tagList.includes(t))),
    q
  )
  if (sort === 'az') list = [...list].sort((a, b) => a.Title.localeCompare(b.Title))
  if (sort === 'category') list = [...list].sort((a, b) => a.Category.localeCompare(b.Category) || a.Title.localeCompare(b.Title))

  const tagOptions = topTags(items)
  const filtered = !!q || tags.length > 0
  const toggleTag = (t: string) => update({ tags: tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t] })

  return (
    <>
      <div className={styles.bar}>
        <details className={styles.tags} ref={tagsRef}>
          <summary className={styles.pill}>
            Tags{tags.length ? ` · ${tags.length}` : ''} <Icon name='chevronDown' size={12} />
          </summary>
          <div className={styles.menu}>
            {tagOptions.map(({ tag, count }) => (
              <label key={tag} className={styles.option}>
                <input type='checkbox' checked={tags.includes(tag)} onChange={() => toggleTag(tag)} />
                <span className={styles.grow}>{tag}</span>
                <span className={styles.count}>{count}</span>
              </label>
            ))}
          </div>
        </details>

        <label className={`${styles.pill} ${styles.filter}`}>
          <Icon name='search' size={14} />
          <span className='sr-only'>Filter bookmarks</span>
          <input
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder='Filter by name, tag…'
            className={styles.input}
          />
        </label>

        {tags.map((t) => (
          <button key={t} type='button' className={styles.token} onClick={() => toggleTag(t)} aria-label={`Remove tag ${t}`}>
            #{t} ×
          </button>
        ))}
        {filtered && (
          <button type='button' className={styles.clear} onClick={() => update({ q: '', tags: [] })}>
            Clear all
          </button>
        )}

        <div className={styles.right}>
          <span>Showing {list.length}</span>
          <label className={styles.sort}>
            Sort
            <select value={sort} onChange={(e) => update({ sort: e.target.value })} className={styles.select}>
              <option value='curated'>Curated</option>
              <option value='az'>A–Z</option>
              <option value='category'>Category</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.results}>
        {list.length === 0 ? (
          <div className={page.state}>
            <h2 className={page.stateTitle}>No bookmarks fit these filters</h2>
            <p className={page.stateText}>Remove a filter above, or try one of these.</p>
            <div className={page.chips} style={{ justifyContent: 'center' }}>
              {suggestions.map((s) => (
                <button key={s} type='button' className={page.chip} onClick={() => update({ q: s, tags: [] })}>
                  {s}
                </button>
              ))}
              <button type='button' className={page.button} onClick={() => update({ q: '', tags: [] })}>
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <CardGrid items={list} />
        )}
      </div>
    </>
  )
}
