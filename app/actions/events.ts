"use server"

import { db } from "@/lib/db"
import { event, organization, organizationMember } from "@/lib/db/schema"
import { and, asc, eq, gte } from "drizzle-orm"

export async function getUpcomingEventsForUser(
  userId: string,
  opts: { limit?: number } = {}
) {
  const limit = opts.limit ?? 4

  return await db
    .select({
      id: event.id,
      organizationId: event.organizationId,

      title: event.title,
      description: event.description,
      location: event.location,
      thumbnailUrl: event.thumbnailUrl,

      startsAt: event.startsAt,
      endsAt: event.endsAt,

      status: event.status,
      createdBy: event.createdBy,

      createdAt: event.createdAt,
      updatedAt: event.updatedAt,

      // Organization information
      organizationName: organization.name,
      organizationSlug: organization.slug,
    })
    .from(event)
    .innerJoin(organization, eq(event.organizationId, organization.id))
    .innerJoin(
      organizationMember,
      eq(organizationMember.organizationId, organization.id)
    )
    .where(
      and(
        eq(organizationMember.userId, userId),
        eq(event.status, "published"),
        gte(event.startsAt, new Date())
      )
    )
    .orderBy(asc(event.startsAt))
    .limit(limit)
}
