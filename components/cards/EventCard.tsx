"use client"

import Link from "next/link"
import { format } from "date-fns"
import { MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { EventDetailModal } from "../modals/EventDetailModal"

export type EventCardData = {
  id: string
  title: string
  description: string | null
  location: string | null
  thumbnailUrl: string | null
  startsAt: Date
  organizationName: string
  organizationSlug: string
}

export function EventCard({ event }: { event: EventCardData }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <article className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
          {event.thumbnailUrl ? (
            <Image
              loading="lazy"
              src={event.thumbnailUrl}
              alt=""
              fill
              className="object-cover"
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

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-wrap text-foreground">
            {event.title}
          </p>

          <p className="text-xs text-wrap text-muted-foreground">
            {event.organizationName}
          </p>

          <div className="mt-2 flex items-start justify-between gap-3">
            {event.location && (
              <div className="flex min-w-0 items-start gap-1 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3 shrink-0" />
                <span className="wrap-break-words min-w-0">
                  {event.location}
                </span>
              </div>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="shrink-0 rounded-full font-semibold hover:text-primary"
              onClick={() => setIsOpen(true)}
            >
              View
            </Button>
          </div>
        </div>
      </article>
      {isOpen && (
        <EventDetailModal event={event} onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
