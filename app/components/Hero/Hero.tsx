'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import styles from './Hero.module.css'
import Icon from '../Icon/Icon'
import SafeImg from '../SafeImg/SafeImg'
import { Favicon } from '../Card/Card'
import { Item } from '../../types'

// Toolfolio-style: every slide is rendered in a scroll-snap track (so all images are loaded
// up front and it swipes natively); the scroll position is the single source of truth.
export default function Hero({ items }: { items: Item[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (i: number) => {
    const t = track.current
    const el = t?.children[(i + items.length) % items.length] as HTMLElement | undefined
    if (t && el) t.scrollTo({ left: el.offsetLeft })
  }

  return (
    <section
      aria-roledescription='carousel'
      aria-label='Featured bookmarks'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={track}
        className={styles.track}
        onScroll={(e) => {
          const t = e.currentTarget
          setSlide(Math.round(t.scrollLeft / (t.scrollWidth / items.length)))
        }}
      >
        {items.map((b, i) => {
          const Title = i === 0 ? 'h1' : 'h2'
          return (
            <div key={b.slug} className={styles.hero} role='group' aria-roledescription='slide' aria-label={`${i + 1} of ${items.length}`}>
              <div className={styles.copy}>
                <SafeImg src={b.Thumbnail} alt='' loading='eager' className={styles.glow} fallback={null} />
                <Favicon item={b} size={60} />
                <Title className={styles.title}>{b.Title}</Title>
                <p className={styles.desc}>{b.Description}</p>
                <div className={styles.actions}>
                  <Link href={`/b/${b.slug}`} className={styles.primary}>
                    View details
                  </Link>
                  <a href={b.Link} target='_blank' rel='noopener noreferrer' className={styles.secondary}>
                    Visit <Icon name='external' size={12} />
                  </a>
                  <span className={styles.cat}>{b.Category}</span>
                </div>
              </div>
              <Link href={`/b/${b.slug}`} className={styles.media} tabIndex={-1} aria-hidden='true'>
                <SafeImg src={b.Thumbnail} alt='' loading='eager' className={styles.img} fallback={null} />
              </Link>
            </div>
          )
        })}
      </div>
      <div className={styles.controls}>
        {items.map((x, i) => (
          <button
            key={x.slug}
            type='button'
            className={`${styles.dot} ${i === slide ? styles.dotActive : ''} ${paused ? '' : styles.playing}`}
            onClick={() => go(i)}
            // Autoplay: the active dot's fill animation is the timer (stops under reduced motion).
            onAnimationEnd={() => go(slide + 1)}
            aria-label={`Show ${x.Title}`}
            aria-current={i === slide}
          />
        ))}
      </div>
    </section>
  )
}
