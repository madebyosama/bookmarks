import Link from 'next/link'
import styles from './Tiles.module.css'
import { Favicon } from '../Card/Card'
import { Collection, Post } from '../../types'

export function CollectionTile({ c, withDescription = false, onClick }: { c: Collection; withDescription?: boolean; onClick?: () => void }) {
  return (
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
    <Link href={`/blog/${p.slug}`} className={`${styles.tile} ${styles.post}`}>
      {p.items[0] && <Favicon item={p.items[0]} size={34} />}
      <span className={styles.postTitle}>{p.title}</span>
      <span className={`${styles.text} ${styles.clamp3}`}>{p.excerpt}</span>
      <span className={styles.postMeta}>
        <span>{p.tag}</span>
        <span>{p.readTime}</span>
      </span>
    </Link>
  )
}
