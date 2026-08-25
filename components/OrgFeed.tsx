"use client"

import { formatDistanceToNow, format } from "date-fns"
import {
  Megaphone,
  Calendar,
  MoreHorizontal,
  MapPin,
  Clock,
  Users,
} from "lucide-react"
import type { UserAnnouncement } from "@/app/actions/announcements"
import type { OrgEvent } from "@/app/actions/events"
import type { OrgMember } from "@/app/actions/members"
// ---------------------------------------------------------------------------
// Unified feed item type
// ---------------------------------------------------------------------------

type FeedItem =
  | { kind: "announcement"; createdAt: Date; data: UserAnnouncement }
  | { kind: "event"; createdAt: Date; data: OrgEvent }

function mergeFeed(
  announcements: UserAnnouncement[],
  events: OrgEvent[]
): FeedItem[] {
  const a: FeedItem[] = announcements.map((d) => ({
    kind: "announcement" as const,
    createdAt: d.createdAt,
    data: d,
  }))
  const e: FeedItem[] = events.map((d) => ({
    kind: "event" as const,
    createdAt: d.createdAt,
    data: d,
  }))
  return [...a, ...e].sort(
    (x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime()
  )
}

const ROLE_LABELS: Record<string, string> = {
  organization_admin: "Admin",
  officer: "Officer",
  member: "Member",
}

const ROLE_COLORS: Record<string, string> = {
  organization_admin: "text-sunbeam",
  officer: "text-violet",
  member: "text-muted-foreground",
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function AnnouncementCard({ post }: { post: UserAnnouncement }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Megaphone className="size-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                Announcement
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                {post.organizationName}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <button className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      {/* Body */}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.body}
        </p>
      </div>

      {/* Linked event badge */}
      {post.eventId && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2">
          <Calendar className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Linked to an event
          </span>
        </div>
      )}
    </article>
  )
}

function EventCard({ ev }: { ev: OrgEvent }) {
  const start = new Date(ev.startsAt)
  const end = ev.endsAt ? new Date(ev.endsAt) : null

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-colors">
      {ev.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ev.thumbnailUrl}
          alt=""
          className="h-44 w-full object-cover"
        />
      )}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet/10">
              <Calendar className="size-4 text-violet" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">
                  Event
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  {ev.organizationName}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(ev.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <button className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">
          <h3 className="text-base font-semibold text-foreground">
            {ev.title}
          </h3>
          {ev.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {ev.description}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5 shrink-0" />
            <span>
              {format(start, "MMM d, yyyy · h:mm a")}
              {end && ` → ${format(end, "h:mm a")}`}
            </span>
          </div>
          {ev.location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span>{ev.location}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyFeed() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Megaphone className="size-5 text-muted-foreground" />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">
        Nothing posted yet
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Announcements and events will appear here.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sidebar widgets
// ---------------------------------------------------------------------------

function AboutCard({ org }: { org: OrgFeedProps["org"] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <h2 className="text-xs font-semibold tracking-widest text-foreground uppercase">
        About
      </h2>
      {org.description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {org.description}
        </p>
      )}
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="size-3.5 shrink-0" />
        <span>{org.memberCount} members</span>
      </div>
    </div>
  )
}

function UpcomingCard({ events }: { events: OrgEvent[] }) {
  if (events.length === 0) return null
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <h2 className="text-xs font-semibold tracking-widest text-foreground uppercase">
        Upcoming
      </h2>
      <div className="mt-3 space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="flex gap-3">
            {/* Date block */}
            <div className="flex w-10 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-1.5 text-center">
              <span className="text-[9px] font-semibold text-primary uppercase">
                {format(new Date(ev.startsAt), "MMM")}
              </span>
              <span className="text-sm leading-none font-bold text-primary">
                {format(new Date(ev.startsAt), "d")}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">
                {ev.title}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {format(new Date(ev.startsAt), "h:mm a")}
                {ev.location && ` · ${ev.location}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MembersCard({ members }: { members: OrgMember[] }) {
  if (members.length === 0) return null
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <h2 className="text-xs font-semibold tracking-widest text-foreground uppercase">
        Members
      </h2>
      <div className="mt-3 space-y-2.5">
        {members.map((m) => {
          const initials = (m.displayName ?? "?")
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()

          return (
            <div key={m.id} className="flex items-center gap-2.5">
              {/* Avatar */}
              <div className="relative shrink-0">
                {m.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.avatarUrl}
                    alt=""
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                    {initials}
                  </div>
                )}
              </div>

              {/* Name + role */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  {m.displayName ?? "Unknown"}
                </p>
              </div>

              {/* Role badge */}
              <span
                className={`shrink-0 text-[10px] font-medium ${
                  ROLE_COLORS[m.role] ?? "text-muted-foreground"
                }`}
              >
                {ROLE_LABELS[m.role] ?? m.role}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

interface OrgFeedProps {
  announcements: UserAnnouncement[]
  events: OrgEvent[]
  org: {
    name: string
    description: string | null
    memberCount: number
  }
  userId?: string
  members: OrgMember[]
}

export function OrgFeed({ announcements, events, org, members }: OrgFeedProps) {
  const feed = mergeFeed(announcements, events)

  const upcomingEvents = events
    .filter((e) => new Date(e.startsAt) > new Date())
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )
    .slice(0, 3)

  return (
    <div className="mx-auto">
      <div className="flex gap-6 lg:gap-8">
        {/* Feed column */}
        <div className="min-w-0 flex-1 space-y-4">
          {feed.length === 0 ? (
            <EmptyFeed />
          ) : (
            feed.map((item) =>
              item.kind === "announcement" ? (
                <AnnouncementCard key={`a-${item.data.id}`} post={item.data} />
              ) : (
                <EventCard key={`e-${item.data.id}`} ev={item.data} />
              )
            )
          )}
        </div>

        {/* Sticky right sidebar — desktop only */}
        <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
          <div className="sticky top-28 space-y-4">
            <AboutCard org={org} />
            <UpcomingCard events={upcomingEvents} />
            <MembersCard members={members} />
          </div>
        </aside>
      </div>
    </div>
  )
}
