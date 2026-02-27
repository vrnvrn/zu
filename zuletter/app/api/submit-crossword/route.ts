import { NextRequest, NextResponse } from 'next/server'

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

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      console.error('[submit-crossword] Missing GITHUB_TOKEN')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || 'vrnvrn'
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || 'zu'

    const resultsList = Object.entries(results)
      .map(([cell, { user, correct: isCorrect }]) => {
        const correctAnswer = correctAnswers[cell]
        return `- Cell ${cell}: "${user}" ${isCorrect ? '✓' : `✗ (correct: ${correctAnswer})`}`
      })
      .join('\n')

    const issueBody = `## Crossword Submission

**Email:** ${email}

**Score:** ${correct} / ${total}

**Results:**
${resultsList}

---
*Submitted via Zuzone crossword*`

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        title: `[Crossword] ${email} - ${correct}/${total}`,
        body: issueBody,
        labels: ['crossword']
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[submit-crossword] GitHub API error:', response.status, errorData)
      return NextResponse.json(
        { error: 'Failed to submit' },
        { status: 500 }
      )
    }

    const issue = await response.json()

    return NextResponse.json({
      success: true,
      score: correct,
      total: total,
      url: issue.html_url
    })

  } catch (error) {
    console.error('[submit-crossword] Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
