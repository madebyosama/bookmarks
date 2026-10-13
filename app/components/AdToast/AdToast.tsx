'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './AdToast.module.css'
import Icon, { Verified } from '../Icon/Icon'
import { Favicon } from '../Card/Card'
import { Item } from '../../types'

// How long each phase lasts: on screen, animating out, empty gap before the next ad.
const MS = { in: 7000, out: 450, gap: 3000 }

// Toolfolio-style sponsored toast: each `ad_position` bookmark animates in, stays, animates out,
// then a pause before the next. Hover pauses it; dismissing hides it for the session.
export default function AdToast({ ads }: { ads: Item[] }) {
  const [i, setI] = useState(ads.length - 1) // the first gap advances to ads[0]
  const [phase, setPhase] = useState<keyof typeof MS>('gap')
  const [hovered, setHovered] = useState(false)
  const [closed, setClosed] = useState(true) // stays hidden until we know it wasn't dismissed

  useEffect(() => {
    try {
      setClosed(sessionStorage.getItem('ad-closed') === '1')
    } catch {
      setClosed(false)
    }
  }, [])

  useEffect(() => {
    if (closed || !ads.length || (hovered && phase === 'in')) return
    const id = setTimeout(() => {
      if (phase === 'in') setPhase('out')
      else if (phase === 'out') setPhase('gap')
      else {
        setI((x) => (x + 1) % ads.length)
        setPhase('in')
      }
    }, MS[phase])
    return () => clearTimeout(id)
  }, [phase, hovered, closed, ads.length])

  if (closed || !ads.length || phase === 'gap') return null
  const b = ads[i]

  const close = () => {
    setClosed(true)
    try {
      sessionStorage.setItem('ad-closed', '1')
    } catch {}
  }

  return (
    <aside
      key={b.slug}
      className={`${styles.toast} ${phase === 'out' ? styles.out : ''}`}
      aria-label='Sponsored'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/b/${b.slug}`} className={styles.link}>
        <Favicon item={b} size={44} />
        <span className={styles.text}>
          <strong className={styles.name}>
            {b.Title} {b.verified && <Verified size={13} gold={b.subscriber} />}
          </strong>
          <span className={styles.desc}>{b.Description}</span>
        </span>
      </Link>
      <span className={styles.corner}>
        <span className={styles.ad}>AD</span>
        <button type='button' className={styles.close} onClick={close} aria-label='Dismiss ad'>
          <Icon name='close' size={14} />
        </button>
      </span>
    </aside>
  )
}
