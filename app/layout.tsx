import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Collection of 1000 bookmarks',
}

const font = localFont({ src: './font.woff2' })

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
      <body className={font.className}>{children}</body>
    </html>
  )
}
