// src/services/bookmarkService.ts
import { Bookmark } from '../types';

const BOOKMARKS_API_URL =
  'https://opensheet.elk.sh/1jonPSUsmPe5NZ9odeGyrgt8I32oViHkQ79XFVYyv2ZU/Bookmarks';

export async function fetchBookmarks(): Promise<Bookmark[]> {
  try {
    const res = await fetch(BOOKMARKS_API_URL);
    if (!res.ok) throw new Error('Failed to fetch bookmarks');
    const data = await res.json();
    return data.map((item: any) => ({
      ...item,
      Tags: item.Tags || '',
      Category: item.Category || '',
      Description: item.Description || '',
    }));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
}
