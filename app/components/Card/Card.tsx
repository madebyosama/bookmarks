import Link from 'next/link'
import styles from './Card.module.css'
import Icon from '../Icon/Icon'
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
        <span className={styles.favicon} style={{ width: size, height: size, fontSize: size * 0.45 }} aria-hidden='true'>
          {item.Title[0]}
        </span>
      }
    />
  )
}

export default function Card({ item }: { item: Item }) {
  const href = `/b/${item.slug}`
  return (
    <article className={styles.card}>
      <Link href={href} className={styles.thumb} aria-label={`Open details for ${item.Title}`}>
        <SafeImg
          src={item.Thumbnail}
          alt=''
          width={1280}
          height={720}
          className={styles.img}
          fallback={<span className={styles.thumbFallback}>{item.Title}</span>}
        />
      </Link>
      <div className={styles.row}>
        <Link href={href} className={styles.name}>
          <strong>{item.Title}</strong>
          <span className={styles.muted}> · {item.Category}</span>
        </Link>
        <a
          href={item.Link}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.visit}
          aria-label={`Visit ${item.domain} in a new tab`}
        >
          <Icon name='external' size={13} />
        </a>
      </div>
      <p className={styles.desc}>{item.Description}</p>
    </article>
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
          <div className='skeleton' style={{ height: 12, width: '55%', marginTop: 12 }} />
          <div className='skeleton' style={{ height: 10, width: '85%', marginTop: 8 }} />
        </div>
      ))}
    </div>
  )
}
