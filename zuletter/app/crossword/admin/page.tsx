'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'

interface Submission {
  email: string
  answers: Record<string, string>
  submittedAt: string
}

const correctAnswers: Record<string, string> = {
  '0-0': 'ZUBERLIN', '0-2': 'EDGECITY', '0-4': 'ZUITZERLAND', '0-7': 'SHANHAIWOO',
  '2-0': 'ZUAFRIQUE', '2-9': 'VIVACITY', '3-0': 'CRECIMIENTO',
  '5-0': 'CHARTERCITY', '5-13': 'IPEVILLAGE', '7-0': 'INVISIBLEGARDEN',
  '12-0': 'ZUGRAMA', '4-11': 'INFINITACITY', '6-0': 'ZUKAS',
}

const ALL_ANSWERS = [
  'MUSHANGHAI', 'EDGECITY', 'ZUITZERLAND', 'SHANHAIWOO', 'VIVACITY',
  'INFINITACITY', 'IPEVILLAGE', 'ZUKAS', 'ZUBERLIN', 'ZUAFRIQUE',
  'CRECIMIENTO', 'CHARTERCITY', 'INVISIBLEGARDEN', 'ZUGRAMA'
]

function checkAnswers(userAnswers: Record<string, string>) {
  let correct = 0
  const results: Record<string, { user: string, correct: string }> = {}
  
  Object.entries(correctAnswers).forEach(([key, answer]) => {
    const userAnswer = userAnswers[key]?.toUpperCase().trim()
    if (userAnswer === answer) {
      correct++
      results[key] = { user: userAnswer || '', correct: '✓' }
    } else {
      results[key] = { user: userAnswer || '', correct: '✗' }
    }
  })
  
  return { correct, total: Object.keys(correctAnswers).length, results }
}

export default function CrosswordAdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('crossword_admin_auth')
    if (saved === 'true') {
      setIsAuthenticated(true)
      loadSubmissions()
    }
  }, [])

  const loadSubmissions = () => {
    const saved = localStorage.getItem('crossword_submissions')
    if (saved) {
      setSubmissions(JSON.parse(saved))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'zuzone2026'
    if (password === validPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('crossword_admin_auth', 'true')
      loadSubmissions()
    } else {
      setError('Incorrect password')
    }
  }

  const getScore = (answers: Record<string, string>) => {
    let correct = 0
    Object.entries(correctAnswers).forEach(([key, answer]) => {
      if (answers[key]?.toUpperCase().trim() === answer) {
        correct++
      }
    })
    return correct
  }

  if (!isAuthenticated) {
    return (
      <>
        <Nav />
        <div className="admin-login">
          <form onSubmit={handleLogin} className="login-form">
            <h2>Admin Login</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
        <style jsx>{`
          .admin-login {
            min-height: calc(100vh - 60px);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafaf9;
          }
          .login-form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
          }
          .login-form h2 {
            margin: 0 0 1.5rem;
            color: #1c1917;
          }
          .login-form input {
            display: block;
            width: 250px;
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 1rem;
          }
          .login-form input:focus {
            outline: none;
            border-color: #2d6b5d;
          }
          .login-form button {
            width: 100%;
            padding: 0.75rem;
            background: #2d6b5d;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          }
          .error {
            color: #dc2626;
            margin-top: 1rem;
            font-size: 0.875rem;
          }
        `}</style>
      </>
    )
  }

  const sortedSubmissions = [...submissions].sort((a, b) => 
    getScore(b.answers) - getScore(a.answers)
  )

  return (
    <>
      <Nav />
      <div className="admin-page">
        <h1>Crossword Submissions</h1>
        <p className="subtitle">{submissions.length} total submissions</p>

        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Email</th>
                <th>Score</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {sortedSubmissions.map((sub, index) => {
                const score = getScore(sub.answers)
                return (
                  <tr key={index} className={score === ALL_ANSWERS.length ? 'perfect' : ''}>
                    <td>{index + 1}</td>
                    <td>{sub.email}</td>
                    <td>{score} / {ALL_ANSWERS.length}</td>
                    <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="submissions-list">
          <h2>All Submissions</h2>
          {submissions.map((sub, index) => {
            const { correct, total, results } = checkAnswers(sub.answers)
            return (
              <div key={index} className="submission-card">
                <div className="submission-header">
                  <span className="email">{sub.email}</span>
                  <span className="score">{correct} / {total}</span>
                </div>
                <div className="submission-date">
                  {new Date(sub.submittedAt).toLocaleString()}
                </div>
                <div className="answers-grid">
                  {Object.entries(results).map(([key, { user, correct: isCorrect }]) => (
                    <div key={key} className={`answer ${isCorrect === '✓' ? 'correct' : 'incorrect'}`}>
                      <span className="cell">{key}</span>
                      <span className="user-answer">{user || '-'}</span>
                      <span className="status">{isCorrect}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        .admin-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .admin-page h1 {
          font-size: 2rem;
          margin: 0 0 0.5rem;
          color: #1c1917;
        }
        .subtitle {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        .leaderboard {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .leaderboard h2 {
          font-size: 1.25rem;
          margin: 0 0 1rem;
          color: #1c1917;
        }
        .leaderboard table {
          width: 100%;
          border-collapse: collapse;
        }
        .leaderboard th, .leaderboard td {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .leaderboard th {
          font-weight: 600;
          color: #6b7280;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .leaderboard tr.perfect {
          background: #dcfce7;
        }
        .submissions-list h2 {
          font-size: 1.25rem;
          margin: 0 0 1rem;
          color: #1c1917;
        }
        .submission-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .submission-header {
          display: flex;
          justify-content: space-between: center;
         ;
          align-items margin-bottom: 0.5rem;
        }
        .email {
          font-weight: 600;
          color: #1c1917;
        }
        .score {
          font-weight: 700;
          color: #2d6b5d;
          font-size: 1.125rem;
        }
        .submission-date {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-bottom: 1rem;
        }
        .answers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem;
        }
        .answer {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 6px;
          font-size: 0.8125rem;
        }
        .answer.correct {
          background: #dcfce7;
        }
        .answer.incorrect {
          background: #fee2e2;
        }
        .cell {
          color: #6b7280;
          min-width: 40px;
        }
        .user-answer {
          font-weight: 600;
          flex: 1;
        }
        .status {
          font-weight: 700;
        }
      `}</style>
    </>
  )
}
