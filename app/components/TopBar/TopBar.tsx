'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './TopBar.module.css'
import Icon from '../Icon/Icon'
import { useAuth } from '../Auth/AuthProvider'

const tabs = [
  { href: '/', label: 'Explore' },
  { href: '/latest', label: 'Latest additions' },
]

export default function TopBar() {
  const path = usePathname()
  const { user, ready, openAuth, signOut } = useAuth()
  const showTabs = tabs.some((t) => t.href === path)
  const name = user?.user_metadata?.full_name || user?.email || ''

  return (
    <div className={styles.bar}>
      <nav aria-label='Sections' className={styles.tabs}>
        {showTabs &&
          tabs.map((t) => (
            <Link key={t.href} href={t.href} className={`${styles.tab} ${path === t.href ? styles.active : ''}`} aria-current={path === t.href ? 'page' : undefined}>
              {t.label}
            </Link>
          ))}
      </nav>

      <div className={styles.actions}>
        <Link href='/saved' className={styles.icon} aria-label='Saved bookmarks'>
          <Icon name='bookmark' size={18} />
        </Link>
        {!ready ? (
          <span className={styles.placeholder} aria-hidden='true' />
        ) : user ? (
          <details className={styles.menu}>
            <summary className={styles.avatar} aria-label='Account menu'>
              {name.slice(0, 1).toUpperCase()}
            </summary>
            <div className={styles.dropdown}>
              <div className={styles.who}>{name}</div>
              <Link href='/saved' className={styles.item}>
                <Icon name='bookmark' /> Saved
              </Link>
              <button type='button' className={styles.item} onClick={signOut}>
                <Icon name='logout' /> Sign out
              </button>
            </div>
          </details>
        ) : (
          <>
            <button type='button' className={styles.login} onClick={() => openAuth('login')}>
              Log in
            </button>
            <button type='button' className={styles.signup} onClick={() => openAuth('signup')}>
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  )
}
