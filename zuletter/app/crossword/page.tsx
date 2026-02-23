'use client'

import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'

const answerKey: Record<string, string> = {
  'down-1': 'MUSHANGHAI',
  'down-2': 'EDGECITY',
  'down-4': 'ZUITZERLAND',
  'down-7': 'SHANHAIWOO',
  'down-9': 'VIVACITY',
  'down-11': 'INFINITACITY',
  'down-12': 'IPEVILLAGE',
  'down-13': 'ZUKAS',
  'across-3': 'ZUBERLIN',
  'across-5': 'ZUAFRIQUE',
  'across-6': 'CRECIMIENTO',
  'across-8': 'CHARTERCITY',
  'across-10': 'INVISIBLEGARDEN',
  'across-15': 'ZUGRAMA',
}

interface Clue {
  num: number
  text: string
  direction: 'down' | 'across'
}

const downClues: Clue[] = [
  { num: 1, text: 'A builder immersion revealing innovation at "China speed."', direction: 'down' },
  { num: 2, text: 'From container of serendipity to catalyst of emergence.', direction: 'down' },
  { num: 4, text: 'A Swiss experiment coordinating capital through a hub accelerator model.', direction: 'down' },
  { num: 7, text: 'A residency accelerating Ethereum applications while its geography remains undecided.', direction: 'down' },
  { num: 9, text: 'A vertical village designing a permanent city for longevity and self-governance.', direction: 'down' },
  { num: 11, text: 'Where governance, longevity science, and startup cities become a seasonal game.', direction: 'down' },
  { num: 12, text: 'A proto-city designed through hacker houses and AI-driven urban experiments.', direction: 'down' },
  { num: 13, text: 'A governance lab testing ranked voting and phygital commons.', direction: 'down' },
]

const acrossClues: Clue[] = [
  { num: 3, text: 'Two urban scales of belonging — a Kreuzberg hub and riverside vision.', direction: 'across' },
  { num: 5, text: 'A distributed African ecosystem nurturing Web3 builders and local hubs.', direction: 'across' },
  { num: 6, text: 'Turns regional growth into infrastructure through buildathons and startup pipelines.', direction: 'across' },
  { num: 8, text: 'A governance experiment where a ghost city becomes proof that coordination can scale.', direction: 'across' },
  { num: 10, text: 'A residency where focus defeats frenzy and builders pursue truth and privacy.', direction: 'across' },
  { num: 15, text: 'A programmable society with citizenship passports, AI agents, and land stewardship.', direction: 'across' },
]

