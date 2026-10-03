import { Suspense } from "react"
import { getServerSession } from "@/lib/auth/get-session"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/layout/nav-dashboard"
import { getProfile } from "@/lib/queries"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      {" "}
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>{" "}
    </Suspense>
  )
}

async function AuthenticatedDashboard({
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
      {" "}
      <DashboardNav profile={userProfile} />
      {children}{" "}
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-background">
      {" "}
      <div className="h-14 border-b bg-muted/40" />{" "}
      <main className="container mx-auto p-6">
        {" "}
        <div className="h-8 w-48 rounded bg-muted" />{" "}
        <div className="mt-6 h-32 rounded-lg bg-muted" />{" "}
      </main>{" "}
    </div>
  )
}
