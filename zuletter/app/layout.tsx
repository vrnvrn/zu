import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zuzone - Helping hubs build, grow sustainably, and collaborate across the ecosystem',
  description: 'Helping hubs build, grow sustainably, and collaborate across the ecosystem',
  metadataBase: new URL('https://zuzone.org'),
  openGraph: {
    title: 'Zuzone - Helping hubs build, grow sustainably, and collaborate across the ecosystem',
    description: 'Helping hubs build, grow sustainably, and collaborate across the ecosystem',
    type: 'website',
    url: 'https://zuzone.org',
    siteName: 'Zuzone',
  },
  twitter: {
    card: 'summary_large_image',
  },
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
        {children}
      </body>
    </html>
  )
}
