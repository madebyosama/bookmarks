'use client'

import styles from '../../page.module.css'
import { useAuth } from '../Auth/AuthProvider'

// Toolfolio-style call to action; hidden once signed in.
export default function SignupBanner({
  title = 'Stop losing good links.',
  text = 'Save the bookmarks you like and find them again on any device.',
}: {
  title?: string
  text?: string
}) {
  const { user, ready, openAuth } = useAuth()
  if (!ready || user) return null
  return (
    <section className={styles.banner}>
      <div>
        <h2 className={styles.bannerTitle}>{title}</h2>
        <p className={styles.bannerText}>{text}</p>
      </div>
      <button type='button' className={styles.bannerButton} onClick={() => openAuth('signup')}>
        Create a free account
      </button>
    </section>
  )
}
