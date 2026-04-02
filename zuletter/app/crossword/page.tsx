'use client'

import { useState, useEffect } from 'react'
import Crossword from '@jaredreisinger/react-crossword'
import Nav from '@/components/Nav'
import { CROSSWORD_ANSWERS } from '@/lib/crossword-data'

// March 2026 crossword
// Grid intersections verified:
//   MUSHANGHAI(1,0)[1] = U = ZUGRAMA(0,1)[1]
//   MUSHANGHAI(1,0)[8] = A = VALLEY(0,8)[1]
//   PROTOVILLE(3,0)[1] = R = ZUGRAMA(0,1)[3]
//   PROTOVILLE(3,0)[8] = L = VALLEY(0,8)[3]
//   PROTOVILLE(3,0)[9] = E = ESMERALDA(3,9)[0]
//   ZANZALU(8,5)[4]    = A = ESMERALDA(3,9)[5]
const crosswordData = {
  across: {
    3: {
      row: 1,
      col: 0,
      clue: 'Builder immersion revealing innovation at "China speed." (10 letters)',
      answer: 'MUSHANGHAI',
    },
    4: {
      row: 3,
      col: 0,
      clue: 'Gene\'s Korea pop-up city debuting on the road to Devcon. (10 letters)',
      answer: 'PROTOVILLE',
    },
    6: {
      row: 8,
      col: 5,
      clue: 'Tanzania\'s Zuzalu-style gathering on the East African coast. (7 letters)',
      answer: 'ZANZALU',
    },
  },
  down: {
    1: {
      row: 0,
      col: 1,
      clue: 'India-based programmable society with citizenship passports and AI agents. (7 letters)',
      answer: 'ZUGRAMA',
    },
    2: {
      row: 0,
      col: 8,
      clue: '"___ of the Commons" — a cosmolocalism pop-up high in the mountains. (6 letters)',
      answer: 'VALLEY',
    },
    5: {
      row: 3,
      col: 9,
      clue: 'Edge City\'s Latin American edition — its name means "emerald" in Spanish. (9 letters)',
      answer: 'ESMERALDA',
    },
  },
}

// Human-readable answer key for the February reveal UI
const FEB_ANSWER_KEY = [
  { clue: 'ACROSS 3 — Two urban scales of belonging (Kreuzberg hub)', answer: 'ZUBERLIN' },
  { clue: 'ACROSS 5 — Distributed African ecosystem nurturing Web3 builders', answer: 'ZUAFRIQUE' },
  { clue: 'ACROSS 6 — Regional growth via buildathons and startup pipelines', answer: 'CRECIMIENTO' },
  { clue: 'ACROSS 8 — Ghost city becomes proof that coordination can scale', answer: 'CHARTERCITY' },
  { clue: 'ACROSS 10 — Residency where focus defeats frenzy', answer: 'INVISIBLEGARDEN' },
  { clue: 'ACROSS 15 — Programmable society with citizenship passports and AI agents', answer: 'ZUGRAMA' },
  { clue: 'DOWN 1 — Builder immersion at "China speed"', answer: 'MUSHANGHAI' },
  { clue: 'DOWN 2 — From container of serendipity to catalyst of emergence', answer: 'EDGECITY' },
  { clue: 'DOWN 4 — Swiss experiment coordinating capital through hub accelerator', answer: 'ZUITZERLAND' },
  { clue: 'DOWN 7 — Residency accelerating Ethereum apps, geography undecided', answer: 'SHANHAIWOO' },
  { clue: 'DOWN 9 — Vertical village designing a permanent city for longevity', answer: 'VIVACITY' },
  { clue: 'DOWN 11 — Governance, longevity science, and startup cities as a seasonal game', answer: 'INFINITACITY' },
  { clue: 'DOWN 12 — Proto-city via hacker houses and AI-driven urban experiments', answer: 'IPEVILLAGE' },
  { clue: 'DOWN 13 — Governance lab testing ranked voting and phygital commons', answer: 'ZUKAS' },
]

