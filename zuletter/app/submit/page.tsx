'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import { getNewIssueWithTemplateUrl, getRepoPath } from '@/lib/github'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const issueUrl = getNewIssueWithTemplateUrl('submit-item.yml')
    window.open(issueUrl, '_blank')
    alert('Opening GitHub issue form. Please complete the form there to submit your item.')
  }

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '680px' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ marginBottom: '0.75rem' }}>
            Submit an Item
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Contribute to the next issue of ZuLetter. Submissions are reviewed by 
            our editorial team and all decisions are publicly documented.
          </p>
        </header>
        
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                Continue to GitHub
              </button>
              <p className="text-secondary" style={{ marginTop: '1rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
                You will be redirected to GitHub to complete your submission. 
                This ensures all submissions are publicly tracked and verifiable.
              </p>
            </div>
          </form>
        </div>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.25rem',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem' 
          }}>
            Resources
          </p>
          <ul style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem', 
            lineHeight: '2' 
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
