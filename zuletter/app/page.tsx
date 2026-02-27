import Nav from '@/components/Nav'
import ItemCard from '@/components/ItemCard'
import Link from 'next/link'
import { fetchIssuesForCycle, processIssuesIntoItems, getCurrentCycle } from '@/lib/github'

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
        {/* Hero Section - Zuzone */}
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
              Zuzalu Ecosystem
            </span>
          </div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '0.75rem',
            letterSpacing: '0.08em',
            fontWeight: '800'
          }}>
            ZUZONE
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-primary)', 
            lineHeight: '1.6',
            maxWidth: '600px',
            fontWeight: '500',
            marginBottom: '1.25rem'
          }}>
            The home for all permanent hubs and pop-up cities.
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.75',
            maxWidth: '600px',
            marginBottom: '1.25rem'
          }}>
            Zuzone is the connective layer for the Zuzalu ecosystem, a shared home where permanent hubs and pop-up cities come together, learn from each other, and grow as one global community.
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.75',
            maxWidth: '600px',
            marginBottom: '1.5rem'
          }}>
            Born from the spirit of Zuzalu, Zuzone exists to make sure that what we are building across the world stays aligned, supported, transparent, and human. It is a space for coordination, care, and collective progress.
          </p>
          
          <div style={{ 
            padding: '1.25rem 1.5rem',
            background: 'var(--accent-subtle)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--accent-muted)',
            marginBottom: '0.5rem'
          }}>
            <h3 style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: 'var(--accent)',
              marginTop: 0,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Our Mission
            </h3>
            <p style={{ 
              fontSize: '0.9375rem', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.6',
              margin: 0
            }}>
            Helping hubs build, grow sustainably, and collaborate across the ecosystem. Creating a stronger, more connected global network in a Zuzalu-aligned way.
            </p>
          </div>
        </header>

        {/* ZuLetter Section */}
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
                ZuLetter
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-tertiary)'
              }}>
                Community Newsletter
              </span>
            </div>
            <h2 style={{ 
              fontSize: '1.75rem', 
              marginTop: 0, 
              marginBottom: '0.625rem',
              letterSpacing: '0.02em'
            }}>
              January 2026 Edition
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
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <iframe
                src="https://luma.com/embed/calendar/cal-EYB4wNm2FHpKE2n/events?lt=light"
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: '1px solid #bfcbda88', borderRadius: '4px', marginBottom: '0.75rem', maxWidth: '100%' }}
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

        <footer style={{ 
          marginTop: '4rem', 
          padding: '2rem 0',
          borderTop: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Follow us on X
          </p>
          <a 
            href="https://x.com/zuzones" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--accent)'
            }}
          >
            @zuzones
          </a>
        </footer>
      </div>
    </>
  )
}
