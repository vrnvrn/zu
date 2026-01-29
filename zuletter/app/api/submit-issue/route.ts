import { NextRequest, NextResponse } from 'next/server'

// API route to create GitHub issues directly using a stored token
// Uses GITHUB_TOKEN to create issues in the vrnvrn/zu repository

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, summary, sourceLink, relevance, timeSensitivity, attribution } = body

    // Validate required fields
    if (!title || !category || !summary || !relevance || !attribution) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get GitHub token from environment
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      console.error('[submit-issue] Missing GITHUB_TOKEN')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || 'vrnvrn'
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || 'zu'

    // Format the issue body
    const issueBody = `## Newsletter Item Submission

**Title:** ${title}

**Category:** ${category}

**Summary:**
${summary}

**Source URL:** ${sourceLink || 'N/A'}

**Community Relevance:**
${relevance}

**Time Sensitivity:** ${timeSensitivity || 'Evergreen'}

**Attribution:** ${attribution}

---
*Submitted via ZuLetter submission form*`

    // Create the issue via GitHub API
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        title: `[Submission] ${title}`,
        body: issueBody,
        labels: ['submission', `category:${category}`]
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[submit-issue] GitHub API error:', response.status, errorData)
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Authentication error' },
          { status: 500 }
        )
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create issue' },
        { status: 500 }
      )
    }

    const issue = await response.json()

    return NextResponse.json({
      success: true,
      url: issue.html_url,
      number: issue.number
    })

  } catch (error) {
    console.error('[submit-issue] Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
