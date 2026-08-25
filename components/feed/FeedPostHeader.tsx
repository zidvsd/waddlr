import { formatDistanceToNow } from "date-fns"
import { Calendar, Megaphone } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface FeedPostHeaderProps {
  isAnnouncement: boolean
  organizationName: string
  createdAt: string | Date
}

export function FeedPostHeader({
  isAnnouncement,
  organizationName,
  createdAt,
}: FeedPostHeaderProps) {
  return (
    <div className="flex items-start gap-3 pr-10">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
          isAnnouncement
            ? "bg-primary/10 text-primary"
            : "bg-violet-500/10 text-violet-500"
        } `}
      >
        {isAnnouncement ? (
          <Megaphone className="size-5" />
        ) : (
          <Calendar className="size-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {isAnnouncement ? "Announcement" : "Event"}
          </span>

          <Badge
            variant="secondary"
            className="max-w-full truncate text-[10px]"
          >
            {organizationName}
          </Badge>
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  )
}
