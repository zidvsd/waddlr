import { type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/proxy"

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
