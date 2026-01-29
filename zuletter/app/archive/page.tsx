import Nav from '@/components/Nav'
import { fetchNewsletters, getRepoPath } from '@/lib/github'
import { localNewsletter } from '@/lib/newsletter-content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const revalidate = 300 // Cache for 5 minutes

export default async function ArchivePage() {
  const newsletters = await fetchNewsletters()
  const repoPath = getRepoPath()

  // When repo has no newsletters yet, show local fallback with verify link to this repo
  const allNewsletters =
    newsletters.length > 0
      ? newsletters
      : [
          {
            ...localNewsletter,
            sha: undefined,
            sourceRepo: repoPath,
            htmlUrl: `https://github.com/${repoPath}/blob/main/zuletter/public/newsletters/${localNewsletter.cycle}.md`,
          },
        ]
  
  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '900px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ marginBottom: '0.75rem' }}>
            Archive
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            A complete record of past ZuLetter issues. Each edition is permanently stored 
            and cryptographically verifiable through GitHub.
          </p>
        </header>
        
        {allNewsletters.length === 0 ? (
          <div className="card" style={{ padding: '2rem' }}>
            <p className="text-secondary" style={{ margin: 0 }}>No issues published yet.</p>
          </div>
        ) : (
          <div>
            {allNewsletters.map(newsletter => (
              <article key={newsletter.cycle} className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{newsletter.title}</h2>
                    <div className="text-secondary" style={{ fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Cycle:</span> {newsletter.cycle}
                      {newsletter.editors.length > 0 && (
                        <>
                          <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    {newsletter.htmlUrl && (
                      <a
                        href={newsletter.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8125rem' }}
                      >
                        Verify on GitHub
                      </a>
                    )}
                    {newsletter.sha && (
                      <span className="text-tertiary" style={{ fontSize: '0.6875rem', fontFamily: 'monospace' }}>
                        SHA: {newsletter.sha.substring(0, 7)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {newsletter.content}
                  </ReactMarkdown>
                </div>
                
                {newsletter.htmlUrl && (
                  <footer style={{ 
                    marginTop: '1.5rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid var(--border)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-tertiary)'
                  }}>
                    This edition is permanently stored and verifiable.{' '}
                    <a href={newsletter.htmlUrl} target="_blank" rel="noopener noreferrer">
                      View source on GitHub
                    </a>
                    {newsletter.sha && (
                      <span style={{ fontFamily: 'monospace' }}> · {newsletter.sha.substring(0, 7)}</span>
                    )}
                  </footer>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
