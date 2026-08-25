import Link from "next/link"
import { Heart } from "lucide-react"
import { UserOrganization } from "@/lib/types/organization"
import { JoinOrManageButton } from "../ui/join-manage-button"
import { Button } from "../ui/button"
import Image from "next/image"
const ROLE_LABELS: Record<string, string> = {
  organization_admin: "Admin",
  officer: "Officer",
  member: "Member",
}

export function OrganizationCard({ item }: { item: UserOrganization }) {
  const { organization, role } = item

  const initials = organization.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  const roleLabel = ROLE_LABELS[role] ?? "Member"

  const canManage = role === "organization_admin" || role === "officer"

  return (
    <article className="w-full rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Top section */}
      <div className="mb-4 flex items-start justify-between">
        {/* Organization logo */}
        <div className="relative size-12 overflow-hidden rounded-full bg-muted">
          {organization.logoUrl ? (
            <Image
              src={organization.logoUrl}
              alt={organization.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <span className="text-sm font-semibold text-primary">
              {initials}
            </span>
          )}
        </div>

        {/* Member count */}
        <div className="flex flex-col items-end justify-end">
          <span className="text-xs font-medium text-muted-foreground">
            {organization.memberCount} members
          </span>
          <span className="shrink-0 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Organization info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight text-wrap text-foreground">
          {organization.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
          {organization.description || "A student organization on Waddlr."}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Follow / favorite placeholder */}
        <Button
          type="button"
          variant="ghost"
          aria-label="Follow organization"
          className="group flex size-10 shrink-0 items-center justify-center rounded-md border transition-all active:scale-95"
        >
          <Heart className="size-4.5 transition-colors group-hover:fill-primary group-hover:text-primary" />
        </Button>

        {/* View */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="outline" className="rounded-md text-foreground">
            <Link href={`/org/${organization.slug}`}>View</Link>
          </Button>

          {/* Manage / Leave */}
          <JoinOrManageButton
            slug={organization.slug}
            canManage={canManage}
            isMember={true}
            joinPolicy="open"
          />
        </div>
      </div>
    </article>
  )
}
