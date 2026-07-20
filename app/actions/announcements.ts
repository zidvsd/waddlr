// app/actions/announcements.ts

"use server"

export type AnnouncementItem = {
  id: string
  title: string
  body: string
  createdAt: Date
  organizationName: string
  organizationSlug: string
  eventId: string | null
}

/**
 * Returns recent announcements from organizations the user belongs to,
 * newest first. Used on /dashboard.
 *
 * Expected implementation:
 *   - join announcement -> organization
 *   - filter organization.id IN (orgs the user belongs to)
 *   - order by announcement.createdAt desc
 *   - limit N
 */
export async function getRecentAnnouncementsForUser(
  userId: string,
  opts: { limit?: number } = {}
): Promise<AnnouncementItem[]> {
  return []
}
