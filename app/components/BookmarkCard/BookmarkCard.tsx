// src/components/BookmarkCard.tsx
'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import styles from './BookmarkCard.module.css'
import { Bookmark } from '../../types'

interface BookmarkCardProps {
  bookmark: Bookmark
}

const categoryStyles: Record<string, { background: string; color: string }> = {
  Utility: { background: '#FDE49F', color: '#7A5E00' },
  Tools: { background: '#D4EDBC', color: '#2E6B00' },
  Productivity: { background: '#BFE1F6', color: '#004A70' },
  Resources: { background: '#FECEC8', color: '#912B2B' },
  Inspiration: { background: '#FDC7A9', color: '#8B4000' },
  Reading: { background: '#E6CFF2', color: '#4A2E6E' },
  Learning: { background: '#C8F0D4', color: '#1E6B3D' },
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const categoryStyle = categoryStyles[bookmark.Category] || {
    background: '#CCCCCC',
    color: '#333333',
  }

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
          <div className={styles.favicon}>
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
