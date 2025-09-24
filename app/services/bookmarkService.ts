import { Bookmark } from '../types'
import bookmarks from '../data/bookmarks'

export async function fetchBookmarks(): Promise<Bookmark[]> {
  try {
    // simulate async behavior (in case you later swap back to API)
    return Promise.resolve(
      bookmarks.map((item) => ({
        ...item,
        Tags: item.Tags || '',
        Category: item.Category || '',
        Description: item.Description || '',
      }))
    )
  } catch (error) {
    console.error('Error loading bookmarks:', error)
    return []
  }
}
