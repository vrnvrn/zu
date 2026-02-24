import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const correctPassword = process.env.NEWSLETTER_PASSWORD

    if (!correctPassword) {
      return NextResponse.json({ valid: true })
    }

    const isValid = password === correctPassword

    return NextResponse.json({ valid: isValid })
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 })
  }
}
