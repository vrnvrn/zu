import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const VALID_POLL_IDS = ['march-2026'] as const
type PollId = typeof VALID_POLL_IDS[number]

const POLL_CONFIGS: Record<PollId, { question: string; options: string[] }> = {
  'march-2026': {
    question: 'Where do you see the pop-up city ecosystem heading in the next 2 years?',
    options: [
      'More permanent hubs & long-term spaces',
      'Greater geographic diversity',
      'Deeper governance experiments',
      'Broader mainstream awareness',
    ],
  },
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') as PollId | null

  if (!id || !(VALID_POLL_IDS as readonly string[]).includes(id)) {
    return NextResponse.json({ error: 'Invalid poll id' }, { status: 400 })
  }

  const config = POLL_CONFIGS[id]
  const redis = getRedis()

  if (!redis) {
    return NextResponse.json({
      question: config.question,
      options: config.options,
      votes: Object.fromEntries(config.options.map(o => [o, 0])),
    })
  }

  try {
    const votes: Record<string, number> = {}
    for (const option of config.options) {
      const count = await redis.get<number>(`poll:${id}:votes:${option}`)
      votes[option] = count ?? 0
    }
    console.log(`[poll] GET ${id} — total votes: ${Object.values(votes).reduce((a, b) => a + b, 0)}`)
    return NextResponse.json({ question: config.question, options: config.options, votes })
  } catch (error) {
    console.error('[poll] Redis error on GET:', error)
    return NextResponse.json({ error: 'Poll temporarily unavailable' }, { status: 503 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, option } = body

    if (!id || !(VALID_POLL_IDS as readonly string[]).includes(id)) {
      return NextResponse.json({ error: 'Invalid poll id' }, { status: 400 })
    }

    const config = POLL_CONFIGS[id as PollId]

    if (!option || !config.options.includes(option)) {
      return NextResponse.json({ error: 'Invalid option' }, { status: 400 })
    }

    const redis = getRedis()
    if (!redis) {
      return NextResponse.json({ error: 'Poll temporarily unavailable' }, { status: 503 })
    }

    try {
      await redis.incr(`poll:${id}:votes:${option}`)

      const votes: Record<string, number> = {}
      for (const opt of config.options) {
        const count = await redis.get<number>(`poll:${id}:votes:${opt}`)
        votes[opt] = count ?? 0
      }

      const total = Object.values(votes).reduce((a, b) => a + b, 0)
      console.log(`[poll] Vote cast: ${id} / "${option}" | total votes now: ${total}`)

      return NextResponse.json({ success: true, votes })
    } catch (error) {
      console.error('[poll] Redis error on POST:', error)
      return NextResponse.json({ error: 'Poll temporarily unavailable' }, { status: 503 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
