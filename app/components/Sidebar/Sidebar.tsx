'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'
import Icon, { IconName, categoryIcon } from '../Icon/Icon'
import SearchPalette from '../SearchPalette/SearchPalette'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { categories } from '../../services/bookmarkService'

const nav: { href: string; label: string; icon: IconName; match: string[] }[] = [
  { href: '/', label: 'Explore', icon: 'explore', match: ['/'] },
  { href: '/categories', label: 'Categories', icon: 'categories', match: ['/categories', '/bookmarks'] },
  { href: '/collections', label: 'Collections', icon: 'collections', match: ['/collections'] },
  { href: '/blog', label: 'Blog', icon: 'blog', match: ['/blog'] },
  { href: '/glossary', label: 'Glossary', icon: 'glossary', match: ['/glossary'] },
]

export default function Sidebar() {
  const path = usePathname()
  const isActive = (match: string[]) =>
    match.some((m) => (m === '/' ? path === '/' : path === m || (path.startsWith(m + '/') && !path.startsWith('/categories/'))))

  return (
    <aside className={styles.aside}>
      <div className={styles.top}>
        <Link href='/' className={styles.brand}>
          <span className={styles.logo}>B</span>
          <span>Bookmarks</span>
        </Link>
        <SearchPalette />
      </div>

      <nav aria-label='Primary' className={styles.list}>
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`${styles.row} ${isActive(n.match) ? styles.active : ''}`}
            aria-current={isActive(n.match) ? 'page' : undefined}
          >
            <Icon name={n.icon} />
            {n.label}
          </Link>
        ))}

        <div className={styles.heading}>Categories</div>
        {categories.map((c) => {
          const active = path === `/categories/${c.slug}`
          return (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className={`${styles.row} ${active ? styles.active : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon name={categoryIcon(c.name)} />
              <span className={styles.grow}>{c.name}</span>
              <span className={styles.count}>{c.count}</span>
            </Link>
          )
        })}

        <ThemeToggle className={styles.row} />
      </nav>

      <nav aria-label='Primary' className={styles.rail}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className={`${styles.chip} ${isActive(n.match) ? styles.chipActive : ''}`}>
            {n.label}
          </Link>
        ))}
        <ThemeToggle className={styles.chip} />
      </nav>
    </aside>
  )
}
