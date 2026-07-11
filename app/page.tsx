'use client'

import React, { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'
import SearchBar from './components/SearchBar/SearchBar'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import CategorySection from './components/CategorySection/CategorySection'
import BookmarkCard from './components/BookmarkCard/BookmarkCard'
import { fetchBookmarks } from './services/bookmarkService'
import { Bookmark } from './types'
import { filterByValue } from './utils/filterBookmarks'
import { categoryColors, defaultCategoryColor } from './utils/categoryColors'
import Loading from './components/Loading/Loading'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filtered, setFiltered] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
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
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    bookmarks.forEach((b) => {
      if (b.Category) {
        counts.set(b.Category, (counts.get(b.Category) || 0) + 1)
      }
    })
    return Array.from(counts, ([name, count]) => ({ name, count })).sort(
      (a, b) => b.count - a.count
    )
  }, [bookmarks])

  const categoryFiltered = activeCategory
    ? bookmarks.filter((b) => b.Category === activeCategory)
    : bookmarks

  const filteredBookmarks = filterByValue(categoryFiltered, filtered)

  // Explore mode: no category selected and no search — show grouped sections
  const isExploreMode = !activeCategory && !filtered.trim()

  const groupedBookmarks = useMemo(() => {
    const groups = new Map<string, Bookmark[]>()
    bookmarks.forEach((b) => {
      if (!b.Category) return
      if (!groups.has(b.Category)) groups.set(b.Category, [])
      groups.get(b.Category)!.push(b)
    })
    return Array.from(groups, ([category, items]) => ({
      category,
      items,
    })).sort((a, b) => b.items.length - a.items.length)
  }, [bookmarks])

  const handleViewAll = (category: string) => {
    setActiveCategory(category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.bookmarks}>
      <header className={styles.header}>
        <div className={styles.logo}></div>
        <p className={styles.title}>Bookmarks</p>
        <p className={styles.subtitle}>Collection of usefull websites.</p>
        <SearchBar
          value={filtered}
          onChange={setFiltered}
          placeholder='Search by name, tag, or category...'
        />
        <CategoryFilter
          categories={categories}
          totalCount={bookmarks.length}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </header>

      {!isExploreMode && (
        <div className={styles.filters}>
          {activeCategory ? (
            <div className={styles.filterTitleGroup}>
              <span
                className={styles.filterDot}
                style={{
                  backgroundColor: (
                    categoryColors[activeCategory] || defaultCategoryColor
                  ).color,
                }}
              />
              <h2 className={styles.filterTitle}>{activeCategory}</h2>
              <span className={styles.count}>
                {filteredBookmarks.length}{' '}
                {filteredBookmarks.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>
          ) : (
            <span className={styles.count}>
              {filteredBookmarks.length}{' '}
              {filteredBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
            </span>
          )}
        </div>
      )}

      {!loading ? (
        <Loading />
      ) : isExploreMode ? (
        <div className={styles.sections}>
          {groupedBookmarks.map(({ category, items }) => (
            <CategorySection
              key={category}
              category={category}
              bookmarks={items}
              previewCount={4}
              onViewAll={handleViewAll}
            />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark, index) => (
              <BookmarkCard key={index} bookmark={bookmark} />
            ))
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyTitle}>No bookmarks found</div>
              <p className={styles.emptyText}>
                Try searching for a different term
              </p>
            </div>
          )}
        </div>
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
        onClick={scrollToTop}
      >
        ↑
      </div>
    </div>
  )
}
