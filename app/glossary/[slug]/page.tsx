import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '../../page.module.css'
import { CardGrid } from '../../components/Card/Card'
import { getTerm, glossary } from '../../services/bookmarkService'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => glossary.map((t) => ({ slug: t.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTerm((await params).slug)
  return t ? { title: t.term, description: t.definition } : {}
}

export default async function TermPage({ params }: Props) {
  const t = getTerm((await params).slug)
  if (!t) notFound()

  return (
    <>
      <nav aria-label='Breadcrumb' className={styles.crumbs}>
        <Link href='/'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link href='/glossary'>Glossary</Link>
        <span aria-hidden='true'>/</span>
        <span style={{ color: 'var(--text)', padding: 4 }} aria-current='page'>{t.term}</span>
      </nav>
      <main className={styles.page} style={{ paddingTop: 40 }}>
        <div className={styles.narrow}>
          <h1 className={styles.termName} style={{ margin: 0, display: 'block', fontSize: 'clamp(40px, 6vw, 64px)' }}>
            {t.term}
          </h1>
          <p style={{ margin: '14px 0 28px', fontSize: 18, lineHeight: 1.6 }}>{t.definition}</p>
        </div>
        <h2 className={styles.h2} style={{ marginBottom: 16, fontSize: 18 }}>Bookmarks about {t.term.toLowerCase()}</h2>
        {t.items.length === 0 ? <p className={styles.lede}>No bookmarks here yet.</p> : <CardGrid items={t.items} />}

        <h2 className={styles.h2} style={{ margin: '48px 0 12px', fontSize: 18 }}>Other terms</h2>
        <div className={styles.chips}>
          {glossary
            .filter((x) => x.slug !== t.slug)
            .map((x) => (
              <Link key={x.slug} href={`/glossary/${x.slug}`} className={styles.chip}>
                {x.term}
              </Link>
            ))}
        </div>
      </main>
    </>
  )
}
