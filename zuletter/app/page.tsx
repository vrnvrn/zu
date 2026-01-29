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
        {/* Hero Section with Zuzalu branding */}
        <header style={{ marginBottom: '3rem', maxWidth: '680px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--yellow)',
              boxShadow: '0 0 8px rgba(232, 213, 86, 0.5)'
            }} />
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: '500', 
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Zuzalu Community
            </span>
          </div>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            letterSpacing: '0.04em'
          }}>
            ZuLetter
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.75',
            maxWidth: '560px'
          }}>
            A transparent, community-curated newsletter for the Zuzalu ecosystem. 
            All submissions and editorial decisions are publicly tracked.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 1rem',
              background: 'var(--accent-subtle)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--accent-muted)'
            }}>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Current Cycle</span>
              <span style={{ 
                fontWeight: '600', 
                color: 'var(--accent)',
                fontSize: '0.875rem'
              }}>{cycle}</span>
            </div>
          </div>
        </header>

        {/* Latest Issue - Hero Card */}
        <section style={{ marginBottom: '2rem' }}>
          <div className="hero-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '0.75rem' 
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.25rem 0.625rem',
                background: 'var(--accent)',
                color: 'white',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.6875rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <span className="pulse-animation" style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--yellow)'
                }} />
                Latest Issue
              </span>
            </div>
            <h2 style={{ 
              fontSize: '1.75rem', 
              marginTop: 0, 
              marginBottom: '0.625rem',
              letterSpacing: '0.02em'
            }}>
              Zuzalu Newsletter — January 2026
            </h2>
            <p className="text-secondary" style={{ marginBottom: '1.5rem', maxWidth: '520px' }}>
              Updates from Edge City, Ârc Montenegro, ZuAfrique, Invisible Garden, 
              Valley of the Commons, and more from across our global network.
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/january-2026" className="btn btn-accent" style={{ 
                padding: '0.75rem 1.5rem',
                fontSize: '0.9375rem'
              }}>
                Read the Newsletter
              </Link>
            </div>
          </div>
        </section>

        {/* Events Calendar */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="feature-card">
            <h2 style={{ 
              fontSize: '1.375rem', 
              marginTop: 0, 
              marginBottom: '0.625rem',
              letterSpacing: '0.02em'
            }}>
              Community Events
            </h2>
            <p className="text-secondary" style={{ marginBottom: '1.25rem', maxWidth: '500px' }}>
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
            
            <iframe
              src="https://luma.com/embed/calendar/cal-EYB4wNm2FHpKE2n/events?lt=light"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: '1px solid #bfcbda88', borderRadius: '4px', marginBottom: '1.25rem', maxWidth: '100%' }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
            
            <a 
              href="https://lu.ma/zuzalutownhall" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-yellow"
              style={{ textDecoration: 'none' }}
            >
              View Calendar on Luma
            </a>
          </div>
        </section>
        
        {submitted.length > 0 && (
          <section style={{ marginTop: '3rem', paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                display: 'flex', 
                alignItems: 'baseline', 
                gap: '0.75rem',
                marginTop: 0,
                marginBottom: '0.5rem',
                letterSpacing: '0.02em'
              }}>
                Pending Submissions
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: 'white',
                  background: 'var(--accent)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
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
