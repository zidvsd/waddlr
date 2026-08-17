"use server"
import { db } from "@/lib/db"
import { organizationMember } from "@/lib/db/schema"
import { eq, count, and } from "drizzle-orm"
import { OrganizationCard } from "@/lib/types/organization"
import { profile } from "@/lib/db/schema/profile"
import {
  organization,
  organizationRoleEnum,
} from "@/lib/db/schema/organization"

export type UserOrganization = {
  role: (typeof organizationRoleEnum.enumValues)[number]
  organization: {
    id: string
    name: string
    slug: string
    description: string | null
    logoUrl: string | null
    memberCount: number
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
      orgDescription: organization.description,
      memberCount: count(organizationMember.id),
    })
    .from(organizationMember)
    .innerJoin(
      organization,
      eq(organizationMember.organizationId, organization.id)
    )
    .where(eq(organizationMember.userId, userId))
    .groupBy(
      organizationMember.role,
      organization.id,
      organization.name,
      organization.slug,
      organization.logoUrl,
      organization.description
    )

  return rows.map((row) => ({
    role: row.role,
    organization: {
      id: row.orgId,
      name: row.orgName,
      slug: row.orgSlug,
      logoUrl: row.orgLogoUrl,
      description: row.orgDescription,
      memberCount: Number(row.memberCount),
    },
  }))
}
export async function getAllOrganizations(): Promise<OrganizationCard[]> {
  const rows = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      logoUrl: organization.logoUrl,
      memberCount: count(organizationMember.id),
    })
    .from(organization)
    .leftJoin(
      organizationMember,
      eq(organizationMember.organizationId, organization.id)
    )
    .groupBy(
      organization.id,
      organization.name,
      organization.slug,
      organization.description,
      organization.logoUrl
    )

  return rows
}
export async function getOrganizationBySlug(slug: string) {
  const [org] = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      logoUrl: organization.logoUrl,
      visibility: organization.visibility,
      joinPolicy: organization.joinPolicy,
      ownerId: organization.ownerId,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    })
    .from(organization)
    .where(eq(organization.slug, slug))
    .limit(1)

  if (!org) return null

  const members = await db
    .select({
      id: organizationMember.id,
      avatarUrl: profile.avatarUrl,
      displayName: profile.displayName,
    })
    .from(organizationMember)
    .leftJoin(profile, eq(profile.userId, organizationMember.userId))
    .where(eq(organizationMember.organizationId, org.id))
    .limit(3)

  const [{ memberCount }] = await db
    .select({
      memberCount: count(organizationMember.id),
    })
    .from(organizationMember)
    .where(eq(organizationMember.organizationId, org.id))

  return {
    ...org,
    memberCount,
    previewMembers: members,
  }
}

export async function getViewerRole(
  organizationId: string,
  userId: string | undefined
) {
  if (!userId) return null

  const [membership] = await db
    .select({
      role: organizationMember.role,
    })
    .from(organizationMember)
    .where(
      and(
        eq(organizationMember.organizationId, organizationId),
        eq(organizationMember.userId, userId)
      )
    )
    .limit(1)

  return membership?.role ?? null
}
