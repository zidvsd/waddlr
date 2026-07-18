"use client"

import { LogOut } from "lucide-react"
import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "./spinner"
import { toast } from "sonner"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    try {
      setLoading(true)
      await authClient.signOut()
      toast.success("Successfully logged out.")
      router.push("/login")
      router.refresh()
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to logout. Please try again. ${error.message}`)
      setLoading(false)
    }
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
