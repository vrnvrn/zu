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
      <body>
        <div className="deadline-banner">
          <div className="container">
            <Link href="/submit" style={{ display: 'block', textAlign: 'center', color: 'inherit', textDecoration: 'none' }}>
              Submissions for the January 2026 issue close January 23rd
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
