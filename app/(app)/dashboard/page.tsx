import Link from "next/link"
import { format } from "date-fns"
import { Compass, CalendarDays, Building2 } from "lucide-react"

import { getUserOrganizations } from "../../actions/organizations"
import { getUpcomingEventsForUser } from "../../actions/events"

import { getServerSession } from "@/lib/auth/get-session"
import { EmptyEvent } from "@/components/ui/empty-event"
import { EmptyOrganization } from "@/components/ui/empty-organization"

export default async function DashboardPage() {
  const session = await getServerSession()

  const userId = session!.user.id

  // const [myOrgs, upcomingEvents] = await Promise.all([
  //   getUserOrganizations(userId),
  //   getUpcomingEventsForUser(userId, { limit: 4 }),
  // ])
  type UpcomingEvent = Awaited<
    ReturnType<typeof getUpcomingEventsForUser>
  >[number]
  const myOrgs = []
  const upcomingEvents: UpcomingEvent[] = []

  const firstName = session!.user.name?.split(" ")[0] ?? "there"

  return (
    <div className="container mx-auto px-4 pt-8">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your organizations.
          </p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Your organizations
        </h2>

        {myOrgs.length === 0 ? <EmptyOrganization /> : null}
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Upcoming events
        </h2>

        {myOrgs.length === 0 ? (
          <EmptyEvent />
        ) : (
          <div className="divide-y divide-border rounded-xl border border-border">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/org/${event.organizationSlug}/events/${event.id}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <CalendarDays className="size-4.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{event.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {event.organizationName}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {format(event.startsAt, "MMM d")}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/*
      {recommendedOrgs.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            For you
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {recommendedOrgs.map((org) => (
              <Link
                key={org.id}
                href={`/discover/${org.slug}`}
                className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Users className="h-[18px] w-[18px] text-muted-foreground" />
                </div>
                <p className="mb-1 text-sm font-medium">{org.name}</p>
                <p className="text-xs text-muted-foreground">
                  {org.memberCount} members
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      */}
    </div>
  )
}
