import type { Metadata } from 'next'
import styles from '../page.module.css'
import { PostCard } from '../components/Tiles/Tiles'
import { getData } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage() {
  const { posts } = await getData()
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Blog</h1>
      <p className={styles.lede}>Short write-ups on how the bookmarks fit together.</p>
      {posts.length === 0 ? <p className={styles.lede}>No posts yet.</p> : (
        <div className={styles.tiles}>
          {posts.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </main>
  )
}
