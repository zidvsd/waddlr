// MOCK data — replace with a merged, timestamp-sorted query across
// `event` and `announcement` filtered by organization_id once wired up.
const feedItems = [
  {
    id: "a1",
    type: "announcement" as const,
    title: "Hiring project leads for fall term",
    body: "We're looking for 3 project leads to run subteams next semester.",
    timeLabel: "2h ago",
  },
  {
    id: "e1",
    type: "event" as const,
    title: "Robotics demo night",
    body: "Engineering Hall, Room 214",
    timeLabel: "Jul 24 · 6:00 PM",
  },
]

export default function OrgFeedPage() {
  return (
    <div className="flex w-full flex-col gap-3">
      {feedItems.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-border/60 bg-card p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] ${
                item.type === "announcement"
                  ? "bg-[var(--bg-warning)] text-[var(--text-warning)]"
                  : "bg-[var(--bg-accent)] text-[var(--text-accent)]"
              }`}
            >
              {item.type === "announcement" ? "Announcement" : "Event"}
            </span>
            <span className="text-xs text-muted-foreground">
              {item.timeLabel}
            </span>
          </div>
          <p className="mb-1 text-sm font-medium text-foreground">
            {item.title}
          </p>
          <p className="text-sm text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  )
}
