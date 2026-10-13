'use client'

import { useState } from 'react'
import Icon from '../Icon/Icon'

export default function CopyLink({ url, className }: { url: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setState('ok')
    } catch {
      setState('fail')
    }
    setTimeout(() => setState('idle'), 1600)
  }

  return (
    <button type='button' onClick={copy} className={className} aria-live='polite'>
      <Icon name='link' />
      {state === 'ok' ? 'Link copied' : state === 'fail' ? 'Copy failed' : 'Copy link'}
    </button>
  )
}

// Native share sheet where supported (mobile, Safari); otherwise copies this page's URL.
export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = location.href
    if (navigator.share) return navigator.share({ title, url }).catch(() => {})
    await navigator.clipboard.writeText(url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button type='button' onClick={share} className={className} aria-live='polite'>
      <Icon name='share' />
      {copied ? 'Page link copied' : 'Share'}
    </button>
  )
}
