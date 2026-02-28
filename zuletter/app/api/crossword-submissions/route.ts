import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function GET(request: NextRequest) {
  // Simple auth via admin secret
  const secret = request.nextUrl.searchParams.get('secret')
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ error: 'Redis not configured' }, { status: 500 })
  }

  try {
    // Get leaderboard (top scores first)
    const leaderboard = await redis.zrange('crossword:leaderboard', 0, -1, { rev: true, withScores: true })

    const submissions = []
    for (let i = 0; i < leaderboard.length; i += 2) {
      const id = leaderboard[i] as string
      const score = leaderboard[i + 1] as number
      const data = await redis.get(id)
      if (data) {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data
        submissions.push({ id, score, ...parsed })
      }
    }

    return NextResponse.json({ count: submissions.length, submissions })
  } catch (error) {
    console.error('[crossword-submissions] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}
