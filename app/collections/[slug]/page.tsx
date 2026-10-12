import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '../../page.module.css'
import { CardGrid, Favicon } from '../../components/Card/Card'
import { getData } from '../../services/bookmarkService'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () => (await getData()).collections.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = (await getData()).getCollection((await params).slug)
  return c ? { title: c.title, description: c.description } : {}
}

export default async function CollectionPage({ params }: Props) {
  const { collections, getCollection } = await getData()
  const c = getCollection((await params).slug)
  if (!c) notFound()

  return (
    <>
      <nav aria-label='Breadcrumb' className={styles.crumbs}>
        <Link href='/'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link href='/collections'>Collections</Link>
        <span aria-hidden='true'>/</span>
        <span style={{ color: 'var(--text)', padding: 4 }} aria-current='page'>{c.title}</span>
      </nav>
      <main className={styles.page}>
        <span className={styles.stack} style={{ marginBottom: 16 }}>
          {c.items.slice(0, 4).map((b) => (
            <Favicon key={b.slug} item={b} size={44} />
          ))}
        </span>
        <h1 className={styles.h1} style={{ fontSize: 32 }}>{c.title}</h1>
        <p className={styles.lede} style={{ fontSize: 17, maxWidth: 620, marginBottom: 4 }}>{c.description}</p>
        <p className={styles.lede} style={{ fontSize: 14, marginTop: 0, marginBottom: 28 }}>{c.items.length} bookmarks</p>
        <CardGrid items={c.items} />

        <h2 className={styles.h2} style={{ margin: '48px 0 12px', fontSize: 18 }}>Other collections</h2>
        <div className={styles.chips}>
          {collections
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <Link key={x.slug} href={`/collections/${x.slug}`} className={styles.chip}>
                {x.title}
              </Link>
            ))}
        </div>
      </main>
    </>
  )
}
