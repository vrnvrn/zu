import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: '💚 ZuLetter 💚',
  description: 'A transparent, GitHub-native newsletter system',
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
              Submission Deadline for January 2026 Newsletter: January 23rd.
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}

