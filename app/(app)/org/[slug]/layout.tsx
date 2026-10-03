import { notFound } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/get-session"
import { OrgTabs } from "@/components/ui/org-tabs"
import { JoinOrManageButton } from "@/components/ui/join-manage-button"
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder"
import { getOrganizationBySlug, getViewerRole } from "@/lib/queries"
import Image from "next/image"
export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [org, user] = await Promise.all([
    getOrganizationBySlug(slug),
    getCurrentUser(),
  ])
  if (!org) notFound()
  const viewerRole = await getViewerRole(org.id, user?.id)

  const canManage =
    viewerRole === "organization_admin" || viewerRole === "officer"

  const isMember = viewerRole !== null

  return (
    <div className="flex w-full flex-col">
      {/* Banner */}

      {/* Organization header */}
      {org.headerUrl ? (
        <div className="relative h-28 w-full">
          <Image
            loading="eager"
            src={org.headerUrl}
            alt={org.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-28 w-full bg-accent" />
      )}
      <div className="container mx-auto px-4 pb-4 md:px-6">
        <div className="-mt-6 flex items-end justify-between">
          {/* Organization logo */}
          <div className="relative size-18 overflow-hidden rounded-full bg-muted">
            {org.logoUrl ? (
              <Image
                src={org.logoUrl}
                alt={org.name}
                width={48}
                height={48}
                className="size-18 object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-primary">N/A</span>
            )}
          </div>

          {/* Join / Manage / Leave */}
          <div className="z-10 mt-4">
            <JoinOrManageButton
              slug={org.slug}
              canManage={canManage}
              isMember={isMember}
              joinPolicy={org.joinPolicy}
            />
          </div>
        </div>
        {/* Organization name */}
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
        {/* Description */}
        <p className="mt-1 text-sm text-muted-foreground">{org.description}</p>
        {/* Members */}
        ```
        {/* Members */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {org.previewMembers.map((member) => (
              <div
                key={member.id}
                className="relative size-6 overflow-hidden rounded-full border-2 border-background"
              >
                {member.avatarUrl ? (
                  <Image
                    src={member.avatarUrl}
                    alt={member.displayName ?? "Member"}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                ) : (
                  <AvatarPlaceholder name={member.displayName ?? "Member"} />
                )}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {org.memberCount} members
          </span>
        </div>
      </div>

      {/* Organization tabs */}
      <div className="w-full border-y">
        <div className="container mx-auto px-4 md:px-6">
          <OrgTabs slug={org.slug} />
        </div>
      </div>

      {/* Page content */}
      <div className="container mx-auto px-4 py-4 md:px-6">{children}</div>
    </div>
  )
}
