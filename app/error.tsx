'use client'

import styles from './page.module.css'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role='alert' className={`${styles.state} ${styles.stateError}`}>
      <h2 className={styles.stateTitle}>Something went wrong</h2>
      <p className={styles.stateText}>This page didn’t load. Nothing you selected was lost.</p>
      <button type='button' className={styles.button} onClick={reset}>
        Try again
      </button>
    </div>
  )
}
