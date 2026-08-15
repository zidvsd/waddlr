import { notFound } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth/get-session"
import { OrgTabs } from "@/components/ui/org-tabs"
import { JoinOrManageButton } from "@/components/ui/join-manage-button"

// MOCK — replace with real Drizzle query once org/member schema wiring is confirmed
async function getOrgBySlug(slug: string) {
  return {
    id: "org_1",
    slug,
    name: "Robotics Club",
    description:
      "Building autonomous robots and competing in regional competitions.",
    logoUrl: null as string | null,
    bannerUrl: null as string | null,
    visibility: "public" as "public" | "unlisted" | "private",
    joinPolicy: "open" as "open" | "approval_required" | "invite_only",
    memberCount: 128,
    previewMembers: [
      { id: "1", initial: "Z", color: "accent" },
      { id: "2", initial: "N", color: "pro" },
      { id: "3", initial: "A", color: "success" },
    ],
  }
}

// MOCK — replace with real organization_member role lookup
async function getViewerRole(orgId: string, userId: string | undefined) {
  if (!userId) return null
  return "member" as "organization_admin" | "officer" | "member" | null
}

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const org = await getOrgBySlug(params.slug)
  if (!org) notFound()

  const user = await getCurrentUser()
  const viewerRole = await getViewerRole(org.id, user?.id)
  const canManage =
    viewerRole === "organization_admin" ||
    viewerRole === "officer" ||
    user?.role === "superadmin"
  const isMember = viewerRole !== null

  return (
    <div className="flex w-full flex-col">
      <div className="h-28 w-full bg-accent" />

      <div className="container mx-auto border-b border-border/60 px-4 pb-4 md:px-6">
        <div className="-mt-6 flex items-end justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-background bg-accent text-2xl font-medium text-accent">
            {org.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={org.logoUrl}
                alt=""
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              org.name.charAt(0)
            )}
          </div>
          <JoinOrManageButton
            slug={org.slug}
            canManage={canManage}
            isMember={isMember}
            joinPolicy={org.joinPolicy}
          />
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <h1 className="text-[15px] font-medium text-foreground">
            {org.name}
          </h1>
          <span className="bg-success text-success rounded-full px-2 py-0.5 text-[11px]">
            {org.visibility === "public"
              ? "Public"
              : org.visibility === "unlisted"
                ? "Unlisted"
                : "Private"}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{org.description}</p>

        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {org.previewMembers.map((m) => (
              <div
                key={m.id}
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-background text-[9px]"
                style={{
                  backgroundColor: `var(--bg-${m.color})`,
                  color: `var(--text-${m.color})`,
                }}
              >
                {m.initial}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {org.memberCount} members
          </span>
        </div>
      </div>

      <div className="container mx-auto">
        <OrgTabs slug={org.slug} />
      </div>

      <div className="container mx-auto px-4 py-4 md:px-6">{children}</div>
    </div>
  )
}
