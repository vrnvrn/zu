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
          className="text-secondary"
          style={{ fontSize: '12px' }}
        >
          View on GitHub →
        </a>
      </div>
      
      <Link href={`/item/${issue.number}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <h3 style={{ marginTop: 0, marginBottom: '8px', cursor: 'pointer' }}>{issue.title}</h3>
      </Link>
      
      {issue.body && (
        <p className="text-secondary" style={{ marginBottom: '12px' }}>
          {issue.body.substring(0, 200)}
          {issue.body.length > 200 ? '...' : ''}
        </p>
      )}
      
      <div className="flex-between mt-16">
        <div className="text-tertiary">
          by <a href={issue.user.html_url} target="_blank" rel="noopener noreferrer">
            @{issue.user.login}
          </a>
          {' · '}
          {format(new Date(issue.created_at), 'MMM d, yyyy')}
        </div>
      </div>
      
      {decisionReason && (
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          background: 'linear-gradient(135deg, var(--accent-light) 0%, #fef4ec 100%)', 
          borderRadius: 'var(--radius-sm)',
          borderLeft: '4px solid var(--accent)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            💬 Editor&#39;s Note
            {decidedBy && ` from @${decidedBy}`}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            {decisionReason}
          </div>
        </div>
      )}
    </div>
  )
}

