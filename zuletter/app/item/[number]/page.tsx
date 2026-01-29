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
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h1 style={{ marginTop: 0 }}>Item Not Found</h1>
            <p className="text-secondary" style={{ margin: 0 }}>
              The requested submission could not be located.
            </p>
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
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" className="text-secondary link-subtle" style={{ fontSize: '0.875rem' }}>
            Back to Current Cycle
          </Link>
        </div>
        
        <article className="card" style={{ padding: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
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
                  {item.cycle}
                </span>
              )}
            </div>
            <a 
              href={issue.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.8125rem' }}
            >
              View on GitHub
            </a>
          </div>
          
          <h1 style={{ marginTop: 0, marginBottom: '1rem' }}>{issue.title}</h1>
          
          <div className="text-secondary" style={{ marginBottom: '2rem', fontSize: '0.9375rem' }}>
            <a 
              href={issue.user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-subtle"
            >
              @{issue.user.login}
            </a>
            <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
            {format(new Date(issue.created_at), 'MMMM d, yyyy')}
            {issue.updated_at !== issue.created_at && (
              <>
                <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
                <span style={{ color: 'var(--text-tertiary)' }}>
                  Updated {format(new Date(issue.updated_at), 'MMMM d, yyyy')}
                </span>
              </>
            )}
          </div>
          
          {issue.body && (
            <div className="markdown-content" style={{ marginBottom: '2rem' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {issue.body}
              </ReactMarkdown>
            </div>
          )}
          
          {decisionComment && (
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius)',
              borderLeft: '2px solid var(--accent)'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem' }}>
                Editorial Decision
              </h3>
              {item.decidedBy && (
                <p className="text-secondary" style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                  <a 
                    href={`https://github.com/${item.decidedBy}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-subtle"
                  >
                    @{item.decidedBy}
                  </a>
                  <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
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
              <div style={{ marginTop: '1rem' }}>
                <a 
                  href={decisionComment.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-tertiary link-subtle"
                  style={{ fontSize: '0.8125rem' }}
                >
                  View decision on GitHub
                </a>
              </div>
            </div>
          )}
        </article>
        
        {comments.length > 0 && (
          <section style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>
              Discussion
              <span style={{ 
                fontWeight: '400', 
                color: 'var(--text-tertiary)',
                marginLeft: '0.5rem',
                fontSize: '1rem'
              }}>
                {comments.length}
              </span>
            </h2>
            {comments.map(comment => (
              <div key={comment.id} className="card" style={{ marginBottom: '1rem', padding: '1.5rem' }}>
                <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
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
                        style={{ fontWeight: '500', color: 'var(--text-primary)' }}
                      >
                        @{comment.user.login}
                      </a>
                      <div className="text-tertiary" style={{ fontSize: '0.75rem' }}>
                        {format(new Date(comment.created_at), 'MMM d, yyyy · HH:mm')}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={comment.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-tertiary link-subtle"
                    style={{ fontSize: '0.75rem' }}
                  >
                    View
                  </a>
                </div>
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {comment.body}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  )
}
