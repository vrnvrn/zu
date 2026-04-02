import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZuZone — February 2026 | d/acc in Practice, Burns on Zu2026',
  description: 'The February 2026 ZuZone newsletter: Burns on potentials in Zu2026, d/acc in Practice with Chris Mata, February crossword, and the 2026 Zuzalu map.',
  openGraph: {
    title: 'ZuZone — February 2026',
    description: 'Burns on Zu2026, d/acc in Practice with Chris Mata, and the 2026 ecosystem crossword.',
    type: 'website',
    url: 'https://zuzone.org/february-2026',
    siteName: 'ZuZone',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function February2026Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
