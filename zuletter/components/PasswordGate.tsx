'use client'

import { useState } from 'react'

export default function PasswordGate({ password, title, children }: { password: string; title?: string; children: React.ReactNode }) {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #E8D556 0%, #d4ecc4 35%, #c8f4e7 60%, #e0fbf3 85%, #f8fdfb 100%)',
      fontFamily: 'Georgia, Times New Roman, serif',
    }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input === password) {
            setUnlocked(true)
          } else {
            setError(true)
          }
        }}
        style={{
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: '#1a1a1a' }}>
          {title || 'Preview'}
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#555', fontSize: '0.95rem' }}>
          This edition is not yet public. Enter the password to preview.
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false) }}
          placeholder="Password"
          style={{
            padding: '0.6rem 1rem',
            fontSize: '1rem',
            border: error ? '2px solid #c44' : '2px solid #ccc',
            borderRadius: '6px',
            outline: 'none',
            marginRight: '0.5rem',
          }}
          autoFocus
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            background: '#2d6a4f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Enter
        </button>
        {error && (
          <p style={{ color: '#c44', marginTop: '0.75rem', fontSize: '0.9rem' }}>
            Incorrect password.
          </p>
        )}
      </form>
    </div>
  )
}
