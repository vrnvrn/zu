'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import { getNewIssueWithTemplateUrl } from '@/lib/github'

export default function SubmitPage() {
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
    
    // Build GitHub issue URL with prefilled data
    // Note: GitHub Issue Forms have limited prefill support, so we'll use query params
    // which may not work perfectly, but provides a good UX
    const params = new URLSearchParams()
    
    // For Issue Forms, we can't easily prefill, so we'll redirect to the template
    // and show instructions
    const issueUrl = getNewIssueWithTemplateUrl('submit-item.yml')
    
    // Open in new tab
    window.open(issueUrl, '_blank')
    
    // Show success message
    alert('Opening GitHub issue form. Please complete the form there to submit your item.')
  }

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '800px' }}>
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '12px' }}>
            ✨ Share Your Story
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Have something exciting to share with the community? We&#39;d love to hear about it! 
            Your submission helps keep everyone connected and informed.
          </p>
        </header>
        
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title *
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief, descriptive title"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Category *
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
                <option value="wins">Wins</option>
                <option value="updates">Updates</option>
                <option value="requests">Requests</option>
                <option value="jobs">Jobs</option>
                <option value="research">Research</option>
                <option value="media">Media</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="summary">
                Summary (1-3 sentences) *
              </label>
              <textarea
                id="summary"
                className="form-textarea"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary of the item..."
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="sourceLink">
                Source Link (optional)
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
                Relevance to Community *
              </label>
              <textarea
                id="relevance"
                className="form-textarea"
                value={formData.relevance}
                onChange={(e) => setFormData({ ...formData, relevance: e.target.value })}
                placeholder="Why is this relevant to our community?"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="timeSensitivity">
                Time Sensitivity
              </label>
              <input
                type="text"
                id="timeSensitivity"
                className="form-input"
                value={formData.timeSensitivity}
                onChange={(e) => setFormData({ ...formData, timeSensitivity: e.target.value })}
                placeholder="Date (YYYY-MM-DD) or 'evergreen'"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="attribution">
                Attribution (your name/handle) *
              </label>
              <input
                type="text"
                id="attribution"
                className="form-input"
                value={formData.attribution}
                onChange={(e) => setFormData({ ...formData, attribution: e.target.value })}
                placeholder="@yourhandle or Your Name"
                required
              />
            </div>
            
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                />
                <span>I consent to this being published publicly *</span>
              </label>
            </div>
            
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px solid var(--border)' }}>
              <button type="submit" className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 24px' }}>
                🚀 Submit Your Item
              </button>
              <p className="text-secondary" style={{ marginTop: '16px', fontSize: '14px', lineHeight: '1.6' }}>
                💡 You&#39;ll be redirected to GitHub to complete your submission. 
                Don&#39;t worry—it&#39;s quick and easy! This helps us keep everything organized and transparent.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

