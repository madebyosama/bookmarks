import Link from 'next/link'
import styles from './Card.module.css'
import Icon, { Verified } from '../Icon/Icon'
import SaveButton from '../SaveButton/SaveButton'
import { DealButton, PreviewButton } from './Preview'
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

const platformIcon = (p: string) => (/web/i.test(p) ? 'globe' : /ios|android|mobile/i.test(p) ? 'phone' : 'laptop')

// Toolfolio card: screenshot with a details panel on image hover, then "Name ✓ • tagline"
// with save/visit icons on card hover.
export default function Card({ item }: { item: Item }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        <Link href={`/b/${item.slug}`} className={styles.thumb} tabIndex={-1} aria-hidden='true'>
          <SafeImg
            src={item.Thumbnail}
            alt=''
            width={1280}
            height={720}
            className={styles.img}
            fallback={<span className={styles.thumbFallback}>{item.Title}</span>}
          />
        </Link>
        <div className={styles.overlay}>
          <div className={styles.overlayRow}>
            <span className={styles.badge}>{item.pricing}</span>
            <PreviewButton item={item} className={styles.eye} />
          </div>
          <p className={styles.overlayText}>{item.about || item.Description}</p>
          <div className={styles.overlayRow}>
            <span className={styles.platforms}>
              {item.platforms.map((p) => (
                <span key={p} title={p}>
                  <Icon name={platformIcon(p)} size={16} />
                </span>
              ))}
            </span>
            {item.deal && <DealButton item={item} className={styles.deal} />}
          </div>
        </div>
      </div>
      <div className={styles.meta}>
        <Link href={`/b/${item.slug}`} className={styles.name}>
          {item.Title}
        </Link>
        {item.verified && <Verified gold={item.subscriber} />}
        <span className={styles.dot} aria-hidden='true'>•</span>
        <span className={styles.tagline}>{item.tagline || item.Description}</span>
        <span className={styles.actions}>
          <SaveButton slug={item.slug} iconOnly className={styles.action} />
          <a href={item.Link} target='_blank' rel='noopener noreferrer' className={styles.action} aria-label={`Visit ${item.Title}`}>
            <Icon name='external' size={16} />
          </a>
        </span>
      </div>
    </div>
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
