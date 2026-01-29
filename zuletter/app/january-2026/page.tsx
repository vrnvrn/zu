'use client'

import Nav from '@/components/Nav'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function January2026Page() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    fetch('/newsletters/2026-01.html')
      .then(res => res.text())
      .then(html => {
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
        if (bodyMatch) {
          setHtmlContent(bodyMatch[1])
        } else {
          setHtmlContent(html)
        }
      })
      .catch(err => {
        console.error('Error loading newsletter:', err)
        setHtmlContent('<p>Error loading newsletter content.</p>')
      })
  }, [])

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" className="text-secondary link-subtle" style={{ fontSize: '0.875rem' }}>
            Back to Home
          </Link>
        </div>
        
        <article 
          className="card" 
          style={{ 
            padding: '2.5rem',
            background: 'var(--bg-primary)',
          }}
        >
          {htmlContent ? (
            <div 
              className="newsletter-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{
                fontFamily: 'inherit',
                lineHeight: '1.75',
              }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p className="text-secondary" style={{ margin: 0 }}>Loading...</p>
            </div>
          )}
        </article>
      </div>
      
      <style jsx>{`
        .newsletter-content :global(h1) {
          font-family: Georgia, serif;
          font-size: 2.25rem;
          font-weight: 400;
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
          text-align: center;
          letter-spacing: 0.02em;
        }
        
        .newsletter-content :global(h2) {
          font-family: Georgia, serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin: 2rem 0 1rem 0;
          color: var(--accent);
          letter-spacing: 0.02em;
          padding-left: 0.75rem;
          border-left: 3px solid var(--yellow);
        }
        
        .newsletter-content :global(h3) {
          font-family: Georgia, serif;
          font-size: 1.25rem;
          font-weight: 400;
          margin: 1.5rem 0 0.75rem 0;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }
        
        .newsletter-content :global(p),
        .newsletter-content :global(div) {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }
        
        .newsletter-content :global(a) {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .newsletter-content :global(a:hover) {
          color: var(--accent-hover);
        }
        
        .newsletter-content :global(ul),
        .newsletter-content :global(ol) {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .newsletter-content :global(li) {
          margin-bottom: 0.5rem;
          font-size: 0.9375rem;
        }
        
        .newsletter-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius);
        }
        
        .newsletter-content :global(hr) {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2rem 0;
        }
        
        .newsletter-content :global(strong) {
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .newsletter-content :global(em) {
          font-style: italic;
          color: var(--text-secondary);
        }
        
        .newsletter-content :global(.carousel) {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 1rem 0;
          margin: 1rem 0 0.5rem 0;
        }
        
        .newsletter-content :global(.carousel::-webkit-scrollbar) {
          height: 8px;
        }
        
        .newsletter-content :global(.carousel::-webkit-scrollbar-track) {
          background: var(--accent-subtle);
          border-radius: 4px;
        }
        
        .newsletter-content :global(.carousel::-webkit-scrollbar-thumb) {
          background: var(--accent-muted);
          border-radius: 4px;
        }
        
        .newsletter-content :global(.carousel::-webkit-scrollbar-thumb:hover) {
          background: var(--accent);
        }
        
        .newsletter-content :global(.carousel-item) {
          flex: 0 0 auto;
          scroll-snap-align: start;
          width: min(100%, 500px);
        }
        
        .newsletter-content :global(.carousel-item img) {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .newsletter-content :global(.update-section) {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }
        
        .newsletter-content :global(.update-section:last-child) {
          border-bottom: none;
        }
        
        .newsletter-content :global(.carousel-hint) {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-top: 0.25rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .newsletter-content :global(.carousel-item img) {
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </>
  )
}
