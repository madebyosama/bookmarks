import Link from 'next/link'
import styles from './Card.module.css'
import { Verified } from '../Icon/Icon'
import SafeImg from '../SafeImg/SafeImg'
import { Item } from '../../types'

export function Favicon({ item, size = 40 }: { item: Item; size?: number }) {
  return (
    <SafeImg
      src={item.Favicon}
      alt=''
      width={size}
      height={size}
      className={styles.favicon}
      style={{ width: size, height: size }}
      fallback={
        <span className={`${styles.favicon} ${styles.faviconFallback}`} style={{ width: size, height: size, fontSize: size * 0.45 }} aria-hidden='true'>
          {item.Title[0]}
        </span>
      }
    />
  )
}

// Toolfolio card: screenshot, then "Name ✓ · tagline" on one line.
export default function Card({ item }: { item: Item }) {
  return (
    <Link href={`/b/${item.slug}`} className={styles.card}>
      <span className={styles.thumb}>
        <SafeImg
          src={item.Thumbnail}
          alt=''
          width={1280}
          height={720}
          className={styles.img}
          fallback={<span className={styles.thumbFallback}>{item.Title}</span>}
        />
      </span>
      <span className={styles.line}>
        <strong className={styles.name}>{item.Title}</strong>
        {item.verified && <Verified />}
        <span className={styles.tagline}>· {item.Description}</span>
      </span>
    </Link>
  )
}

export function CardGrid({ items }: { items: Item[] }) {
  return (
    <div className={styles.grid}>
      {items.map((b) => (
        <Card key={b.slug} item={b} />
      ))}
    </div>
  )
}

export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className={styles.grid} aria-busy='true' aria-label='Loading bookmarks'>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className={`skeleton ${styles.thumb}`} />
          <div className='skeleton' style={{ height: 12, width: '70%', marginTop: 12 }} />
        </div>
      ))}
    </div>
  )
}
