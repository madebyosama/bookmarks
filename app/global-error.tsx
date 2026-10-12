'use client'

import './globals.css'
import styles from './page.module.css'

// Catches failures in the root layout itself (e.g. the database is unreachable), where error.tsx can't.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang='en'>
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div role='alert' className={`${styles.state} ${styles.stateError}`}>
          <h2 className={styles.stateTitle}>We couldn’t load the bookmarks</h2>
          <p className={styles.stateText}>The database didn’t respond. Please try again in a moment.</p>
          <button type='button' className={styles.button} onClick={reset}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
