import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Collection of 1000 bookmarks',
};

const font = localFont({
  src: [
    {
      path: './assets/font/Satoshi-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/font/Satoshi-Black.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <script
        defer
        src='https://eu.umami.is/script.js'
        data-website-id='1786b6da-1b70-4625-8319-4d96e39162e6'
      ></script>
      <body className={font.className}>{children}</body>
    </html>
  );
}
