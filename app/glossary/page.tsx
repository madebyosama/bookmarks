import Link from 'next/link'
import type { Metadata } from 'next'
import styles from '../page.module.css'
import { glossary } from '../services/bookmarkService'

export const metadata: Metadata = { title: 'Glossary' }

const letters = [...new Set(glossary.map((t) => t.term[0].toUpperCase()))]

export default function GlossaryPage() {
  return (
    <main className={styles.page} style={{ maxWidth: 760, margin: '0 auto', paddingTop: 48 }}>
      <h1 className='sr-only'>Glossary</h1>
      <p className={styles.lede} style={{ textAlign: 'center', fontSize: 19, maxWidth: 420, margin: '0 auto 28px' }}>
        The words behind the bookmarks — what each idea means, and where to see it.
      </p>
      <nav aria-label='Jump to letter' className={styles.letters}>
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`}>
            {l}
          </a>
        ))}
      </nav>
      {letters.map((l) => (
        <section key={l}>
          <h2 id={`letter-${l}`} className={styles.letterHead} style={{ margin: 0, fontWeight: 400 }}>
            {l}
          </h2>
          {glossary
            .filter((t) => t.term[0].toUpperCase() === l)
            .map((t) => (
              <div key={t.slug} className={styles.term}>
                <Link href={`/glossary/${t.slug}`} className={styles.termName}>
                  {t.term}
                </Link>
                <p className={styles.termDef}>{t.definition}</p>
                <Link href={`/glossary/${t.slug}`} className={styles.more} style={{ fontSize: 13 }}>
                  {t.items.length} {t.items.length === 1 ? 'bookmark' : 'bookmarks'} →
                </Link>
              </div>
            ))}
        </section>
      ))}
    </main>
  )
}
