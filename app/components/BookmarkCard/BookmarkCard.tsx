'use client'

import React, { useState } from 'react'
import styles from './BookmarkCard.module.css'
import { Bookmark } from '../../types'

interface BookmarkCardProps {
  bookmark: Bookmark
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const tags = bookmark.Tags.split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 2)

  return (
    <div
      className={styles.bookmark}
      onClick={() => window.open(bookmark.Link, '_blank')}
    >
      <img
        src={bookmark.Thumbnail}
        alt={bookmark.Title}
        className={`${styles.image} ${imageLoaded ? styles.show : styles.hide}`}
        width={1280}
        height={720}
        loading='lazy'
        onLoad={() => setImageLoaded(true)}
      />
      <div className={styles.content}>
        <div className={styles.row}>
          <img
            className={styles.favicon}
            src={bookmark.Favicon}
            alt=''
            width={28}
            height={28}
          />
          <div>
            <div className={styles.title}>{bookmark.Title}</div>
            <div className={styles.description}>{bookmark.Description}</div>
          </div>
        </div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard
