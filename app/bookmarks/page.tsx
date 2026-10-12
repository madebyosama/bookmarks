import { Suspense } from 'react'
import type { Metadata } from 'next'
import styles from '../page.module.css'
import Browse from '../components/Browse/Browse'
import { CardGridSkeleton } from '../components/Card/Card'
import { bookmarks } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'All bookmarks' }

export default function AllBookmarksPage() {
  return (
    <>
      <header style={{ padding: '24px 24px 4px' }}>
        <h1 className={styles.h1}>All bookmarks</h1>
        <p className={styles.lede} style={{ marginBottom: 8 }}>
          Every bookmark, filterable by tag and text.
        </p>
      </header>
      <Suspense fallback={<div style={{ padding: 24 }}><CardGridSkeleton /></div>}>
        <Browse items={bookmarks} />
      </Suspense>
    </>
  )
}
