import Link from 'next/link'
import styles from './Footer.module.css'
import Icon from '../Icon/Icon'
import { Brand } from '../Sidebar/Sidebar'
import { getData } from '../../services/bookmarkService'

// Toolfolio-style: brand + blurb, then link columns, then a copyright line.
export default async function Footer() {
  const { bookmarks, categories, collections } = await getData()
  const columns = [
    { title: 'Categories', wide: true, links: categories.map((c) => ({ href: `/categories/${c.slug}`, label: c.name })) },
    { title: 'Collections', links: collections.map((c) => ({ href: `/collections/${c.slug}`, label: c.title })) },
    {
      title: 'Explore',
      links: [
        { href: '/latest', label: 'Latest additions' },
        { href: '/bookmarks', label: 'All bookmarks' },
        { href: '/blog', label: 'Blog' },
        { href: '/glossary', label: 'Glossary' },
      ],
    },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.about}>
          <Brand />
          <p className={styles.blurb}>
            A hand-picked directory of {bookmarks.length} useful websites. All the tools &amp; resources you need, in one place.
          </p>
          {process.env.NEXT_PUBLIC_DISCORD_URL && (
            <a href={process.env.NEXT_PUBLIC_DISCORD_URL} target='_blank' rel='noopener noreferrer' className={styles.social} aria-label='Discord'>
              <Icon name='discord' size={20} />
            </a>
          )}
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className={c.wide ? styles.wide : undefined}>
            <div className={styles.title}>{c.title}</div>
            <div className={styles.links}>
              {c.links.map((l) => (
                <Link key={l.href} href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        ))}
      </div>
      <div className={styles.meta}>
        <span>© {new Date().getFullYear()} Bookmarks</span>
        <span>
          Built by{' '}
          <a href='https://madebyosama.com' target='_blank' rel='noopener noreferrer'>
            Muhammad Osama
          </a>
        </span>
      </div>
    </footer>
  )
}
