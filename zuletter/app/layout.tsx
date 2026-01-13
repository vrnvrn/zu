import type { Metadata } from 'next'
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
      <body>{children}</body>
    </html>
  )
}

