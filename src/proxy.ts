import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession(
        { headers: await request.headers })

    if (session?.user) {
        return NextResponse.next()
    }

    const loginURL = new URL("/signIn", request.url)
    loginURL.searchParams.set(
        "callbackUrl",
        `${request.nextUrl.pathname}${request.nextUrl.search}`
    )
    return NextResponse.redirect(loginURL)
}

export const config = {
    matcher: ['/my-borrows', '/my-books', '/books/:path', '/add-books'],
}
