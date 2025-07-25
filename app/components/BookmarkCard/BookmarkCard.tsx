// src/components/BookmarkCard.tsx
'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styles from './BookmarkCard.module.css';
import { Bookmark } from '../../types';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={styles.bookmark}
      onClick={() => window.open(bookmark.Link, '_blank')}
    >
      <div className={styles.texts}>
        <Image
          src={bookmark.Thumbnail}
          alt='Bookmark Image'
          className={`${styles.image} ${
            imageLoaded ? styles.show : styles.hide
          }`}
          width={1280}
          height={720}
          priority={true}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={styles.title}>{bookmark.Title}</div>
        <div className={styles.description}>{bookmark.Description}</div>
      </div>
    </div>
  );
};

export default BookmarkCard;
