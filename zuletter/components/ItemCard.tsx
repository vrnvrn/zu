import Link from 'next/link'
import { NewsletterItem } from '@/lib/types'
import { format } from 'date-fns'

interface ItemCardProps {
  item: NewsletterItem
}

export default function ItemCard({ item }: ItemCardProps) {
  const { issue, state, category, decisionReason, decidedBy, section } = item
  
  return (
    <div className="card">
      <div className="flex-between mb-16">
        <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
          <span className={`badge badge-state-${state}`}>
            {state}
          </span>
          {category && (
            <span className="badge badge-category">
              {category}
            </span>
          )}
          {section && (
            <span className="badge badge-category">
              {section}
            </span>
          )}
        </div>
        <a 
          href={issue.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            fontSize: '0.6875rem',
            color: 'var(--accent)',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            opacity: 0.8,
            transition: 'opacity 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          GitHub
        </a>
      </div>
      
      <Link href={`/item/${issue.number}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '0.5rem', 
          cursor: 'pointer',
          fontSize: '1.125rem',
          letterSpacing: '0.01em',
          transition: 'color 0.15s ease'
        }}>{issue.title}</h3>
      </Link>
      
      {issue.body && (
        <p className="text-secondary" style={{ 
          marginBottom: '0.75rem',
          lineHeight: '1.65'
        }}>
          {issue.body.substring(0, 200)}
          {issue.body.length > 200 ? '...' : ''}
        </p>
      )}
      
      <div className="flex-between mt-16">
        <div style={{ 
          fontSize: '0.8125rem',
          color: 'var(--text-tertiary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <a 
            href={issue.user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            @{issue.user.login}
          </a>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{format(new Date(issue.created_at), 'MMM d, yyyy')}</span>
        </div>
      </div>
      
      {decisionReason && (
        <div style={{ 
          marginTop: '1.25rem', 
          padding: '1rem 1.25rem', 
          background: 'linear-gradient(135deg, var(--accent-subtle) 0%, var(--bg-secondary) 100%)', 
          borderRadius: 'var(--radius)',
          borderLeft: '3px solid var(--accent)'
        }}>
          <div style={{ 
            fontSize: '0.625rem', 
            fontWeight: '600', 
            marginBottom: '0.375rem', 
            color: 'var(--accent)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Editor Note
            {decidedBy && <span style={{ fontWeight: '400', opacity: 0.7 }}> — @{decidedBy}</span>}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            {decisionReason}
          </div>
        </div>
      )}
    </div>
  )
}
