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
            🤔 How Decisions Work
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            We believe in transparency! Here's how we decide what makes it into our newsletter.
            Everything is open and auditable so you can see exactly how we curate content.
          </p>
        </header>
        
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2>The Process</h2>
          
          <h3>1. 📥 Collect</h3>
          <p>
            Community members like you submit items through our simple form. Each submission is automatically
            organized and labeled so we can track it through the process.
          </p>
          
          <h3>2. ⭐ Shortlist</h3>
          <p>
            Our editors review all submissions and highlight items that look promising. 
            These shortlisted items are being actively considered for the newsletter.
          </p>
          
          <h3>3. ✅ Decide</h3>
          <p>
            Editors make thoughtful decisions about each item:
          </p>
          <ul>
            <li><strong>Accepted</strong> — Will be included in the newsletter! 🎉</li>
            <li><strong>Rejected</strong> — Not a fit for this cycle, but we appreciate the submission</li>
            <li><strong>Deferred</strong> — Great idea, but better suited for a future newsletter</li>
          </ul>
          <p>
            Every decision includes a comment explaining the reasoning, so you always know why.
          </p>
          
          <p>
            Decision comments follow this format:
          </p>
          <pre style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '16px', 
            borderRadius: 'var(--radius)',
            overflowX: 'auto'
          }}>
{`Decision: accepted
Reason: high relevance + actionable
Editor: @handle
Section: Events`}
          </pre>
          
          <h3>4. 📤 Publish</h3>
          <p>
            Once items are accepted, editors compile them into a beautiful newsletter:
          </p>
          <ul>
            <li>All accepted items are organized into sections</li>
            <li>The newsletter is published and archived permanently</li>
            <li>You can always go back and see what was included</li>
          </ul>
          <p>
            Every newsletter is preserved forever, so you can always reference past issues!
          </p>
        </div>
        
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2>Verifiability</h2>
          <p>
            Every accepted item has:
          </p>
          <ul>
            <li>The original Issue URL (immutable record)</li>
            <li>A decision comment URL</li>
            <li>A commit that includes it in the newsletter file</li>
            <li>An optional release tag for the published snapshot</li>
          </ul>
          <p>
            All of this is publicly accessible on GitHub, making the entire process
            transparent and auditable.
          </p>
        </div>
        
        <div className="card">
          <h2>Labels</h2>
          <p>Labels help organize and track items:</p>
          
          <h3>State Labels</h3>
          <ul>
            <li><code>state:submitted</code> - Initial state when an item is submitted</li>
            <li><code>state:shortlisted</code> - Item is being considered</li>
            <li><code>state:accepted</code> - Item will be included in the newsletter</li>
            <li><code>state:rejected</code> - Item will not be included</li>
            <li><code>state:deferred</code> - Item is postponed to a future cycle</li>
          </ul>
          
          <h3>Cycle Labels</h3>
          <ul>
            <li><code>cycle:YYYY-MM-DD</code> - Associates an item with a specific newsletter cycle</li>
          </ul>
          
          <h3>Category Labels</h3>
          <ul>
            <li><code>category:events</code> - Events and meetups</li>
            <li><code>category:wins</code> - Community achievements</li>
            <li><code>category:updates</code> - Updates and announcements</li>
            <li><code>category:requests</code> - Requests for help or feedback</li>
            <li><code>category:jobs</code> - Job postings</li>
            <li><code>category:research</code> - Research and findings</li>
            <li><code>category:media</code> - Media, articles, videos</li>
          </ul>
        </div>
        
        <div className="card">
          <h2>Learn More</h2>
          <p>
            For more details, see:
          </p>
          <ul>
            <li>
              <a href={`https://github.com/${repoPath}`} target="_blank" rel="noopener noreferrer">
                Repository README
              </a>
            </li>
            <li>
              <a href={`https://github.com/${repoPath}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
                Contributing Guidelines
              </a>
            </li>
            <li>
              <a href={`https://github.com/${repoPath}/issues`} target="_blank" rel="noopener noreferrer">
                All Submissions (GitHub Issues)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

