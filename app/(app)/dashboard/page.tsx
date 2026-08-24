import Link from "next/link"
import { AnnouncementCard } from "@/components/cards/AnnouncementCard"
import { ArrowRight } from "lucide-react"
import { getUserOrganizations } from "../../actions/organizations"
import { getUpcomingEventsForUser } from "../../actions/events"
import { getRecentAnnouncementsForUser } from "@/app/actions/announcements"
import { getServerSession } from "@/lib/auth/get-session"
import { EmptyEvent } from "@/components/ui/empty-event"
import { EmptyOrganization } from "@/components/ui/empty-organization"
import { EmptyAnnouncement } from "@/components/ui/empty-announcement"
import { OrganizationCard } from "@/components/cards/OrganizationCard"
import { EventCard } from "@/components/cards/EventCard"
import { format } from "date-fns"

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session) {
    return null
  }

  const userId = session.user.id

  const [myOrgs, upcomingEvents, announcements] = await Promise.all([
    getUserOrganizations(userId),
    getUpcomingEventsForUser(userId, { limit: 4 }),
    getRecentAnnouncementsForUser(userId, { limit: 4 }),
  ])
  console.log(announcements)
  const firstName = session.user.name?.split(" ")[0] ?? "there"

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
        <div className="flex items-center justify-between">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Your organizations
          </h2>
          <Link
            href="/discover"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {myOrgs.length === 0 ? (
          <EmptyOrganization />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {myOrgs.map((item) => (
              <OrganizationCard key={item.organization.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Upcoming Events
          </h2>

          <Link
            href="/discover"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <EmptyEvent />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Recent announcements
          </h2>

          <Link
            href="/discover"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {announcements.length === 0 ? (
          <EmptyAnnouncement />
        ) : (
          <div className="flex flex-col gap-8">
            {announcements.map((announcement, index) => {
              const previous = announcements[index - 1]

              const isSameDate =
                previous &&
                format(previous.createdAt, "yyyy-MM-dd") ===
                  format(announcement.createdAt, "yyyy-MM-dd")

              return (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  isSameDate={isSameDate}
                />
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
