'use client'

import Nav from '@/components/Nav'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Hub {
  id: string
  title: string
  date?: string
  fullContent: string
  link?: { url: string; text: string }
  links?: { url: string; text: string }[]
  image?: string
}

interface Card {
  id: string
  hubId: string
  title?: string
  subtitle?: string
  description?: string
  image?: string
  link?: { url: string; text: string }
  isIntro?: boolean
  isCrossword?: boolean
  isCongrats?: boolean
  isFiller?: boolean
  isPlaceholder?: boolean
  isDacc?: boolean
  isComingSoon?: boolean
  isExternalLink?: boolean
  externalUrl?: string
  isFadedImage?: boolean
}

const hubs: Record<string, Hub> = {
  intro: {
    id: 'intro',
    title: 'Zuzalu Newsletter — February 2026',
    fullContent: 'Welcome to the February 2026 edition of the Zuzalu community newsletter!\n\nThis edition is currently being compiled. Check back soon for updates from across our global network of pop-up cities, hubs, and communities.',
  },
  dacc: {
    id: 'dacc',
    title: 'd/acc in Practice',
    image: '/images/ChrisMata.jpeg',
    fullContent: `**Project Spotlight: Multi KZG Point Evaluation Precompile**

**The Build**

I'm building a new Ethereum precompile (EIP-8149) that makes it much more efficient to verify many KZG polynomial commitments at once. Right now, verifying each point (a KZG opening) from an EIP-4844 data blob costs a lot of gas because each has to be checked individually. This proposal adds a dedicated precompile that takes a blob commitment and a batch of point/value pairs and performs one cryptographic verification over all of them in a single call, lowering gas cost and overhead for workloads like fraud proofs or data availability checks that need multiple evaluation.

**Meet the Builder**

I'm Chris Mata (protocolwhisper) and IG builder - a mechanical and computer engineer with a passion for cryptography, automotive control theory, and distributed consensus systems. I love contributing to open-source infrastructure, crypto libraries, and consensus clients, and I've spent years building developer tooling that makes others' lives easier. What really drives me is creating technology that helps people and strengthens the systems they rely on.

**What This Defends Against (the d/acc angle)**

What threat does this mitigate?
It reduces the risk of invalid or manipulated data being accepted on-chain by making full verification of KZG openings cheap enough to do consistently when needed.

What vulnerability does this address?
It fixes the cost barrier that forces verification off-chain, where protocols become dependent on trusted actors or centralized services instead of trustless checks.

Why does this matter for resilience/sovereignty/privacy?
Cheaper, native batch verification strengthens decentralization and user sovereignty by enabling more participants to independently verify data. It improves network resilience under adversarial conditions and supports privacy preserving systems built on polynomial commitments, ensuring users can trust what's posted on-chain and prove the correctness of the data this depends on.`,
    link: { url: 'https://eips.ethereum.org/EIPS/eip-8149', text: 'View EIP-8149' },
  },
  placeholder: {
    id: 'placeholder',
    title: 'Coming Soon',
    fullContent: 'This card will be updated with hub news and updates.',
  },
  crossword: {
    id: 'crossword',
    title: 'February Crossword',
    fullContent: 'Test your knowledge of the Zuzalu ecosystem with this month\'s crossword puzzle!',
  },
  article: {
    id: 'article',
    title: 'Article',
    fullContent: 'Coming soon.',
  },
  stats: {
    id: 'stats',
    title: 'Ecosystem Stats',
    fullContent: 'Coming soon.',
  },
  forum: {
    id: 'forum',
    title: 'Zuzone Forum',
    fullContent: 'A community forum for the Zuzalu ecosystem. Coming soon.',
  },
}

const fadedImages = [
  '/newsletters/images/2026-01/Invisiblegarden.jpeg',
  '/newsletters/images/2026-01/edgecity.jpeg',
  '/newsletters/images/2026-01/infinita1.jpeg',
  '/newsletters/images/2026-01/zanzalu.jpeg',
  '/newsletters/images/2026-01/zuberlin.jpeg',
  '/newsletters/images/2026-01/zugrama1.jpeg',
  '/newsletters/images/2026-01/frontiertower.jpg',
  '/newsletters/images/2026-01/crecimento.png',
  '/newsletters/images/2026-01/muShanghai.jpg',
  '/newsletters/images/2026-01/shw.jpeg',
  '/newsletters/images/2026-01/infinita2.jpeg',
  '/newsletters/images/2026-01/zugrama2.jpeg',
  '/newsletters/images/2026-01/infinita3.jpeg',
  '/newsletters/images/2026-01/invisiblegarden1.jpeg',
  '/newsletters/images/2026-01/infinita4.jpeg',
  '/newsletters/images/2026-01/infinita5.jpeg',
]

