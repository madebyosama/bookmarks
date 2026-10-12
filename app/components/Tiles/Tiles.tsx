import Link from 'next/link'
import styles from '../../page.module.css'
import { Favicon } from '../Card/Card'
import { collections, posts } from '../../services/bookmarkService'

export function CollectionTiles({ items, withDescription = false }: { items: typeof collections; withDescription?: boolean }) {
  return (
    <div className={styles.tiles}>
      {items.map((c) => (
        <Link key={c.slug} href={`/collections/${c.slug}`} className={styles.tile}>
          <span className={styles.stack}>
            {c.items.slice(0, 4).map((b) => (
              <Favicon key={b.slug} item={b} size={32} />
            ))}
          </span>
          <span className={styles.tileTitle}>{c.title}</span>
          {withDescription && <span className={styles.tileText}>{c.description}</span>}
          <span className={styles.tileMeta}>{c.items.length} bookmarks</span>
        </Link>
      ))}
    </div>
  )
}

export function PostTiles({ items }: { items: typeof posts }) {
  return (
    <div className={styles.tiles}>
      {items.map((p) => (
        <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.tile} style={{ minHeight: 210 }}>
          <Favicon item={p.items[0]} size={34} />
          <span className={styles.tileTitle} style={{ fontWeight: 700, lineHeight: 1.25 }}>
            {p.title}
          </span>
          <span className={styles.tileText}>{p.excerpt}</span>
          <span className={styles.tileMeta}>
            <span>{p.tag}</span>
            <span>{p.readTime}</span>
          </span>
        </Link>
      ))}
    </div>
  )
}
