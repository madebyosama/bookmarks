import Link from 'next/link'
import styles from './Tiles.module.css'
import page from '../../page.module.css'
import Icon, { IconName, Verified } from '../Icon/Icon'
import SafeImg from '../SafeImg/SafeImg'
import SaveButton from '../SaveButton/SaveButton'
import { Favicon } from '../Card/Card'
import { Collection, Item, Post } from '../../types'

// Bookmark icon in the tile's corner; a sibling of the link so it can be a real button.
function Saveable({ saveKey, children }: { saveKey: string; children: React.ReactNode }) {
  return (
    <div className={styles.saveable}>
      {children}
      <SaveButton slug={saveKey} iconOnly className={styles.save} />
    </div>
  )
}

export function CollectionTile({ c, withDescription = false, onClick }: { c: Collection; withDescription?: boolean; onClick?: () => void }) {
  const tile = (
    <Link href={`/collections/${c.slug}`} className={styles.tile} onClick={onClick}>
      <span className={styles.icons}>
        {c.items.slice(0, 4).map((b) => (
          <Favicon key={b.slug} item={b} size={26} />
        ))}
      </span>
      <span className={styles.bottom}>
        <span className={styles.title}>{c.title}</span>
        {withDescription && <span className={styles.text}>{c.description}</span>}
        <span className={styles.meta}>{c.items.length} bookmarks</span>
      </span>
    </Link>
  )
  // The search palette passes onClick and has no room for a save button.
  return onClick ? tile : <Saveable saveKey={`collection:${c.slug}`}>{tile}</Saveable>
}

export function PostTile({ p, onClick }: { p: Post; onClick?: () => void }) {
  return (
    <Link href={`/blog/${p.slug}`} className={styles.tile} onClick={onClick}>
      {p.items[0] && <Favicon item={p.items[0]} size={26} />}
      <span className={styles.bottom}>
        <span className={`${styles.title} ${styles.clamp}`}>{p.title}</span>
        <span className={styles.meta}>{p.tag}</span>
      </span>
    </Link>
  )
}

export function PostCard({ p }: { p: Post }) {
  return (
    <Saveable saveKey={`post:${p.slug}`}>
    <Link href={`/blog/${p.slug}`} className={`${styles.tile} ${styles.post}`}>
      {p.items[0] && <Favicon item={p.items[0]} size={34} />}
      <span className={styles.postTitle}>{p.title}</span>
      <span className={`${styles.text} ${styles.clamp3}`}>{p.excerpt}</span>
      <span className={styles.postMeta}>
        <span>{p.tag}</span>
        <span>{p.readTime}</span>
      </span>
    </Link>
    </Saveable>
  )
}

const longDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

// "Featured articles": screenshot of the first bookmark mentioned, then the text.
export function FeaturedPost({ p }: { p: Post }) {
  return (
    <Saveable saveKey={`post:${p.slug}`}>
      <Link href={`/blog/${p.slug}`} className={styles.feature}>
        <SafeImg src={p.items[0]?.Thumbnail} alt='' className={styles.featureImg} fallback={<span className={styles.featureImg} />} />
        <span className={styles.featureBody}>
          {p.items[0] && <Favicon item={p.items[0]} size={34} />}
          <span className={styles.postTitle}>{p.title}</span>
          <span className={`${styles.text} ${styles.clamp3}`}>{p.excerpt}</span>
          <span className={styles.date}>{longDate(p.date)}</span>
        </span>
      </Link>
    </Saveable>
  )
}

// Compact "icon · name ✓ · tagline" rows (new additions, startups, deals, trending).
export function ItemRows({ items, deals = false }: { items: Item[]; deals?: boolean }) {
  return (
    <div className={page.recentGrid}>
      {items.map((b) => (
        <Link key={b.slug} href={`/b/${b.slug}`} className={page.recentRow}>
          <Favicon item={b} size={44} />
          <span className={page.recentText}>
            <span className={page.recentTitle}>
              {b.Title} {b.verified && <Verified size={13} gold={b.subscriber} />}
            </span>
            <span className={page.recentSub}>{b.tagline || b.Description}</span>
          </span>
          {deals && <span className={styles.dealTag}>{b.deal}</span>}
        </Link>
      ))}
    </div>
  )
}

// Panel of icon tiles with counts ("Explore categories", "Popular tags").
export function CountPanel({ links }: { links: { href: string; label: string; count: number; icon: IconName | Item }[] }) {
  return (
    <div className={styles.panel}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className={styles.panelLink}>
          {typeof l.icon === 'string' ? (
            <span className={styles.panelIcon}>
              <Icon name={l.icon} size={20} />
            </span>
          ) : (
            <Favicon item={l.icon} size={44} />
          )}
          <span>
            <span className={styles.title}>{l.label}</span>
            <span className={styles.meta} style={{ display: 'block' }}>
              {l.count} {l.count === 1 ? 'bookmark' : 'bookmarks'}
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}
