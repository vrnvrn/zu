'use client'

import Image from 'next/image'
import Nav from '@/components/Nav'

export default function CrosswordPage() {
  return (
    <>
      <Nav />
      <div className="crossword-page">
        <div className="crossword-container">
          <div className="crossword-grid-wrapper">
            <Image
              src="/images/crossword-blank.svg"
              alt="Crossword puzzle grid"
              width={500}
              height={500}
              className="crossword-image"
              priority
            />
          </div>

          <div className="crossword-info">
            <p className="crossword-label">Coming in</p>
            <h1 className="crossword-title">February 2026</h1>
            <p className="crossword-description">
              The first ZuLetter community crossword is launching next month.
              Each puzzle will be based on the previous month&apos;s newsletter updates
              — a fun way to test how closely you&apos;ve been following the Zuzalu ecosystem.
            </p>
            <p className="crossword-description" style={{ color: 'var(--text-tertiary)' }}>
              Stay tuned.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .crossword-page {
          min-height: calc(100vh - 60px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .crossword-container {
          display: flex;
          align-items: center;
          gap: 4rem;
          max-width: 900px;
          width: 100%;
        }

        .crossword-grid-wrapper {
          flex-shrink: 0;
          width: 420px;
          height: 420px;
          position: relative;
          animation: float 5s ease-in-out infinite;
        }

        .crossword-image {
          width: 100%;
          height: 100%;
          display: block;
          opacity: 0.9;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-18px) rotate(1.5deg) scale(1.02);
          }
          75% {
            transform: translateY(6px) rotate(-1deg) scale(0.99);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }

        .crossword-info {
          flex: 1;
        }

        .crossword-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          margin: 0 0 0.5rem;
        }

        .crossword-title {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 1.25rem;
          line-height: 1.1;
        }

        .crossword-description {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0 0 1rem;
        }

        @media (max-width: 700px) {
          .crossword-container {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }

          .crossword-grid-wrapper {
            width: 280px;
            height: 280px;
          }

          .crossword-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  )
}
