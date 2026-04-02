import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
import { CROSSWORD_ANSWERS, ALL_CROSSWORD_ANSWERS } from '@/lib/crossword-data'

const correctAnswers = CROSSWORD_ANSWERS
const ALL_ANSWERS = ALL_CROSSWORD_ANSWERS

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

function calculateScore(userAnswers: Record<string, string>) {
  let correct = 0
  const results: Record<string, { user: string; correct: boolean }> = {}

  Object.entries(correctAnswers).forEach(([key, answer]) => {
    const userAnswer = userAnswers[key]?.toUpperCase().trim()
    if (userAnswer === answer) {
      correct++
      results[key] = { user: userAnswer || '', correct: true }
    } else {
      results[key] = { user: userAnswer || '', correct: false }
    }
  })

  return { correct, total: ALL_ANSWERS.length, results }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, answers } = body

    if (!email || !answers) {
      return NextResponse.json(
        { error: 'Missing email or answers' },
        { status: 400 }
      )
    }

    const { correct, total, results } = calculateScore(answers)
    const submittedAt = new Date().toISOString()

    // Store in Redis
    const redis = getRedis()
    if (redis) {
      const submission = { email, score: correct, total, answers, results, submittedAt }
      const id = `crossword:${Date.now()}:${email.replace(/[^a-zA-Z0-9]/g, '_')}`
      await redis.set(id, JSON.stringify(submission))
      // Add to sorted set ranked by score for easy leaderboard queries
      await redis.zadd('crossword:leaderboard', { score: correct, member: id })
    } else {
      console.warn('[submit-crossword] Redis not configured, skipping storage')
    }

    // Send email via Resend
    const resultsList = Object.entries(results)
      .map(([cell, { user, correct: isCorrect }]) => {
        const correctAnswer = correctAnswers[cell]
        return `Cell ${cell}: "${user || '(empty)'}" ${isCorrect ? '✓' : `✗ (correct: ${correctAnswer})`}`
      })
      .join('\n')

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'crossword@zuzone.org',
        to: 'hi@zuzone.org',
        subject: `[Crossword] ${email} — ${correct}/${total}`,
        text: `Crossword Submission\n\nEmail: ${email}\nScore: ${correct} / ${total}\nSubmitted: ${submittedAt}\n\nResults:\n${resultsList}`,
      })
    } else {
      console.warn('[submit-crossword] RESEND_API_KEY not set, skipping email')
    }

    return NextResponse.json({
      success: true,
      score: correct,
      total,
    })
  } catch (error) {
    console.error('[submit-crossword] Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
