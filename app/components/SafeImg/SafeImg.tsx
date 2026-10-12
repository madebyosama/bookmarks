'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

// <img> that swaps to `fallback` when the file is missing (e.g. Logo Book has no favicon).
export default function SafeImg({
  fallback,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { fallback: ReactNode }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  // A server-rendered <img> can fail before hydration attaches onError.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed || !props.src) return <>{fallback}</>
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img ref={ref} loading='lazy' decoding='async' {...props} onError={() => setFailed(true)} />
}
