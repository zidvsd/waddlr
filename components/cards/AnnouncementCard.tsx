import { format, isToday } from "date-fns"
import type { UserAnnouncement } from "@/app/actions/announcements"

function formatTimelineDate(date: Date) {
  if (isToday(date)) {
    return {
      topLabel: "Today",
      bottomLabel: format(date, "HH:mm"),
    }
  }

  return {
    topLabel: format(date, "MMM dd"),
    bottomLabel: format(date, "yyyy"),
  }
}

export function AnnouncementCard({
  announcements,
}: {
  announcements: UserAnnouncement[]
}) {
  return (
    <div className="w-full">
      <div className="space-y-8">
        {announcements.map((announcement) => {
          const { topLabel, bottomLabel } = formatTimelineDate(
            announcement.createdAt
          )

          return (
            <div key={announcement.id} className="group flex items-start gap-5">
              {/* Date */}
              <div className="w-16 shrink-0 pt-0.5 text-right">
                <span className="block text-xs font-semibold text-muted-foreground">
                  {topLabel}
                </span>

                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {bottomLabel}
                </span>
              </div>

              {/* Timeline line */}
              <div className="self-stretch">
                <div className="h-full w-px bg-border transition-colors group-hover:bg-primary/40" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base leading-snug font-semibold tracking-tight">
                  {announcement.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {announcement.body}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {announcement.organizationName}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
