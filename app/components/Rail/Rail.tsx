'use client'

import Link from 'next/link'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styles from './Rail.module.css'
import Icon from '../Icon/Icon'

// Toolfolio-style horizontal row: title, "‹ + ›" controls, scroll-snapped items.
export default function Rail({
  title,
  icon,
  href,
  hint,
  columns = 4,
  minWidth = 240,
  children,
}: {
  title: ReactNode
  icon?: ReactNode
  href?: string
  hint?: string
  columns?: number
  minWidth?: number
  children: ReactNode
}) {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: true })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const step = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth, behavior: 'smooth' })

  return (
    <section className={styles.rail}>
      <div className={styles.head}>
        <h2 className={styles.title}>
          {icon}
          {href ? (
            <Link href={href} className={styles.titleLink}>
              {title}
            </Link>
          ) : (
            title
          )}
          {hint && (
            <span className={styles.hint} title={hint} aria-label={hint}>
              <Icon name='info' size={14} />
            </span>
          )}
        </h2>
        <div className={styles.controls}>
          <button type='button' onClick={() => step(-1)} disabled={edge.start} aria-label='Scroll left'>
            <Icon name='chevronLeft' />
          </button>
          {href && (
            <Link href={href} aria-label='View all'>
              <Icon name='plus' />
            </Link>
          )}
          <button type='button' onClick={() => step(1)} disabled={edge.end} aria-label='Scroll right'>
            <Icon name='chevronRight' />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className={styles.track}
        onScroll={measure}
        style={{ '--n': columns, '--min': `${minWidth}px` } as React.CSSProperties}
      >
        {children}
      </div>
    </section>
  )
}
