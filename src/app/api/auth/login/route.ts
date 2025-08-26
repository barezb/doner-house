import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'Doner@House$2025'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set authentication cookie
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 // 24 hours
      })
      
      return response
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}