'use client'

import { useEffect, useState } from 'react'
import Icon from '../Icon/Icon'

const isDark = () =>
  document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches

// Follows the system until clicked; the choice is saved and applied by the script in layout.tsx.
export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(isDark())
    const sync = () => setDark(isDark())
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  const toggle = () => {
    const next = isDark() ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
    window.dispatchEvent(new Event('themechange'))
  }

  return (
    <button type='button' onClick={toggle} className={className}>
      <Icon name={dark ? 'sun' : 'moon'} />
      {dark === null ? 'Theme' : dark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
