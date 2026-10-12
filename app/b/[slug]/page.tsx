import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '../../page.module.css'
import detail from './detail.module.css'
import Icon, { categoryIcon, Verified } from '../../components/Icon/Icon'
import CopyLink from '../../components/CopyLink/CopyLink'
import SafeImg from '../../components/SafeImg/SafeImg'
import { CardGrid, Favicon } from '../../components/Card/Card'
import SaveButton from '../../components/SaveButton/SaveButton'
import { getData } from '../../services/bookmarkService'
import { topTags } from '../../utils/tags'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () => (await getData()).bookmarks.map((b) => ({ slug: b.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = (await getData()).getBookmark((await params).slug)
  return b ? { title: b.Title, description: b.Description, openGraph: { images: [b.Thumbnail] } } : {}
}

export default async function BookmarkPage({ params }: Props) {
  const { bookmarks, getBookmark, collectionsFor, similar, moreInspiration } = await getData()
  const b = getBookmark((await params).slug)
  if (!b) notFound()

  // Tags on more than one bookmark become filter links; one-offs fall back to text search.
  const filterTags = new Set(topTags(bookmarks, 1000).filter((t) => t.count > 1).map((t) => t.tag))

  const like = similar(b)
  const more = moreInspiration(b, like)
  const inCollections = collectionsFor(b)

  return (
    <div style={{ animation: 'fade-in .28s ease both' }}>
      <nav aria-label='Breadcrumb' className={styles.crumbs}>
        <Link href='/'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link href={`/categories/${b.categorySlug}`}>{b.Category}</Link>
        <span aria-hidden='true'>/</span>
        <span style={{ color: 'var(--text)', padding: 4 }} aria-current='page'>{b.Title}</span>
      </nav>

      <div className={detail.layout}>
        <div className={detail.main}>
          <div className={detail.head}>
            <Favicon item={b} size={56} />
            <div className={detail.titles}>
              <h1 className={detail.title}>
                {b.Title} {b.verified && <Verified size={22} />}
              </h1>
              <div className={detail.domain}>{b.domain}</div>
            </div>
            <SaveButton slug={b.slug} className={detail.save} />
            <a href={b.Link} target='_blank' rel='noopener noreferrer' className={detail.visit}>
              Visit website <Icon name='external' size={14} />
            </a>
          </div>

          <SafeImg
            src={b.Thumbnail}
            alt={`Screenshot of ${b.Title}`}
            loading='eager'
            width={1280}
            height={720}
            className={detail.shot}
            fallback={<div className={detail.shot} />}
          />

          <div className={styles.label} style={{ margin: '36px 0 10px' }}>About</div>
          <p className={detail.about}>{b.Description}</p>

          <div className={styles.label} style={{ margin: '32px 0 10px' }}>Tags</div>
          <div className={styles.chips}>
            {b.tagList.map((t) => (
              <Link
                key={t}
                href={filterTags.has(t) ? `/bookmarks?tag=${encodeURIComponent(t)}` : `/bookmarks?q=${encodeURIComponent(t)}`}
                className={styles.chip}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        <aside className={detail.rail}>
          <CopyLink url={b.Link} className={detail.railRow} />
          <dl className={detail.meta}>
            <dt className={styles.label}>Category</dt>
            <dd>
              <Link href={`/categories/${b.categorySlug}`} className={detail.inline}>
                <Icon name={categoryIcon(b.Category)} /> {b.Category}
              </Link>
            </dd>
            <dt className={styles.label}>Domain</dt>
            <dd>{b.domain}</dd>
          </dl>

          {inCollections.length > 0 && (
            <>
              <div className={styles.label} style={{ margin: '4px 8px 6px' }}>In collections</div>
              {inCollections.map((c) => (
                <Link key={c.slug} href={`/collections/${c.slug}`} className={detail.railRow}>
                  <Icon name='collections' /> {c.title}
                </Link>
              ))}
            </>
          )}

          <div className={styles.label} style={{ margin: '18px 8px 6px' }}>Similar</div>
          {like.length === 0 ? (
            <p style={{ margin: '0 8px', color: 'var(--muted)', fontSize: 14 }}>Nothing similar yet.</p>
          ) : (
            like.map((x) => (
              <Link key={x.slug} href={`/b/${x.slug}`} className={detail.railRow}>
                <Favicon item={x} size={24} /> {x.Title}
              </Link>
            ))
          )}
        </aside>

        <section className={detail.more}>
          <div className={styles.sectionHead} style={{ margin: '20px 0 16px' }}>
            <h2 className={styles.h2}>More inspiration</h2>
            <Link href='/bookmarks' className={styles.more}>Browse all →</Link>
          </div>
          <CardGrid items={more} />
        </section>
      </div>
    </div>
  )
}
