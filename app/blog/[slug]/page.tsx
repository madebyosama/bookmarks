import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '../../page.module.css'
import { CardGrid } from '../../components/Card/Card'
import { getData } from '../../services/bookmarkService'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () => (await getData()).posts.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = (await getData()).getPost((await params).slug)
  return p ? { title: p.title, description: p.excerpt } : {}
}

export default async function PostPage({ params }: Props) {
  const { posts, getPost } = await getData()
  const p = getPost((await params).slug)
  if (!p) notFound()

  return (
    <>
      <nav aria-label='Breadcrumb' className={styles.crumbs}>
        <Link href='/'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link href='/blog'>Blog</Link>
        <span aria-hidden='true'>/</span>
        <span style={{ color: 'var(--text)', padding: 4 }} aria-current='page'>{p.title}</span>
      </nav>
      <main className={styles.page}>
        <article className={`${styles.narrow} ${styles.article}`} style={{ maxWidth: 680 }}>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            {p.tag} · {p.readTime}
          </div>
          <h1 className={styles.h1} style={{ margin: '8px 0 20px', fontSize: 'clamp(30px, 4vw, 42px)', lineHeight: 1.12 }}>
            {p.title}
          </h1>
          {p.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <h2 className={styles.h2} style={{ margin: '32px 0 16px', fontSize: 18 }}>Bookmarks in this post</h2>
        <CardGrid items={p.items} />

        {posts.length > 1 && (
          <>
            <h2 className={styles.h2} style={{ margin: '48px 0 12px', fontSize: 18 }}>More from the blog</h2>
            <div className={styles.chips}>
              {posts
                .filter((x) => x.slug !== p.slug)
                .map((x) => (
                  <Link key={x.slug} href={`/blog/${x.slug}`} className={styles.chip}>
                    {x.title}
                  </Link>
                ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}
