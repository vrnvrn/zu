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
              src="/images/feb26crossword.png"
              alt="February 2026 Crossword puzzle"
              width={500}
              height={500}
              className="crossword-image"
              priority
            />
          </div>

          <div className="crossword-clues">
            <div className="clues-column">
              <h2 className="clues-heading">Down:</h2>
              <ol className="clues-list">
                <li value={1}>A builder immersion revealing innovation at &quot;China speed.&quot;</li>
                <li value={2}>From container of serendipity to catalyst of emergence.</li>
                <li value={4}>A Swiss experiment coordinating capital through a hub accelerator model.</li>
                <li value={7}>A residency accelerating Ethereum applications while its geography remains undecided.</li>
                <li value={9}>A vertical village designing a permanent city for longevity and self-governance.</li>
                <li value={11}>Where governance, longevity science, and startup cities become a seasonal game.</li>
                <li value={12}>A proto-city designed through hacker houses and AI-driven urban experiments.</li>
                <li value={13}>A governance lab testing ranked voting and phygital commons.</li>
              </ol>
            </div>
            <div className="clues-column">
              <h2 className="clues-heading">Across:</h2>
              <ol className="clues-list">
                <li value={3}>Two urban scales of belonging — a Kreuzberg hub and riverside vision.</li>
                <li value={5}>A distributed African ecosystem nurturing Web3 builders and local hubs.</li>
                <li value={6}>Turns regional growth into infrastructure through buildathons and startup pipelines.</li>
                <li value={8}>A governance experiment where a ghost city becomes proof that coordination can scale.</li>
                <li value={10}>A residency where focus defeats frenzy and builders pursue truth and privacy.</li>
                <li value={15}>A programmable society with citizenship passports, AI agents, and land stewardship.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .crossword-page {
          min-height: calc(100vh - 60px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 3rem 2rem;
        }

        .crossword-container {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          max-width: 1100px;
          width: 100%;
        }

        .crossword-grid-wrapper {
          flex-shrink: 0;
          width: 400px;
          height: 400px;
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

        .clues-list li {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 0.875rem;
          padding-left: 1.75rem;
          position: relative;
        }

        .clues-list li::before {
          content: attr(value) ".";
          position: absolute;
          left: 0;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .crossword-container {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .crossword-grid-wrapper {
            width: 320px;
            height: 320px;
          }

          .crossword-clues {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .crossword-grid-wrapper {
            width: 280px;
            height: 280px;
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
