import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link 
            href="/" 
            style={{ 
              fontSize: '1.125rem', 
              fontWeight: '500', 
              color: 'var(--text-primary)', 
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif'
            }}
          >
            ZuLetter
          </Link>
          <div className="nav-links">
            <Link href="/submit" className="nav-link">
              Submit
            </Link>
            <Link href="/crossword" className="nav-link">
              Crossword
            </Link>
            <Link href="/archive" className="nav-link">
              Archive
            </Link>
            <Link href="/how-decisions-work" className="nav-link">
              Process
            </Link>
            <Link href="/editor" className="nav-link">
              Editor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
