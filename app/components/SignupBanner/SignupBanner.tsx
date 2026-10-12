'use client'

import styles from '../../page.module.css'
import { useAuth } from '../Auth/AuthProvider'

// Toolfolio-style call to action; hidden once signed in.
export default function SignupBanner() {
  const { user, ready, openAuth } = useAuth()
  if (!ready || user) return null
  return (
    <section className={styles.banner}>
      <div>
        <h2 className={styles.bannerTitle}>Stop losing good links.</h2>
        <p className={styles.bannerText}>Save the bookmarks you like and find them again on any device.</p>
      </div>
      <button type='button' className={styles.bannerButton} onClick={() => openAuth('signup')}>
        Create a free account
      </button>
    </section>
  )
}
