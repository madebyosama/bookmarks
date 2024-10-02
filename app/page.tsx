'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Loading from './components/loading/Loading';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  type Bookmark = {
    Title: string;
    Link: string;
    Description: string;
    Tags: string;
    Thumbnail: string;
    Category: string;
    Favicon: string;
  };

  // Function to calculate the similarity between two strings using Dice's Coefficient
  function getSimilarity(str1: string, str2: string): number {
    const bigrams = (s: string) =>
      s
        .toLowerCase()
        .split('')
        .map((_, i, arr) => arr.slice(i, i + 2).join(''))
        .filter((v) => v.length === 2);

    const bigrams1 = bigrams(str1);
    const bigrams2 = bigrams(str2);
    const intersection = bigrams1.filter((bigram) => bigrams2.includes(bigram));
    return (2 * intersection.length) / (bigrams1.length + bigrams2.length);
  }

  // Updated filter function to match search terms with fuzzy search
  function filterByValue(array: Bookmark[], searchString: string): Bookmark[] {
    const searchTerms = searchString.toLowerCase().split(' '); // Split the search string into individual terms
    const threshold = 0.6; // Define a threshold for fuzzy matching (0.6 means 60% similarity)

    return array.filter((item) => {
      // Combine relevant fields into one searchable string with safety checks
      const searchableContent = `
        ${(item.Title || '').toLowerCase()} 
        ${(item.Description || '').toLowerCase()} 
        ${(item.Category || '').toLowerCase()} 
        ${(item.Tags || '').toLowerCase().replace(/, /g, ' ')}
      `;

      // Check if all search terms are present or sufficiently similar to the searchable content
      return searchTerms.every((term) => {
        const words = searchableContent.split(' ');
        return words.some((word) => {
          // Check if the word includes the term or has a similarity above the threshold
          return word.includes(term) || getSimilarity(term, word) >= threshold;
        });
      });
    });
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Function to handle scroll events
  function handleScroll() {
    setShowScrollToTop(window.scrollY > 200);
  }

  // Add scroll event listener using useEffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
        <div className={styles.heading}>{bookmarks.length || ``} Bookmarks</div>
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
        <div>
          <Loading />
        </div>
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
      <div className={styles.footer}>
        <div
          className={`${styles['back-to-top']} ${
            showScrollToTop && styles.show
          }`}
          onClick={scrollToTop}
        >
          <svg
            width='24'
            height='20'
            viewBox='0 0 24 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_7_23)'>
              <path
                d='M6.80385 7C9.11325 3 10.2679 1 12 1C13.7321 1 14.8868 3 17.1962 7L18.0622 8.5C20.3716 12.5 21.5263 14.5 20.6603 16C19.7942 17.5 17.4848 17.5 12.866 17.5H11.134C6.51517 17.5 4.20577 17.5 3.33975 16C2.47372 14.5 3.62842 12.5 5.93782 8.5L6.80385 7Z'
                fill='#5C5C5C'
              />
            </g>
            <defs>
              <clipPath id='clip0_7_23'>
                <rect width='24' height='20' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
