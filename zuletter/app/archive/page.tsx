import Nav from '@/components/Nav'
import { fetchNewsletters, getRepoPath } from '@/lib/github'

export const revalidate = 300 // Cache for 5 minutes

// Human-readable date from cycle string (e.g. "2024-12-31" -> "December 31, 2024")
function formatCycleDate(cycle: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const parts = cycle.split('-')
  if (parts.length === 3) {
    const month = months[parseInt(parts[1], 10) - 1]
    const day = parseInt(parts[2], 10)
    return `${month} ${day}, ${parts[0]}`
  }
  if (parts.length === 2) {
    const month = months[parseInt(parts[1], 10) - 1]
    return `${month} ${parts[0]}`
  }
  return cycle
}

export default async function ArchivePage() {
  const newsletters = await fetchNewsletters()
  const repoPath = getRepoPath()

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
            A complete record of past ZuLetter issues. Each edition is permanently stored
            and cryptographically verifiable through GitHub.
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
                    <span style={{ color: 'var(--text-tertiary)' }}>Cycle:</span>{' '}
                    <span>{formatCycleDate(newsletter.cycle)}</span>
                    {newsletter.editors.length > 0 && (
                      <>
                        <span style={{ margin: '0 0.25rem', opacity: 0.4 }}>·</span>
                        <span style={{ color: 'var(--text-tertiary)' }}>Editors:</span>{' '}
                        {newsletter.editors.map((editor, i) => (
                          <span key={editor}>
                            <a
                              href={`https://github.com/${editor.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {editor}
                            </a>
                            {i < newsletter.editors.length - 1 && ', '}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                  {newsletter.sha && (
                    <span className="text-tertiary" style={{ fontSize: '0.6875rem', fontFamily: 'monospace' }}>
                      SHA: {newsletter.sha.substring(0, 7)}
                    </span>
                  )}
                  {newsletter.htmlUrl && (
                    <a
                      href={newsletter.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
                    >
                      Verify on GitHub
                    </a>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
