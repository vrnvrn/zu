'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import { getRepoPath } from '@/lib/github'

export default function SubmitPage() {
  const repoPath = getRepoPath()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    sourceLink: '',
    relevance: '',
    timeSensitivity: '',
    attribution: '',
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null)

  // Generate the issue body for GitHub
  const generateIssueBody = () => {
    return `## Newsletter Item Submission

**Title:** ${formData.title}

**Category:** ${formData.category}

**Summary:**
${formData.summary}

**Source URL:** ${formData.sourceLink || 'N/A'}

**Community Relevance:**
${formData.relevance}

**Time Sensitivity:** ${formData.timeSensitivity || 'Evergreen'}

**Attribution:** ${formData.attribution}

---
*Submitted via ZuLetter submission form*`
  }

  // Submit directly using dev GitHub account
  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      alert('Please consent to public publication before submitting.')
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/submit-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitResult({ success: true, url: data.url })
      // Reset form on success
      setFormData({
        title: '',
        category: '',
        summary: '',
        sourceLink: '',
        relevance: '',
        timeSensitivity: '',
        attribution: '',
        consent: false,
      })
    } catch (error) {
      setSubmitResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open GitHub in new tab for user to submit with their own account
  const handleOpenGitHub = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      alert('Please consent to public publication before submitting.')
      return
    }

    const issueTitle = encodeURIComponent(`[Submission] ${formData.title}`)
    const issueBody = encodeURIComponent(generateIssueBody())
    const labels = encodeURIComponent(`submission,category:${formData.category}`)
    
    const url = `https://github.com/${repoPath}/issues/new?title=${issueTitle}&body=${issueBody}&labels=${labels}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '680px' }}>
        <header style={{ marginBottom: '2.5rem' }}>
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
              background: 'var(--accent)',
              boxShadow: '0 0 8px rgba(22, 101, 52, 0.3)'
            }} />
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: '500', 
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Contribute
            </span>
          </div>
          <h1 style={{ marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
            Submit an Item
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            Contribute to the next issue of ZuLetter. Submissions are reviewed by 
            our editorial team and all decisions are publicly documented.
          </p>
        </header>

        {submitResult && (
          <div style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius)',
            background: submitResult.success ? 'var(--accent-subtle)' : '#fef2f2',
            border: `1px solid ${submitResult.success ? 'var(--accent-muted)' : '#fecaca'}`,
          }}>
            {submitResult.success ? (
              <p style={{ margin: 0, color: 'var(--accent)' }}>
                Submitted successfully!{' '}
                <a href={submitResult.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                  View on GitHub
                </a>
              </p>
            ) : (
              <p style={{ margin: 0, color: '#b91c1c' }}>
                {submitResult.error}
              </p>
            )}
          </div>
        )}
        
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="A clear, descriptive title"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Category <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <select
                id="category"
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                <option value="events">Events</option>
                <option value="wins">Community Wins</option>
                <option value="updates">Updates</option>
                <option value="requests">Requests</option>
                <option value="jobs">Opportunities</option>
                <option value="research">Research</option>
                <option value="media">Media</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="summary">
                Summary <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <textarea
                id="summary"
                className="form-textarea"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="A concise summary in 1–3 sentences"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="sourceLink">
                Source URL <span style={{ color: 'var(--text-tertiary)', fontWeight: '400' }}>(optional)</span>
              </label>
              <input
                type="url"
                id="sourceLink"
                className="form-input"
                value={formData.sourceLink}
                onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
                placeholder="https://..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="relevance">
                Community Relevance <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <textarea
                id="relevance"
                className="form-textarea"
                value={formData.relevance}
                onChange={(e) => setFormData({ ...formData, relevance: e.target.value })}
                placeholder="Explain why this is relevant to the Zuzalu community"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="timeSensitivity">
                Time Sensitivity <span style={{ color: 'var(--text-tertiary)', fontWeight: '400' }}>(optional)</span>
              </label>
              <input
                type="text"
                id="timeSensitivity"
                className="form-input"
                value={formData.timeSensitivity}
                onChange={(e) => setFormData({ ...formData, timeSensitivity: e.target.value })}
                placeholder="YYYY-MM-DD or 'evergreen'"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="attribution">
                Attribution <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <input
                type="text"
                id="attribution"
                className="form-input"
                value={formData.attribution}
                onChange={(e) => setFormData({ ...formData, attribution: e.target.value })}
                placeholder="Your name or handle (@username)"
                required
              />
            </div>
            
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                  style={{ marginTop: '0.25rem' }}
                />
                <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                  I consent to this submission being published publicly
                </span>
              </label>
            </div>
            
            <div style={{ 
              marginTop: '2rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid var(--border)' 
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  type="button"
                  onClick={handleDirectSubmit}
                  disabled={isSubmitting || !formData.title || !formData.category || !formData.summary || !formData.relevance || !formData.attribution || !formData.consent}
                  className="btn btn-accent" 
                  style={{ 
                    padding: '0.75rem 1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'wait' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit (directly with dev GitHub vrnvrn)'}
                </button>
                
                <button 
                  type="button"
                  onClick={handleOpenGitHub}
                  disabled={!formData.title || !formData.category || !formData.summary || !formData.relevance || !formData.attribution || !formData.consent}
                  className="btn btn-secondary" 
                  style={{ 
                    padding: '0.75rem 1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Submit (open GitHub in new tab)
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
              </div>
              
              <p className="text-secondary" style={{ marginTop: '1rem', fontSize: '0.875rem', lineHeight: '1.65' }}>
                Choose &quot;directly&quot; to submit instantly, or &quot;open GitHub&quot; to submit with your own GitHub account.
                All submissions are publicly tracked and verifiable.
              </p>
            </div>
          </form>
        </div>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, var(--accent-subtle) 0%, var(--bg-secondary) 100%)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--accent-muted)'
        }}>
          <p style={{ 
            fontSize: '0.75rem', 
            fontWeight: '600',
            color: 'var(--accent)',
            marginBottom: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Resources
          </p>
          <ul style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem', 
            lineHeight: '2.25' 
          }}>
            <li>
              <a href={`https://github.com/${repoPath}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
                Submission Guidelines
              </a>
            </li>
            <li>
              <a href={`https://github.com/${repoPath}/issues`} target="_blank" rel="noopener noreferrer">
                View All Submissions
              </a>
            </li>
            <li>
              <a href="/how-decisions-work">
                Editorial Process
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
