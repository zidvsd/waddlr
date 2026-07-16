// TODO: this file assumes an `event` table that doesn't exist yet in your
// schema. Wire it up once you build the events module. Shape below matches
// what /dashboard expects — keep the return type stable when you implement it.

export type UpcomingEvent = {
  id: string
  title: string
  startsAt: Date
  organizationName: string
  organizationSlug: string
}

/**
 * Returns upcoming events across every org the user belongs to,
 * soonest first. Used on /dashboard for the "Upcoming events" list.
 *
 * Expected implementation once `event` exists:
 *   - join event -> organization via event.organizationId
 *   - filter event.organizationId IN (orgs the user is a member of)
 *   - filter event.startsAt >= now()
 *   - order by event.startsAt asc
 *   - limit N
 */
export async function getUpcomingEventsForUser(
  userId: string,
  opts: { limit?: number } = {}
): Promise<UpcomingEvent[]> {
  // Placeholder until the event table is built.
  return []
}
