import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")
  const path = request.nextUrl.pathname

  // Если пользователь не авторизован и пытается получить доступ к защищенным маршрутам
  if (!authToken && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Если пользователь авторизован и пытается получить доступ к странице входа
  if (authToken && path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
