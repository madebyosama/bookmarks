'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import bookmarks from './data/bookmarks';

export default function Bookmarks() {
  const [filtered, setFiltered] = useState('');
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

    let exactMatches: Bookmark[] = [];
    let fuzzyMatches: Bookmark[] = [];

    array.forEach((item) => {
      // Combine relevant fields into one searchable string with safety checks
      const searchableContent = `
      ${(item.Title || '').toLowerCase()} 
      ${(item.Description || '').toLowerCase()} 
      ${(item.Category || '').toLowerCase()} 
      ${(item.Tags || '').toLowerCase().replace(/, /g, ' ')}
    `;

      let isExactMatch = false;

      // Check if all search terms are exactly present in the searchable content
      const hasExactMatch = searchTerms.every((term) =>
        searchableContent.includes(term)
      );

      // If there's an exact match, add to exactMatches array
      if (hasExactMatch) {
        exactMatches.push(item);
        isExactMatch = true;
      }

      // If not an exact match, check for fuzzy matching
      if (!isExactMatch) {
        const isFuzzyMatch = searchTerms.every((term) => {
          const words = searchableContent.split(' ');
          return words.some(
            (word) =>
              word.includes(term) || getSimilarity(term, word) >= threshold
          );
        });

        // If it meets fuzzy matching criteria, add to fuzzyMatches array
        if (isFuzzyMatch) {
          fuzzyMatches.push(item);
        }
      }
    });

    // Return exact matches first, followed by fuzzy matches
    return [...exactMatches, ...fuzzyMatches];
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

  return (
    <div className={styles.bookmarks}>
      <div>
        <input
          placeholder='Search Bookmark'
          className={styles.search}
          onChange={(e) => {
            setFiltered(e.target.value);
          }}
        />
      </div>

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
      <div className={styles.footer}>
        <div
          className={`${styles['back-to-top']} ${
            showScrollToTop && styles.show
          }`}
          onClick={scrollToTop}
        >
          Back to Top
        </div>
      </div>
    </div>
  );
}
