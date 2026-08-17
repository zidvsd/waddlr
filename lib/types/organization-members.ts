import type { organizationMember } from "@/lib/db/schema/organization_members"

export type OrganizationMember = typeof organizationMember.$inferSelect

export type NewOrganizationMember = typeof organizationMember.$inferInsert
