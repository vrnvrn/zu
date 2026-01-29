import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link 
            href="/" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              textDecoration: 'none'
            }}
          >
            {/* Zuzalu-inspired logo mark */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent) 0%, #3d8574 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(45, 107, 93, 0.2)'
            }}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9v.01" />
                <path d="M9 12v.01" />
                <path d="M9 15v.01" />
                <path d="M9 18v.01" />
              </svg>
            </div>
            <span 
              className="zu-wordmark"
              style={{ 
                fontSize: '1rem', 
                color: 'var(--accent)',
              }}
            >
              ZuLetter
            </span>
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
          </div>
        </div>
      </div>
    </nav>
  )
}