export default function CrosswordPage() {
  const [activeClue, setActiveClue] = useState<string | null>(null)
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState<{ key: string; correct: boolean } | null>(null)

  const handleClueClick = (clue: Clue) => {
    const key = `${clue.direction}-${clue.num}`
    if (activeClue === key) {
      setActiveClue(null)
      setUserInput('')
      setFeedback(null)
    } else {
      setActiveClue(key)
      setUserInput('')
      setFeedback(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeClue) return

    const correctAnswer = answerKey[activeClue]
    const normalizedInput = userInput.toUpperCase().replace(/\s+/g, '')
    const isCorrect = normalizedInput === correctAnswer

    setFeedback({ key: activeClue, correct: isCorrect })
  }

  const renderClue = (clue: Clue) => {
    const key = `${clue.direction}-${clue.num}`
    const isActive = activeClue === key
    const hasFeedback = feedback?.key === key

    return (
      <li
        key={key}
        className={`clue-item ${isActive ? 'active' : ''} ${hasFeedback ? (feedback.correct ? 'correct' : 'incorrect') : ''}`}
        onClick={() => handleClueClick(clue)}
      >
        <span className="clue-number">{clue.num}.</span>
        <span className="clue-text">{clue.text}</span>
        {isActive && (
          <form className="answer-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              autoFocus
              className="answer-input"
            />
            <button type="submit" className="answer-submit">Check</button>
          </form>
        )}
        {hasFeedback && (
          <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
            {feedback.correct ? 'Correct!' : 'Incorrect'}
          </div>
        )}
      </li>
    )
  }

  const backgroundImages = [
    '/newsletters/images/2026-01/Invisiblegarden.jpeg',
    '/newsletters/images/2026-01/edgecity.jpeg',
    '/newsletters/images/2026-01/infinita1.jpeg',
    '/newsletters/images/2026-01/zanzalu.jpeg',
    '/newsletters/images/2026-01/zuberlin.jpeg',
    '/newsletters/images/2026-01/zugrama1.jpeg',
    '/newsletters/images/2026-01/frontiertower.jpg',
    '/newsletters/images/2026-01/crecimento.png',
  ]

  return (
    <>
      <Nav />
      <div className="crossword-page">
        <div className="background-images left">
          {backgroundImages.slice(0, 4).map((src, i) => (
            <Image key={i} src={src} alt="" width={120} height={80} className="bg-image" />
          ))}
        </div>
        <div className="background-images right">
          {backgroundImages.slice(4).map((src, i) => (
            <Image key={i} src={src} alt="" width={120} height={80} className="bg-image" />
          ))}
        </div>
        <p className="crossword-instructions">Click on a question to check your answer</p>
        <div className="crossword-container">
          <div className="crossword-grid-wrapper">
            <Image
              src="/images/feb26crossword.png"
              alt="February 2026 Crossword puzzle"
              width={800}
              height={800}
              className="crossword-image"
              priority
            />
          </div>

          <div className="crossword-clues">
            <div className="clues-column">
              <h2 className="clues-heading">Down:</h2>
              <ul className="clues-list">
                {downClues.map(renderClue)}
              </ul>
            </div>
            <div className="clues-column">
              <h2 className="clues-heading">Across:</h2>
              <ul className="clues-list">
                {acrossClues.map(renderClue)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .crossword-page {
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 2rem 2rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .background-images {
          position: fixed;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        }

        .background-images.left {
          left: 1rem;
        }

        .background-images.right {
          right: 1rem;
        }

        .bg-image {
          width: 100px;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          filter: grayscale(50%);
        }

        @media (max-width: 1400px) {
          .background-images {
            display: none;
          }
        }

        .crossword-instructions {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin: 0 0 1.5rem;
          text-align: center;
        }

        .crossword-container {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          max-width: 1400px;
          width: 100%;
        }

        .crossword-grid-wrapper {
          flex-shrink: 0;
          width: 800px;
          height: 800px;
          position: relative;
        }

        .crossword-image {
          width: 100%;
          height: 100%;
          display: block;
        }

        .crossword-clues {
          flex: 1;
          display: flex;
          gap: 3rem;
        }

        .clues-column {
          flex: 1;
        }

        .clues-heading {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1rem;
          color: var(--text-primary);
        }

        .clues-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .clue-item {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 0.875rem;
          padding: 0.75rem;
          padding-left: 2.25rem;
          position: relative;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.15s;
        }

        .clue-item:hover {
          background: #f5f5f4;
        }

        .clue-item.active {
          background: #e8f5f1;
        }

        .clue-item.correct {
          background: #dcfce7;
        }

        .clue-item.incorrect {
          background: #fee2e2;
        }

        .clue-number {
          position: absolute;
          left: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .clue-text {
          display: block;
        }

        .answer-form {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .answer-input {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border: 2px solid #d6d3d1;
          border-radius: 6px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }

        .answer-input:focus {
          border-color: #2d6b5d;
        }

        .answer-submit {
          padding: 0.5rem 1rem;
          background: #2d6b5d;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.15s;
        }

        .answer-submit:hover {
          background: #1a4a40;
        }

        .feedback {
          margin-top: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .feedback.correct {
          color: #16a34a;
        }

        .feedback.incorrect {
          color: #dc2626;
        }

        @media (max-width: 1200px) {
          .crossword-container {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .crossword-grid-wrapper {
            width: 600px;
            height: 600px;
          }

          .crossword-clues {
            width: 100%;
          }
        }

        @media (max-width: 700px) {
          .crossword-grid-wrapper {
            width: 100%;
            max-width: 500px;
            height: auto;
            aspect-ratio: 1;
          }

          .crossword-clues {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
    </>
  )
}
