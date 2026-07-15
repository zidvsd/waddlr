"use client"

import Link from "next/link"
import { authClient } from "@/lib/auth/auth-client"
import { LogoutButton } from "../ui/logout-button"

export function AuthButtons() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return null
  }

  return (
    <>
      {session ? (
        <LogoutButton />
      ) : (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="bg-gradient-brand hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] md:inline-flex"
          >
            Sign up
          </Link>
        </div>
      )}
    </>
  )
}
