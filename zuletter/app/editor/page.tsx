'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'

interface EditorItem {
  id: string
  title: string
  category: string
  summary: string
  author: string
  date: string
}

const sampleItems: EditorItem[] = [
  {
    id: '1',
    title: 'Community Meetup: January Gathering',
    category: 'events',
    summary: 'Join us for our monthly community meetup featuring talks on decentralized governance and networking opportunities.',
    author: '@alice',
    date: '2026-01-15'
  },
  {
    id: '2',
    title: 'New Research Paper Published',
    category: 'research',
    summary: 'Our team published a groundbreaking paper on zero-knowledge proofs and their applications in privacy-preserving systems.',
    author: '@bob',
    date: '2026-01-10'
  },
  {
    id: '3',
    title: 'Job Opening: Full Stack Developer',
    category: 'jobs',
    summary: 'We are looking for an experienced full stack developer to join our team. Remote work available.',
    author: '@charlie',
    date: '2026-01-12'
  },
  {
    id: '4',
    title: 'Community Win: 1000 Members Milestone',
    category: 'wins',
    summary: 'We reached 1000 active community members this month! Thank you to everyone who has been part of this journey.',
    author: '@diana',
    date: '2026-01-08'
  },
  {
    id: '5',
    title: 'Product Update: New Features Released',
    category: 'updates',
    summary: 'We just released version 2.0 with improved performance, new UI components, and enhanced security features.',
    author: '@eve',
    date: '2026-01-14'
  }
]

export default function EditorPage() {
  const [submissions, setSubmissions] = useState<EditorItem[]>(sampleItems)
  const [accepted, setAccepted] = useState<EditorItem[]>([])
  const [draggedItem, setDraggedItem] = useState<EditorItem | null>(null)
  const [draggedSource, setDraggedSource] = useState<'submissions' | 'accepted' | null>(null)

  const handleDragStart = (item: EditorItem, source: 'submissions' | 'accepted') => {
    setDraggedItem(item)
    setDraggedSource(source)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (target: 'submissions' | 'accepted') => {
    if (!draggedItem || !draggedSource) return

    // Don't do anything if dropping in the same column
    if (target === draggedSource) {
      setDraggedItem(null)
      setDraggedSource(null)
      return
    }

    if (target === 'accepted') {
      // Move from submissions to accepted
      setSubmissions(prev => prev.filter(item => item.id !== draggedItem.id))
      setAccepted(prev => {
        if (prev.find(item => item.id === draggedItem.id)) return prev
        return [...prev, draggedItem]
      })
    } else {
      // Move from accepted to submissions
      setAccepted(prev => prev.filter(item => item.id !== draggedItem.id))
      setSubmissions(prev => {
        if (prev.find(item => item.id === draggedItem.id)) return prev
        return [...prev, draggedItem]
      })
    }
    setDraggedItem(null)
    setDraggedSource(null)
  }

  const renderItem = (item: EditorItem, source: 'submissions' | 'accepted') => (
    <div
      key={item.id}
      draggable
      onDragStart={() => handleDragStart(item, source)}
      style={{
        padding: '16px',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        marginBottom: '12px',
        cursor: 'grab',
        transition: 'all 0.2s',
        boxShadow: 'var(--shadow-sm)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span className="badge badge-category" style={{ fontSize: '11px' }}>
          {item.category}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          {item.date}
        </span>
      </div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
        {item.title}
      </h3>
      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
        {item.summary}
      </p>
      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
        by {item.author}
      </div>
    </div>
  )

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '1400px' }}>
        <header style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>
            📝 Editor Dashboard
          </h1>
          <h2 style={{ fontSize: '24px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
            January 2026 Newsletter
          </h2>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Submissions Column */}
          <section>
            <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: 'var(--radius)',
              marginBottom: '20px',
              border: '2px solid var(--border)'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                margin: '0 0 8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📝 Submissions
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: 'normal', 
                  color: 'var(--text-secondary)' 
                }}>
                  ({submissions.length})
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                Drag items to Accepted to include them in the newsletter
              </p>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('submissions')}
              style={{
                minHeight: '400px',
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius)',
                border: '2px dashed var(--border)'
              }}
            >
              {submissions.length > 0 ? (
                submissions.map(item => renderItem(item, 'submissions'))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  color: 'var(--text-tertiary)'
                }}>
                  <p style={{ fontSize: '16px', margin: 0 }}>
                    No submissions. Drop items here to move them back.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Accepted Column */}
          <section>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--accent-light) 0%, #f0fff0 100%)', 
              padding: '20px', 
              borderRadius: 'var(--radius)',
              marginBottom: '20px',
              border: '2px solid var(--accent)'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                margin: '0 0 8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent)'
              }}>
                ✅ Accepted
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: 'normal', 
                  color: 'var(--text-secondary)' 
                }}>
                  ({accepted.length})
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                Items that will be included in the newsletter
              </p>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('accepted')}
              style={{
                minHeight: '400px',
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius)',
                border: '2px dashed var(--accent)'
              }}
            >
              {accepted.length > 0 ? (
                accepted.map(item => renderItem(item, 'accepted'))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  color: 'var(--text-tertiary)'
                }}>
                  <p style={{ fontSize: '16px', margin: 0 }}>
                    Drop items here to accept them for the newsletter.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
