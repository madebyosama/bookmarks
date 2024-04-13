'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function filterByValue(array: any, string: any) {
    return array.filter((o: any) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://opensheet.elk.sh/1jonPSUsmPe5NZ9odeGyrgt8I32oViHkQ79XFVYyv2ZU/1'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setBookmarks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.bookmarks}>
      <div className={styles.pageTitle}>
        <div className={styles.sub}>Insanely useful websites</div>
        <div className={styles.heading}>1000 Bookmarks</div>
        <div className={styles.description}></div>
      </div>
      <div>
        <input
          placeholder='Search Bookmark'
          className={styles.search}
          onChange={(e) => {
            setFiltered(e.target.value);
          }}
        />
      </div>
      {loading ? (
        <div>...</div>
      ) : (
        <div className={styles.grid}>
          {filterByValue(bookmarks, filtered).map((s: any, index: any) => {
            return (
              <div
                key={index}
                className={styles.bookmark}
                onClick={() => window.open(s.Link)}
              >
                <div className={styles.texts}>
                  <Image
                    src={s.Thumbnail}
                    alt='Bookmark Image'
                    className={`${styles.image} ${
                      imageLoaded ? styles.show : styles.hide
                    }`}
                    width={1280}
                    height={720}
                    priority={true}
                    onLoad={() => handleImageLoad()}
                  />
                  <div className={styles.title}>{s.Title}</div>
                  <div className={styles.description}>{s.Description}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
