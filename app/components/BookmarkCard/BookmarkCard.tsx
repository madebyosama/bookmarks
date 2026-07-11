// src/components/BookmarkCard.tsx
'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import styles from './BookmarkCard.module.css'
import { Bookmark } from '../../types'
import {
  categoryColors,
  defaultCategoryColor,
} from '../../utils/categoryColors'

interface BookmarkCardProps {
  bookmark: Bookmark
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const categoryStyle = categoryColors[bookmark.Category] || defaultCategoryColor

  return (
    <div
      className={styles.bookmark}
      onClick={() => window.open(bookmark.Link, '_blank')}
    >
      <div className={styles.texts}>
        <img
          src={bookmark.Thumbnail}
          alt='Bookmark Image'
          className={`${styles.image} ${
            imageLoaded ? styles.show : styles.hide
          }`}
          width={1280}
          height={720}
          // priority={true}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={styles.content}>
          <div className={styles.title}>{bookmark.Title}</div>
          <div className={styles.description}>{bookmark.Description}</div>
          <div className={styles.categoryContainer}>
            <div
              className={styles.category}
              style={{
                backgroundColor: categoryStyle.background,
                color: categoryStyle.color,
              }}
            >
              {bookmark.Category}
            </div>
            <img
              src={bookmark.Favicon}
              alt={'Favicon'}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard
