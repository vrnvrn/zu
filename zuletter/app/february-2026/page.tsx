'use client'

import Nav from '@/components/Nav'

export default function February2026Page() {
  return (
    <>
      <Nav />
      <div className="in-progress-banner">
        <span className="in-progress-icon">🚧</span>
        IN PROGRESS
        <span className="in-progress-icon">🚧</span>
      </div>
      <div className="newsletter-fullpage">
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: '#1c1917'
          }}>
            February 2026 Newsletter
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#57534e',
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            This edition is currently being compiled. Check back soon for updates from across the Zuzalu ecosystem.
          </p>
        </div>
      </div>

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
          min-height: calc(100vh - 200px);
        }
      `}</style>
    </>
  )
}
