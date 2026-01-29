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
  
  const submitted = items.filter(item => item.state === 'submitted')
  
  return (
    <>
      <Nav />
      <div className="container">
        <header style={{ marginBottom: '3rem', maxWidth: '640px' }}>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
            ZuLetter
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            A transparent, community-curated newsletter for the Zuzalu ecosystem. 
            All submissions and editorial decisions are publicly tracked.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <div className="info-box" style={{ display: 'inline-block' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Current Cycle:</span>{' '}
              <span style={{ fontWeight: '500' }}>{cycle}</span>
            </div>
          </div>
        </header>

        {/* Events Calendar */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="feature-card">
            <h2 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: '0.75rem' }}>
              Community Events
            </h2>
            <p className="text-secondary" style={{ marginBottom: '1.5rem', maxWidth: '540px' }}>
              Stay informed about upcoming town halls, workshops, and gatherings 
              across the Zuzalu network — and{' '}
              <a 
                href="https://lu.ma/zuzalutownhall" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontWeight: '600' }}
              >
                subscribe to the newsletter
              </a>{' '}
              here.
            </p>
            
            <a 
              href="https://lu.ma/zuzalutownhall" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{ textDecoration: 'none' }}
            >
              View Calendar on Luma
            </a>
          </div>
        </section>

        {/* Latest Issue */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="feature-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '0.5rem' 
            }}>
              <span className="status-dot status-dot-active"></span>
              <span className="text-small" style={{ 
                color: 'var(--success)', 
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Latest Issue
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: '0.5rem' }}>
              Zuzalu Newsletter - January 2026 Edition
            </h2>
            <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
              Updates from Edge City, Ârc Montenegro, ZuAfrique, Invisible Garden, 
              Valley of the Commons, and more from across our global network.
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/january-2026" className="btn btn-accent">
                Read the Newsletter
              </Link>
              <Link href="/retrospective" className="btn btn-secondary">
                2024 Retrospective
              </Link>
            </div>
          </div>
        </section>
        
        {submitted.length > 0 && (
          <section style={{ marginTop: '3rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                display: 'flex', 
                alignItems: 'baseline', 
                gap: '0.75rem',
                marginTop: 0,
                marginBottom: '0.5rem'
              }}>
                Pending Submissions
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: '400', 
                  color: 'var(--text-tertiary)',
                  fontFamily: 'inherit'
                }}>
                  {submitted.length}
                </span>
              </h2>
              <p className="text-secondary" style={{ margin: 0 }}>
                Items awaiting editorial review for the upcoming issue.
              </p>
            </div>
            {submitted.map(item => (
              <ItemCard key={item.issue.id} item={item} />
            ))}
          </section>
        )}
      </div>
    </>
  )
}
