'use client'

import Icon from '../Icon/Icon'
import { useAuth } from '../Auth/AuthProvider'

export default function SaveButton({ slug, className }: { slug: string; className?: string }) {
  const { saved, toggleSave } = useAuth()
  const on = saved.has(slug)
  return (
    <button type='button' className={className} onClick={() => toggleSave(slug)} aria-pressed={on}>
      <Icon name='bookmark' filled={on} />
      {on ? 'Saved' : 'Save'}
    </button>
  )
}
