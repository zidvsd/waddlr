// app/actions/members.ts
"use server"

import { db } from "@/lib/db"
import { organizationMember } from "@/lib/db/schema"
import { profile } from "@/lib/db/schema/profile"
import { eq } from "drizzle-orm"
import type { OrganizationRole } from "@/lib/db/schema/organization"

export type OrgMember = {
  id: string
  userId: string
  role: OrganizationRole
  displayName: string | null
  avatarUrl: string | null
}

const ROLE_ORDER: Record<OrganizationRole, number> = {
  organization_admin: 0,
  officer: 1,
  member: 2,
}

export async function getOrgMembers(
  organizationId: string,
  opts: { limit?: number } = {}
): Promise<OrgMember[]> {
  const limit = opts.limit ?? 10

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

  return rows
    .sort((a, b) => (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99))
    .slice(0, limit)
}