export default function CrosswordPage() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ score: number; total: number } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [showRevealPrompt, setShowRevealPrompt] = useState(false)
  const [revealPassword, setRevealPassword] = useState('')
  const [revealError, setRevealError] = useState('')
  const [revealUnlocked, setRevealUnlocked] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCellChange = (row: number, col: number, value: string) => {
    const key = `${row}-${col}`
    setUserAnswers(prev => ({
      ...prev,
      [key]: value.toUpperCase()
    }))
  }

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    try {
      const res = await fetch('/api/submit-crossword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), answers: userAnswers }),
      })

      if (!res.ok) {
        alert('Failed to submit. Please try again.')
        return
      }

      const data = await res.json()
      setSubmitStatus({ score: data.score, total: data.total })
      setShowSubmitForm(false)
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Failed to submit. Please try again.')
    }
  }

  const handleRevealSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (revealPassword === 'zuzone') {
      setRevealUnlocked(true)
      setShowRevealPrompt(false)
      setShowAnswers(true)
      setRevealPassword('')
      setRevealError('')
    } else {
      setRevealError('Incorrect password')
    }
  }

  if (!isLoaded) {
    return (
      <>
        <Nav />
        <div className="loading">Loading...</div>
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="crossword-page">
        <div className="crossword-header">
          <h1 className="crossword-title">March 2026 Crossword</h1>
          <p className="crossword-instructions">
            Fill in the answers below. Click on a clue to focus on that cell.
          </p>
          {submitStatus && (
            <div className="submitted-notice">
              ✓ Submitted! You scored {submitStatus.score} / {submitStatus.total}. You can update your answers and resubmit.
            </div>
          )}
          <div className="header-buttons">
            <button
              className="submit-btn"
              onClick={() => setShowSubmitForm(true)}
            >
              {submitStatus ? 'Resubmit Answers' : 'Submit Answers'}
            </button>
            <button
              className="reveal-btn"
              onClick={() => {
                if (revealUnlocked) {
                  setShowAnswers(true)
                } else {
                  setShowRevealPrompt(true)
                }
              }}
            >
              See February Answers
            </button>
          </div>
        </div>

        <div className="crossword-container">
          <div className="crossword-grid-wrapper">
            <Crossword
              data={crosswordData}
              onCellChange={handleCellChange}
            />
          </div>
        </div>

        {showSubmitForm && (
          <div className="submit-overlay">
            <div className="submit-form">
              <h3>Submit Your Answers</h3>
              <p>Enter your email to submit your answers. We&apos;ll check them and let you know how you did!</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoFocus
              />
              <div className="form-buttons">
                <button onClick={handleSubmit} className="submit-btn-primary">Submit</button>
                <button onClick={() => setShowSubmitForm(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showRevealPrompt && (
          <div className="submit-overlay" onClick={() => { setShowRevealPrompt(false); setRevealError(''); setRevealPassword('') }}>
            <div className="submit-form" onClick={(e) => e.stopPropagation()}>
              <h3>February Answers</h3>
              <p>Enter the password to reveal the February 2026 answer key.</p>
              <form onSubmit={handleRevealSubmit}>
                <input
                  type="password"
                  value={revealPassword}
                  onChange={(e) => { setRevealPassword(e.target.value); setRevealError('') }}
                  placeholder="Password"
                  autoFocus
                />
                {revealError && <p className="reveal-error">{revealError}</p>}
                <div className="form-buttons">
                  <button type="submit" className="submit-btn-primary">Unlock</button>
                  <button type="button" onClick={() => { setShowRevealPrompt(false); setRevealError(''); setRevealPassword('') }} className="cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAnswers && (
          <div className="submit-overlay" onClick={() => setShowAnswers(false)}>
            <div className="answers-modal" onClick={(e) => e.stopPropagation()}>
              <button className="answers-close" onClick={() => setShowAnswers(false)}>×</button>
              <h3>February 2026 — Answer Key</h3>
              <p className="answers-intro">No winner this month — here are the answers!</p>
              <div className="answers-list">
                {FEB_ANSWER_KEY.map(({ clue, answer }) => (
                  <div key={answer} className="answer-row">
                    <span className="answer-word">{answer}</span>
                    <span className="answer-clue">{clue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .crossword-page {
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 2rem 2rem 3rem;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 60px);
          color: #6b7280;
        }

        .crossword-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .crossword-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.5rem;
        }

        .crossword-instructions {
          font-size: 0.9375rem;
          color: #6b7280;
          margin: 0 0 1rem;
        }

        .submitted-notice {
          background: #dcfce7;
          color: #166534;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          margin-top: 1rem;
        }

        .header-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .reveal-btn {
          padding: 0.75rem 1.5rem;
          background: transparent;
          color: #2d6b5d;
          border: 2px solid #2d6b5d;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }

        .reveal-btn:hover {
          background: #2d6b5d;
          color: white;
        }

        .reveal-error {
          color: #dc2626;
          font-size: 0.875rem;
          margin: -0.5rem 0 0.5rem;
        }

        .answers-modal {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 560px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .answers-modal h3 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.25rem;
        }

        .answers-intro {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0 0 1.5rem;
        }

        .answers-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          line-height: 1;
          padding: 0.25rem;
        }

        .answers-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .answer-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          background: #f9fafb;
        }

        .answer-word {
          font-weight: 700;
          color: #2d6b5d;
          font-size: 0.9375rem;
          min-width: 140px;
          font-family: monospace;
          letter-spacing: 0.05em;
        }

        .answer-clue {
          font-size: 0.8125rem;
          color: #6b7280;
          flex: 1;
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          background: #2d6b5d;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          background: #1a4a40;
        }

        .crossword-container {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          max-width: 1200px;
          width: 100%;
          justify-content: center;
        }

        .crossword-grid-wrapper {
          width: 100%;
          max-width: 600px;
        }

        .submit-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .submit-form {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          text-align: center;
        }

        .submit-form h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.5rem;
        }

        .submit-form p {
          color: #6b7280;
          margin: 0 0 1.5rem;
          font-size: 0.9375rem;
        }

        .submit-form input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
          box-sizing: border-box;
        }

        .submit-form input:focus {
          outline: none;
          border-color: #2d6b5d;
        }

        .form-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .submit-btn-primary {
          flex: 1;
          padding: 0.75rem;
          background: #2d6b5d;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel-btn {
          flex: 1;
          padding: 0.75rem;
          background: #e5e7eb;
          color: #6b7280;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .crossword-container {
            flex-direction: column;
            align-items: center;
          }

          .crossword-grid-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}
