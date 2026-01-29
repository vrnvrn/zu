'use client'

import Nav from '@/components/Nav'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RetrospectivePage() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    fetch('/retrospective.html')
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
        console.error('Error loading retrospective:', err)
        setHtmlContent('<p>Error loading retrospective content.</p>')
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
              className="retrospective-content"
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
        .retrospective-content :global(h1) {
          font-family: Georgia, serif;
          font-size: 2.25rem;
          font-weight: 400;
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
          text-align: center;
          letter-spacing: -0.02em;
        }
        
        .retrospective-content :global(h2),
        .retrospective-content :global(h3) {
          font-family: Georgia, serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin: 2rem 0 1rem 0;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        
        .retrospective-content :global(h3) {
          font-size: 1.25rem;
        }
        
        .retrospective-content :global(p),
        .retrospective-content :global(div) {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }
        
        .retrospective-content :global(a) {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .retrospective-content :global(a:hover) {
          color: var(--accent-hover);
        }
        
        .retrospective-content :global(ul),
        .retrospective-content :global(ol) {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .retrospective-content :global(li) {
          margin-bottom: 0.5rem;
          font-size: 0.9375rem;
        }
        
        .retrospective-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius);
          margin: 1.5rem 0;
        }
        
        .retrospective-content :global(hr) {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2rem 0;
        }
        
        .retrospective-content :global(strong) {
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .retrospective-content :global(em) {
          font-style: italic;
          color: var(--text-secondary);
        }
        
        .retrospective-content :global(blockquote) {
          border-left: 2px solid var(--accent);
          padding-left: 1rem;
          margin: 1rem 0;
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>
    </>
  )
}
