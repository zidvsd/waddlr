import { cacheLife, cacheTag } from "next/cache"
import { and, count, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { organizationMember } from "@/lib/db/schema"
import { organization } from "@/lib/db/schema/organization"
import { profile } from "@/lib/db/schema/profile"
import type { OrganizationCard } from "@/lib/types/organization"
import type { UserOrganization } from "@/lib/types/organization"
import {
  cacheTags,
  organizationMembersTag,
  organizationSlugTag,
  organizationTag,
  userOrganizationsTag,
  viewerRoleTag,
} from "./cache-tags"

export async function getUserOrganizations(
  userId: string
): Promise<UserOrganization[]> {
  return getCachedUserOrganizations(userId)
}

async function getCachedUserOrganizations(
  userId: string
): Promise<UserOrganization[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(
    cacheTags.organizations,
    cacheTags.organizationMembers,
    userOrganizationsTag(userId)
  )

  const rows = await db
    .select({
      role: organizationMember.role,
      orgId: organization.id,
      orgName: organization.name,
      orgSlug: organization.slug,
      orgLogoUrl: organization.logoUrl,
      orgHeaderUrl: organization.headerUrl,
      orgDescription: organization.description,
      memberCount: sql<number>`(
        select count(*)::int
        from organization_member
        where organization_id = ${organizationMember.organizationId}
      )`,
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
      headerUrl: row.orgHeaderUrl,
      description: row.orgDescription,
      memberCount: row.memberCount,
    },
  }))
}

export async function getAllOrganizations(): Promise<OrganizationCard[]> {
  return getCachedAllOrganizations()
}

async function getCachedAllOrganizations(): Promise<OrganizationCard[]> {
  "use cache"
  cacheLife("minutes")
  cacheTag(cacheTags.organizations, cacheTags.organizationMembers)

  return db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      logoUrl: organization.logoUrl,
      memberCount: sql<number>`(
        select count(*)::int
        from organization_member
        where organization_id = ${organization.id}
      )`,
    })
    .from(organization)
}

export async function getOrganizationBySlug(slug: string) {
  return getCachedOrganizationBySlug(slug)
}

async function getCachedOrganizationBySlug(slug: string) {
  "use cache"
  cacheLife("minutes")
  cacheTag(cacheTags.organizations, organizationSlugTag(slug))

  const [org] = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      logoUrl: organization.logoUrl,
      headerUrl: organization.headerUrl,
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

  cacheTag(
    organizationTag(org.id),
    cacheTags.organizationMembers,
    organizationMembersTag(org.id)
  )

  const [members, countRows] = await Promise.all([
    db
      .select({
        id: organizationMember.id,
        avatarUrl: profile.avatarUrl,
        displayName: profile.displayName,
        userId: organizationMember.userId,
      })
      .from(organizationMember)
      .leftJoin(profile, eq(profile.userId, organizationMember.userId))
      .where(eq(organizationMember.organizationId, org.id))
      .orderBy(organizationMember.role, organizationMember.joinedAt)
      .limit(3),
    db
      .select({ memberCount: count(organizationMember.id) })
      .from(organizationMember)
      .where(eq(organizationMember.organizationId, org.id)),
  ])

  cacheTag(...members.map((member) => `profile:${member.userId}`))

  return {
    ...org,
    memberCount: countRows[0]?.memberCount ?? 0,
    previewMembers: members.map(({ userId: _userId, ...member }) => member),
  }
}

export async function getViewerRole(
  organizationId: string,
  userId: string | undefined
) {
  if (!userId) return null
  return getCachedViewerRole(organizationId, userId)
}

async function getCachedViewerRole(organizationId: string, userId: string) {
  "use cache"
  cacheLife("seconds")
  cacheTag(
    cacheTags.organizationMembers,
    organizationMembersTag(organizationId),
    viewerRoleTag(organizationId, userId)
  )

  const [membership] = await db
    .select({ role: organizationMember.role })
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
