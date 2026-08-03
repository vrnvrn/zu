import Nav from '@/components/Nav'
import PopupCitiesGlobe from '@/components/PopupCitiesGlobe'

export const metadata = {
  title: 'Zuzone - 2026 Pop-up Cities Map',
  description: 'An interactive globe of the 2026 pop-up cities across the Zuzalu ecosystem.',
}

export default function MapPage() {
  return (
    <>
      <Nav />
      <div className="container">
        <header style={{ marginBottom: '2rem', maxWidth: '680px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
            2026 Pop-up Cities
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            Every pop-up city happening across the Zuzalu ecosystem in 2026, mapped on a globe.
            Click a marker to see dates and details.
          </p>
        </header>

        <section style={{ marginBottom: '3rem' }}>
          <PopupCitiesGlobe />
        </section>
      </div>
    </>
  )
}
