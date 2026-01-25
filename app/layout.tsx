import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Collection of 1000 bookmarks',
}

const satoshi = localFont({
  src: [
    {
      path: './assets/fonts/Satoshi-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/Satoshi-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './assets/fonts/Satoshi-Black.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='e7edaf57-6630-4365-bad6-8a51c132a819'
        ></script>
      </head>
      <body className={satoshi.className}>{children}</body>
    </html>
  )
}
