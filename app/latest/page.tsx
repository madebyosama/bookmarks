import type { Metadata } from 'next'
import styles from '../page.module.css'
import { CardGrid } from '../components/Card/Card'
import { getData } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Latest additions' }

export default async function LatestPage() {
  const { recent } = await getData()
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Latest additions</h1>
      <p className={styles.lede}>Newest bookmarks first.</p>
      {recent.length === 0 ? <p className={styles.lede}>Nothing added yet.</p> : <CardGrid items={recent} />}
    </main>
  )
}
