'use client'

import React from 'react'
import styles from './CategorySection.module.css'
import BookmarkCard from '../BookmarkCard/BookmarkCard'
import { Bookmark } from '../../types'
import {
  categoryColors,
  defaultCategoryColor,
} from '../../utils/categoryColors'

interface CategorySectionProps {
  category: string
  bookmarks: Bookmark[]
  previewCount?: number
  onViewAll: (category: string) => void
}

export default function CategorySection({
  category,
  bookmarks,
  previewCount = 4,
  onViewAll,
}: CategorySectionProps) {
  const preview = bookmarks.slice(0, previewCount)
  const colors = categoryColors[category] || defaultCategoryColor

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleGroup}>
          <span
            className={styles.dot}
            style={{ backgroundColor: colors.color }}
          />
          <h2 className={styles.sectionTitle}>{category}</h2>
          <span className={styles.sectionCount}>
            {bookmarks.length} {bookmarks.length === 1 ? 'tool' : 'tools'}
          </span>
        </div>
        {bookmarks.length > previewCount && (
          <button
            className={styles.viewAll}
            onClick={() => onViewAll(category)}
          >
            View all <span className={styles.arrow}>→</span>
          </button>
        )}
      </div>
      <div className={styles.sectionGrid}>
        {preview.map((bookmark, index) => (
          <BookmarkCard key={index} bookmark={bookmark} />
        ))}
      </div>
    </section>
  )
}
