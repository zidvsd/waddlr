import { format } from "date-fns"
import type { UserAnnouncement } from "@/app/actions/announcements"
import Link from "next/link"
export function AnnouncementCard({
  announcement,
}: {
  announcement: UserAnnouncement
}) {
  return (
    <div className="group flex items-start gap-5">
      <div className="w-16 shrink-0 pt-0.5 text-right">
        <span className="block text-xs font-semibold text-muted-foreground">
          {format(announcement.createdAt, "MMM dd")}
        </span>

        <span className="mt-0.5 block text-xs text-muted-foreground">
          {format(announcement.createdAt, "yyyy")}
        </span>
      </div>

      <div className="self-stretch">
        <div className="h-full w-px bg-border transition-colors group-hover:bg-primary/40" />
      </div>

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
}
