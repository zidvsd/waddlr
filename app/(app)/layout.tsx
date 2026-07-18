// app/app/layout.tsx
import { getServerSession } from "@/lib/auth/get-session"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/layout/nav-dashboard"
import { db } from "@/lib/db"
import { profile } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getProfile } from "../actions/profile"
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) redirect("/login")

  const userProfile = await getProfile()

  if (!userProfile?.onboardingCompleted) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      {children}
    </div>
  )
}