const contentCards: Card[] = [
  // Row 1
  { id: 'intro', hubId: 'intro', title: 'Zuzalu Newsletter', subtitle: 'February 2026', isIntro: true },
  { id: 'dacc', hubId: 'dacc', title: 'd/acc in Practice', isDacc: true, image: '/images/ChrisMata.jpeg' },
  { id: 'crossword', hubId: 'crossword', title: 'February Crossword', isCrossword: true, image: '/images/feb26crossword.png' },
  // Row 2
  { id: 'article', hubId: 'article', title: 'Article', isComingSoon: true },
  { id: 'placeholder-center', hubId: 'placeholder', isPlaceholder: true },
  { id: 'forum', hubId: 'forum', title: 'Zuzone Forum', isComingSoon: true },
  // Row 3
  { id: 'twitter', hubId: 'placeholder', title: 'Follow our new X!', isExternalLink: true, externalUrl: 'https://x.com/zuzones' },
  { id: 'stats', hubId: 'stats', title: 'Ecosystem Stats', isComingSoon: true },
  { id: 'placeholder-9', hubId: 'placeholder', isPlaceholder: true },
]

const cards: Card[] = [
  // Row 1: 5 faded images (top border)
  { id: 'faded-0', hubId: 'placeholder', isFadedImage: true, image: fadedImages[0] },
  { id: 'faded-1', hubId: 'placeholder', isFadedImage: true, image: fadedImages[1] },
  { id: 'faded-2', hubId: 'placeholder', isFadedImage: true, image: fadedImages[2] },
  { id: 'faded-3', hubId: 'placeholder', isFadedImage: true, image: fadedImages[3] },
  { id: 'faded-4', hubId: 'placeholder', isFadedImage: true, image: fadedImages[4] },
  // Row 2: faded, 3 content, faded
  { id: 'faded-5', hubId: 'placeholder', isFadedImage: true, image: fadedImages[5] },
  ...contentCards.slice(0, 3),
  { id: 'faded-6', hubId: 'placeholder', isFadedImage: true, image: fadedImages[6] },
  // Row 3: faded, 3 content, faded
  { id: 'faded-7', hubId: 'placeholder', isFadedImage: true, image: fadedImages[7] },
  ...contentCards.slice(3, 6),
  { id: 'faded-8', hubId: 'placeholder', isFadedImage: true, image: fadedImages[8] },
  // Row 4: faded, 3 content, faded
  { id: 'faded-9', hubId: 'placeholder', isFadedImage: true, image: fadedImages[9] },
  ...contentCards.slice(6, 9),
  { id: 'faded-10', hubId: 'placeholder', isFadedImage: true, image: fadedImages[10] },
  // Row 5: 5 faded images (bottom border)
  { id: 'faded-11', hubId: 'placeholder', isFadedImage: true, image: fadedImages[11] },
  { id: 'faded-12', hubId: 'placeholder', isFadedImage: true, image: fadedImages[12] },
  { id: 'faded-13', hubId: 'placeholder', isFadedImage: true, image: fadedImages[13] },
  { id: 'faded-14', hubId: 'placeholder', isFadedImage: true, image: fadedImages[14] },
  { id: 'faded-15', hubId: 'placeholder', isFadedImage: true, image: fadedImages[15] },
]

