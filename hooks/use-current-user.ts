// lib/auth/use-current-user.ts
//
// Client-side hook wrapping Better Auth's session client. Adjust the
// import path for `authClient` to wherever your Better Auth client
// instance actually lives (commonly lib/auth/client.ts).

"use client"
import { authClient } from "@/lib/auth/auth-client"

export function useCurrentUser() {
  const { data: session, isPending, error } = authClient.useSession()

  return {
    user: session?.user ?? null,
    userId: session?.user?.id ?? null,
    isLoading: isPending,
    error,
  }
}
