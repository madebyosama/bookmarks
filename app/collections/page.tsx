import type { Metadata } from 'next'
import styles from '../page.module.css'
import { CollectionTile } from '../components/Tiles/Tiles'
import { getData } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Collections' }

export default async function CollectionsPage() {
  const { collections } = await getData()
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Collections</h1>
      <p className={styles.lede}>Hand-picked sets that cut across categories.</p>
      {collections.length === 0 ? (
        <p className={styles.lede}>No collections yet.</p>
      ) : (
        <div className={styles.tiles}>
          {collections.map((c) => (
            <CollectionTile key={c.slug} c={c} withDescription />
          ))}
        </div>
      )}
    </main>
  )
}
