import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Sidebar from './components/Sidebar/Sidebar'
import TopBar from './components/TopBar/TopBar'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import AuthProvider from './components/Auth/AuthProvider'
import { getData } from './services/bookmarkService'

import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const { bookmarks } = await getData()
  return {
    title: { default: 'Bookmarks', template: '%s · Bookmarks' },
    description: `A hand-picked collection of ${bookmarks.length} useful websites — tools, resources and inspiration.`,
  }
}

const googleSans = localFont({
  src: [
    { path: './assets/fonts/GoogleSans_17pt-Regular.ttf', weight: '400', style: 'normal' },
    { path: './assets/fonts/GoogleSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './assets/fonts/GoogleSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = await getData()
  const art = data.featured.concat(data.picks).map((b) => b.Thumbnail).filter(Boolean)

  return (
    <html lang='en'>
      <head>
        <script defer src='https://cloud.umami.is/script.js' data-website-id='51ea0a73-379b-4fcb-b6e9-ff93df70faec'></script>
      </head>
      <body className={googleSans.className}>
        <AuthProvider art={art}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', minHeight: '100vh' }}>
            <Sidebar categories={data.categories} search={data.search} />
            <div style={{ flex: '999 1 560px', minWidth: 0 }}>
              <TopBar />
              {children}
              <Footer />
            </div>
          </div>
        </AuthProvider>
        <BackToTop />
      </body>
    </html>
  )
}
