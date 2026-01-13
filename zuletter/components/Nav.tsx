import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link href="/" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)', letterSpacing: '-0.3px' }}>
            💚 ZuLetter 💚
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">
              Current Cycle
            </Link>
            <Link href="/submit" className="nav-link">
              Submit Item
            </Link>
            <Link href="/archive" className="nav-link">
              Archive
            </Link>
            <Link href="/how-decisions-work" className="nav-link">
              How Decisions Work
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

