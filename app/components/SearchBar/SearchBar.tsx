'use client'

import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search palettes...',
}: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <svg
        className={styles.searchIcon}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <input
        type='text'
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className={`${styles.clearButton} ${value ? styles.show : ''}`}
        onClick={() => onChange('')}
        type='button'
      >
        ×
      </button>
    </div>
  )
}
