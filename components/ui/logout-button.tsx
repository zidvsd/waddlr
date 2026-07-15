"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
          router.refresh()
        },
      },
    })

    setLoading(false)
  }

  return (
    <Button
      variant="destructive"
      className={"flex items-center gap-2"}
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut className="size-4" />

      {loading ? "Signing out..." : "Logout"}
    </Button>
  )
}
