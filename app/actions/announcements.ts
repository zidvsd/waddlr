"use server"

import { db } from "@/lib/db"
import { announcement, organization, organizationMember } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"

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
  const limit = opts.limit ?? 4

  return await db
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
