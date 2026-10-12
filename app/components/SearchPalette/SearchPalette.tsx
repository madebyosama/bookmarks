'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SearchPalette.module.css'
import Icon, { IconName, categoryIcon } from '../Icon/Icon'
import Rail from '../Rail/Rail'
import { Favicon } from '../Card/Card'
import { CollectionTile, PostTile } from '../Tiles/Tiles'
import { filterByValue } from '../../utils/filterBookmarks'
import { Item, SearchData } from '../../types'

type Row = { href: string; title: string; sub: string; meta: string; item?: Item; icon?: IconName; mark?: string }
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

function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem('recent-searches') || '[]')
  } catch {
    return []
  }
}

export default function SearchPalette({ data }: { data: SearchData }) {
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
  const rows = useMemo(() => {
    const b = (xs: Item[]): Row[] => xs.map((x) => ({ href: `/b/${x.slug}`, title: x.Title, sub: x.Description, meta: x.Category, item: x }))
    const c = (xs: SearchData['categories']): Row[] =>
      xs.map((x) => ({ href: `/categories/${x.slug}`, title: x.name, sub: x.description, meta: String(x.count), icon: categoryIcon(x.name) }))
    const k = (xs: SearchData['collections']): Row[] =>
      xs.map((x) => ({ href: `/collections/${x.slug}`, title: x.title, sub: x.description, meta: `${x.items.length} items`, item: x.items[0] }))
    const p = (xs: SearchData['posts']): Row[] => xs.map((x) => ({ href: `/blog/${x.slug}`, title: x.title, sub: x.excerpt, meta: x.readTime, item: x.items[0] }))
    const g = (xs: SearchData['glossary']): Row[] => xs.map((x) => ({ href: `/glossary/${x.slug}`, title: x.term, sub: x.definition, meta: 'Glossary', mark: x.term[0] }))

    if (query) {
      return [
        { label: 'Bookmarks', rows: b(filterByValue(data.bookmarks, query).slice(0, 8)) },
        { label: 'Categories', rows: c(data.categories.filter((x) => hit(`${x.name} ${x.description}`, query))) },
        { label: 'Collections', rows: k(data.collections.filter((x) => hit(`${x.title} ${x.description}`, query))) },
        { label: 'Blog', rows: p(data.posts.filter((x) => hit(`${x.title} ${x.excerpt}`, query))) },
        { label: 'Glossary', rows: g(data.glossary.filter((x) => hit(`${x.term} ${x.definition}`, query))) },
      ].filter((grp) => grp.rows.length)
    }
    return {
      trending: [],
      categories: [{ label: 'Categories', rows: c(data.categories) }],
      collections: [{ label: 'Collections', rows: k(data.collections) }],
      blog: [{ label: 'Blog', rows: p(data.posts) }],
      glossary: [{ label: 'Glossary', rows: g(data.glossary) }],
    }[section]
  }, [query, section, data])

  const flat = rows.flatMap((g) => g.rows)
  const trending = !query && section === 'trending'

  const remember = () => {
    if (!query) return
    try {
      localStorage.setItem('recent-searches', JSON.stringify([query, ...recent.filter((r) => r !== query)].slice(0, 5)))
    } catch {}
  }

  const close = () => dialog.current?.close()

  const go = (row: Row) => {
    remember()
    close()
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

      <dialog ref={dialog} className={styles.dialog} aria-label='Search' onClose={() => setOpen(false)} onClick={(e) => e.target === dialog.current && close()}>
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
                placeholder='Search for bookmarks, categories, collections or terms…'
                className={styles.input}
                role='combobox'
                aria-expanded='true'
                aria-controls='search-results'
                aria-activedescendant={flat[active] ? `search-opt-${active}` : undefined}
                aria-label='Search'
              />
              <button type='button' className={styles.close} onClick={close} aria-label='Close search'>
                <Icon name='close' size={18} />
              </button>
            </div>

            <div className={styles.body}>
              <aside className={styles.side}>
                {recent.length > 0 && (
                  <div className={styles.recent}>
                    {recent.map((r) => (
                      <button key={r} type='button' className={styles.recentChip} onClick={() => setQ(r)}>
                        <Icon name='latest' size={13} />
                        {r}
                      </button>
                    ))}
                  </div>
                )}
                <nav aria-label='Search sections'>
                  <div className={styles.navLabel}>Navigation</div>
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
              </aside>

              <div id='search-results' role='listbox' aria-label='Results' className={styles.results}>
                {trending ? (
                  <div className={styles.trending}>
                    <Rail title='Featured' icon={<span className={styles.bolt}><Icon name='bolt' size={16} /></span>} hint='Hand-picked by the editor' columns={7} minWidth={56}>
                      {data.featured.map((b) => (
                        <Link key={b.slug} href={`/b/${b.slug}`} className={styles.featured} onClick={close} title={b.Title} aria-label={b.Title}>
                          <Favicon item={b} size={56} />
                        </Link>
                      ))}
                    </Rail>
                    <Rail title='Popular collections' href='/collections' columns={2} minWidth={200}>
                      {data.collections.map((c) => (
                        <CollectionTile key={c.slug} c={c} onClick={close} />
                      ))}
                    </Rail>
                    <Rail title='Latest articles' href='/blog' columns={2} minWidth={200}>
                      {data.posts.map((p) => (
                        <PostTile key={p.slug} p={p} onClick={close} />
                      ))}
                    </Rail>
                  </div>
                ) : (
                  rows.map((g) => (
                    <div key={g.label} role='group' aria-label={g.label}>
                      <div className={styles.navLabel}>{g.label}</div>
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
                              <span className={styles.mark}>
                                <Icon name={r.icon} />
                              </span>
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
                  ))
                )}
                {query && rows.length === 0 && (
                  <div className={styles.empty}>
                    <p className={styles.emptyTitle}>Nothing matches “{query}”</p>
                    <p>Try a tag like “colors”, “icons” or “animations”.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
