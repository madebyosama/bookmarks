'use client'

import React, { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'
import SearchBar from './components/SearchBar/SearchBar'
import BookmarkCard from './components/BookmarkCard/BookmarkCard'
import { fetchBookmarks } from './services/bookmarkService'
import { Bookmark } from './types'
import { filterByValue } from './utils/filterBookmarks'
import Loading from './components/Loading/Loading'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filtered, setFiltered] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadBookmarks() {
      const data = await fetchBookmarks()
      setLoading(true)
      setBookmarks(data)
    }
    loadBookmarks()
    setLoading(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 200)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = useMemo(() => {
    const counts: Record<string, number> = {}
    bookmarks.forEach((b) => {
      counts[b.Category] = (counts[b.Category] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [bookmarks])

  const searched = filterByValue(bookmarks, filtered)
  const visible =
    activeCategory === 'All'
      ? searched
      : searched.filter((b) => b.Category === activeCategory)

  // Group by category for the "All" explore view
  const grouped = useMemo(() => {
    const map: Record<string, Bookmark[]> = {}
    visible.forEach((b) => {
      ;(map[b.Category] = map[b.Category] || []).push(b)
    })
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length)
  }, [visible])

  const showSections = activeCategory === 'All' && !filtered

  return (
    <div className={styles.bookmarks}>
      <nav className={styles.nav}>
        <a
          className={styles.navLogo}
          href='https://madebyosama.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          bookmark<span>folio</span>
        </a>
        <div className={styles.navSearch}>
          <SearchBar
            value={filtered}
            onChange={setFiltered}
            placeholder='Search tools, tags, categories...'
          />
        </div>
        <span className={styles.navCount}>{bookmarks.length} tools</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>All the tools you need, in one place.</h1>
        <p className={styles.subtitle}>
          A curated collection of useful websites, tools & resources.
        </p>
      </header>

      <div className={styles.categories}>
        <button
          className={`${styles.categoryPill} ${
            activeCategory === 'All' ? styles.activePill : ''
          }`}
          onClick={() => setActiveCategory('All')}
        >
          Explore <span className={styles.pillCount}>{bookmarks.length}</span>
        </button>
        {categories.map(([cat, count]) => (
          <button
            key={cat}
            className={`${styles.categoryPill} ${
              activeCategory === cat ? styles.activePill : ''
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat} <span className={styles.pillCount}>{count}</span>
          </button>
        ))}
      </div>

      {!loading ? (
        <Loading />
      ) : visible.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyTitle}>No tools found</div>
          <p className={styles.emptyText}>Try searching for a different term</p>
        </div>
      ) : showSections ? (
        grouped.map(([cat, items]) => (
          <section key={cat} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{cat}</h2>
              <span className={styles.sectionCount}>{items.length} tools</span>
              <button
                className={styles.sectionLink}
                onClick={() => {
                  setActiveCategory(cat)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                View all →
              </button>
            </div>
            <div className={styles.grid}>
              {items.map((bookmark, index) => (
                <BookmarkCard key={index} bookmark={bookmark} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {activeCategory === 'All' ? 'Results' : activeCategory}
            </h2>
            <span className={styles.sectionCount}>{visible.length} tools</span>
          </div>
          <div className={styles.grid}>
            {visible.map((bookmark, index) => (
              <BookmarkCard key={index} bookmark={bookmark} />
            ))}
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Built by{' '}
          <a
            href='https://madebyosama.com'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.footerLink}
          >
            Muhammad Osama
          </a>
        </p>
      </footer>

      <div
        className={`${styles.backToTop} ${showScrollToTop ? styles.show : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </div>
    </div>
  )
}
