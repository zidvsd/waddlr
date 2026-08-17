import Link from "next/link"
import { format } from "date-fns"
import { MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export type EventCardData = {
  id: string
  title: string
  location: string | null
  thumbnailUrl: string | null
  startsAt: Date
  organizationName: string
  organizationSlug: string
}

export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Thumbnail with date badge overlay */}
      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
        {event.thumbnailUrl ? (
          <Image
            src={event.thumbnailUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-primary/10">
            <Building2 className="size-6 text-primary/40" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-col items-center rounded-md bg-background/90 px-1.5 py-0.5 leading-none shadow-sm backdrop-blur-sm">
          <span className="text-[9px] font-medium tracking-wide text-muted-foreground uppercase">
            {format(event.startsAt, "MMM")}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {format(event.startsAt, "d")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {event.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {event.organizationName}
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          {event.location && (
            <div className="flex min-w-0 items-start gap-1 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 size-3 shrink-0" />
              <span className="wrap-break-words min-w-0">{event.location}</span>
            </div>
          )}

          <Button
            size="sm"
            variant="default"
            className="shrink-0 rounded-full bg-primary font-semibold"
          >
            <Link href={`/org/${event.organizationSlug}/events/${event.id}`}>
              Join
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
