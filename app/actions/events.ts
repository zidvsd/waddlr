"use server"

import { db } from "@/lib/db"
import { event, organization, organizationMember } from "@/lib/db/schema"
import { and, asc, eq, gte, desc } from "drizzle-orm"

export type UserEvent = {
  status: "going" | "interested" | "not_going" | null
  event: {
    id: string
    title: string
    description: string | null
    location: string | null
    thumbnailUrl: string | null
    startsAt: Date
    endsAt: Date | null
    organizationId: string
    organizationName: string
    organizationSlug: string
    attendeeCount: number
  }
}

export type OrgEvent = {
  id: string
  title: string
  description: string | null
  location: string | null
  thumbnailUrl: string | null
  startsAt: Date
  endsAt: Date | null
  organizationId: string
  organizationName: string
  organizationSlug: string
  createdAt: Date
  createdBy: string
}

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
export async function getOrgEvents(
  organizationId: string,
  opts: { limit?: number } = {}
): Promise<OrgEvent[]> {
  const limit = opts.limit ?? 20

  return await db
    .select({
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      thumbnailUrl: event.thumbnailUrl,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      organizationId: event.organizationId,
      organizationName: organization.name,
      organizationSlug: organization.slug,
      createdAt: event.createdAt,
      createdBy: event.createdBy,
    })
    .from(event)
    .innerJoin(organization, eq(event.organizationId, organization.id))
    .where(
      and(
        eq(event.organizationId, organizationId),
        eq(event.status, "published")
      )
    )
    .orderBy(desc(event.createdAt))
    .limit(limit)
}