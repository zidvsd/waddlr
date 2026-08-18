"use client"

import Image from "next/image"
import { useState } from "react"
import { X, Maximize2, Minimize2, Calendar, MapPin } from "lucide-react"
import type { EventCardData } from "../cards/EventCard"
import { Button } from "@/components/ui/button"
interface EventDetailModalProps {
  event: EventCardData
  onClose: () => void
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={
          isFullscreen
            ? "relative h-full w-full overflow-y-auto rounded-2xl bg-background"
            : "relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
          <Button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="rounded-full bg-background/80 p-2 hover:bg-muted"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="size-5" />
            ) : (
              <Maximize2 className="size-5" />
            )}
          </Button>

          <Button
            type="button"
            onClick={onClose}
            className="rounded-full bg-background/80 p-2 hover:bg-muted"
            aria-label="Close"
          >
            <X className="size-5" />
          </Button>
        </div>

        {event.thumbnailUrl && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={event.thumbnailUrl}
              alt={event.title}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 pt-16">
          <p className="text-sm text-muted-foreground">
            {event.organizationName}
          </p>

          <h1 className="mt-1 text-2xl font-medium">{event.title}</h1>

          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0" />
              <span>{new Date(event.startsAt).toLocaleString()}</span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <Button className="mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground">
            Join event
          </Button>

          {event.description && (
            <div className="mt-6 border-t pt-4">
              <h3 className="mb-2 text-sm font-medium">About this event</h3>

              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
