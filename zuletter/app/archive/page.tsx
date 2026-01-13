import Nav from '@/components/Nav'
import { fetchNewsletters } from '@/lib/github'
import { localNewsletter } from '@/lib/newsletter-content'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const revalidate = 300 // Cache for 5 minutes

export default async function ArchivePage() {
  const newsletters = await fetchNewsletters()
  
  // Add local newsletter to the list if it's not already there
  const allNewsletters = newsletters.length > 0 
    ? newsletters 
    : [{
        ...localNewsletter,
        sha: undefined,
      }]
  
  return (
    <>
      <Nav />
      <div className="container">
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '12px' }}>
            💚 ZuLetter Archive 💚
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Take a trip down memory lane! Browse our past ZuLetters and see how our community has grown.
            Every ZuLetter is preserved and verifiable.
          </p>
        </header>
        
        {allNewsletters.length === 0 ? (
          <div className="card">
            <p className="text-secondary">No ZuLetters published yet.</p>
          </div>
        ) : (
          <div>
            {allNewsletters.map(newsletter => (
              <div key={newsletter.cycle} className="card" style={{ marginBottom: '24px' }}>
                <div className="flex-between mb-16">
                  <div>
                    <h2 style={{ marginBottom: '8px' }}>{newsletter.title}</h2>
                    <div className="text-secondary">
                      Cycle: {newsletter.cycle}
                      {newsletter.editors.length > 0 && (
                        <>
                          {' · Editors: '}
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <a 
                      href={newsletter.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Verify on GitHub
                    </a>
                    {newsletter.sha && (
                      <span className="text-tertiary" style={{ fontSize: '11px' }}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

