import { cacheLife, cacheTag } from "next/cache"
import { and, asc, desc, eq, ilike, ne, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { organizationMember } from "@/lib/db/schema"
import { profile } from "@/lib/db/schema/profile"
import type { OrganizationRole } from "@/lib/db/schema/organization"
import { cacheTags, organizationMembersTag } from "./cache-tags"

export type OrgPerson = {
  id: string
  userId: string
  role: OrganizationRole
  displayName: string | null
  avatarUrl: string | null
  school: string | null
  graduationYear: number | null
  joinedAt: Date
}

const personColumns = {
  id: organizationMember.id,
  userId: organizationMember.userId,
  role: organizationMember.role,
  joinedAt: organizationMember.joinedAt,
  displayName: profile.displayName,
  avatarUrl: profile.avatarUrl,
  school: profile.school,
  graduationYear: profile.graduationYear,
}

/** Admins and officers, admins first. Small list, so no pagination. */
export async function getOrgLeadership(
  organizationId: string
): Promise<OrgPerson[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(
    cacheTags.organizationMembers,
    organizationMembersTag(organizationId)
  )

  const rows = await db
    .select(personColumns)
    .from(organizationMember)
    .leftJoin(profile, eq(profile.userId, organizationMember.userId))
    .where(
      and(
        eq(organizationMember.organizationId, organizationId),
        ne(organizationMember.role, "member")
      )
    )
    .orderBy(asc(organizationMember.role), asc(organizationMember.joinedAt))

  cacheTag(...rows.map((row) => `profile:${row.userId}`))
  return rows
}

/**
 * Newest members first.
 * - No query: regular members only (leaders are listed separately).
 * - With query: searches everyone by display name.
 */
export async function getOrgPeople(
  organizationId: string,
  query: string,
  limit: number
): Promise<{ people: OrgPerson[]; hasMore: boolean }> {
  "use cache"
  cacheLife("minutes")
  cacheTag(
    cacheTags.organizationMembers,
    organizationMembersTag(organizationId)
  )

  const escaped = query.replace(/[\\%_]/g, "\\$&")

  const rows = await db
    .select(personColumns)
    .from(organizationMember)
    .leftJoin(profile, eq(profile.userId, organizationMember.userId))
    .where(
      and(
        eq(organizationMember.organizationId, organizationId),
        query
          ? ilike(profile.displayName, `%${escaped}%`)
          : eq(organizationMember.role, "member")
      )
    )
    .orderBy(desc(organizationMember.joinedAt), asc(organizationMember.id))
    .limit(limit + 1) // one extra row tells us if there's more

  cacheTag(...rows.map((row) => `profile:${row.userId}`))

  return { people: rows.slice(0, limit), hasMore: rows.length > limit }
}

export async function getOrgStats(organizationId: string) {
  "use cache"
  cacheLife("minutes")
  cacheTag(
    cacheTags.organizationMembers,
    organizationMembersTag(organizationId)
  )

  const [row] = await db
    .select({
      total: sql<number>`count(*)::int`,
      lastWeek: sql<number>`(count(*) filter (where ${organizationMember.joinedAt} > now() - interval '7 days'))::int`,
      lastMonth: sql<number>`(count(*) filter (where ${organizationMember.joinedAt} > now() - interval '30 days'))::int`,
    })
    .from(organizationMember)
    .where(eq(organizationMember.organizationId, organizationId))

  return row ?? { total: 0, lastWeek: 0, lastMonth: 0 }
}
