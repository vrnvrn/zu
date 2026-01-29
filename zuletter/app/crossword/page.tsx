'use client'

import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import { getNewIssueWithTemplateUrl, getRepoPath } from '@/lib/github'

export default function CrosswordPage() {
  const repoPath = getRepoPath()
  const [formData, setFormData] = useState({
    answer: '',
    clue: '',
    difficulty: '',
    category: '',
    explanation: '',
    attribution: '',
    consent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const issueUrl = getNewIssueWithTemplateUrl('submit-crossword.yml')
    window.open(issueUrl, '_blank')
    alert('Opening GitHub issue form. Please complete the form there to submit your crossword clue.')
  }

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: '680px' }}>
        <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '0.75rem' }}>
            Monthly Crossword
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Help build the February 2026 crossword puzzle! Submit your questions and answers below.
          </p>
        </header>
        
        {/* Crossword Image */}
        <div style={{ 
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '2rem',
            width: '100%',
            maxWidth: '450px'
          }}>
            <Image
              src="/images/crossword-blank.svg"
              alt="Crossword puzzle grid"
              width={400}
              height={400}
              style={{ 
                width: '100%', 
                height: 'auto',
                display: 'block'
              }}
              priority
            />
            <p style={{ 
              textAlign: 'center', 
              marginTop: '1rem', 
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              marginBottom: 0
            }}>
              February 2026 Crossword — Coming Soon
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '0.75rem', marginTop: 0 }}>
            Submit a Clue
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Contribute a question and answer for next month&apos;s crossword. The best submissions 
            will be featured in the puzzle. All submissions are tracked publicly on GitHub.
          </p>
        </div>
        
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="answer">
                Answer <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <input
                type="text"
                id="answer"
                className="form-input"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value.toUpperCase() })}
                placeholder="e.g., ZUZALU"
                required
                style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', marginBottom: 0 }}>
                The word that will appear in the crossword grid (3-12 characters ideal)
              </p>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="clue">
                Clue <span style={{ color: 'var(--text-tertiary)' }}>*</span>
              </label>
              <textarea
                id="clue"
                className="form-textarea"
                value={formData.clue}
                onChange={(e) => setFormData({ ...formData, clue: e.target.value })}
                placeholder="e.g., Pop-up city experiment in Montenegro (2023)"
                required
                style={{ minHeight: '80px' }}
              />
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', marginBottom: 0 }}>
                The hint that will lead solvers to the answer
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="difficulty">
                  Difficulty <span style={{ color: 'var(--text-tertiary)' }}>*</span>
                </label>
                <select
                  id="difficulty"
                  className="form-select"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  required
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
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
                  <option value="">Select category</option>
                  <option value="zuzalu">Zuzalu Events & History</option>
                  <option value="crypto">Crypto & Web3</option>
                  <option value="science">Science & Technology</option>
                  <option value="popup-cities">Pop-up Cities & Network States</option>
                  <option value="community">Community Members & Culture</option>
                  <option value="general">General Knowledge</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="explanation">
                Explanation <span style={{ color: 'var(--text-tertiary)', fontWeight: '400' }}>(optional)</span>
              </label>
              <textarea
                id="explanation"
                className="form-textarea"
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Brief explanation of why this answer is correct (helps editors verify)"
                style={{ minHeight: '60px' }}
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
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', marginBottom: 0 }}>
                You&apos;ll be credited if your clue is used
              </p>
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
                  I consent to this submission being used in the crossword puzzle and published publicly
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
            Tips for Great Clues
          </p>
          <ul style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1.25rem', 
            lineHeight: '2',
            marginBottom: 0
          }}>
            <li>Keep answers between 3-12 characters for best fit</li>
            <li>Clues can be definitions, wordplay, or trivia-style questions</li>
            <li>Community-related clues are especially welcome</li>
            <li>Include context so editors can verify your answer</li>
          </ul>
        </div>
        
        <div style={{ 
          marginTop: '1.5rem', 
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
            lineHeight: '2',
            marginBottom: 0
          }}>
            <li>
              <a href={`https://github.com/${repoPath}/issues?q=label%3Acrossword`} target="_blank" rel="noopener noreferrer">
                View All Crossword Submissions
              </a>
            </li>
            <li>
              <a href={`https://github.com/${repoPath}`} target="_blank" rel="noopener noreferrer">
                ZuLetter GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
