import Nav from '@/components/Nav'
import ItemCard from '@/components/ItemCard'
import Link from 'next/link'
import { fetchIssuesForCycle, processIssuesIntoItems, getCurrentCycle } from '@/lib/github'
import { NewsletterItem } from '@/lib/types'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const cycle = await getCurrentCycle()
  const issues = await fetchIssuesForCycle(cycle)
  const items = await processIssuesIntoItems(issues)
  
  const shortlisted = items.filter(item => item.state === 'shortlisted')
  const accepted = items.filter(item => item.state === 'accepted')
  const submitted = items.filter(item => item.state === 'submitted')
  
  return (
    <>
      <Nav />
      <div className="container">
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '12px' }}>
            📬 Community Newsletter
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Welcome! Here's what's happening in our community this cycle. 
            Every item is transparently tracked and open for everyone to see.
          </p>
          <div style={{ 
            marginTop: '24px', 
            padding: '16px 24px', 
            background: 'var(--accent-light)', 
            borderRadius: 'var(--radius)', 
            display: 'inline-block',
            fontSize: '14px',
            color: 'var(--text-primary)'
          }}>
            <strong>Current Cycle:</strong> {cycle}
          </div>
        </header>

        {/* Featured Newsletter */}
        <section style={{ marginBottom: '48px' }}>
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, #fff 0%, var(--bg-tertiary) 100%)',
            border: '2px solid var(--accent)',
            padding: '32px'
          }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '36px', marginBottom: '8px', color: 'var(--accent)' }}>
                ✨ Featured: 2024 Retrospective
              </h2>
              <p className="text-secondary" style={{ fontSize: '16px' }}>
                A look back at an incredible year in the Zu-niverse
              </p>
            </div>
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Link href="/retrospective" className="btn btn-primary" style={{ fontSize: '18px', padding: '14px 28px' }}>
                📖 Read the Full Retrospective
              </Link>
              <p className="text-secondary" style={{ marginTop: '12px', fontSize: '14px' }}>
                View the complete newsletter with all photos and original formatting
              </p>
            </div>
          </div>
        </section>
        
        <div className="grid-two-col">
          <section>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⭐ Shortlisted 
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'normal', 
                color: 'var(--text-secondary)' 
              }}>
                ({shortlisted.length})
              </span>
            </h2>
            {shortlisted.length > 0 ? (
              shortlisted.map(item => (
                <ItemCard key={item.issue.id} item={item} />
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                <p className="text-secondary" style={{ fontSize: '16px' }}>
                  ✨ No items shortlisted yet. Check back soon!
                </p>
              </div>
            )}
          </section>
          
          <section>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✅ Accepted 
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'normal', 
                color: 'var(--text-secondary)' 
              }}>
                ({accepted.length})
              </span>
            </h2>
            {accepted.length > 0 ? (
              accepted.map(item => (
                <ItemCard key={item.issue.id} item={item} />
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                <p className="text-secondary" style={{ fontSize: '16px' }}>
                  🎉 No items accepted yet. Check back soon!
                </p>
              </div>
            )}
          </section>
        </div>
        
        {submitted.length > 0 && (
          <section style={{ marginTop: '48px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              📝 New Submissions 
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'normal', 
                color: 'var(--text-secondary)' 
              }}>
                ({submitted.length})
              </span>
            </h2>
            <p className="text-secondary" style={{ marginBottom: '20px' }}>
              These items are waiting to be reviewed by our editors.
            </p>
            {submitted.map(item => (
              <ItemCard key={item.issue.id} item={item} />
            ))}
          </section>
        )}
      </div>
    </>
  )
}

