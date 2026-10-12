import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from '../../page.module.css'
import Browse from '../../components/Browse/Browse'
import Icon, { categoryIcon } from '../../components/Icon/Icon'
import { CardGridSkeleton } from '../../components/Card/Card'
import { categories, getCategory, inCategory } from '../../services/bookmarkService'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).slug)
  return c ? { title: c.name, description: c.description } : {}
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).slug)
  if (!c) notFound()

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
      <Suspense fallback={<div style={{ padding: 24 }}><CardGridSkeleton /></div>}>
        <Browse items={inCategory(c.slug)} />
      </Suspense>
    </>
  )
}
