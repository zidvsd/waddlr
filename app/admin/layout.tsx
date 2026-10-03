import { getServerSession } from "@/lib/auth/get-session"
import { redirect } from "next/navigation"

export const instant = false

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return <div className="flex min-h-screen flex-col">{children}</div>
}