// Scrapbook positions for each card (25 total)
const cardPositions = [
  // Row 1: top faded images
  { top: '0vw', left: '2vw', rotate: -4, width: '18vw', zIndex: 1 },
  { top: '1vw', left: '18vw', rotate: 3, width: '17vw', zIndex: 2 },
  { top: '-1vw', left: '34vw', rotate: -2, width: '19vw', zIndex: 1 },
  { top: '2vw', left: '52vw', rotate: 4, width: '16vw', zIndex: 2 },
  { top: '0vw', left: '68vw', rotate: -3, width: '18vw', zIndex: 1 },
  // Row 2: faded, intro, dacc, crossword, faded
  { top: '14vw', left: '-1vw', rotate: 5, width: '16vw', zIndex: 2 },
  { top: '12vw', left: '14vw', rotate: -2, width: '22vw', zIndex: 10 },
  { top: '13vw', left: '35vw', rotate: 3, width: '20vw', zIndex: 11 },
  { top: '11vw', left: '54vw', rotate: -4, width: '21vw', zIndex: 10 },
  { top: '15vw', left: '74vw', rotate: 2, width: '15vw', zIndex: 2 },
  // Row 3: faded, article, placeholder, forum, faded
  { top: '28vw', left: '1vw', rotate: -3, width: '15vw', zIndex: 3 },
  { top: '26vw', left: '15vw', rotate: 4, width: '20vw', zIndex: 12 },
  { top: '27vw', left: '36vw', rotate: -1, width: '18vw', zIndex: 9 },
  { top: '25vw', left: '53vw', rotate: 3, width: '21vw', zIndex: 12 },
  { top: '29vw', left: '73vw', rotate: -5, width: '16vw', zIndex: 3 },
  // Row 4: faded, twitter, stats, placeholder, faded
  { top: '41vw', left: '0vw', rotate: 4, width: '17vw', zIndex: 2 },
  { top: '39vw', left: '16vw', rotate: -3, width: '19vw', zIndex: 11 },
  { top: '40vw', left: '34vw', rotate: 2, width: '21vw', zIndex: 10 },
  { top: '38vw', left: '54vw', rotate: -4, width: '18vw', zIndex: 9 },
  { top: '42vw', left: '72vw', rotate: 3, width: '17vw', zIndex: 2 },
  // Row 5: bottom faded images
  { top: '54vw', left: '3vw', rotate: -2, width: '16vw', zIndex: 1 },
  { top: '55vw', left: '19vw', rotate: 5, width: '18vw', zIndex: 2 },
  { top: '53vw', left: '36vw', rotate: -3, width: '17vw', zIndex: 1 },
  { top: '56vw', left: '53vw', rotate: 2, width: '19vw', zIndex: 2 },
  { top: '54vw', left: '70vw', rotate: -4, width: '18vw', zIndex: 1 },
]

const popupCities = [
  { name: 'ETH Chiang Mai', date: 'Dec 8 – Feb 3', url: 'https://www.ethchiangmai.com/' },
  { name: 'Infinita City', date: 'Feb 1 – Mar 31', url: 'https://infinita.city/' },
  { name: 'ZuCity Japan', date: 'Mar 1 – 30', url: 'https://zucity.org/' },
  { name: 'Ipê Village', date: 'Apr 6 – May 1', url: 'https://ipe.city/' },
  { name: 'Ârc Montenegro', date: 'Apr 3 – May 29', url: 'https://luma.com/montenegro' },
  { name: 'ZuAfrique', date: 'Apr 12 – May 3', url: 'https://zuafrique.com/' },
  { name: 'ZuKas Turkey', date: 'Apr 10 – May 10', url: 'https://zukas.city/' },
  { name: 'muShanghai', date: 'May 10th – June 06', url: 'https://www.mushanghai.xyz/' },
  { name: 'Edge Esmeralda', date: 'May 30 – Jun 27', url: 'https://www.edgecity.live/' },
  { name: 'Zanzalu', date: 'Jul 25 – Aug 14', url: 'https://zanzalu.org/' },
  { name: 'Valley of the Commons', date: 'Aug 24 – Sep 20', url: 'https://www.valleyofthecommons.com/' },
  { name: 'ShanHaiWoo', date: 'H2 2026', url: 'https://www.shanhaiwoo.com/' },
  { name: 'Invisible Garden', date: 'October', url: 'https://invisible.garden/' },
  { name: 'Edge City India', date: 'Q4', url: 'https://www.edgecity.live/' },
  { name: 'ZuGrama India', date: 'From Feb 2026', url: 'https://zugrama.org/' },
]

function formatText(text: string) {
  const boldRegex = /\*\*(.+?)\*\*/g
  const urlRegex = /(https?:\/\/[^\s,)]+)/g
  
  const parts = text.split(boldRegex)
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} style={{ display: 'block', fontSize: '1.0625rem', marginBottom: '0.25rem', color: '#1c1917' }}>{part}</strong>
    }
    const urlParts = part.split(urlRegex)
    return urlParts.map((urlPart, j) =>
      urlRegex.test(urlPart) ? (
        <a key={`${i}-${j}`} href={urlPart} target="_blank" rel="noopener noreferrer" style={{ color: '#2d6b5d', wordBreak: 'break-all' }}>
          {urlPart}
        </a>
      ) : (
        <span key={`${i}-${j}`}>{urlPart}</span>
      )
    )
  })
}

