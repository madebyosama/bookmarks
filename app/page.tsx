import Link from 'next/link'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import Rail from './components/Rail/Rail'
import SignupBanner from './components/SignupBanner/SignupBanner'
import Icon, { categoryIcon, Verified } from './components/Icon/Icon'
import Card from './components/Card/Card'
import { CollectionTile, CountPanel, FeaturedPost, ItemRows, PostCard } from './components/Tiles/Tiles'
import { getData } from './services/bookmarkService'
import { topTags } from './utils/tags'

const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL

export default async function HomePage() {
  const { bookmarks, featured, picks, recent, collections, categories, posts, glossary, inCategory, subscribers, startups, deals, trending, featuredPosts } =
    await getData()
  const tags = topTags(bookmarks, 6).map(({ tag, count }) => ({
    href: `/bookmarks?tag=${encodeURIComponent(tag)}`,
    label: tag[0].toUpperCase() + tag.slice(1),
    count,
    icon: bookmarks.find((b) => b.tagList.includes(tag))!,
  }))

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

      {subscribers.length > 0 && (
        <Rail title='Subscriber spotlight' icon={<Verified size={20} gold />} columns={3} minWidth={280}>
          {subscribers.map((b) => (
            <Card key={b.slug} item={b} />
          ))}
        </Rail>
      )}

      {DISCORD_URL && (
        <section className={`${styles.banner} ${styles.discord}`}>
          <div>
            <h2 className={styles.bannerTitle} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 24 }}>
              <Icon name='discord' size={26} /> Join our Discord community
            </h2>
            <p className={styles.bannerText}>Come talk tools, share finds and see what&apos;s new before everyone else.</p>
          </div>
          <a href={DISCORD_URL} target='_blank' rel='noopener noreferrer' className={`${styles.bannerButton} ${styles.discordButton}`}>
            <Icon name='discord' size={18} /> Join Discord
          </a>
        </section>
      )}

      <Rail title='New additions' href='/latest' columns={1} minWidth={300}>
        <ItemRows items={recent.slice(0, 12)} />
      </Rail>

      {startups.length > 0 && (
        <Rail title='Featured startups' icon={<Verified size={18} />} columns={1} minWidth={300}>
          <ItemRows items={startups.slice(0, 12)} />
        </Rail>
      )}

      <SignupBanner />

      {featuredPosts.length > 0 && (
        <Rail title='Featured articles' icon={<Icon name='blog' size={18} />} href='/blog' columns={1} minWidth={300}>
          {featuredPosts.map((p) => (
            <FeaturedPost key={p.slug} p={p} />
          ))}
        </Rail>
      )}

      {deals.length > 0 && (
        <Rail title='Top deals' columns={1} minWidth={300}>
          <ItemRows items={deals.slice(0, 12)} deals />
        </Rail>
      )}

      {trending.length > 0 && (
        <Rail title='Trending' columns={1} minWidth={300}>
          <ItemRows items={trending.slice(0, 12)} />
        </Rail>
      )}

      <div className={styles.twoUp}>
        <section>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Explore categories</h2>
            <Link href='/categories' className={styles.more}>View all →</Link>
          </div>
          <CountPanel
            links={categories.slice(0, 6).map((c) => ({ href: `/categories/${c.slug}`, label: c.name, count: c.count, icon: categoryIcon(c.name) }))}
          />
        </section>
        <section>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Popular tags</h2>
            <Link href='/bookmarks' className={styles.more}>Browse all →</Link>
          </div>
          <CountPanel links={tags} />
        </section>
      </div>

      <Rail title='Popular collections' href='/collections' columns={4} minWidth={220}>
        {collections.map((c) => (
          <CollectionTile key={c.slug} c={c} withDescription />
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
        <Rail title='Latest articles' icon={<Icon name='blog' size={18} />} href='/blog' columns={3} minWidth={260}>
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
