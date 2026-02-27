import Nav from '@/components/Nav'
import { fetchLocalArchiveNewsletters } from '@/lib/github'

function getMonthName(month: string): string {
  const months: Record<string, string> = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  }
  return months[month] || month
}

interface NewsletterItem {
  title: string
  cycle: string
  edition?: string
  editors: string[]
  path: string
}

interface MonthGroup {
  month: string
  items: NewsletterItem[]
}

interface YearGroup {
  year: string
  months: MonthGroup[]
}

function groupByYearAndMonth(newsletterList: Awaited<ReturnType<typeof fetchLocalArchiveNewsletters>>): YearGroup[] {
  const groups: Record<string, Record<string, NewsletterItem[]>> = {}

  const sorted = [...newsletterList].sort((a, b) => a.cycle.localeCompare(b.cycle))

  for (const nl of sorted) {
    const parts = nl.cycle.split('-')
    if (parts.length < 2) continue

    const year = parts[0]
    const month = parts[1]

    if (!groups[year]) {
      groups[year] = {}
    }
    if (!groups[year][month]) {
      groups[year][month] = []
    }
    groups[year][month].push({
      title: nl.title,
      cycle: nl.cycle,
      edition: nl.edition,
      editors: nl.editors,
      path: nl.path,
    })
  }

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, months]) => ({
      year,
      months: Object.entries(months)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([month, items]) => ({ month, items })),
    }))
}

export default function ArchivePage() {
  const newsletters = fetchLocalArchiveNewsletters()
  const grouped = groupByYearAndMonth(newsletters)

  return (
    <>
      <Nav />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
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
              background: '#e5d547',
              boxShadow: '0 0 8px rgba(232, 213, 86, 0.5)'
            }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              color: '#2d6b5d',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              History
            </span>
          </div>
          <h1 style={{ marginBottom: '0.75rem', letterSpacing: '0.02em', fontSize: '2rem', fontWeight: 700 }}>
            Archive
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#6b7280', lineHeight: '1.75' }}>
            A complete record of past ZuLetter issues.
          </p>
        </header>

        {grouped.length === 0 ? (
          <div style={{ padding: '2rem', background: '#fafaf9', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#6b7280' }}>No issues published yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {grouped.map(yearGroup => (
              <div key={yearGroup.year}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#1c1917', 
                  margin: '0 0 1rem 0',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid #2d6b5d',
                  display: 'inline-block'
                }}>
                  {yearGroup.year}
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {yearGroup.months.map(monthGroup => (
                    <div 
                      key={monthGroup.month} 
                      style={{ 
                        background: '#fafaf9', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}
                    >
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: '#2d6b5d', 
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {getMonthName(monthGroup.month)}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {monthGroup.items.map(item => (
                          <a
                            key={item.cycle}
                            href={`/${item.path}`}
                            style={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: '0.25rem',
                              padding: '0.5rem',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              color: 'inherit',
                              transition: 'background 0.15s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(45, 107, 93, 0.08)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#1c1917' }}>
                              {item.edition || item.title}
                            </span>
                            {item.editors.length > 0 && (
                              <span style={{ fontSize: '0.8125rem', color: '#9ca3af' }}>
                                by {item.editors.join(', ')}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
