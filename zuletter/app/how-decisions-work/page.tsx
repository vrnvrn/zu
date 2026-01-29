import Nav from '@/components/Nav'
import { getRepoPath } from '@/lib/github'

export default function HowDecisionsWorkPage() {
  const repoPath = getRepoPath()
  
  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '800px' }}>
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '12px' }}>
            How Decisions Work
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Our curation process is fully transparent and auditable on GitHub.
          </p>
        </header>
        
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2>The Process</h2>
          
          <div style={{ display: 'grid', gap: '20px', marginTop: '16px' }}>
            <div>
              <strong>1. Submit</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                Community members submit items through our form. Each becomes a GitHub issue.
              </p>
            </div>
            
            <div>
              <strong>2. Review</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                Editors review submissions and decide: <strong>Accept</strong>, <strong>Reject</strong>, or <strong>Defer</strong> to a future cycle.
              </p>
            </div>
            
            <div>
              <strong>3. Publish</strong>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                Accepted items are compiled into the newsletter and archived permanently.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2>Verifiability</h2>
          <p>Every decision is traceable:</p>
          <ul>
            <li>Original submission (GitHub issue)</li>
            <li>Editor decision with reasoning (issue comment)</li>
            <li>Final newsletter (committed to repository)</li>
          </ul>
        </div>
        
        <div className="card">
          <h2>Learn More</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
            <a 
              href={`https://github.com/${repoPath}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View Repository
            </a>
            <a 
              href={`https://github.com/${repoPath}/blob/main/CONTRIBUTING.md`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Contributing Guidelines
            </a>
            <a 
              href={`https://github.com/${repoPath}/issues`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              All Submissions
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

