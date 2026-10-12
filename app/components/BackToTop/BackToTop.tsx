'use client'

import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type='button'
      aria-label='Back to top'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      tabIndex={show ? 0 : -1}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '1px solid var(--border2)',
        background: 'var(--surface)',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 20px -8px rgba(0,0,0,.3)',
        opacity: show ? 1 : 0,
        transform: show ? 'none' : 'translateY(20px)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity .3s ease, transform .3s ease',
        zIndex: 15,
      }}
    >
      <Icon name='arrowUp' size={18} />
    </button>
  )
}
