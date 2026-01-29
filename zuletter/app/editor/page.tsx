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
    summary: 'We reached 1000 active community members this month. Thank you to everyone who has been part of this journey.',
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

    if (target === draggedSource) {
      setDraggedItem(null)
      setDraggedSource(null)
      return
    }

    if (target === 'accepted') {
      setSubmissions(prev => prev.filter(item => item.id !== draggedItem.id))
      setAccepted(prev => {
        if (prev.find(item => item.id === draggedItem.id)) return prev
        return [...prev, draggedItem]
      })
    } else {
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
        padding: '1rem',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        marginBottom: '0.75rem',
        cursor: 'grab',
        transition: 'border-color 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--text-tertiary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span className="badge badge-category">
          {item.category}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          {item.date}
        </span>
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '500' }}>
        {item.title}
      </h3>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
        {item.summary}
      </p>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
        {item.author}
      </div>
    </div>
  )

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '1200px' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>
            Editor Dashboard
          </h1>
          <p className="text-secondary">
            January 2026 Issue — Drag items between columns to manage the newsletter
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Submissions Column */}
          <section>
            <div style={{ 
              padding: '1rem 1.25rem', 
              borderRadius: 'var(--radius)',
              marginBottom: '1rem',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)'
            }}>
              <h2 style={{ 
                fontSize: '1rem', 
                margin: '0 0 0.25rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'inherit',
                fontWeight: '500'
              }}>
                Submissions
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '400', 
                  color: 'var(--text-tertiary)' 
                }}>
                  ({submissions.length})
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                Pending editorial review
              </p>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('submissions')}
              style={{
                minHeight: '400px',
                padding: '1rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius)',
                border: '1px dashed var(--border)'
              }}
            >
              {submissions.length > 0 ? (
                submissions.map(item => renderItem(item, 'submissions'))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '4rem 1.5rem',
                  color: 'var(--text-tertiary)'
                }}>
                  <p style={{ fontSize: '0.9375rem', margin: 0 }}>
                    No pending submissions
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Accepted Column */}
          <section>
            <div style={{ 
              padding: '1rem 1.25rem', 
              borderRadius: 'var(--radius)',
              marginBottom: '1rem',
              border: '1px solid var(--accent)',
              background: 'var(--accent-subtle)'
            }}>
              <h2 style={{ 
                fontSize: '1rem', 
                margin: '0 0 0.25rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'inherit',
                fontWeight: '500',
                color: 'var(--accent)'
              }}>
                Accepted
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '400', 
                  color: 'var(--text-tertiary)' 
                }}>
                  ({accepted.length})
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                Included in the upcoming issue
              </p>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('accepted')}
              style={{
                minHeight: '400px',
                padding: '1rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius)',
                border: '1px dashed var(--accent)'
              }}
            >
              {accepted.length > 0 ? (
                accepted.map(item => renderItem(item, 'accepted'))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '4rem 1.5rem',
                  color: 'var(--text-tertiary)'
                }}>
                  <p style={{ fontSize: '0.9375rem', margin: 0 }}>
                    Drag items here to accept
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
