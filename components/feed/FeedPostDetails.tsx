import { format } from "date-fns"
import { Calendar, Clock, MapPin } from "lucide-react"

import type { OrgEvent } from "@/app/actions/events"
import type { UserAnnouncement } from "@/app/actions/announcements"

interface EventDetailsCardProps {
  event: OrgEvent
}

export function EventDetailsCard({ event }: EventDetailsCardProps) {
  return (
    <div className="mt-6 space-y-4 rounded-xl border border-border bg-muted/50 p-4">
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground">Date & time</p>

          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {format(new Date(event.startsAt), "EEEE, MMMM d, yyyy · h:mm a")}
            {event.endsAt && ` → ${format(new Date(event.endsAt), "h:mm a")}`}
          </p>
        </div>
      </div>

      {event.location && (
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground">Location</p>

            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {event.location}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface AnnouncementDetailsCardProps {
  announcement: UserAnnouncement
}

export function AnnouncementDetailsCard({
  announcement,
}: AnnouncementDetailsCardProps) {
  return (
    <div className="mt-6 space-y-4 rounded-xl border border-border bg-muted/50 p-4">
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground">Posted</p>

          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {format(
              new Date(announcement.createdAt),
              "EEEE, MMMM d, yyyy · h:mm a"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export function LinkedEventCard() {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-4">
      <Calendar className="size-4 shrink-0 text-primary" />

      <div className="min-w-0">
        <p className="text-xs font-medium text-foreground">Linked event</p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          This announcement is connected to an event.
        </p>
      </div>
    </div>
  )
}
