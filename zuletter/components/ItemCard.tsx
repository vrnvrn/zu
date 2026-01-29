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
        <div className="flex gap-8">
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
          className="text-tertiary link-subtle"
          style={{ fontSize: '0.75rem' }}
        >
          View on GitHub
        </a>
      </div>
      
      <Link href={`/item/${issue.number}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem', cursor: 'pointer' }}>{issue.title}</h3>
      </Link>
      
      {issue.body && (
        <p className="text-secondary" style={{ marginBottom: '0.75rem' }}>
          {issue.body.substring(0, 200)}
          {issue.body.length > 200 ? '...' : ''}
        </p>
      )}
      
      <div className="flex-between mt-16">
        <div className="text-tertiary">
          <a 
            href={issue.user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-subtle"
          >
            @{issue.user.login}
          </a>
          <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>·</span>
          {format(new Date(issue.created_at), 'MMM d, yyyy')}
        </div>
      </div>
      
      {decisionReason && (
        <div style={{ 
          marginTop: '1.25rem', 
          padding: '1rem', 
          background: 'var(--bg-secondary)', 
          borderRadius: 'var(--radius)',
          borderLeft: '2px solid var(--accent)'
        }}>
          <div style={{ 
            fontSize: '0.6875rem', 
            fontWeight: '500', 
            marginBottom: '0.375rem', 
            color: 'var(--text-tertiary)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            Editor Note
            {decidedBy && <span style={{ fontWeight: '400' }}> — @{decidedBy}</span>}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {decisionReason}
          </div>
        </div>
      )}
    </div>
  )
}
