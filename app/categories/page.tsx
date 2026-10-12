import Link from 'next/link'
import type { Metadata } from 'next'
import styles from '../page.module.css'
import Icon, { categoryIcon } from '../components/Icon/Icon'
import { Favicon } from '../components/Card/Card'
import { getData } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Categories' }

export default async function CategoriesPage() {
  const { categories, inCategory } = await getData()
  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Categories</h1>
      <p className={styles.lede}>Every bookmark lives in exactly one category.</p>
      <div className={styles.tiles}>
        {categories.map((c) => (
          <Link key={c.slug} href={`/categories/${c.slug}`} className={styles.tile}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className={styles.iconTile}>
                <Icon name={categoryIcon(c.name)} size={20} />
              </span>
              <span className={styles.tileTitle}>{c.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)' }}>
                {c.count} {c.count === 1 ? 'bookmark' : 'bookmarks'}
              </span>
            </span>
            <span className={styles.tileText}>{c.description}</span>
            <span className={styles.stack}>
              {inCategory(c.slug).slice(0, 5).map((b) => (
                <Favicon key={b.slug} item={b} size={28} />
              ))}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
