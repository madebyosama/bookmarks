import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '../../page.module.css'
import Browse from '../../components/Browse/Browse'
import Rail from '../../components/Rail/Rail'
import SignupBanner from '../../components/SignupBanner/SignupBanner'
import { PostCard } from '../../components/Tiles/Tiles'
import Icon, { categoryIcon } from '../../components/Icon/Icon'
import Card, { CardGridSkeleton } from '../../components/Card/Card'
import { getData } from '../../services/bookmarkService'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () => (await getData()).categories.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = (await getData()).getCategory((await params).slug)
  return c ? { title: c.name, description: c.description } : {}
}

export default async function CategoryPage({ params }: Props) {
  const { getCategory, inCategory, picks, featured, postsIn } = await getData()
  const c = getCategory((await params).slug)
  if (!c) notFound()

  const items = inCategory(c.slug)
  const top = [...new Set([...picks, ...featured])].filter((b) => b.categorySlug === c.slug)
  const posts = postsIn(c.slug)

  return (
    <>
      <header style={{ padding: '24px 24px 4px' }}>
        <h1 className={styles.h1} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className={styles.iconTile}>
            <Icon name={categoryIcon(c.name)} size={20} />
          </span>
          {c.name}
        </h1>
        <p className={styles.lede} style={{ marginBottom: 8 }}>
          {c.description}
        </p>
      </header>
      <div className={styles.page} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SignupBanner title='No more searching Google.' text={`Find vetted ${c.name.toLowerCase()} websites for every need.`} />

        {top.length > 0 && (
          <Rail
            title='Featured'
            icon={<span style={{ color: '#6f8dff', display: 'flex' }}><Icon name='bolt' size={18} /></span>}
            hint='Hand-picked by the editor'
          >
            {top.map((b) => (
              <Card key={b.slug} item={b} />
            ))}
          </Rail>
        )}

        {posts.length > 0 && (
          <Rail title={`${c.name} articles`} icon={<Icon name='blog' size={18} />} href='/blog' columns={3} minWidth={260}>
            {posts.map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </Rail>
        )}

        <Rail title='Recently added' icon={<Icon name='latest' size={18} />}>
          {[...items].reverse().slice(0, 12).map((b) => (
            <Card key={b.slug} item={b} />
          ))}
        </Rail>

        <h2 className={styles.h2} style={{ margin: '44px 0 0' }}>All {c.name}</h2>
      </div>
      <Suspense fallback={<div style={{ padding: 24 }}><CardGridSkeleton /></div>}>
        <Browse items={items} />
      </Suspense>
    </>
  )
}
