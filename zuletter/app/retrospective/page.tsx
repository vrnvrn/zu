'use client'

import Nav from '@/components/Nav'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RetrospectivePage() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    // Fetch the HTML file from public directory
    fetch('/retrospective.html')
      .then(res => res.text())
      .then(html => {
        // Extract just the body content
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
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
        </div>
        
        <div 
          className="card" 
          style={{ 
            padding: '40px',
            background: 'var(--bg-primary)',
          }}
        >
          {htmlContent ? (
            <div 
              className="retrospective-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{
                fontFamily: 'inherit',
                lineHeight: '1.7',
              }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p className="text-secondary">Loading retrospective...</p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .retrospective-content :global(h1) {
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 24px 0;
          color: var(--text-primary);
          text-align: center;
        }
        
        .retrospective-content :global(h2),
        .retrospective-content :global(h3) {
          font-size: 28px;
          font-weight: 600;
          margin: 32px 0 16px 0;
          color: var(--text-primary);
        }
        
        .retrospective-content :global(p),
        .retrospective-content :global(div) {
          margin: 0 0 16px 0;
          color: var(--text-primary);
          font-size: 16px;
        }
        
        .retrospective-content :global(a) {
          color: var(--accent);
          text-decoration: underline;
        }
        
        .retrospective-content :global(a:hover) {
          color: var(--accent-hover);
        }
        
        .retrospective-content :global(ul),
        .retrospective-content :global(ol) {
          margin: 16px 0;
          padding-left: 32px;
        }
        
        .retrospective-content :global(li) {
          margin-bottom: 12px;
        }
        
        .retrospective-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius);
          margin: 24px 0;
        }
        
        .retrospective-content :global(hr) {
          border: none;
          border-top: 2px solid var(--border);
          margin: 32px 0;
        }
        
        .retrospective-content :global(strong) {
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .retrospective-content :global(em) {
          font-style: italic;
          color: var(--text-secondary);
        }
      `}</style>
    </>
  )
}

