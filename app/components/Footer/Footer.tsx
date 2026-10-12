import Link from 'next/link'
import styles from './Footer.module.css'
import { getData } from '../../services/bookmarkService'

export default async function Footer() {
  const { bookmarks, categories, collections, glossary } = await getData()
  const columns = [
  {
    title: 'Browse',
    links: [
      { href: '/', label: 'Explore' },
      { href: '/latest', label: 'Latest additions' },
      { href: '/bookmarks', label: 'All bookmarks' },
      { href: '/categories', label: 'Categories' },
      { href: '/collections', label: 'Collections' },
      { href: '/blog', label: 'Blog' },
      { href: '/glossary', label: 'Glossary' },
    ],
  },
  { title: 'Categories', links: categories.map((c) => ({ href: `/categories/${c.slug}`, label: c.name })) },
  { title: 'Collections', links: collections.map((c) => ({ href: `/collections/${c.slug}`, label: c.title })) },
  { title: 'Glossary', links: glossary.slice(0, 9).map((t) => ({ href: `/glossary/${t.slug}`, label: t.term })) },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.cols}>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <div className={styles.title}>{c.title}</div>
            {c.links.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className={styles.meta}>
        <span>{bookmarks.length} bookmarks</span>
        <span>
          Built by{' '}
          <a href='https://madebyosama.com' target='_blank' rel='noopener noreferrer'>
            Muhammad Osama
          </a>
        </span>
      </div>
      <div className={styles.wordmark} aria-hidden='true'>
        BOOKMARKS
      </div>
    </footer>
  )
}
