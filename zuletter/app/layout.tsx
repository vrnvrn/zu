import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZuLetter — Zuzalu Community Newsletter',
  description: 'A transparent, community-driven newsletter for the Zuzalu ecosystem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <div className="deadline-banner">
          <div className="container">
            <Link href="/submit" style={{ display: 'block', textAlign: 'center', color: 'inherit', textDecoration: 'none' }}>
              <span style={{ opacity: 0.9 }}>Submissions for</span>{' '}
              <strong>February 2026</strong>{' '}
              <span style={{ opacity: 0.9 }}>issue close February 16th</span>{' '}
              <span style={{ marginLeft: '0.5rem' }}>→</span>
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
