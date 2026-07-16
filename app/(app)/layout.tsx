// app/app/layout.tsx
import { getServerSession } from "@/lib/auth/get-session"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/layout/nav-dashboard"
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) redirect("/login")

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      {children}
    </div>
  )
}
