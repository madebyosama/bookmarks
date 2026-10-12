import Link from 'next/link'
import styles from './page.module.css'

export default function NotFound() {
  return (
    <div className={styles.state}>
      <h2 className={styles.stateTitle}>Page not found</h2>
      <p className={styles.stateText}>That bookmark or page doesn’t exist — it may have been renamed.</p>
      <Link href='/bookmarks' className={styles.button}>
        Browse all bookmarks
      </Link>
    </div>
  )
}
