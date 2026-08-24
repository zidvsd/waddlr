import type {
  organization,
  organizationJoinPolicyEnum,
  organizationVisibilityEnum,
} from "@/lib/db/schema/organization"
import type { organizationRoleEnum } from "@/lib/db/schema/organization"
// lib/types/organization.ts

export type Organization = typeof organization.$inferSelect

export type NewOrganization = typeof organization.$inferInsert

export type OrganizationVisibility =
  (typeof organizationVisibilityEnum.enumValues)[number]

export type OrganizationJoinPolicy =
  (typeof organizationJoinPolicyEnum.enumValues)[number]

export type OrganizationCard = {
  id: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  memberCount: number
}

export type UserOrganization = {
  role: (typeof organizationRoleEnum.enumValues)[number]
  organization: {
    id: string
    name: string
    slug: string
    description: string | null
    logoUrl: string | null
    headerUrl: string | null
    memberCount: number
  }
}

