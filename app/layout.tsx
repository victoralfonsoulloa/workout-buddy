import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geist = localFont({
  src: [
    { path: '../public/fonts/Geist-Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Geist-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Geist-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Geist-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Geist-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--wb-font',
})

export const metadata: Metadata = {
  title: 'Workout Buddy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body style={{ fontFamily: 'var(--wb-font), ui-sans-serif, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
