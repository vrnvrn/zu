import Nav from '@/components/Nav'

export default function SubmitPage() {
  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '680px' }}>
        <header style={{ marginBottom: '2.5rem' }}>
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
              background: 'var(--accent)',
              boxShadow: '0 0 8px rgba(22, 101, 52, 0.3)'
            }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Contribute
            </span>
          </div>
          <h1 style={{ marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
            Submit Your February Updates
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            Email your updates for the February 2026 issue of ZuLetter to{' '}
            <a href="mailto:hi@zuzone.org" style={{ fontWeight: 600 }}>hi@zuzone.org</a>.
          </p>
        </header>

        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.125rem' }}>
            What to include
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Use the template below as a guide. Copy it into your email and fill in the details.
          </p>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            fontFamily: 'monospace',
            fontSize: '0.8125rem',
            lineHeight: '1.9',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
          }}>
{`Subject: [ZuLetter Feb] Your Hub / Project Name

Hub / Project Name:
One-line tagline:

--- Update ---

What happened this month:
(2–4 sentences summarizing your key updates)

What's coming next:
(Upcoming events, launches, milestones)

--- Links & CTAs ---

Main link: https://...
Apply / Register: https://...
Announcement: https://...

--- Images ---

Please attach 1–3 images (landscape preferred).
Include captions or alt text if possible.

--- Contact ---

Your name or handle:
Preferred attribution:`}
          </div>
        </div>

        <div style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <p style={{
              fontSize: '0.6875rem',
              fontWeight: '600',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
              marginTop: 0,
            }}>
              Images
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
              Attach photos directly to the email. Landscape orientation, high resolution preferred. We&apos;ll credit your hub.
            </p>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <p style={{
              fontSize: '0.6875rem',
              fontWeight: '600',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
              marginTop: 0,
            }}>
              Clear CTAs
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
              Include direct links for &quot;Apply&quot;, &quot;Register&quot;, or &quot;Learn more&quot; so readers can take action immediately.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a
            href="mailto:hi@zuzone.org?subject=[ZuLetter Feb] Your Hub / Project Name"
            className="btn btn-accent"
            style={{
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email hi@zuzone.org
          </a>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.75rem' }}>
            Deadline: end of February 2026
          </p>
        </div>
      </div>
    </>
  )
}
