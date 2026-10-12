'use client'

import Link from 'next/link'
import styles from '../page.module.css'
import { CardGrid, CardGridSkeleton } from '../components/Card/Card'
import { useAuth } from '../components/Auth/AuthProvider'
import { Item } from '../types'

export default function SavedList({ bookmarks }: { bookmarks: Item[] }) {
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
  if (items.length === 0)
    return (
      <div className={styles.state}>
        <h2 className={styles.stateTitle}>Nothing saved yet</h2>
        <p className={styles.stateText}>Open any bookmark and press Save.</p>
        <Link href='/' className={styles.button}>
          Explore bookmarks
        </Link>
      </div>
    )

  return <CardGrid items={items} />
}
