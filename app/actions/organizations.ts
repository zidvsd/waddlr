import { db } from "@/lib/db"
import { organizationMember } from "@/lib/db/schema"
import { organization } from "@/lib/db/schema/organization"
import { eq } from "drizzle-orm"

export type UserOrganization = {
  role: "organization_admin" | "officer" | "member"
  organization: {
    id: string
    name: string
    slug: string
    logoUrl: string | null
  }
}

/**
 * Returns every organization the given user is a member of, along with
 * their role in each. Used on /dashboard for the "Your organizations" grid.
 */
export async function getUserOrganizations(
  userId: string
): Promise<UserOrganization[]> {
  const rows = await db
    .select({
      role: organizationMember.role,
      orgId: organization.id,
      orgName: organization.name,
      orgSlug: organization.slug,
      orgLogoUrl: organization.logoUrl,
    })
    .from(organizationMember)
    .innerJoin(
      organization,
      eq(organizationMember.organizationId, organization.id)
    )
    .where(eq(organizationMember.userId, userId))

  return rows.map((row) => ({
    role: row.role,
    organization: {
      id: row.orgId,
      name: row.orgName,
      slug: row.orgSlug,
      logoUrl: row.orgLogoUrl,
    },
  }))
}
