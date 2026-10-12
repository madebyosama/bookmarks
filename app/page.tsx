import Link from 'next/link'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import Icon, { categoryIcon } from './components/Icon/Icon'
import { CardGrid, Favicon } from './components/Card/Card'
import { CollectionTiles, PostTiles } from './components/Tiles/Tiles'
import { categories, collections, featured, inCategory, picks, posts, recent } from './services/bookmarkService'

export default function HomePage() {
  return (
    <main className={styles.page} style={{ paddingTop: 24 }}>
      <Hero items={featured} />

      <section className={styles.section} style={{ marginTop: 36 }}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>
            <span style={{ color: '#4c6fff', display: 'flex' }}>
              <Icon name='bolt' size={18} />
            </span>
            Editor’s picks
          </h2>
          <Link href='/bookmarks' className={styles.more}>View all →</Link>
        </div>
        <CardGrid items={picks} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2} style={{ marginBottom: 12 }}>Recently added</h2>
        <div className={styles.recentGrid}>
          {recent.map((b) => (
            <Link key={b.slug} href={`/b/${b.slug}`} className={styles.recentRow}>
              <Favicon item={b} size={40} />
              <span className={styles.recentText}>
                <span className={styles.recentTitle}>{b.Title}</span>
                <span className={styles.recentSub}>{b.Description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Popular collections</h2>
          <Link href='/collections' className={styles.more}>All collections →</Link>
        </div>
        <CollectionTiles items={collections.slice(0, 4)} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>
            <Icon name='blog' size={18} />
            From the blog
          </h2>
          <Link href='/blog' className={styles.more}>All posts →</Link>
        </div>
        <PostTiles items={posts} />
      </section>

      {/* The original grouped "Explore" view, kept below the new sections. */}
      {categories.map((c) => (
        <section key={c.slug} className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Icon name={categoryIcon(c.name)} size={18} />
              {c.name}
              <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--muted)' }}>{c.count}</span>
            </h2>
            <Link href={`/categories/${c.slug}`} className={styles.more}>View all →</Link>
          </div>
          <CardGrid items={inCategory(c.slug).slice(0, 4)} />
        </section>
      ))}
    </main>
  )
}
