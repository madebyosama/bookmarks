import type { Metadata } from 'next'
import styles from '../page.module.css'
import { CollectionTiles } from '../components/Tiles/Tiles'
import { collections } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Collections' }

export default function CollectionsPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Collections</h1>
      <p className={styles.lede}>Hand-picked sets that cut across categories.</p>
      {collections.length === 0 ? (
        <p className={styles.lede}>No collections yet.</p>
      ) : (
        <CollectionTiles items={collections} withDescription />
      )}
    </main>
  )
}
