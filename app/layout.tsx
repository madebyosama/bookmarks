import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import { bookmarks } from './services/bookmarkService'

import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Bookmarks', template: '%s · Bookmarks' },
  description: `A hand-picked collection of ${bookmarks.length} useful websites — tools, resources and inspiration.`,
}

const googleSans = localFont({
  src: [
    { path: './assets/fonts/GoogleSans_17pt-Regular.ttf', weight: '400', style: 'normal' },
    { path: './assets/fonts/GoogleSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './assets/fonts/GoogleSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
})

// Applies a saved theme choice before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script defer src='https://cloud.umami.is/script.js' data-website-id='51ea0a73-379b-4fcb-b6e9-ff93df70faec'></script>
      </head>
      <body className={googleSans.className}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: '999 1 560px', minWidth: 0 }}>
            {children}
            <Footer />
          </div>
        </div>
        <BackToTop />
      </body>
    </html>
  )
}
