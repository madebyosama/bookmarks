'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Hero.module.css'
import Icon from '../Icon/Icon'
import SafeImg from '../SafeImg/SafeImg'
import { Favicon } from '../Card/Card'
import { Item } from '../../types'

export default function Hero({ items }: { items: Item[] }) {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const b = items[slide]

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSlide((s) => (s + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [paused, items.length])

  const step = (d: number) => setSlide((s) => (s + d + items.length) % items.length)

  return (
    <section
      aria-roledescription='carousel'
      aria-label='Featured bookmarks'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.hero} aria-live={paused ? 'polite' : 'off'}>
        <div className={styles.copy} key={b.slug}>
          <Favicon item={b} size={60} />
          <h1 className={styles.title}>{b.Title}</h1>
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
          <SafeImg key={b.slug} src={b.Thumbnail} alt='' loading='eager' className={styles.img} fallback={null} />
        </Link>
      </div>
      <div className={styles.controls}>
        <button type='button' className={styles.arrow} onClick={() => step(-1)} aria-label='Previous slide'>
          <Icon name='chevronLeft' />
        </button>
        {items.map((x, i) => (
          <button
            key={x.slug}
            type='button'
            className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
            onClick={() => setSlide(i)}
            aria-label={`Show ${x.Title}`}
            aria-current={i === slide}
          />
        ))}
        <button type='button' className={styles.arrow} onClick={() => step(1)} aria-label='Next slide'>
          <Icon name='chevronRight' />
        </button>
      </div>
    </section>
  )
}
