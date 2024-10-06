import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Collection of 1000 bookmarks',
};

const font = localFont({ src: './font.woff2' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <script
        defer
        src='https://cloud.umami.is/script.js'
        data-website-id='2074860f-0432-4ecb-99ad-29739d875879'
      ></script>
      <body className={font.className}>{children}</body>
    </html>
  );
}
