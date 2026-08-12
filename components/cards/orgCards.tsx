import Link from "next/link"
import { ArrowRight, Users, UserPlus } from "lucide-react"
import type { Organization } from "@/app/actions/organizations"
type OrganizationCardsProps = {
  organizations: Organization[]
}

export function OrganizationCards({ organizations }: OrganizationCardsProps) {
  if (organizations.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium tracking-widest text-primary uppercase">
            Discover
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Organizations
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Find communities you might be interested in.
          </p>
        </div>

        <Link
          href="/discover"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          See all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {organizations.map((organization) => (
          <OrganizationCard key={organization.id} organization={organization} />
        ))}
      </div>
    </section>
  )
}

function OrganizationCard({
  organization,
}: {
  organization: Organization
}) {
  const initials = organization.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: any) => word[0])
    .join("")
    .toUpperCase()

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Cover */}
      <Link href={`/discover/${organization.slug}`}>
        <div className="relative h-28 overflow-hidden bg-muted">
          {/* Theme-inspired cover */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.35),transparent_35%),radial-gradient(circle_at_80%_80%,hsl(var(--primary)/0.15),transparent_40%)]" />

          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/20" />

          {/* Decorative organization initial */}
          <div className="absolute -right-4 -bottom-8 text-[110px] leading-none font-black text-foreground/[0.035] select-none">
            {initials[0]}
          </div>
        </div>
      </Link>

      {/* Card body */}
      <div className="relative px-4 pb-4">
        {/* Profile image */}
        <Link href={`/discover/${organization.slug}`}>
          <div className="-mt-8 mb-3">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border-4 border-card bg-muted shadow-sm">
              {organization.logoUrl ? (
                <img
                  src={organization.logoUrl}
                  alt={`${organization.name} logo`}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-primary/10 text-lg font-semibold text-primary">
                  {initials}
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Organization info */}
        <Link href={`/discover/${organization.slug}`}>
          <h3 className="line-clamp-2 min-h-10 text-sm leading-5 font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {organization.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-9 text-xs leading-4 text-muted-foreground">
            {organization.description || "A student organization on Clubly."}
          </p>
        </Link>

        {/* Members */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="size-3.5" />
          <span>
            {organization.memberCount.toLocaleString()}{" "}
            {organization.memberCount === 1 ? "member" : "members"}
          </span>
        </div>

        {/* Follow */}
        <button
          type="button"
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <UserPlus className="size-3.5" />
          Follow
        </button>
      </div>
    </article>
  )
}
