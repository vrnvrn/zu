import Nav from '@/components/Nav'
import { fetchLocalArchiveNewsletters } from '@/lib/github'

function formatDate(date: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const parts = date.split('-')
  if (parts.length >= 2) {
    const month = months[parseInt(parts[1], 10) - 1]
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10)
      return `${month} ${day}, ${parts[0]}`
    }
    return `${month} ${parts[0]}`
  }
  return date
}

export default function ArchivePage() {
  const newsletters = fetchLocalArchiveNewsletters()

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '900px' }}>
        <header style={{ marginBottom: '3rem' }}>
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
              History
            </span>
          </div>
          <h1 style={{ marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
            Archive
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            A complete record of past ZuLetter issues.
          </p>
        </header>

        {newsletters.length === 0 ? (
          <div className="card" style={{ padding: '2rem' }}>
            <p className="text-secondary" style={{ margin: 0 }}>No issues published yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {newsletters.map(newsletter => (
              <a
                key={newsletter.cycle}
                href={`/archive/${newsletter.cycle}`}
                className="card"
                style={{
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h2 style={{
                    marginTop: 0,
                    marginBottom: '0.375rem',
                    fontSize: '1.125rem',
                    letterSpacing: '0.02em',
                  }}>
                    {newsletter.title}
                  </h2>
                  <div className="text-secondary" style={{ fontSize: '0.8125rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                    <span>{formatDate(newsletter.cycle)}</span>
                    {newsletter.edition && (
                      <>
                        <span style={{ margin: '0 0.25rem', opacity: 0.4 }}>&middot;</span>
                        <span>{newsletter.edition}</span>
                      </>
                    )}
                    {newsletter.editors.length > 0 && (
                      <>
                        <span style={{ margin: '0 0.25rem', opacity: 0.4 }}>&middot;</span>
                        <span style={{ color: 'var(--text-tertiary)' }}>by</span>{' '}
                        <span>{newsletter.editors.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
