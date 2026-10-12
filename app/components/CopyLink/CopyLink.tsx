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