export default function February2026Page() {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem('feb2026_unlocked')
    if (saved === 'true') {
      setIsUnlocked(true)
    }
    setIsLoading(false)
  }, [])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      
      if (data.valid) {
        setIsUnlocked(true)
        sessionStorage.setItem('feb2026_unlocked', 'true')
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Error verifying password')
    }
  }

  const handleCardClick = (card: Card) => {
    if (card.isPlaceholder || card.isCrossword || card.isComingSoon) {
      return
    }
    setSelectedHub(hubs[card.hubId])
  }

  const closeModal = () => {
    setSelectedHub(null)
  }

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="password-gate">
          <div className="password-box">
            <p>Loading...</p>
          </div>
        </div>
        <style jsx>{`
          .password-gate {
            min-height: calc(100vh - 60px);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafaf9;
          }
          .password-box {
            text-align: center;
            color: #44403c;
          }
        `}</style>
      </>
    )
  }

  if (!isUnlocked) {
    return (
      <>
        <Nav />
        <div className="password-gate">
          <div className="password-box">
            <h2>February 2026 Newsletter</h2>
            <p>This newsletter is password protected.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
              />
              <button type="submit">Enter</button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
        <style jsx>{`
          .password-gate {
            min-height: calc(100vh - 60px);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafaf9;
          }
          .password-box {
            background: white;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 90%;
          }
          .password-box h2 {
            margin: 0 0 0.5rem;
            color: #1c1917;
            font-size: 1.5rem;
          }
          .password-box p {
            margin: 0 0 1.5rem;
            color: #6b7280;
            font-size: 0.9375rem;
          }
          .password-box form {
            display: flex;
            gap: 0.5rem;
          }
          .password-box input {
            flex: 1;
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.15s;
          }
          .password-box input:focus {
            border-color: #2d6b5d;
          }
          .password-box button {
            padding: 0.75rem 1.5rem;
            background: #2d6b5d;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.15s;
          }
          .password-box button:hover {
            background: #1a4a40;
          }
          .error {
            color: #dc2626;
            margin: 1rem 0 0;
            font-size: 0.875rem;
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="in-progress-banner">
        <span className="in-progress-icon">🚧</span>
        IN PROGRESS
        <span className="in-progress-icon">🚧</span>
      </div>
      <div className="newsletter-fullpage">
        <div className="scrapbook-container">
          {cards.map((card, index) => {
            const hub = hubs[card.hubId]
            const title = card.title || hub?.title
            const subtitle = card.subtitle || hub?.date?.replace(/,?\s*\d{4}/g, '').toUpperCase()
            const pos = cardPositions[index] || { top: '0', left: '0', rotate: 0, width: '18vw', zIndex: 1 }
            const posStyle = {
              position: 'absolute' as const,
              top: pos.top,
              left: pos.left,
              width: pos.width,
              transform: `rotate(${pos.rotate}deg)`,
              zIndex: pos.zIndex,
            }

            if (card.isCrossword) {
              return (
                <Link
                  key={card.id}
                  href="/crossword"
                  className="card crossword has-image scrapbook-card"
                  style={posStyle}
                >
                  <Image className="card-image" src={card.image!} alt={title} fill sizes="25vw" />
                  <div className="card-content overlay">
                    <h3 className="card-title">{title}</h3>
                  </div>
                  <div className="tape tape-top" />
                </Link>
              )
            }

            if (card.isComingSoon) {
              return (
                <div key={card.id} className="card coming-soon scrapbook-card" style={posStyle}>
                  <div className="card-content coming-soon-content">
                    <p className="coming-soon-label">Coming Soon</p>
                    <h3 className="coming-soon-title">{title}</h3>
                  </div>
                  <div className="tape tape-top" />
                </div>
              )
            }

            if (card.isExternalLink && card.externalUrl) {
              return (
                <a
                  key={card.id}
                  href={card.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card external-link scrapbook-card"
                  style={posStyle}
                >
                  <div className="card-content external-link-content">
                    <h3 className="external-link-title">{title}</h3>
                  </div>
                  <div className="tape tape-top" />
                </a>
              )
            }

            if (card.isFadedImage && card.image) {
              return (
                <div key={card.id} className="card faded-image scrapbook-card" style={posStyle}>
                  <Image className="card-image" src={card.image} alt="" fill sizes="25vw" />
                  <div className="tape tape-corner" />
                </div>
              )
            }

            return (
              <div
                key={card.id}
                className={`card scrapbook-card ${card.isIntro ? 'intro' : ''} ${card.isCongrats ? 'congrats' : ''} ${card.image && !card.isDacc ? 'has-image' : ''} ${card.isFiller ? 'filler' : ''} ${card.isPlaceholder ? 'placeholder' : ''} ${card.isDacc ? 'dacc' : ''}`}
                style={posStyle}
                onClick={() => handleCardClick(card)}
              >
                {card.image && !card.isDacc && (
                  <Image className="card-image" src={card.image} alt={card.isFiller ? '' : title} fill sizes="25vw" />
                )}
                {card.isDacc && (
                  <div className="card-content dacc-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="dacc-spotlight">Project Spotlight: Multi KZG Point Evaluation Precompile</p>
                    <div className="dacc-image-wrapper">
                      <Image src={card.image!} alt="Chris Mata" width={70} height={70} className="dacc-avatar" />
                    </div>
                  </div>
                )}
                {!card.isFiller && !card.isPlaceholder && !card.isDacc && (
                  <div className={`card-content ${card.image ? 'overlay' : ''}`}>
                    <h3 className="card-title">{title}</h3>
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                  </div>
                )}
                {card.isPlaceholder && (
                  <div className="card-content placeholder-content">
                    {card.title ? (
                      <h3 className="placeholder-title">{card.title}</h3>
                    ) : (
                      <div className="placeholder-icon">+</div>
                    )}
                  </div>
                )}
                <div className="tape tape-top" />
              </div>
            )
          })}
        </div>

        <div className="popup-cities-bar">
          <h3 className="popup-cities-title">2026 Pop-up Cities</h3>
          <div className="popup-cities-list">
            {popupCities.map((city) => (
              <a key={city.name} href={city.url} target="_blank" rel="noopener noreferrer" className="popup-city">
                <strong>{city.name}</strong> {city.date}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedHub && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">{selectedHub.title}</h2>
            {selectedHub.date && <p className="modal-date">{selectedHub.date}</p>}
            <div className="modal-body">
              {selectedHub.fullContent.split('\n\n').map((para, i) => {
                const isMeetBuilder = para.includes('**Meet the Builder**')
                return (
                  <div key={i}>
                    {isMeetBuilder && selectedHub.image && (
                      <div className="modal-builder-image">
                        <Image src={selectedHub.image} alt="" width={100} height={100} className="builder-avatar" />
                      </div>
                    )}
                    <p>
                      {para.split('\n').map((line, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {formatText(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                )
              })}
            </div>
            {(selectedHub.link || selectedHub.links) && (
              <div className="modal-links">
                {selectedHub.link && (
                  <a href={selectedHub.link.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                    {selectedHub.link.text}
                  </a>
                )}
                {selectedHub.links?.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                    {l.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .in-progress-banner {
          background: linear-gradient(90deg, #f59e0b 0%, #eab308 50%, #f59e0b 100%);
          color: #1c1917;
          padding: 0.75rem 0;
          text-align: center;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .in-progress-icon {
          font-size: 1rem;
        }

        .newsletter-fullpage {
          padding: 0;
          margin: 0;
          background: #fafaf9;
        }

        .scrapbook-container {
          position: relative;
          width: 100%;
          height: 75vw;
          min-height: 600px;
          overflow: visible;
        }

        .scrapbook-card {
          box-shadow: 3px 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, z-index 0.2s ease, box-shadow 0.2s ease;
        }

        .scrapbook-card:hover {
          z-index: 100 !important;
          box-shadow: 5px 8px 20px rgba(0,0,0,0.25);
        }

        .tape {
          position: absolute;
          background: rgba(255, 248, 220, 0.7);
          pointer-events: none;
        }

        .tape-top {
          top: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          width: 50px;
          height: 18px;
          border-radius: 2px;
        }

        .tape-corner {
          top: -5px;
          right: -5px;
          width: 35px;
          height: 15px;
          transform: rotate(45deg);
          border-radius: 2px;
        }

        .card {
          background: #fafaf9;
          padding: 1rem;
          aspect-ratio: 1;
          cursor: pointer;
          transition: background 0.15s;
          display: flex;
          flex-direction: column;
          min-height: 140px;
          position: relative;
          overflow: hidden;
          margin: 0;
          border: none;
          box-sizing: border-box;
        }

        .card:hover {
          background: #f5f5f4;
        }

        .card.has-image {
          padding: 0;
          min-height: 160px;
        }

        .card.has-image:hover {
          background: transparent;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-content.overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%);
          padding: 1rem;
          justify-content: flex-end;
          height: 100%;
        }

        .card-content.overlay .card-title,
        .card-content.overlay .card-subtitle {
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .card-subtitle {
          font-size: 0.6875rem;
          color: #2d6b5d;
          margin: 0 0 0.375rem 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .card.intro {
          background: #1c1917;
        }

        .card.intro:hover {
          background: #292524;
        }

        .card.intro .card-title {
          color: white;
          font-size: 1.5rem;
          margin-bottom: 0.125rem;
        }

        .card.intro .card-subtitle {
          color: #c8f4e7;
          font-size: 1rem;
          text-transform: none;
          font-weight: 400;
        }

        .card.dacc {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 1rem;
        }

        .card.dacc:hover {
          background: linear-gradient(135deg, #1f1f3a 0%, #1a2744 100%);
        }

        .dacc-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          text-align: center;
          gap: 0.5rem;
          padding-top: 0.75rem;
        }

        .dacc-spotlight {
          font-size: 0.625rem;
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.4;
          max-width: 90%;
        }

        .dacc-image-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #4ade80;
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
        }

        .dacc-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card.dacc .card-title {
          color: #4ade80;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .card.placeholder {
          background: #f5f5f4;
          border: 2px dashed #d6d3d1;
          cursor: default;
        }

        .card.placeholder:hover {
          background: #f5f5f4;
        }

        .card.crossword {
          background: #1a4a40;
          text-decoration: none;
        }

        .card.crossword:hover {
          background: #153832;
        }

        .card.crossword .card-title {
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .card.coming-soon {
          background: #1a4a40;
          cursor: default;
        }

        .coming-soon-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          gap: 0.5rem;
        }

        .coming-soon-label {
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        .coming-soon-title {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .card.external-link {
          background: #1c1917;
          text-decoration: none;
        }

        .card.external-link:hover {
          background: #292524;
        }

        .external-link-content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
        }

        .external-link-title {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .placeholder-content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .placeholder-icon {
          font-size: 2rem;
          color: #d6d3d1;
          font-weight: 300;
        }

        .placeholder-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #a8a29e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .card.faded-image {
          padding: 0;
          cursor: default;
          overflow: hidden;
          border-radius: 4px;
        }

        .card.faded-image:hover {
          background: transparent;
        }

        .card.faded-image .card-image {
          opacity: 0.85;
          filter: grayscale(10%) saturate(0.9);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          perspective: 1000px;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes twistIn {
          0% {
            opacity: 0;
            transform: rotateY(-90deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: rotateY(10deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
          }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: twistIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.1);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: rgba(0,0,0,0.2);
        }

        .modal-image {
          width: 100%;
          max-height: 300px;
          object-fit: contain;
          border-radius: 12px 12px 0 0;
          background: #f5f5f4;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 1.5rem 1.5rem 0.5rem;
          color: #1c1917;
        }

        .modal-date {
          font-size: 0.875rem;
          color: #2d6b5d;
          margin: 0 1.5rem 1rem;
          font-weight: 600;
        }

        .modal-body {
          padding: 0 1.5rem 1.5rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #44403c;
        }

        .modal-body p {
          margin: 0 0 1rem;
        }

        .modal-builder-image {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .builder-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #2d6b5d;
        }

        .modal-links {
          display: flex;
          gap: 0.75rem;
          padding: 0 1.5rem 1.5rem;
          flex-wrap: wrap;
        }

        .modal-link {
          display: inline-block;
          padding: 0.75rem 1.25rem;
          background: #2d6b5d;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .modal-link:hover {
          background: #2d6b5d;
          color: #faf6dc;
        }

        .popup-cities-bar {
          background: #e8f5f1;
          padding: 1.5rem 2rem;
          margin: 0;
        }

        .popup-cities-title {
          color: #2d6b5d;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }

        .popup-cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 2rem;
        }

        .popup-city {
          font-size: 0.8125rem;
          color: #6b8a82;
          text-decoration: none;
          transition: color 0.15s;
        }

        .popup-city:hover {
          color: #1a4a40;
        }

        .popup-city strong {
          color: #1a4a40;
          font-weight: 600;
        }

        .popup-city:hover strong {
          color: #2d6b5d;
        }

        @media (max-width: 768px) {
          .scrapbook-container {
            height: 120vw;
          }
          
          .scrapbook-card {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 500px) {
          .scrapbook-container {
            height: 160vw;
          }
        }
      `}</style>
    </>
  )
}
