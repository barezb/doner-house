import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin API routes (except auth routes)
  if (request.nextUrl.pathname.startsWith('/api/categories') || 
      request.nextUrl.pathname.startsWith('/api/menu-items') ||
      request.nextUrl.pathname.startsWith('/api/upload')) {
    
    const authCookie = request.cookies.get('admin-auth')
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/categories/:path*', '/api/menu-items/:path*', '/api/upload/:path*']
}