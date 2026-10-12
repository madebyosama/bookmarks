import Link from 'next/link'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import Rail from './components/Rail/Rail'
import SignupBanner from './components/SignupBanner/SignupBanner'
import Icon, { categoryIcon, Verified } from './components/Icon/Icon'
import Card, { Favicon } from './components/Card/Card'
import { CollectionTile, PostCard } from './components/Tiles/Tiles'
import { getData } from './services/bookmarkService'

export default async function HomePage() {
  const { featured, picks, recent, collections, categories, posts, glossary, inCategory } = await getData()

  return (
    <main className={styles.page} style={{ paddingTop: 24 }}>
      {featured.length > 0 && <Hero items={featured} />}

      <Rail
        title='Featured'
        icon={<span style={{ color: '#6f8dff', display: 'flex' }}><Icon name='bolt' size={18} /></span>}
        hint='Hand-picked by the editor'
        href='/bookmarks'
      >
        {picks.map((b) => (
          <Card key={b.slug} item={b} />
        ))}
      </Rail>

      <SignupBanner />

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Latest additions</h2>
          <Link href='/latest' className={styles.more}>View all →</Link>
        </div>
        <div className={styles.recentGrid}>
          {recent.slice(0, 12).map((b) => (
            <Link key={b.slug} href={`/b/${b.slug}`} className={styles.recentRow}>
              <Favicon item={b} size={44} />
              <span className={styles.recentText}>
                <span className={styles.recentTitle}>
                  {b.Title} {b.verified && <Verified size={13} />}
                </span>
                <span className={styles.recentSub}>{b.Description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Rail title='Popular collections' href='/collections' columns={4} minWidth={220}>
        {collections.map((c) => (
          <CollectionTile key={c.slug} c={c} />
        ))}
      </Rail>

      {categories.map((c) => (
        <Rail
          key={c.slug}
          title={c.name}
          icon={<Icon name={categoryIcon(c.name)} size={18} />}
          href={`/categories/${c.slug}`}
        >
          {inCategory(c.slug)
            .slice(0, 12)
            .map((b) => (
              <Card key={b.slug} item={b} />
            ))}
        </Rail>
      ))}

      {posts.length > 0 && (
        <Rail title='From the blog' icon={<Icon name='blog' size={18} />} href='/blog' columns={3} minWidth={260}>
          {posts.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </Rail>
      )}

      {glossary.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Icon name='glossary' size={18} />
              From the glossary
            </h2>
            <Link href='/glossary' className={styles.more}>All terms →</Link>
          </div>
          <div className={styles.tiles}>
            {glossary.slice(0, 6).map((t) => (
              <Link key={t.slug} href={`/glossary/${t.slug}`} className={styles.tile}>
                <span className={styles.termName} style={{ fontSize: 22 }}>{t.term}</span>
                <span className={styles.tileText}>{t.definition}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
