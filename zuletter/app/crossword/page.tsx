'use client'

import { useState, useEffect } from 'react'
import Crossword from '@jaredreisinger/react-crossword'
import Nav from '@/components/Nav'

const crosswordData = {
  across: {
    3: {
      row: 0,
      col: 0,
      clue: 'Two urban scales of belonging — a Kreuzberg hub and riverside vision. (8 letters)',
      answer: 'ZUBERLIN',
    },
    5: {
      row: 2,
      col: 0,
      clue: 'A distributed African ecosystem nurturing Web3 builders and local hubs. (9 letters)',
      answer: 'ZUAFRIQUE',
    },
    6: {
      row: 3,
      col: 0,
      clue: 'Turns regional growth into infrastructure through buildathons and startup pipelines. (12 letters)',
      answer: 'CRECIMIENTO',
    },
    8: {
      row: 5,
      col: 0,
      clue: 'A governance experiment where a ghost city becomes proof that coordination can scale. (12 letters)',
      answer: 'CHARTERCITY',
    },
    10: {
      row: 7,
      col: 0,
      clue: 'A residency where focus defeats frenzy and builders pursue truth and privacy. (16 letters)',
      answer: 'INVISIBLEGARDEN',
    },
    15: {
      row: 12,
      col: 0,
      clue: 'A programmable society with citizenship passports, AI agents, and land stewardship. (7 letters)',
      answer: 'ZUGRAMA',
    },
  },
  down: {
    1: {
      row: 0,
      col: 0,
      clue: 'A builder immersion revealing innovation at "China speed." (10 letters)',
      answer: 'MUSHANGHAI',
    },
    2: {
      row: 0,
      col: 2,
      clue: 'From container of serendipity to catalyst of emergence. (8 letters)',
      answer: 'EDGECITY',
    },
    4: {
      row: 0,
      col: 4,
      clue: 'A Swiss experiment coordinating capital through a hub accelerator model. (12 letters)',
      answer: 'ZUITZERLAND',
    },
    7: {
      row: 0,
      col: 7,
      clue: 'A residency accelerating Ethereum applications while its geography remains undecided. (10 letters)',
      answer: 'SHANHAIWOO',
    },
    9: {
      row: 2,
      col: 9,
      clue: 'A vertical village designing a permanent city for longevity and self-governance. (8 letters)',
      answer: 'VIVACITY',
    },
    11: {
      row: 4,
      col: 11,
      clue: 'Where governance, longevity science, and startup cities become a seasonal game. (13 letters)',
      answer: 'INFINITACITY',
    },
    12: {
      row: 5,
      col: 13,
      clue: 'A proto-city designed through hacker houses and AI-driven urban experiments. (10 letters)',
      answer: 'IPEVILLAGE',
    },
    13: {
      row: 6,
      col: 0,
      clue: 'A governance lab testing ranked voting and phygital commons. (5 letters)',
      answer: 'ZUKAS',
    },
  },
}

export default function CrosswordPage() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ score: number; total: number } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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
          <h1 className="crossword-title">February 2026 Crossword</h1>
          <p className="crossword-instructions">
            Fill in the answers below. Click on a clue to focus on that cell.
          </p>
          {submitStatus && (
            <div className="submitted-notice">
              ✓ Submitted! You scored {submitStatus.score} / {submitStatus.total}. You can update your answers and resubmit.
            </div>
          )}
          <button
            className="submit-btn"
            onClick={() => setShowSubmitForm(true)}
          >
            {submitStatus ? 'Resubmit Answers' : 'Submit Answers'}
          </button>
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
