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
      path: './assets/fonts/GoogleSans_17pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/GoogleSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './assets/fonts/GoogleSans-Bold.ttf',
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
          data-website-id='51ea0a73-379b-4fcb-b6e9-ff93df70faec'
        ></script>
      </head>
      <body className={satoshi.className}>{children}</body>
    </html>
  )
}
