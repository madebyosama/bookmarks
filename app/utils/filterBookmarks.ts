// src/utils/filterBookmarks.ts
import { Bookmark } from '../types';
import { getSimilarity } from './similarity';

// Updated filter function to match search terms with fuzzy search
export function filterByValue<T extends Bookmark>(
  array: T[],
  searchString: string
): T[] {
  const searchTerms = searchString.toLowerCase().split(' ').filter(Boolean); // Split the search string into individual terms
  if (searchTerms.length === 0) return array;
  const threshold = 0.6; // Define a threshold for fuzzy matching (0.6 means 60% similarity)

  let exactMatches: T[] = [];
  let fuzzyMatches: T[] = [];

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
