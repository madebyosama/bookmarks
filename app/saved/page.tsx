import type { Metadata } from 'next'
import styles from '../page.module.css'
import SavedList from './SavedList'
import { getData } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Saved' }

export default async function SavedPage() {
  const { bookmarks } = await getData()
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Saved</h1>
      <p className={styles.lede}>Bookmarks you’ve kept, on every device you sign in on.</p>
      <SavedList bookmarks={bookmarks} />
    </main>
  )
}
