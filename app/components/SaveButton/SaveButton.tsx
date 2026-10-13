'use client'

import Icon from '../Icon/Icon'
import { useAuth } from '../Auth/AuthProvider'

export default function SaveButton({ slug, className, iconOnly }: { slug: string; className?: string; iconOnly?: boolean }) {
  const { saved, toggleSave } = useAuth()
  const on = saved.has(slug)
  return (
    <button type='button' className={className} onClick={() => toggleSave(slug)} aria-pressed={on} aria-label={iconOnly ? 'Save' : undefined}>
      <Icon name='bookmark' filled={on} />
      {!iconOnly && (on ? 'Saved' : 'Save')}
    </button>
  )
}
