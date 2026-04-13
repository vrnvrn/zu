'use client'

import { useState } from 'react'
import PasswordGate from '@/components/PasswordGate'

interface Tweet {
  text: string
}

interface ThreadData {
  month: string
  url: string
  tweets: Tweet[]
}

const threads: ThreadData[] = [
  {
    month: 'January 2026',
    url: 'https://zuzone.org/january-2026',
    tweets: [
      {
        text: `The very first ZuZone newsletter is here!

January 2026 brings updates from across the Zuzalu ecosystem, 19 hubs and pop-up cities sharing what they're building, where they're headed, and how to get involved.

Let's dive in`,
      },
      {
        text: `Permanent hubs are putting down roots worldwide:

ZuBerlin is opening a coworking + cafe + health space in Kreuzberg this March

ZuGrama launched in Bangalore with coworking labs and a Grama OS passport system

ZuCity Japan is connecting global nomads to rural Japanese communities`,
      },
      {
        text: `Pop-up cities are back and bigger than ever:

Ipê Village in Florianopolis with AI, Privacy, and Onchain Hacker Houses

Zanzalu returns to Zanzibar (Jul-Aug) with new builder and creative residency tracks

Valley of the Commons heads to the Austrian Alps for four weeks of commons-based living`,
      },
      {
        text: `New experiments worth watching:

Edge City is evolving from serendipity container to startup catalyst, with 182+ projects already emerged

Invisible Garden runs an intense 3-week builder residency focused on security, privacy, and protocol design

muShanghai invites builders to experience China's shipping speed firsthand`,
      },
      {
        text: `Governance, longevity, and frontier cities:

ZuKas is building ZuGov, a governance system for 150+ residents in Turkey

Infinita Games kicks off with a longevity biomarker conference and governance summit

Viva.city is building a 16-floor vertical village in San Francisco`,
      },
      {
        text: `We also launched our first monthly crossword puzzle and a Community Open Asks section for cross-hub collaboration.

Plus a special congrats to Janine (Edge City), Audrey Tang (ShanHaiWoo), and Santi Cristobal (Crecimiento)!

Read it all: zuzone.org/january-2026`,
      },
    ],
  },
  {
    month: 'February 2026',
    url: 'https://zuzone.org/february-2026',
    tweets: [
      {
        text: `ZuZone February 2026 is live!

This month: a deep dive into d/acc builder tools, a new interactive Zuzalu 2026 map, the first crossword answers, and a sharp essay on the state of the ecosystem.

Here's what's inside`,
      },
      {
        text: `d/acc in Practice: meet Chris Mata (@protocolwhisper)

He's building EIP-8149, a new Ethereum precompile that makes batch KZG verification dramatically cheaper.

Why it matters: cheaper verification = more participants can independently verify data = stronger decentralization.`,
      },
      {
        text: `Burns writes on "Potentials, Pitfalls and Priorities in Zu2026"

The core message: Corposlop vs. the Sovereign Web. The more sovereignty we reclaim as individuals, the more autonomous we operate as a network.

"The tech is ready. Are we?"`,
      },
      {
        text: `New on the map: Amagi, a regenerative village in Thailand proving scalable community ownership models with real residents and operating businesses.

Want your popup city or village on the map? Reach out at hi@zuzone.org

Read February: zuzone.org/february-2026`,
      },
    ],
  },
  {
    month: 'March 2026',
    url: 'https://zuzone.org/march-2026',
    tweets: [
      {
        text: `ZuZone March 2026 just dropped!

This month's theme: Sanctuary needs more than technology. It needs a place.

Editor's Corner, builder spotlight, ecosystem poll, and our very first X Spaces recap. Let's go`,
      },
      {
        text: `Editor's Corner: "Building Sanctuary in Practice" by Yami

We have encrypted messaging, crypto, and local AI. What we lack are environments where these tools form the basic infrastructure of daily community life.

Permanent Hubs are where sanctuary becomes real.`,
      },
      {
        text: `The highlight quote:

"A physical place + a resilient digital environment = a sanctuary where people can live, build, and depend on one another."

From tools to systems, from systems to environments, from environments to reality.`,
      },
      {
        text: `d/acc in Practice: Privote by @0xlord_forever

Private, anti-collusion voting on-chain. Voters can silently change their vote after casting, making bribery economically irrational.

No wallet needed. A non-crypto user can cast a private vote in under a minute.`,
      },
      {
        text: `Burns on "The EF Mandate and Zuzalu"

Ethereum: unified digital form first, growing many branches.
Zuzalu: many physical forms first, allowing shared order to emerge.

"Uncapturing the individual and entrenching freedoms of association" is already a lived reality in Zuzalu.`,
      },
      {
        text: `ZuCity Japan launched its mobile app!

A "rural Japan promotion distribution app" with map exploration, room bookings, car rentals, and an on-chain bitmap calendar. All bookings for about four cents per transaction.

Come for a month. Stay for the lifestyle.`,
      },
      {
        text: `"Lessons in Permanence from Network School" by @vrneth

Key insight: permanent projects need extended pop-up residencies to seed population. It's a big decision to move somewhere. Let people try it first.

Every time vrn returned to NS, it was markedly better.`,
      },
      {
        text: `Our first X Spaces: "Roads to Devcon"

Co-hosted with @invisiblegardn, Valley of the Commons, and ProtoVille. The thread: touching grass at value-aligned spaces.

First of a recurring series. Follow @zuzones to catch future conversations.

Read March: zuzone.org/march-2026`,
      },
    ],
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      style={{
        padding: '4px 10px',
        fontSize: '0.75rem',
        background: copied ? '#2d6b5d' : '#e5e7eb',
        color: copied ? '#fff' : '#374151',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function CopyThreadButton({ tweets }: { tweets: Tweet[] }) {
  const [copied, setCopied] = useState(false)
  const fullThread = tweets.map((t, i) => `${i + 1}/${tweets.length}\n${t.text}`).join('\n\n---\n\n')
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(fullThread)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      style={{
        padding: '8px 16px',
        fontSize: '0.875rem',
        background: copied ? '#2d6b5d' : '#1a3d35',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {copied ? 'Thread Copied!' : 'Copy Entire Thread'}
    </button>
  )
}

function TwitterContent() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '2rem',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.25rem' }}>
          Twitter Threads
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Pre-written tweet threads for each newsletter edition. Copy individual tweets or the full thread.
        </p>

        {threads.map((thread) => (
          <div key={thread.month} style={{
            marginBottom: '2.5rem',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                  {thread.month}
                </h2>
                <a href={thread.url} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '0.75rem', color: '#2d6b5d', textDecoration: 'none',
                }}>
                  {thread.url}
                </a>
              </div>
              <CopyThreadButton tweets={thread.tweets} />
            </div>

            {thread.tweets.map((tweet, i) => (
              <div key={i} style={{
                padding: '1rem 1.25rem',
                borderBottom: i < thread.tweets.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#9ca3af',
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: '0.375rem',
                    }}>
                      {i + 1}/{thread.tweets.length}
                    </span>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: '#1f2937',
                      whiteSpace: 'pre-line',
                    }}>
                      {tweet.text}
                    </p>
                    <span style={{
                      fontSize: '0.7rem',
                      color: tweet.text.length > 280 ? '#dc2626' : '#9ca3af',
                      marginTop: '0.375rem',
                      display: 'block',
                    }}>
                      {tweet.text.length}/280
                    </span>
                  </div>
                  <CopyButton text={tweet.text} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminTwitterPage() {
  return (
    <PasswordGate password="zuzu032026" title="Twitter Threads">
      <TwitterContent />
    </PasswordGate>
  )
}
