'use client'

import Nav from '@/components/Nav'
import { useState } from 'react'
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
  isFullImage?: boolean
  isBgImage?: boolean
  isCenterText?: boolean
}

const hubs: Record<string, Hub> = {
  intro: {
    id: 'intro',
    title: 'Zuzone — February 2026',
    fullContent: 'Welcome to the February 2026 edition of the Zuzone community newsletter! \n\nThen what is ZuZone actually? The simplest answer: it\'s the space where we try to make this sustainable. \n\nThank you, everyone, for the care you bring to this ecosystem. \nWishing you a March full of good builds and conversations.',
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
  map: {
    id: 'map',
    title: 'Zuzalu 2026 Map',
    image: '/images/zumap-2026.svg',
    fullContent: 'Explore the global network of Zuzalu hubs and pop-up cities for 2026.',
  },
  placeholder: {
    id: 'placeholder',
    title: 'Coming Soon',
    fullContent: 'This card will be updated with hub news and updates.',
  },
  addcity: {
    id: 'addcity',
    title: 'Add Your Popup City or Village',
    fullContent: 'Have a popup city or village you want to add to the Zuzone map? Want to introduce a new village to the community? Reach out to us at hi@zuzone.org',
  },
  crossword: {
    id: 'crossword',
    title: 'February Crossword',
    fullContent: 'Test your knowledge of the Zuzalu ecosystem with this month\'s crossword puzzle!',
  },
  amagi: {
    id: 'amagi',
    title: 'Introducing New Villages',
    fullContent: `Introducing Amagi - a regenerative village in Thailand that's become a proof-of-concept for scalable community ownership models. Six months in, we have residents living here, businesses operating, and other villages wanting to replicate our shared equity approach.

Learn more: https://amagi.life/

Contact @oferrotem on TG for more details.`,
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
    title: 'Winners of Crossword',
    fullContent: 'Winners of the crossword puzzle will be announced in the next monthly newsletter! Stay tuned.',
  },
  burns: {
    id: 'burns',
    title: 'On Potentials, Pitfalls and Priorities in Zu2026',
    fullContent: `Three years ago, Zuzalu started. In these last 3 years, the technological and geopolitical landscape shifted dramatically. Our dependencies on centralized platforms and closed-source tools and our vulnerability to surveillance and censorship became too evident to ignore. Individual empowerment through AI utilization became a mainstream reality, FOSS alternatives are widely available, and the quest for privacy and self-sovereignty became a new frontier in Web3. In short – both the centralized and the decentralized world got updated, and it is on all of us to embrace the new realities. Individually and collectively.

Zuzalu evolved as well – both as a movement and in many specific instances, altogether rather broad-brush than in-depth. Pop-ups became means towards permanent bases, and the movement withstood getting captured or platformed successfully. Aside of cypherpunk values and techno-optimism, Zuzalu itself remained free of ideology despite encompassing many clearly positioned directions. How can we defend these achievements in 2026, along the in-depth evolution, which will be a necessity to keep up with the new realities?

A broad term that Vitalik recently coined is called "Corposlop", which describes a toxic mix of coordinated power-optimization, risk-averse homogeneity, user disempowerment, cognitive infantilization, needless surveillance, and virtue-signaling. The counter-model to the "Corposlop Web" it is the "Sovereign Web", which orients itself towards empowering the individual user. These terms are not limited to the digital realm – there are many equivalents in the cognitive, physical and social dimensions. Imo, these are the fitting concepts to model the potentials and pitfalls for Zuzalu in 2026. The more sovereignty we can reclaim as individuals, the more autonomous will we be able to operate as a network. The more we collectively work towards individual empowerment, the more will we see individuals able and willing to join these collective efforts. Corposlop tends to happen on its own, if we do not proactively work against it – which is not at all limited to corporations but can equally happen from within any organization or group. If we let it happen, it will happen – if we do not prioritize identifying it, we might already be emersed in it without our awareness.

It happened within Zuzalu as well, on many occasions – potentially out of economic or pragmatic necessity, or the lack of better alternatives. In 2026, it seems both feasible and necessary for Zuzalu to get to a state where there are no such excuses left. The times of attempting to platform each other, selling vibe as substance, governance theatre instead of functional guarantees, ideological capture and legitimacy-gaming need to come to an end – or we might deteriorate into a part of the centralized problem.

The tech is ready, available as FOSS or ready to be built with less effort than ever. Are we ready as well? Our means to hold each other accountable towards high standards and integrity are more accessible and larger than ever. Now, it takes a collective effort of individual agency towards awareness and responsibility. If we can manage to achieve that in 2026, just imagine how Zuzalu can evolve in 2027: Scaling tools, not empires.

Reach out to me if you have any comments.`,
    links: [
      { url: 'mailto:0xburns@proton.me', text: '0xburns@proton.me' },
      { url: 'https://x.com/privacyburns', text: '@privacyburns' },
      { url: 'https://warpcast.com/burns', text: '@burns' },
    ],
  },
}

const contentCards: Card[] = [
  // Row 1
  { id: 'intro', hubId: 'intro', title: 'Zuzone', subtitle: 'February 2026', isIntro: true },
  { id: 'dacc', hubId: 'dacc', title: 'd/acc in Practice', isDacc: true, image: '/images/ChrisMata.jpeg' },
  { id: 'crossword', hubId: 'crossword', title: 'February Crossword', isCrossword: true, image: '/images/feb26crossword.png' },
  // Row 2
  { id: 'burns', hubId: 'burns', title: 'On Potentials, Pitfalls and Priorities in Zu2026', subtitle: 'by Burns', isCenterText: true },
  { id: 'placeholder-center', hubId: 'map', title: '2026 Map', image: '/images/zumap-2026.svg', isFullImage: true },
  { id: 'forum', hubId: 'forum', title: 'Winners of Crossword', subtitle: 'Announced next month' },
  // Row 3
  { id: 'twitter', hubId: 'placeholder', title: 'Follow our new X!', isExternalLink: true, externalUrl: 'https://x.com/zuzones' },
  { id: 'amagi', hubId: 'amagi', title: 'Introducing New Villages', image: '/images/amagilife.jpeg', isBgImage: true },
  { id: 'addcity', hubId: 'addcity', title: 'Add Your Popup City or Village', subtitle: 'Email: hi@zuzone.org', isExternalLink: true, externalUrl: 'mailto:hi@zuzone.org?subject=Add%20my%20popup%20city%20to%20the%20map' },
]

// Just the 9 content cards in a 3x3 layout
const cards: Card[] = [...contentCards]

// Scrapbook positions - 9 cards in centered grid
const cardPositions = [
  // Row 1
  { top: '2%', left: '2%', rotate: -2, width: '28%', height: '28%', zIndex: 10 },
  { top: '0%', left: '32%', rotate: 3, width: '32%', height: '28%', zIndex: 11 },
  { top: '2%', left: '66%', rotate: -1, width: '30%', height: '28%', zIndex: 10 },
  // Row 2
  { top: '32%', left: '2%', rotate: 2, width: '26%', height: '28%', zIndex: 12 },
  { top: '30%', left: '30%', rotate: -1, width: '38%', height: '30%', zIndex: 13 },
  { top: '32%', left: '70%', rotate: 1, width: '26%', height: '28%', zIndex: 12 },
  // Row 3
  { top: '62%', left: '2%', rotate: -2, width: '26%', height: '28%', zIndex: 11 },
  { top: '62%', left: '30%', rotate: 1, width: '28%', height: '28%', zIndex: 10 },
  { top: '62%', left: '60%', rotate: -1, width: '36%', height: '28%', zIndex: 11 },
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleCardClick = (card: Card) => {
    if (card.isPlaceholder || card.isCrossword || card.isComingSoon) {
      return
    }
    if (card.image && (card.isFadedImage || card.isFullImage)) {
      setSelectedImage(card.image)
      return
    }
    setSelectedHub(hubs[card.hubId])
  }

  const closeModal = () => {
    setSelectedHub(null)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <Nav />
      <div className="newsletter-fullpage">
        <div className="page-bg" />
        <div className="scrapbook-container" style={{ position: 'relative', zIndex: 1 }}>
          {cards.map((card, index) => {
            const hub = hubs[card.hubId]
            const title = card.title || hub?.title
            const subtitle = card.subtitle || hub?.date?.replace(/,?\s*\d{4}/g, '').toUpperCase()
            const pos = cardPositions[index] || { top: '0', left: '0', rotate: 0, width: '18vw', zIndex: 1 }
            const posStyle: React.CSSProperties = {
              position: 'absolute' as const,
              top: pos.top,
              left: pos.left,
              width: pos.width,
              transform: `rotate(${pos.rotate}deg)`,
              zIndex: pos.zIndex,
            }
            if (pos.height) {
              posStyle.height = pos.height
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
                </a>
              )
            }

            if (card.isFadedImage && card.image) {
              return (
                <div 
                  key={card.id} 
                  className="card faded-image scrapbook-card clickable" 
                  style={posStyle}
                  onClick={() => handleCardClick(card)}
                >
                  <Image className="card-image" src={card.image} alt={title || ''} fill sizes="25vw" />
                  <div className="image-overlay">
                    <span className="image-title">{title}</span>
                    <a 
                      href="mailto:hi@zuzone.org?subject=Add%20our%20popup%20city%20to%20the%20map" 
                      className="map-cta-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      + Add your popup city
                    </a>
                    <span className="map-cta-subtext">Reach out to us at hi@zuzone.org</span>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={card.id}
                className={`card scrapbook-card ${card.isIntro ? 'intro' : ''} ${card.isCongrats ? 'congrats' : ''} ${card.image && !card.isDacc ? 'has-image' : ''} ${card.isFiller ? 'filler' : ''} ${card.isPlaceholder ? 'placeholder' : ''} ${card.isDacc ? 'dacc' : ''} ${card.isFullImage ? 'full-image' : ''} ${card.isBgImage ? 'bg-image' : ''}`}
                style={posStyle}
                onClick={() => handleCardClick(card)}
              >
                {card.image && !card.isDacc && !card.isBgImage && (
                  <Image className="card-image" src={card.image} alt={card.isFiller ? '' : title} fill sizes="25vw" />
                )}
                {card.isBgImage && card.image && (
                  <Image className="card-bg-image" src={card.image} alt="" fill sizes="25vw" />
                )}
                {card.isDacc && (
                  <div className="card-content dacc-content">
                    <div className="dacc-header">
                      <h3 className="card-title">{title}</h3>
                      <span className="dacc-subtitle">Project Spotlight: Multi KZG Point Evaluation Precompile</span>
                    </div>
                  </div>
                )}
                {!card.isFiller && !card.isPlaceholder && !card.isDacc && (
                  <div className={`card-content ${(card.image || card.isBgImage) ? 'overlay' : ''} ${card.isCenterText ? 'center-text' : ''}`}>
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
          <div className={`modal-content ${selectedHub.image && !selectedHub.fullContent.includes('**') ? 'has-bg-image' : ''}`} onClick={(e) => e.stopPropagation()}>
            {selectedHub.image && !selectedHub.fullContent.includes('**') && (
              <Image src={selectedHub.image} alt="" fill className="modal-bg-image" />
            )}
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

      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <button className="image-modal-close" onClick={closeImageModal}>×</button>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Zuzalu 2026 Map" 
              width={1200} 
              height={800}
              className="zoomable-image"
              priority
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .newsletter-fullpage {
          padding: 0;
          margin: 0;
          min-height: 100vh;
          width: 100%;
          background: #fafaf9;
          position: relative;
        }
        
        .page-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/newsletters/images/2026-01-grid-collage.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(10px) brightness(0.35);
          z-index: 0;
        }

        .scrapbook-container {
          position: relative;
          width: 100%;
          height: calc(100vh - 120px);
          min-height: 600px;
          max-height: 900px;
          max-width: 1100px;
          margin: 0 auto;
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
          padding: 0.75rem;
          height: 28%;
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

        .card.full-image {
          padding: 0;
          background: #f5f5f4;
          aspect-ratio: 3 / 2;
          height: auto;
        }

        .card.full-image .card-image {
          object-fit: contain;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .card.bg-image {
          padding: 0;
        }

        .card.bg-image .card-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .card.bg-image .card-content.overlay {
          position: relative;
          z-index: 1;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
          justify-content: flex-end;
          height: 100%;
          padding: 1rem;
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
          font-size: 1.125rem;
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

        .card-content.center-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
        }

        .card-content.center-text .card-title {
          text-align: center;
          font-size: 1.1rem;
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
          background: #1a4a40;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card.dacc:hover {
          background: #153832;
        }

        .dacc-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
          gap: 0.5rem;
        }

        .dacc-badge {
          display: inline-block;
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #c8f4e7;
          background: rgba(255,255,255,0.15);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.25rem;
        }

        .dacc-subtitle {
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.4;
        }

        .card.dacc .card-title {
          color: white;
          font-size: 0.9375rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
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

        .card.faded-image.clickable {
          cursor: pointer;
        }

        .card.faded-image.clickable:hover {
          background: transparent;
          box-shadow: 5px 8px 25px rgba(0,0,0,0.3);
        }

        .card.faded-image .card-image {
          opacity: 0.85;
          filter: grayscale(10%) saturate(0.9);
        }

        .card.faded-image.clickable .card-image {
          opacity: 1;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .image-title {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .map-cta-btn {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: #2d6b5d;
          color: white;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          text-decoration: none;
          transition: background 0.15s;
        }

        .map-cta-btn:hover {
          background: #1a4a40;
        }

        .map-cta-subtext {
          color: rgba(255,255,255,0.7);
          font-size: 0.625rem;
          margin-top: 0.25rem;
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

        .modal-content.has-bg-image {
          background: transparent;
          box-shadow: none;
          max-width: 800px;
          padding: 0;
        }

        .modal-content.has-bg-image .modal-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          z-index: 0;
        }

        .modal-content.has-bg-image .modal-title,
        .modal-content.has-bg-image .modal-date,
        .modal-content.has-bg-image .modal-body,
        .modal-content.has-bg-image .modal-links {
          position: relative;
          z-index: 1;
        }

        .modal-content.has-bg-image .modal-title {
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          margin-top: 2rem;
        }

        .modal-content.has-bg-image .modal-date {
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .modal-content.has-bg-image .modal-body {
          background: rgba(0,0,0,0.6);
          margin: 1rem;
          padding: 1.5rem;
          border-radius: 8px;
          color: white;
        }

        .modal-content.has-bg-image .modal-body p {
          color: rgba(255,255,255,0.95);
        }

        .modal-content.has-bg-image .modal-close {
          background: rgba(255,255,255,0.2);
          color: white;
          z-index: 2;
        }

        .modal-content.has-bg-image .modal-close:hover {
          background: rgba(255,255,255,0.3);
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

        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }

        .image-modal-content {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .zoomable-image {
          max-width: 100%;
          max-height: calc(100vh - 4rem);
          object-fit: contain;
          border-radius: 8px;
          transition: transform 0.2s ease;
          cursor: zoom-in;
        }

        .zoomable-image:hover {
          transform: scale(1.5);
        }

        .image-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2001;
        }

        .image-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .popup-cities-bar {
          background: #e8f5f1;
          padding: 1.5rem 2rem;
          margin: 0;
        }

        .popup-cities-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .popup-cities-title {
          color: #2d6b5d;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        .map-cta {
          font-size: 0.8125rem;
          color: #2d6b5d;
          font-weight: 600;
          text-decoration: none;
          padding: 0.375rem 0.75rem;
          background: rgba(45, 107, 93, 0.1);
          border-radius: 4px;
          border: 1px solid #2d6b5d;
          transition: all 0.15s;
        }

        .map-cta:hover {
          background: #2d6b5d;
          color: white;
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
            height: auto;
            min-height: 80vh;
            max-height: none;
          }
          
          .scrapbook-card {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 500px) {
          .scrapbook-container {
            min-height: 100vh;
          }
          
          .scrapbook-card {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  )
}
