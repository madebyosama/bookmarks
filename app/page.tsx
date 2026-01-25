'use client'

import React, { useEffect, useState } from 'react'
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

  const filteredBookmarks = filterByValue(bookmarks, filtered)

  return (
    <div className={styles.bookmarks}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a
            href='https://madebyosama.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            madebyosama
          </a>
        </div>
        <p className={styles.title}>Bookmarks</p>
        <p className={styles.subtitle}>
          Insanely useful collection of 1000 websites.
          <br />
          All hand-picked 🤏 by me.
        </p>
        <SearchBar
          value={filtered}
          onChange={setFiltered}
          placeholder='Search by name, tag, or category...'
        />
      </header>

      <div className={styles.filters}>
        <span className={styles.count}>
          {filteredBookmarks.length}{' '}
          {filteredBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
        </span>
      </div>

      {!loading ? (
        <Loading />
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
