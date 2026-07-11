'use client'

import React from 'react'
import styles from './CategoryFilter.module.css'
import {
  categoryColors,
  defaultCategoryColor,
} from '../../utils/categoryColors'

interface CategoryFilterProps {
  categories: { name: string; count: number }[]
  totalCount: number
  activeCategory: string
  onChange: (category: string) => void
}

export default function CategoryFilter({
  categories,
  totalCount,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  const items = [{ name: 'Explore', count: totalCount }, ...categories]

  return (
    <div className={styles.categories}>
      {items.map((item) => {
        const isActive =
          activeCategory === item.name ||
          (item.name === 'Explore' && activeCategory === '')

        const colors = categoryColors[item.name] || defaultCategoryColor

        return (
          <button
            key={item.name}
            className={`${styles.badge} ${isActive ? styles.active : ''}`}
            style={
              {
                '--badge-bg': colors.background,
                '--badge-text': colors.color,
              } as React.CSSProperties
            }
            onClick={() => onChange(item.name === 'Explore' ? '' : item.name)}
          >
            {item.name}
            <span className={styles.count}>{item.count}</span>
          </button>
        )
      })}
    </div>
  )
}
