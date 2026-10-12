'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SearchPalette.module.css'
import Icon, { IconName, categoryIcon } from '../Icon/Icon'
import { Favicon } from '../Card/Card'
import { filterByValue } from '../../utils/filterBookmarks'
import { Item } from '../../types'
import { bookmarks, categories, collections, featured, glossary, posts } from '../../services/bookmarkService'

type Row = { href: string; title: string; sub: string; meta: string; item?: Item; icon?: IconName; mark?: string }
type Group = { label: string; rows: Row[] }
type Section = 'trending' | 'categories' | 'collections' | 'blog' | 'glossary'

const sections: { key: Section; label: string }[] = [
  { key: 'trending', label: 'Trending' },
  { key: 'categories', label: 'Categories' },
  { key: 'collections', label: 'Collections' },
  { key: 'blog', label: 'Blog' },
  { key: 'glossary', label: 'Glossary' },
]

const hit = (text: string, q: string) => {
  const h = text.toLowerCase()
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => h.includes(w))
}

const rowsFor = {
  bookmarks: (xs: Item[]): Row[] => xs.map((b) => ({ href: `/b/${b.slug}`, title: b.Title, sub: b.Description, meta: b.Category, item: b })),
  categories: (xs: typeof categories): Row[] =>
    xs.map((c) => ({ href: `/categories/${c.slug}`, title: c.name, sub: c.description, meta: String(c.count), icon: categoryIcon(c.name) })),
  collections: (xs: typeof collections): Row[] =>
    xs.map((c) => ({ href: `/collections/${c.slug}`, title: c.title, sub: c.description, meta: `${c.items.length} items`, item: c.items[0] })),
  posts: (xs: typeof posts): Row[] => xs.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, sub: p.excerpt, meta: p.readTime, item: p.items[0] })),
  terms: (xs: typeof glossary): Row[] => xs.map((t) => ({ href: `/glossary/${t.slug}`, title: t.term, sub: t.definition, meta: 'Glossary', mark: t.term[0] })),
}

function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem('recent-searches') || '[]')
  } catch {
    return []
  }
}

export default function SearchPalette() {
  const router = useRouter()
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [section, setSection] = useState<Section>('trending')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState<string[]>([])

  const show = () => {
    setQ('')
    setSection('trending')
    setActive(0)
    setRecent(loadRecent())
    setOpen(true)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (dialog.current?.open) dialog.current.close()
        else show()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open && !dialog.current?.open) {
      dialog.current?.showModal()
      input.current?.focus()
    }
  }, [open])

  const query = q.trim()
  const groups: Group[] = useMemo(() => {
    if (query) {
      return [
        { label: 'Bookmarks', rows: rowsFor.bookmarks(filterByValue(bookmarks, query).slice(0, 8)) },
        { label: 'Categories', rows: rowsFor.categories(categories.filter((c) => hit(`${c.name} ${c.description}`, query))) },
        { label: 'Collections', rows: rowsFor.collections(collections.filter((c) => hit(`${c.title} ${c.description}`, query))) },
        { label: 'Blog', rows: rowsFor.posts(posts.filter((p) => hit(`${p.title} ${p.excerpt}`, query))) },
        { label: 'Glossary', rows: rowsFor.terms(glossary.filter((t) => hit(`${t.term} ${t.definition}`, query))) },
      ].filter((g) => g.rows.length)
    }
    return {
      trending: [
        { label: 'Featured', rows: rowsFor.bookmarks(featured) },
        { label: 'Popular collections', rows: rowsFor.collections(collections.slice(0, 3)) },
        { label: 'Latest posts', rows: rowsFor.posts(posts.slice(0, 2)) },
      ],
      categories: [{ label: 'Categories', rows: rowsFor.categories(categories) }],
      collections: [{ label: 'Collections', rows: rowsFor.collections(collections) }],
      blog: [{ label: 'Blog', rows: rowsFor.posts(posts) }],
      glossary: [{ label: 'Glossary', rows: rowsFor.terms(glossary) }],
    }[section]
  }, [query, section])

  const flat = groups.flatMap((g) => g.rows)

  const go = (row: Row) => {
    if (query) {
      const next = [query, ...recent.filter((r) => r !== query)].slice(0, 5)
      try {
        localStorage.setItem('recent-searches', JSON.stringify(next))
      } catch {}
    }
    dialog.current?.close()
    router.push(row.href)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const n = flat.length
      if (n) setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : n - 1)) % n)
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault()
      go(flat[active])
    }
  }

  useEffect(() => {
    document.getElementById(`search-opt-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  let i = -1
  return (
    <>
      <button type='button' className={styles.trigger} onClick={show}>
        <Icon name='search' />
        <span className={styles.grow}>Search</span>
        <kbd className={styles.kbd}>⌘K</kbd>
      </button>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label='Search'
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        {open && (
          <div className={styles.panel}>
            <div className={styles.inputRow}>
              <Icon name='search' size={18} />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onKeyDown}
                placeholder='Search bookmarks, categories, collections, posts, terms…'
                className={styles.input}
                role='combobox'
                aria-expanded='true'
                aria-controls='search-results'
                aria-activedescendant={flat[active] ? `search-opt-${active}` : undefined}
                aria-label='Search'
              />
              <button type='button' className={styles.close} onClick={() => dialog.current?.close()} aria-label='Close search'>
                <Icon name='close' />
              </button>
            </div>

            {recent.length > 0 && (
              <div className={styles.recent}>
                <span className={styles.recentLabel}>Recent</span>
                {recent.map((r) => (
                  <button key={r} type='button' className={styles.recentChip} onClick={() => setQ(r)}>
                    {r}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.body}>
              <nav className={styles.sections} aria-label='Search sections'>
                <div className={styles.groupLabel}>Browse</div>
                {sections.map((s) => (
                  <button
                    key={s.key}
                    type='button'
                    className={`${styles.section} ${!query && section === s.key ? styles.sectionActive : ''}`}
                    onClick={() => {
                      setSection(s.key)
                      setQ('')
                      setActive(0)
                      input.current?.focus()
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>

              <div id='search-results' role='listbox' aria-label='Results' className={styles.results}>
                {groups.map((g) => (
                  <div key={g.label} role='group' aria-label={g.label}>
                    <div className={styles.groupLabel}>{g.label}</div>
                    {g.rows.map((r) => {
                      i += 1
                      const idx = i
                      return (
                        <div
                          key={r.href}
                          id={`search-opt-${idx}`}
                          role='option'
                          aria-selected={idx === active}
                          className={`${styles.option} ${idx === active ? styles.optionActive : ''}`}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => go(r)}
                        >
                          {r.icon ? (
                            <span className={styles.mark}><Icon name={r.icon} /></span>
                          ) : r.mark ? (
                            <span className={styles.mark}>{r.mark}</span>
                          ) : r.item ? (
                            <Favicon item={r.item} size={30} />
                          ) : null}
                          <span className={styles.text}>
                            <span className={styles.title}>{r.title}</span>
                            <span className={styles.sub}>{r.sub}</span>
                          </span>
                          <span className={styles.meta}>{r.meta}</span>
                        </div>
                      )
                    })}
                  </div>
                ))}
                {query && groups.length === 0 && (
                  <div className={styles.empty}>
                    <p className={styles.emptyTitle}>Nothing matches “{query}”</p>
                    <p>Try a tag like “colors”, “icons” or “animations”.</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.footer}>
              <span><kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> to move</span>
              <span><kbd className={styles.kbd}>Enter</kbd> to open</span>
              <span><kbd className={styles.kbd}>Esc</kbd> to close</span>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
