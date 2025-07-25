// src/app/bookmarks/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import BookmarkCard from './components/BookmarkCard/BookmarkCard';
import { fetchBookmarks } from './services/bookmarkService';
import { Bookmark } from './types';
import { filterByValue } from './utils/filterBookmarks';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filtered, setFiltered] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    async function loadBookmarks() {
      const data = await fetchBookmarks();
      setBookmarks(data);
    }
    loadBookmarks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBookmarks = filterByValue(bookmarks, filtered);

  return (
    <div className={styles.bookmarks}>
      <SearchBar value={filtered} onChange={setFiltered} />

      <div className={styles.grid}>
        {filteredBookmarks.map((bookmark, index) => (
          <BookmarkCard key={index} bookmark={bookmark} />
        ))}
      </div>

      <div className={styles.footer}>
        <div
          className={`${styles['back-to-top']} ${
            showScrollToTop ? styles.show : ''
          }`}
          onClick={scrollToTop}
        >
          Back to Top
        </div>
      </div>
    </div>
  );
}
