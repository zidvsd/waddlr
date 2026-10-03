import { cacheLife, cacheTag } from "next/cache"
import { and, asc, desc, eq, gte } from "drizzle-orm"
import { db } from "@/lib/db"
import { event, organization, organizationMember } from "@/lib/db/schema"
import {
  cacheTags,
  organizationEventsTag,
  userUpcomingEventsTag,
} from "./cache-tags"

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
  return getCachedUpcomingEventsForUser(userId, opts.limit ?? 4)
}

async function getCachedUpcomingEventsForUser(userId: string, limit: number) {
  "use cache"
  cacheLife("seconds")
  cacheTag(cacheTags.events, userUpcomingEventsTag(userId))

  return db
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
  return getCachedOrgEvents(organizationId, opts.limit ?? 20)
}

async function getCachedOrgEvents(
  organizationId: string,
  limit: number
): Promise<OrgEvent[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(cacheTags.events, organizationEventsTag(organizationId))

  return db
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
