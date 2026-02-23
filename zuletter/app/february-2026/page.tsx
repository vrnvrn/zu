'use client'

import Nav from '@/components/Nav'
import { useState } from 'react'
import Image from 'next/image'

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
    fullContent: `1. Project Spotlight: Multi KZG Point Evaluation Precompile

2. The Build:

I'm building a new Ethereum precompile (EIP-8149) that makes it much more efficient to verify many KZG polynomial commitments at once. Right now, verifying each point (a KZG opening) from an EIP-4844 data blob costs a lot of gas because each has to be checked individually. This proposal adds a dedicated precompile that takes a blob commitment and a batch of point/value pairs and performs one cryptographic verification over all of them in a single call, lowering gas cost and overhead for workloads like fraud proofs or data availability checks that need multiple evaluation.

3. Meet the Builder:

I'm Chris Mata (protocolwhisper) and IG builder - a mechanical and computer engineer with a passion for cryptography, automotive control theory, and distributed consensus systems. I love contributing to open-source infrastructure, crypto libraries, and consensus clients, and I've spent years building developer tooling that makes others' lives easier. What really drives me is creating technology that helps people and strengthens the systems they rely on.

4. What This Defends Against (the d/acc angle):

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
}

const cards: Card[] = [
  { id: 'intro', hubId: 'intro', title: 'Zuzalu Newsletter', subtitle: 'February 2026', isIntro: true },
  { id: 'dacc', hubId: 'dacc', title: 'd/acc in Practice', isDacc: true, image: '/images/ChrisMata.jpeg' },
  { id: 'placeholder-2', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-3', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-4', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-5', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-6', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-7', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-8', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-9', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-10', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-11', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-12', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-13', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-14', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-15', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-16', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-17', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-18', hubId: 'placeholder', isPlaceholder: true },
  { id: 'placeholder-19', hubId: 'placeholder', isPlaceholder: true },
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

export default function February2026Page() {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null)

  const handleCardClick = (card: Card) => {
    if (card.isPlaceholder) {
      return
    }
    setSelectedHub(hubs[card.hubId])
  }

  const closeModal = () => {
    setSelectedHub(null)
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
        <div className="newsletter-grid">
          {cards.map((card) => {
            const hub = hubs[card.hubId]
            const title = card.title || hub?.title
            const subtitle = card.subtitle || hub?.date?.replace(/,?\s*\d{4}/g, '').toUpperCase()

            return (
              <div
                key={card.id}
                className={`card ${card.isIntro ? 'intro' : ''} ${card.isCrossword ? 'crossword' : ''} ${card.isCongrats ? 'congrats' : ''} ${card.image && !card.isDacc ? 'has-image' : ''} ${card.isFiller ? 'filler' : ''} ${card.isPlaceholder ? 'placeholder' : ''} ${card.isDacc ? 'dacc' : ''}`}
                onClick={() => handleCardClick(card)}
              >
                {card.image && !card.isDacc && (
                  <Image className="card-image" src={card.image} alt={card.isFiller ? '' : title} fill sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1000px) 25vw, 20vw" />
                )}
                {card.isDacc && (
                  <div className="card-content dacc-content">
                    <div className="dacc-image-wrapper">
                      <Image src={card.image!} alt={title} width={80} height={80} className="dacc-avatar" />
                    </div>
                    <h3 className="card-title">{title}</h3>
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
                    <div className="placeholder-icon">+</div>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedHub.image && (
              <Image src={selectedHub.image} alt={selectedHub.title} className="modal-image" width={600} height={300} />
            )}
            <h2 className="modal-title">{selectedHub.title}</h2>
            {selectedHub.date && <p className="modal-date">{selectedHub.date}</p>}
            <div className="modal-body">
              {selectedHub.fullContent.split('\n\n').map((para, i) => (
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

        .newsletter-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          margin: 0;
          padding: 0;
        }

        .card {
          background: #fafaf9;
          padding: 1rem;
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
          justify-content: center;
          height: 100%;
          text-align: center;
          gap: 0.75rem;
        }

        .dacc-image-wrapper {
          width: 80px;
          height: 80px;
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

        @media (max-width: 1000px) {
          .newsletter-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .newsletter-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 500px) {
          .newsletter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}
