import Nav from '@/components/Nav'
import { getRepoPath } from '@/lib/github'

export default function HowDecisionsWorkPage() {
  const repoPath = getRepoPath()
  
  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '720px' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center', paddingTop: '2rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            background: 'var(--accent-subtle)',
            border: '1px solid var(--accent-muted)',
            borderRadius: 'var(--radius)',
            marginBottom: '1.5rem'
          }}>
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: '500',
              color: 'var(--accent)',
              letterSpacing: '0.05em'
            }}>
              Under Construction
            </span>
          </div>
          <h1 style={{ marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
            Editorial Process
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            This page is being built. It will document how ZuLetter operates with full
            transparency — every submission, editorial decision, and published issue.
          </p>
        </header>
        
        <section className="feature-card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
          <h2 style={{ marginTop: 0, letterSpacing: '0.02em' }}>Workflow</h2>
          
          <div style={{ 
            margin: '1.5rem 0',
            padding: '1.25rem',
            background: 'white',
            borderRadius: 'var(--radius)',
            borderLeft: '3px solid var(--accent)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--accent)' }}>1. Collection</h3>
            <p className="text-secondary" style={{ margin: 0 }}>
              Community members submit items through the submission form. Each submission 
              is automatically tracked as a GitHub issue with appropriate labels.
            </p>
          </div>
          
          <div style={{ 
            margin: '1.5rem 0',
            padding: '1.25rem',
            background: 'white',
            borderRadius: 'var(--radius)',
            borderLeft: '3px solid var(--yellow)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--accent)' }}>2. Review</h3>
            <p className="text-secondary" style={{ margin: 0 }}>
              Editors review submissions and may shortlist items for further consideration. 
              The review process considers relevance, timeliness, and community value.
            </p>
          </div>
          
          <div style={{ 
            margin: '1.5rem 0',
            padding: '1.25rem',
            background: 'white',
            borderRadius: 'var(--radius)',
            borderLeft: '3px solid var(--accent)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--accent)' }}>3. Decision</h3>
            <p className="text-secondary" style={{ marginBottom: '1rem' }}>
              Each item receives a documented decision:
            </p>
            <ul style={{ 
              fontSize: '0.9375rem', 
              color: 'var(--text-secondary)', 
              marginLeft: '1.25rem',
              lineHeight: '1.8'
            }}>
              <li><strong>Accepted</strong> — Included in the upcoming issue</li>
              <li><strong>Rejected</strong> — Not suitable for this cycle</li>
              <li><strong>Deferred</strong> — Postponed to a future issue</li>
            </ul>
            <p className="text-secondary" style={{ marginTop: '1rem', marginBottom: 0 }}>
              All decisions include a written explanation for accountability.
            </p>
          </div>
          
          <div style={{ 
            margin: '1.5rem 0 0 0',
            padding: '1.25rem',
            background: 'white',
            borderRadius: 'var(--radius)',
            borderLeft: '3px solid var(--yellow)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--accent)' }}>4. Publication</h3>
            <p className="text-secondary" style={{ margin: 0 }}>
              Accepted items are compiled into the newsletter, organized by section, 
              and published. All issues are permanently archived.
            </p>
          </div>
        </section>
        
        <section className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
          <h2 style={{ marginTop: 0, letterSpacing: '0.02em' }}>Decision Format</h2>
          <p className="text-secondary">
            Editorial decisions are recorded as structured comments on each submission:
          </p>
          <pre style={{ 
            background: 'linear-gradient(135deg, var(--accent-subtle) 0%, var(--bg-tertiary) 100%)', 
            padding: '1.25rem', 
            borderRadius: 'var(--radius)',
            fontSize: '0.875rem',
            border: '1px solid var(--accent-muted)',
            overflowX: 'auto',
            color: 'var(--accent-dark)'
          }}>
{`Decision: accepted
Reason: High relevance, actionable content
Editor: @handle
Section: Events`}
          </pre>
        </section>
        
        <section className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>Verifiability</h2>
          <p className="text-secondary" style={{ marginBottom: '1rem' }}>
            Every published item maintains a complete audit trail:
          </p>
          <ul style={{ 
            fontSize: '0.9375rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem',
            lineHeight: '1.8'
          }}>
            <li>Original submission (GitHub issue)</li>
            <li>Decision comment with reasoning</li>
            <li>Git commit including the item</li>
            <li>Published newsletter archive</li>
          </ul>
        </section>
        
        <section className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>Labels</h2>
          
          <h3>State Labels</h3>
          <ul style={{ 
            fontSize: '0.9375rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem',
            lineHeight: '1.8',
            marginBottom: '1.5rem'
          }}>
            <li><code>state:submitted</code> — Awaiting review</li>
            <li><code>state:shortlisted</code> — Under consideration</li>
            <li><code>state:accepted</code> — Will be published</li>
            <li><code>state:rejected</code> — Not included</li>
            <li><code>state:deferred</code> — Postponed</li>
          </ul>
          
          <h3>Cycle Labels</h3>
          <ul style={{ 
            fontSize: '0.9375rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem',
            lineHeight: '1.8',
            marginBottom: '1.5rem'
          }}>
            <li><code>cycle:YYYY-MM-DD</code> — Associates items with a specific issue</li>
          </ul>
          
          <h3>Category Labels</h3>
          <ul style={{ 
            fontSize: '0.9375rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem',
            lineHeight: '1.8'
          }}>
            <li><code>category:events</code> — Events and gatherings</li>
            <li><code>category:wins</code> — Community achievements</li>
            <li><code>category:updates</code> — Announcements</li>
            <li><code>category:requests</code> — Requests for assistance</li>
            <li><code>category:jobs</code> — Opportunities</li>
            <li><code>category:research</code> — Research and publications</li>
            <li><code>category:media</code> — Articles, videos, media</li>
          </ul>
        </section>
        
        <section className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>Further Reading</h2>
          <ul style={{ 
            fontSize: '0.9375rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem',
            lineHeight: '2'
          }}>
            <li>
              <a href={`https://github.com/${repoPath}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
                Repository Documentation
              </a>
            </li>
            <li>
              <a href={`https://github.com/${repoPath}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
                Contribution Guidelines
              </a>
            </li>
            <li>
              <a href={`https://github.com/${repoPath}/issues`} target="_blank" rel="noopener noreferrer">
                All Submissions
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
