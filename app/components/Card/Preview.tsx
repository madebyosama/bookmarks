'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './Preview.module.css'
import Icon from '../Icon/Icon'
import SaveButton from '../SaveButton/SaveButton'
import SafeImg from '../SafeImg/SafeImg'
import { Item } from '../../types'

// Cards ask for a preview with this event; one <PreviewDialog> (in the layout) shows it.
const EVENT = 'preview-site'

export function PreviewButton({ item, className }: { item: Item; className?: string }) {
  return (
    <button
      type='button'
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(EVENT, { detail: item }))}
      aria-label={`Preview ${item.Title}`}
    >
      <Icon name='eye' size={18} />
    </button>
  )
}

// "25% off": copies the code when there is one, otherwise just labels the deal.
export function DealButton({ item, className }: { item: Item; className?: string }) {
  const [copied, setCopied] = useState(false)
  if (!item.dealCode) return <span className={className}>{item.deal}</span>
  return (
    <button
      type='button'
      className={className}
      onClick={() =>
        navigator.clipboard.writeText(item.dealCode).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        })
      }
      aria-label={`Copy discount code for ${item.Title}`}
      aria-live='polite'
    >
      {copied ? 'Code copied' : item.deal}
    </button>
  )
}

export default function PreviewDialog() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    const open = (e: Event) => {
      setItem((e as CustomEvent<Item>).detail)
      dialog.current?.showModal()
    }
    window.addEventListener(EVENT, open)
    return () => window.removeEventListener(EVENT, open)
  }, [])

  const close = () => dialog.current?.close()

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={item ? `${item.Title} preview` : 'Preview'}
      onClick={(e) => e.target === e.currentTarget && close()}
      onClose={() => setItem(null)}
    >
      {item && (
        <div className={styles.panel}>
          <header className={styles.head}>
            <SafeImg src={item.Favicon} alt='' width={22} height={22} style={{ borderRadius: 6 }} fallback={null} />
            <strong>{item.Title}</strong>
            <button type='button' className={styles.icon} onClick={close} aria-label='Close preview'>
              <Icon name='close' />
            </button>
          </header>
          <div className={styles.frame}>
            <p className={styles.loading}>Loading preview… some sites don’t allow previews, open it in a new tab instead.</p>
            <iframe key={item.slug} src={item.Link} title={`${item.Title} website`} sandbox='allow-scripts allow-same-origin allow-forms allow-popups' />
          </div>
          <footer className={styles.foot}>
            <span className={styles.url}>{item.Link}</span>
            <SaveButton slug={item.slug} iconOnly className={styles.icon} />
            <Link href={`/b/${item.slug}`} className={styles.text} onClick={close}>
              <Icon name='info' size={14} /> Learn more
            </Link>
            <a href={item.Link} target='_blank' rel='noopener noreferrer' className={styles.text}>
              Open in new tab <Icon name='external' size={14} />
            </a>
          </footer>
        </div>
      )}
    </dialog>
  )
}
