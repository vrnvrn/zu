'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'

export interface Hub {
  id: string
  title: string
  date?: string
  fullContent: string
  link?: { url: string; text: string }
  links?: { url: string; text: string }[]
  image?: string
}

export interface Card {
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
  isPoll?: boolean
}

export interface CardPosition {
  top: string
  left: string
  rotate: number
  width: string
  height?: string
  zIndex: number
}

export interface PopupCity {
  name: string
  date: string
  url: string
}

interface PollState {
  question: string
  options: string[]
  votes: Record<string, number>
  voted: boolean
  loading: boolean
  error: string | null
}

interface Props {
  hubs: Record<string, Hub>
  cards: Card[]
  cardPositions: CardPosition[]
  popupCities: PopupCity[]
  backgroundImage?: string
  pollId?: string
}

function formatText(text: string) {
  const boldRegex = /\*\*(.+?)\*\*/g
  const urlRegex = /(https?:\/\/[^\s,)]+)/g

  const parts = text.split(boldRegex)
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} style={{ display: 'block', fontSize: '1.0625rem', marginTop: '1.5rem', marginBottom: '0.25rem', color: '#1c1917', fontWeight: 700 }}>
          {part}
        </strong>
      )
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

export default function NewsletterContent({ hubs, cards, cardPositions, popupCities, backgroundImage, pollId }: Props) {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showPoll, setShowPoll] = useState(false)
  const [votedOption, setVotedOption] = useState<string | null>(null)
  const [poll, setPoll] = useState<PollState>({
    question: '',
    options: [],
    votes: {},
    voted: typeof window !== 'undefined' && !!sessionStorage.getItem(`poll_${pollId}_voted`),
    loading: false,
    error: null,
  })

  const loadPoll = async () => {
    if (!pollId || poll.question) return
    setPoll(p => ({ ...p, loading: true, error: null }))
    try {
      const res = await fetch(`/api/poll?id=${pollId}`)
      if (!res.ok) throw new Error('unavailable')
      const data = await res.json()
      setPoll(p => ({ ...p, question: data.question, options: data.options, votes: data.votes, loading: false }))
    } catch {
      setPoll(p => ({ ...p, loading: false, error: 'Poll temporarily unavailable' }))
    }
  }

  const handleVote = async (option: string) => {
    if (poll.voted || !pollId) return
    setPoll(p => ({ ...p, loading: true }))
    try {
      const res = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pollId, option }),
      })
      if (!res.ok) throw new Error('failed')
      const data = await res.json()
      sessionStorage.setItem(`poll_${pollId}_voted`, '1')
      setVotedOption(option)
      setPoll(p => ({ ...p, votes: data.votes, voted: true, loading: false }))
    } catch {
      setPoll(p => ({ ...p, loading: false, error: 'Could not record vote. Please try again.' }))
    }
  }

  const handleCardClick = (card: Card) => {
    if (card.isPlaceholder || card.isCrossword || card.isComingSoon) return
    if (card.isPoll && pollId) {
      loadPoll()
      setShowPoll(true)
      return
    }
    if (card.image && (card.isFadedImage || card.isFullImage)) {
      setSelectedImage(card.image)
      setScale(1)
      setPosition({ x: 0, y: 0 })
      return
    }
    setSelectedHub(hubs[card.hubId])
  }

  const closeModal = () => setSelectedHub(null)
  const closeImageModal = () => { setSelectedImage(null); setScale(1); setPosition({ x: 0, y: 0 }) }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setScale(prev => Math.max(0.5, Math.min(4, prev + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }) }
  const handleMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }) }
  const handleMouseUp = () => setIsDragging(false)
  const handleTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; setIsDragging(true); setDragStart({ x: t.clientX - position.x, y: t.clientY - position.y }) }
  const handleTouchMove = (e: React.TouchEvent) => { if (!isDragging) return; const t = e.touches[0]; setPosition({ x: t.clientX - dragStart.x, y: t.clientY - dragStart.y }) }
  const handleTouchEnd = () => setIsDragging(false)

  const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0)

  return (
    <>
      <Nav />
      <div className="newsletter-fullpage">
        {backgroundImage && <div className="page-bg" style={{ backgroundImage: `url('${backgroundImage}')` }} />}
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
            if (pos.height) posStyle.height = pos.height

            if (card.isCrossword) {
              return (
                <Link key={card.id} href="/crossword" className="card crossword has-image scrapbook-card" style={posStyle}>
                  <Image className="card-image" src={card.image!} alt={title || 'Crossword'} fill sizes="25vw" />
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
                <a key={card.id} href={card.externalUrl} target="_blank" rel="noopener noreferrer" className="card external-link scrapbook-card" style={posStyle}>
                  <div className="card-content external-link-content">
                    <h3 className="external-link-title">{title}</h3>
                    {card.subtitle && <p className="external-link-subtitle">{card.subtitle}</p>}
                  </div>
                </a>
              )
            }

            if (card.isFadedImage && card.image) {
              return (
                <div key={card.id} className="card faded-image scrapbook-card clickable" style={posStyle} onClick={() => handleCardClick(card)}>
                  <Image className="card-image" src={card.image} alt={title || ''} fill sizes="25vw" />
                  <div className="image-overlay">
                    <span className="image-title">{title}</span>
                    <a href="mailto:hi@zuzone.org?subject=Add%20our%20popup%20city%20to%20the%20map" className="map-cta-btn" onClick={(e) => e.stopPropagation()}>
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
                className={`card scrapbook-card ${card.isIntro ? 'intro' : ''} ${card.isCongrats ? 'congrats' : ''} ${card.image && !card.isDacc ? 'has-image' : ''} ${card.isFiller ? 'filler' : ''} ${card.isPlaceholder ? 'placeholder' : ''} ${card.isDacc ? 'dacc' : ''} ${card.isFullImage ? 'full-image' : ''} ${card.isBgImage ? 'bg-image' : ''} ${card.isPoll ? 'poll-card' : ''}`}
                style={posStyle}
                onClick={() => handleCardClick(card)}
              >
                {card.image && !card.isDacc && !card.isBgImage && (
                  <Image className="card-image" src={card.image} alt={card.isFiller ? '' : (title || '')} fill sizes="25vw" />
                )}
                {card.isBgImage && card.image && (
                  <Image className="card-bg-image" src={card.image} alt="" fill sizes="25vw" />
                )}
                {card.isDacc && (
                  <div className="card-content dacc-content">
                    {card.image && (
                      <div className="dacc-pfp-wrapper">
                        <Image className="dacc-pfp" src={card.image} alt="" width={64} height={64} />
                      </div>
                    )}
                    <div className="dacc-header">
                      <h3 className="card-title">{title}</h3>
                      <span className="dacc-subtitle">{card.subtitle || 'Project Spotlight'}</span>
                    </div>
                  </div>
                )}
                {card.isPoll && (
                  <div className="card-content poll-preview">
                    <h3 className="card-title">{title}</h3>
                    <p className="poll-preview-text">{card.subtitle || 'Share your perspective →'}</p>
                  </div>
                )}
                {!card.isFiller && !card.isPlaceholder && !card.isDacc && !card.isPoll && (
                  <div className={`card-content ${(card.image || card.isBgImage) ? 'overlay' : ''} ${card.isCenterText ? 'center-text' : ''}`}>
                    <h3 className="card-title">{title}</h3>
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                  </div>
                )}
                {card.isPlaceholder && (
                  <div className="card-content placeholder-content">
                    {card.title ? <h3 className="placeholder-title">{card.title}</h3> : <div className="placeholder-icon">+</div>}
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

      {/* Article / hub modal */}
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

      {/* Map zoom modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-controls">
            <button className="image-modal-close" onClick={closeImageModal}>×</button>
            <div className="zoom-controls">
              <button onClick={() => setScale(s => Math.min(4, s + 0.5))} title="Zoom in">+</button>
              <span>{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(s => Math.max(0.5, s - 0.5))} title="Zoom out">−</button>
              <button onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }) }} title="Reset">↺</button>
            </div>
          </div>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()} onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
            <Image src={selectedImage} alt="Map" width={1200} height={800} className="zoomable-image" priority draggable={false} style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.15s ease-out' }} />
          </div>
        </div>
      )}

      {/* Poll modal */}
      {showPoll && (
        <div className="modal-overlay" onClick={() => setShowPoll(false)}>
          <div className="modal-content poll-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPoll(false)}>×</button>
            {poll.loading && !poll.question && <p className="poll-loading">Loading poll…</p>}
            {poll.error && <p className="poll-error">{poll.error}</p>}
            {poll.question && (
              <>
                <h2 className="modal-title">{poll.question}</h2>
                <div className="poll-options">
                  {poll.options.map((option) => {
                    const voteCount = poll.votes[option] ?? 0
                    const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0
                    return (
                      <button
                        key={option}
                        className={`poll-option ${poll.voted ? 'voted' : ''}`}
                        onClick={() => !poll.voted && handleVote(option)}
                        disabled={poll.voted || poll.loading}
                      >
                        <span className="poll-option-label">{option}</span>
                        {poll.voted && (
                          <span className="poll-option-result">
                            <span className="poll-bar" style={{ width: `${pct}%` }} />
                            <span className="poll-pct">{pct}%</span>
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
                {poll.voted && (
                  <p className="poll-total">{totalVotes} {totalVotes === 1 ? 'response' : 'responses'}</p>
                )}
                {poll.voted && votedOption === 'Yes, we want to be more connected!' && (
                  <div className="poll-connect-cta">
                    <p className="poll-connect-title">Let&apos;s connect! Reach out to Yami:</p>
                    <div className="poll-connect-channels">
                      <div className="poll-connect-row">
                        <span className="poll-connect-icon">TG</span>
                        <a href="https://t.me/YamiDeutsch" target="_blank" rel="noopener noreferrer" className="poll-connect-handle">@YamiDeutsch</a>
                      </div>
                      <div className="poll-connect-row">
                        <span className="poll-connect-icon">Signal</span>
                        <span className="poll-connect-handle">YamiDeutsch.32</span>
                      </div>
                    </div>
                  </div>
                )}
                {!poll.voted && (
                  <p className="poll-prompt">Click an option to vote — anonymous, one response per session.</p>
                )}
              </>
            )}
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

        .card:hover { background: #f5f5f4; }

        .card.has-image { padding: 0; min-height: 160px; }
        .card.has-image:hover { background: transparent; }

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
          object-fit: cover;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .card.bg-image { padding: 0; }

        .card.bg-image .card-bg-image {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
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
        .card-content.overlay .card-subtitle { color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }

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
          letter-spacing: 0.05em;
        }

        .card.intro { background: #1c1917; }
        .card.intro .card-title { color: #f5f5f0; font-size: 1.5rem; }
        .card.intro .card-subtitle { color: #e8d556; font-size: 0.75rem; letter-spacing: 0.12em; }

        .card-content.center-text {
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 100%;
          padding: 1rem;
        }

        .card-content.center-text .card-title { font-size: 1rem; }
        .card-content.center-text .card-subtitle { font-size: 0.6875rem; }

        .dacc-content {
          height: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #1c1917 0%, #2d3748 100%);
          justify-content: flex-end;
        }

        .dacc-pfp-wrapper { display: flex; justify-content: center; margin-bottom: 0.5rem; }
        .dacc-pfp { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid #e8d556; }
        .dacc-header .card-title { color: #f5f5f0; font-size: 0.9375rem; }
        .dacc-subtitle { color: #e8d556; font-size: 0.6875rem; font-weight: 600; margin-top: 0.25rem; display: block; }

        .poll-card { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
        .poll-preview { padding: 0.75rem; justify-content: center; height: 100%; }
        .poll-preview .card-title { color: #166534; }
        .poll-preview-text { font-size: 0.8125rem; color: #16a34a; font-weight: 500; margin-top: 0.5rem; }

        .external-link { background: #2d6b5d; }
        .external-link-content { height: 100%; justify-content: center; align-items: center; text-align: center; padding: 1rem; }
        .external-link-title { font-size: 1rem; font-weight: 700; color: white; margin: 0 0 0.25rem; }
        .external-link-subtitle { font-size: 0.75rem; color: rgba(255,255,255,0.75); margin: 0; }

        .coming-soon-content { height: 100%; justify-content: center; align-items: center; text-align: center; padding: 1rem; }
        .coming-soon-label { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin: 0 0 0.375rem; font-weight: 600; }
        .coming-soon-title { font-size: 1rem; font-weight: 700; color: #6b7280; margin: 0; }

        .placeholder-content { height: 100%; justify-content: center; align-items: center; }
        .placeholder-title { font-size: 0.9375rem; font-weight: 600; color: #9ca3af; margin: 0; text-align: center; padding: 0.5rem; }
        .placeholder-icon { font-size: 2rem; color: #d1d5db; }

        .faded-image .image-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
          padding: 1rem 0.75rem 0.75rem;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .image-title { font-size: 0.9375rem; font-weight: 700; color: white; }
        .map-cta-btn { font-size: 0.75rem; font-weight: 600; color: #e8d556; text-decoration: none; }
        .map-cta-subtext { font-size: 0.6875rem; color: rgba(255,255,255,0.6); }

        .popup-cities-bar {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 1rem 2rem;
          background: rgba(28,25,23,0.85);
          backdrop-filter: blur(8px);
        }

        .popup-cities-title {
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
          margin: 0 0 0.5rem;
        }

        .popup-cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem 1.5rem;
        }

        .popup-city {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          white-space: nowrap;
        }

        .popup-city:hover { color: white; }
        .popup-city strong { color: rgba(255,255,255,0.9); }

        /* ---- Modals ---- */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-content.has-bg-image { overflow: hidden; min-height: 300px; }
        .modal-bg-image { object-fit: cover; opacity: 0.15; }

        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: none; border: none; font-size: 1.5rem;
          cursor: pointer; color: #6b7280; line-height: 1; padding: 0.25rem;
        }

        .modal-title {
          font-size: 1.375rem; font-weight: 700; color: #1c1917;
          margin: 0 0 0.25rem; padding-right: 2rem;
        }

        .modal-date { font-size: 0.875rem; color: #9ca3af; margin: 0 0 1.25rem; }

        .modal-body p {
          font-size: 0.9375rem; line-height: 1.75; color: #374151;
          margin: 0 0 0.75rem;
        }

        .modal-builder-image {
          display: flex; justify-content: center; margin-bottom: 1rem;
        }

        .builder-avatar { border-radius: 50%; object-fit: cover; }

        .modal-links {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          margin-top: 1.5rem; border-top: 1px solid #e5e7eb; padding-top: 1rem;
        }

        .modal-link {
          display: inline-block; padding: 0.5rem 1rem;
          background: #2d6b5d; color: white; border-radius: 6px;
          font-size: 0.875rem; font-weight: 600; text-decoration: none;
        }

        .modal-link:hover { background: #1a4a40; }

        /* ---- Poll modal ---- */
        .poll-modal { max-width: 480px; }

        .poll-loading, .poll-error { text-align: center; color: #6b7280; padding: 2rem 0; }
        .poll-error { color: #dc2626; }

        .poll-options { display: flex; flex-direction: column; gap: 0.625rem; margin-top: 1.25rem; }

        .poll-option {
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1rem;
          background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px;
          cursor: pointer; text-align: left; width: 100%;
          transition: border-color 0.15s, background 0.15s;
          font-size: 0.9375rem; font-weight: 500; color: #1c1917;
        }

        .poll-option:hover:not(.voted):not(:disabled) {
          border-color: #2d6b5d; background: #f0fdf4;
        }

        .poll-option.voted { cursor: default; }

        .poll-option-label { position: relative; z-index: 1; }

        .poll-option-result {
          display: flex; align-items: center; gap: 0.5rem;
          position: relative; z-index: 1; min-width: 60px; justify-content: flex-end;
        }

        .poll-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          background: #dcfce7; z-index: 0; transition: width 0.4s ease;
        }

        .poll-pct { font-size: 0.875rem; font-weight: 700; color: #166534; }

        .poll-total { text-align: center; font-size: 0.8125rem; color: #9ca3af; margin-top: 1rem; }
        .poll-prompt { text-align: center; font-size: 0.8125rem; color: #9ca3af; margin-top: 1rem; }

        .poll-connect-cta {
          margin-top: 1.25rem;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          text-align: center;
        }
        .poll-connect-title {
          font-weight: 600;
          color: #166534;
          font-size: 0.9375rem;
          margin: 0 0 0.75rem;
        }
        .poll-connect-channels {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }
        .poll-connect-row {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .poll-connect-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2d6b5d;
          color: white;
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          min-width: 48px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .poll-connect-handle {
          font-weight: 600;
          font-size: 0.9375rem;
          color: #1c1917;
        }
        a.poll-connect-handle {
          color: #2d6b5d;
          text-decoration: none;
        }
        a.poll-connect-handle:hover {
          text-decoration: underline;
        }

        /* ---- Map zoom modal ---- */
        .image-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.92);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 1000;
        }

        .image-modal-controls {
          position: absolute; top: 1rem; right: 1rem;
          display: flex; align-items: center; gap: 0.5rem;
          z-index: 10;
        }

        .image-modal-close {
          background: rgba(255,255,255,0.15); border: none;
          color: white; font-size: 1.5rem; cursor: pointer;
          border-radius: 6px; padding: 0.25rem 0.5rem;
        }

        .zoom-controls {
          display: flex; align-items: center; gap: 0.375rem;
          background: rgba(255,255,255,0.12); border-radius: 6px; padding: 0.25rem 0.5rem;
        }

        .zoom-controls button {
          background: none; border: none; color: white;
          font-size: 1.125rem; cursor: pointer; padding: 0.125rem 0.25rem; line-height: 1;
        }

        .zoom-controls span { color: white; font-size: 0.8125rem; min-width: 3ch; text-align: center; }

        .image-modal-content {
          width: 90vw; height: 80vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        .zoomable-image { max-width: none; }
      `}</style>
    </>
  )
}
