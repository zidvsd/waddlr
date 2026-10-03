import { cacheLife, cacheTag } from "next/cache"
import { asc, eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { organizationMember } from "@/lib/db/schema"
import { profile } from "@/lib/db/schema/profile"
import type { OrganizationRole } from "@/lib/db/schema/organization"
import { cacheTags, organizationMembersTag } from "./cache-tags"

export type OrgMember = {
  id: string
  userId: string
  role: OrganizationRole
  displayName: string | null
  avatarUrl: string | null
}

export async function getOrgMembers(
  organizationId: string,
  opts: { limit?: number } = {}
): Promise<OrgMember[]> {
  return getCachedOrgMembers(organizationId, opts.limit ?? 10)
}

async function getCachedOrgMembers(
  organizationId: string,
  limit: number
): Promise<OrgMember[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(
    cacheTags.organizationMembers,
    organizationMembersTag(organizationId)
  )

  const rows = await db
    .select({
      id: organizationMember.id,
      userId: organizationMember.userId,
      role: organizationMember.role,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
    })
    .from(organizationMember)
    .leftJoin(profile, eq(profile.userId, organizationMember.userId))
    .where(eq(organizationMember.organizationId, organizationId))
    .orderBy(asc(organizationMember.role), asc(organizationMember.joinedAt))
    .limit(limit)

  cacheTag(...rows.map((row) => `profile:${row.userId}`))
  return rows
}
