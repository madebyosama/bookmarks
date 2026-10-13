'use client'

import Link from 'next/link'
import styles from '../page.module.css'
import { CardGrid, CardGridSkeleton } from '../components/Card/Card'
import { CollectionTile, PostCard } from '../components/Tiles/Tiles'
import { useAuth } from '../components/Auth/AuthProvider'
import { Collection, Item, Post } from '../types'

export default function SavedList({ bookmarks, collections, posts }: { bookmarks: Item[]; collections: Collection[]; posts: Post[] }) {
  const { user, ready, saved, savedReady, openAuth } = useAuth()

  if (!ready || (user && !savedReady)) return <CardGridSkeleton count={4} />

  if (!user)
    return (
      <div className={styles.state}>
        <h2 className={styles.stateTitle}>Sign in to see your saved bookmarks</h2>
        <p className={styles.stateText}>Save anything from its page and it shows up here.</p>
        <button type='button' className={styles.button} onClick={() => openAuth('login')}>
          Log in
        </button>
      </div>
    )

  const items = bookmarks.filter((b) => saved.has(b.slug))
  const lists = collections.filter((c) => saved.has(`collection:${c.slug}`))
  const articles = posts.filter((p) => saved.has(`post:${p.slug}`))
  if (items.length + lists.length + articles.length === 0)
    return (
      <div className={styles.state}>
        <h2 className={styles.stateTitle}>Nothing saved yet</h2>
        <p className={styles.stateText}>Press the bookmark icon on any site, collection or article.</p>
        <Link href='/' className={styles.button}>
          Explore bookmarks
        </Link>
      </div>
    )

  return (
    <>
      {items.length > 0 && <CardGrid items={items} />}
      {lists.length > 0 && (
        <>
          <h2 className={styles.h2} style={{ margin: '44px 0 16px' }}>Collections</h2>
          <div className={styles.tiles}>
            {lists.map((c) => (
              <CollectionTile key={c.slug} c={c} withDescription />
            ))}
          </div>
        </>
      )}
      {articles.length > 0 && (
        <>
          <h2 className={styles.h2} style={{ margin: '44px 0 16px' }}>Articles</h2>
          <div className={styles.tiles}>
            {articles.map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
