import Nav from '@/components/Nav'
import { fetchLocalArchiveNewsletters } from '@/lib/github'
import { Newsletter } from '@/lib/types'
import MarkdownRenderer from './MarkdownRenderer'

export function generateStaticParams() {
  const newsletters = fetchLocalArchiveNewsletters()
  return newsletters.map(n => ({
    slug: n.cycle,
  }))
}

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

export default function NewsletterPage({ params }: { params: { slug: string } }) {
  const newsletters = fetchLocalArchiveNewsletters()
  const newsletter: Newsletter | undefined = newsletters.find(n => n.cycle === params.slug)

  if (!newsletter) {
    return (
      <>
        <Nav />
        <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
          <h1>Newsletter not found</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Could not find a newsletter for &quot;{params.slug}&quot;.
          </p>
          <a href="/archive" style={{ color: 'var(--accent)' }}>Back to archive</a>
        </div>
      </>
    )
  }

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '800px' }}>
        <header style={{ marginBottom: '2rem', paddingTop: '1rem' }}>
          <a
            href="/archive"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-tertiary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginBottom: '1.5rem',
            }}
          >
            &larr; Back to archive
          </a>
          <h1 style={{ marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
            {newsletter.title}
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span>{formatDate(newsletter.cycle)}</span>
            {newsletter.edition && (
              <>
                <span style={{ opacity: 0.4 }}>&middot;</span>
                <span>{newsletter.edition}</span>
              </>
            )}
            {newsletter.editors.length > 0 && (
              <>
                <span style={{ opacity: 0.4 }}>&middot;</span>
                <span>by {newsletter.editors.join(', ')}</span>
              </>
            )}
          </div>
        </header>

        <article className="newsletter-content">
          <MarkdownRenderer content={newsletter.content} />
        </article>
      </div>

      <style>{`
        .newsletter-content {
          line-height: 1.8;
          color: var(--text-primary);
          padding-bottom: 4rem;
        }
        .newsletter-content h1,
        .newsletter-content h2,
        .newsletter-content h3,
        .newsletter-content h4 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }
        .newsletter-content h2 {
          font-size: 1.375rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .newsletter-content h3 {
          font-size: 1.125rem;
        }
        .newsletter-content p {
          margin-bottom: 1rem;
        }
        .newsletter-content a {
          color: var(--accent);
        }
        .newsletter-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .newsletter-content ul,
        .newsletter-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .newsletter-content li {
          margin-bottom: 0.375rem;
        }
        .newsletter-content blockquote {
          border-left: 3px solid var(--accent);
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          color: var(--text-secondary);
        }
        .newsletter-content pre {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .newsletter-content code {
          font-size: 0.875em;
        }
        .newsletter-content hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2rem 0;
        }
      `}</style>
    </>
  )
}
