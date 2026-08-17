import type {
  organization,
  organizationJoinPolicyEnum,
  organizationVisibilityEnum,
} from "@/lib/db/schema/organization"

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
