import Nav from '@/components/Nav'
import Link from 'next/link'
import Image from 'next/image'
import { fetchIssue, fetchIssueComments, processIssuesIntoItems } from '@/lib/github'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const revalidate = 60

export default async function ItemDetailPage({
  params,
}: {
  params: { number: string }
}) {
  const issueNumber = parseInt(params.number)
  const issue = await fetchIssue(issueNumber)
  
  if (!issue) {
    return (
      <>
        <Nav />
        <div className="container">
          <div className="card">
            <h1>Item Not Found</h1>
            <p>The requested item could not be found.</p>
          </div>
        </div>
      </>
    )
  }
  
  const comments = await fetchIssueComments(issueNumber)
  const items = await processIssuesIntoItems([issue])
  const item = items[0]
  
  const decisionComment = item.decisionComment
  
  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/" className="text-secondary" style={{ fontSize: '14px' }}>
            ← Back to Current Cycle
          </Link>
        </div>
        
        <div className="card">
          <div className="flex-between mb-16">
            <div className="flex gap-8">
              <span className={`badge badge-state-${item.state}`}>
                {item.state}
              </span>
              {item.category && (
                <span className="badge badge-category">
                  {item.category}
                </span>
              )}
              {item.cycle && (
                <span className="badge badge-category">
                  cycle: {item.cycle}
                </span>
              )}
            </div>
            <a 
              href={issue.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View on GitHub
            </a>
          </div>
          
          <h1 style={{ marginBottom: '16px' }}>{issue.title}</h1>
          
          <div className="text-secondary mb-24">
            Submitted by{' '}
            <a href={issue.user.html_url} target="_blank" rel="noopener noreferrer">
              @{issue.user.login}
            </a>
            {' on '}
            {format(new Date(issue.created_at), 'MMMM d, yyyy')}
            {issue.updated_at !== issue.created_at && (
              <>
                {' · Updated '}
                {format(new Date(issue.updated_at), 'MMMM d, yyyy')}
              </>
            )}
          </div>
          
          {issue.body && (
            <div className="markdown-content" style={{ marginBottom: '32px' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {issue.body}
              </ReactMarkdown>
            </div>
          )}
          
          {decisionComment && (
            <div style={{ 
              marginTop: '32px', 
              padding: '20px', 
              background: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius)',
              borderLeft: '4px solid var(--accent)'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Decision</h3>
              {item.decidedBy && (
                <p className="text-secondary" style={{ marginBottom: '8px' }}>
                  Decided by <a href={`https://github.com/${item.decidedBy}`} target="_blank" rel="noopener noreferrer">
                    @{item.decidedBy}
                  </a>
                  {' on '}
                  {format(new Date(decisionComment.created_at), 'MMMM d, yyyy')}
                </p>
              )}
              {item.decisionReason && (
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {decisionComment.body}
                  </ReactMarkdown>
                </div>
              )}
              <div style={{ marginTop: '12px' }}>
                <a 
                  href={decisionComment.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary"
                  style={{ fontSize: '13px' }}
                >
                  View decision comment on GitHub →
                </a>
              </div>
            </div>
          )}
        </div>
        
        {comments.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h2>Comments ({comments.length})</h2>
            {comments.map(comment => (
              <div key={comment.id} className="card" style={{ marginBottom: '16px' }}>
                <div className="flex-between mb-12">
                  <div className="flex gap-12" style={{ alignItems: 'center' }}>
                    <Image 
                      src={comment.user.avatar_url} 
                      alt={comment.user.login}
                      width={32}
                      height={32}
                      style={{ borderRadius: '50%' }}
                    />
                    <div>
                      <a 
                        href={comment.user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ fontWeight: '600' }}
                      >
                        @{comment.user.login}
                      </a>
                      <div className="text-tertiary">
                        {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={comment.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary"
                    style={{ fontSize: '12px' }}
                  >
                    View →
                  </a>
                </div>
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {comment.body}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

