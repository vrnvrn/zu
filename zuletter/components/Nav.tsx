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
              ZuZone
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/january-2026" className="nav-link" style={{ fontWeight: 500 }}>
              January 2026
            </Link>
            <Link href="/submit" className="nav-link">
              Submit
            </Link>
            <Link href="/crossword" className="nav-link">
              Crossword
            </Link>
            <Link href="/archive" className="nav-link">
              Archive
            </Link>
            <a 
              href="https://github.com/vrnvrn/zu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
              style={{ display: 'flex', alignItems: 'center' }}
              title="View on GitHub"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
