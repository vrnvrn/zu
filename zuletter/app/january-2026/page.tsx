'use client'

import Nav from '@/components/Nav'
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
      <div 
        className="newsletter-fullpage"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      <style jsx global>{`
        .newsletter-fullpage {
          width: 100%;
          min-height: calc(100vh - 100px);
        }
        
        .newsletter-fullpage .newsletter-grid-container {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(4, 1fr);
          height: calc(100vh - 100px);
          width: 100%;
          gap: 1px;
          background: #d4d4d4;
        }
        
        .newsletter-fullpage .cell {
          background: white;
          padding: 0.75rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        
        .newsletter-fullpage .cell.dark {
          background: #1c1917;
          color: white;
        }
        
        .newsletter-fullpage .cell.accent {
          background: #fef3c7;
        }
        
        .newsletter-fullpage .cell.has-img {
          padding: 0;
        }
        
        .newsletter-fullpage .cell.has-img .content {
          padding: 0.5rem 0.75rem;
          background: white;
        }
        
        .newsletter-fullpage .cell-img {
          width: 100%;
          flex: 1;
          min-height: 0;
          object-fit: cover;
        }
        
        .newsletter-fullpage .cell-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.125rem 0;
          line-height: 1.2;
        }
        
        .newsletter-fullpage .cell.dark .cell-title {
          color: white;
          font-size: 1.5rem;
        }
        
        .newsletter-fullpage .cell-date {
          font-size: 0.5625rem;
          color: #a8a29e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        
        .newsletter-fullpage .cell-text {
          font-size: 0.6875rem;
          line-height: 1.4;
          color: #57534e;
          flex: 1;
          overflow: hidden;
          margin: 0;
        }
        
        .newsletter-fullpage .cell.dark .cell-text {
          color: #a8a29e;
        }
        
        .newsletter-fullpage .cell-text strong {
          color: #1c1917;
        }
        
        .newsletter-fullpage .cell.dark .cell-text strong {
          color: #fbbf24;
        }
        
        .newsletter-fullpage .cell-text a {
          color: #2563eb;
        }
        
        .newsletter-fullpage .cell.dark .cell-text a {
          color: #fbbf24;
        }
        
        .newsletter-fullpage .cell-cta {
          font-size: 0.5625rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          margin-top: 0.25rem;
        }
        
        .newsletter-fullpage .cal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          flex: 1;
          min-height: 0;
          margin-top: 0.25rem;
        }
        
        .newsletter-fullpage .cal-item {
          background: white;
          padding: 0.25rem;
          font-size: 0.5rem;
          overflow: hidden;
        }
        
        .newsletter-fullpage .cal-item strong {
          display: block;
          font-size: 0.5rem;
          color: #1c1917;
        }
        
        .newsletter-fullpage .cal-item span {
          color: #78716c;
          font-size: 0.4375rem;
        }
        
        @media (max-width: 1200px) {
          .newsletter-fullpage .newsletter-grid-container {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(5, 1fr);
          }
        }
        
        @media (max-width: 900px) {
          .newsletter-fullpage .newsletter-grid-container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            height: auto;
          }
          .newsletter-fullpage .cell {
            min-height: 140px;
          }
        }
        
        @media (max-width: 600px) {
          .newsletter-fullpage .newsletter-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}
