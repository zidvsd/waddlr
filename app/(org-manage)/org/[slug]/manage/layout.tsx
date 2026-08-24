// layout.tsx
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { getServerSession } from "@/lib/auth/get-session"
import { getUserOrganizations } from "@/app/actions/organizations"
import { redirect } from "next/navigation"

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const session = await getServerSession()
  if (!session) redirect("/login")

  const { slug } = await params
  const userOrgs = await getUserOrganizations(session.user.id)

  if (userOrgs.length === 0) redirect("/onboarding")

  return (
    <SidebarProvider>
      <AppSidebar
        userOrgs={userOrgs}
        activeSlug={slug}
        user={{
          name: session.user.name,
          email: session.user.email,
          avatar: session.user.image ?? "",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Organization</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
