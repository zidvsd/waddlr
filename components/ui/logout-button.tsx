"use client"

import { LogOut } from "lucide-react"
import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "./spinner"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)

    await authClient.signOut()

    router.push("/login")
    router.refresh()
  }

  return (
    <button
      className="flex items-center gap-2 p-0"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Spinner className="size-4" /> : <LogOut className="size-4" />}

      {loading ? "Signing out..." : "Logout"}
    </button>
  )
}
