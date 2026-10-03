import { cacheLife, cacheTag } from "next/cache"
import { desc, eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { announcement, organization, organizationMember } from "@/lib/db/schema"
import {
  cacheTags,
  organizationAnnouncementsTag,
  userAnnouncementsTag,
} from "./cache-tags"

export type UserAnnouncement = {
  id: string
  organizationId: string
  title: string
  body: string
  eventId: string | null
  createdBy: string
  createdAt: Date
  updatedAt: Date
  organizationName: string
  organizationSlug: string
}

export async function getRecentAnnouncementsForUser(
  userId: string,
  opts: { limit?: number } = {}
): Promise<UserAnnouncement[]> {
  return getCachedRecentAnnouncementsForUser(userId, opts.limit ?? 4)
}

async function getCachedRecentAnnouncementsForUser(
  userId: string,
  limit: number
): Promise<UserAnnouncement[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(cacheTags.announcements, userAnnouncementsTag(userId))

  return db
    .select({
      id: announcement.id,
      organizationId: announcement.organizationId,
      title: announcement.title,
      body: announcement.body,
      eventId: announcement.eventId,
      createdBy: announcement.createdBy,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt,
      organizationName: organization.name,
      organizationSlug: organization.slug,
    })
    .from(announcement)
    .innerJoin(organization, eq(announcement.organizationId, organization.id))
    .innerJoin(
      organizationMember,
      eq(organizationMember.organizationId, organization.id)
    )
    .where(eq(organizationMember.userId, userId))
    .orderBy(desc(announcement.createdAt))
    .limit(limit)
}

export async function getOrgAnnouncements(
  organizationId: string,
  opts: { limit?: number; offset?: number } = {}
): Promise<UserAnnouncement[]> {
  return getCachedOrgAnnouncements(
    organizationId,
    opts.limit ?? 20,
    opts.offset ?? 0
  )
}

async function getCachedOrgAnnouncements(
  organizationId: string,
  limit: number,
  offset: number
): Promise<UserAnnouncement[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(
    cacheTags.announcements,
    organizationAnnouncementsTag(organizationId)
  )

  return db
    .select({
      id: announcement.id,
      organizationId: announcement.organizationId,
      title: announcement.title,
      body: announcement.body,
      eventId: announcement.eventId,
      createdBy: announcement.createdBy,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt,
      organizationName: organization.name,
      organizationSlug: organization.slug,
    })
    .from(announcement)
    .innerJoin(organization, eq(announcement.organizationId, organization.id))
    .where(eq(announcement.organizationId, organizationId))
    .orderBy(desc(announcement.createdAt))
    .limit(limit)
    .offset(offset)
}
