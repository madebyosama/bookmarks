import type { Metadata } from 'next'
import styles from '../page.module.css'
import { PostTiles } from '../components/Tiles/Tiles'
import { posts } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Blog</h1>
      <p className={styles.lede}>Short write-ups on how the bookmarks fit together.</p>
      {posts.length === 0 ? <p className={styles.lede}>No posts yet.</p> : <PostTiles items={posts} />}
    </main>
  )
}
