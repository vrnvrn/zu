import { Metadata } from 'next'
import NewsletterContent from '@/components/NewsletterContent'
import { hubs, cards, cardPositions, popupCities } from './content'
import SpringBackground from './SpringBackground'
import PasswordGate from './PasswordGate'

export const metadata: Metadata = {
  title: 'ZuZone — March 2026 | ZuCity Japan Launch, Ecosystem Poll',
  description: 'The March 2026 ZuZone newsletter: ZuCity Japan app launch, Burns & V on the ecosystem, NS vs Zu residencies, ecosystem poll, and our first X Spaces.',
  openGraph: {
    title: 'ZuZone — March 2026',
    description: 'ZuCity Japan app launch, ecosystem poll, NS vs Zu, and ZuZone\'s first X Spaces co-hosting.',
    type: 'website',
    url: 'https://zuzone.org/march-2026',
    siteName: 'ZuZone',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function March2026Page() {
  return (
    <PasswordGate>
      <SpringBackground />
      <NewsletterContent
        hubs={hubs}
        cards={cards}
        cardPositions={cardPositions}
        popupCities={popupCities}
        pollId="march-2026"
      />
    </PasswordGate>
  )
}
