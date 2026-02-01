'use client'

import Nav from '@/components/Nav'

interface Announcement {
  id: string
  title: string
  fullContent: string
  link?: { url: string; text: string }
}

const announcements: Announcement[] = [
  {
    id: 'nomadlayer',
    title: 'Nomad Layer',
    fullContent: 'Nomad Layer has officially launched and is building a remote-first tax residency and legal home base for digital nomads and globally mobile founders, operating on top of Próspera in Honduras.\n\nThe focus is on simplifying tax residency into a clear lump-sum framework that works without relocation, lifestyle disruption, or complex offshore structures. Over the past months, we\'ve completed the legal and regulatory groundwork to make residency setup fully remote and operational.\n\nWe\'re now onboarding early participants and engaging with aligned communities interested in practical jurisdictional infrastructure for network states and pop-up cities.',
    link: { url: 'https://nomadlayer.com/', text: 'Know more' },
  },
  {
    id: 'alphageo',
    title: 'AlphaGeo',
    fullContent: 'All Zuzalu hubs and nodes are welcome to use AlphaGeo to access its unique and proprietary predictive location analytics.\n\nThese can be used both "defensively" to understand the climate risk of your hub and plan adaptation measures – and also "offensively" to select the best locations for your next site or investment.\n\nUse this free trial link to get data for up to three locations: https://app.alphageo.ai/trial_setup\n\nFor any questions or to upgrade to a pro account for more location searches, contact: info@alphageo.ai',
    link: { url: 'https://app.alphageo.ai/trial_setup', text: 'Free trial' },
  },
]

function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s,)]+)/g
  const parts = text.split(urlRegex)
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#2d6b5d', wordBreak: 'break-all' }}>
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function AnnouncementsPage() {
  return (
    <>
      <Nav />
      <div className="announcements-page">
        <h1 className="announcements-heading">Announcements</h1>
        <div className="announcements-list">
          {announcements.map((a) => (
            <div key={a.id} className="announcement-card">
              <h2 className="announcement-title">{a.title}</h2>
              <div className="announcement-body">
                {a.fullContent.split('\n\n').map((para, i) => (
                  <p key={i}>
                    {para.split('\n').map((line, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {linkifyText(line)}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
              {a.link && (
                <div className="announcement-cta">
                  <a href={a.link.url} target="_blank" rel="noopener noreferrer" className="announcement-link">
                    {a.link.text}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .announcements-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }

        .announcements-heading {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 2rem 0;
        }

        .announcements-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .announcement-card {
          background: #fafaf9;
          border: 1px solid #e7e5e4;
          border-radius: 10px;
          padding: 1.5rem;
        }

        .announcement-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 1rem 0;
        }

        .announcement-body {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #44403c;
        }

        .announcement-body p {
          margin: 0 0 1rem;
        }

        .announcement-body p:last-child {
          margin-bottom: 0;
        }

        .announcement-cta {
          margin-top: 1.25rem;
        }

        .announcement-link {
          display: inline-block;
          padding: 0.625rem 1.25rem;
          background: #2d6b5d;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .announcement-link:hover {
          background: #245a4e;
          color: #faf6dc;
        }
      `}</style>
    </>
  )
}
