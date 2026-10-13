'use client'

import { useRef, useState } from 'react'
import styles from './Gallery.module.css'
import Icon from '../Icon/Icon'
import SafeImg from '../SafeImg/SafeImg'

// Screenshot strip; clicking one opens a native <dialog> lightbox (Esc, backdrop, focus handled by the browser).
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(0)
  const n = images.length
  const step = (d: number) => setOpen((i) => (i + d + n) % n)

  return (
    <>
      <div className={styles.strip}>
        {images.map((src, i) => (
          <button
            key={src}
            type='button'
            className={styles.item}
            onClick={() => {
              setOpen(i)
              dialog.current?.showModal()
            }}
            aria-label={`Enlarge screenshot ${i + 1} of ${title}`}
          >
            <SafeImg src={src} alt='' loading={i < 2 ? 'eager' : 'lazy'} width={1280} height={720} className={styles.img} fallback={null} />
            <span className={styles.zoom}>
              <Icon name='zoom' size={22} />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={`${title} screenshots`}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        <button type='button' className={`${styles.round} ${styles.close}`} onClick={() => dialog.current?.close()} aria-label='Close'>
          <Icon name='close' />
        </button>
        {n > 1 && (
          <>
            <button type='button' className={`${styles.round} ${styles.prev}`} onClick={() => step(-1)} aria-label='Previous screenshot'>
              <Icon name='chevronLeft' />
            </button>
            <button type='button' className={`${styles.round} ${styles.next}`} onClick={() => step(1)} aria-label='Next screenshot'>
              <Icon name='chevronRight' />
            </button>
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[open]} alt={`${title} screenshot ${open + 1}`} className={styles.big} />
        <div className={styles.caption}>
          <strong>{title}</strong>
          {n > 1 && (
            <span className={styles.count}>
              {open + 1} / {n}
            </span>
          )}
        </div>
      </dialog>
    </>
  )
}
