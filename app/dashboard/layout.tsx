// app/app/layout.tsx
import { getServerSession } from "@/lib/auth/get-session"
import { redirect } from "next/navigation"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) redirect("/login")

  return <>{children}</>
}
