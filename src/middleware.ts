import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // let cookie = request.cookies.get('token')
    if (request.nextUrl.pathname.startsWith('/customer')) {
      if (request.cookies.has('token')) {
        return NextResponse.next()
      }else{
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    }

    if (request.nextUrl.pathname.startsWith('/auth')) {
      if (request.cookies.has('token')) {
        return NextResponse.redirect(new URL('/customer', request.url))
      }else{
        return NextResponse.next()
      }
    }
}

export const config = {
  matcher: '/:path*',
}