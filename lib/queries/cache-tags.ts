export const cacheTags = {
  organizations: "organizations",
  organizationMembers: "organization-members",
  events: "events",
  announcements: "announcements",
}

export const organizationTag = (organizationId: string) =>
  `organization:${organizationId}`

export const organizationSlugTag = (slug: string) => `organization-slug:${slug}`

export const organizationMembersTag = (organizationId: string) =>
  `organization-members:${organizationId}`

export const userOrganizationsTag = (userId: string) =>
  `user-organizations:${userId}`

export const viewerRoleTag = (organizationId: string, userId: string) =>
  `viewer-role:${organizationId}:${userId}`

export const userUpcomingEventsTag = (userId: string) =>
  `user-upcoming-events:${userId}`

export const userAnnouncementsTag = (userId: string) =>
  `user-announcements:${userId}`

export const profileTag = (userId: string) => `profile:${userId}`

export const organizationEventsTag = (organizationId: string) =>
  `events:${organizationId}`

export const organizationAnnouncementsTag = (organizationId: string) =>
  `announcements:${organizationId}`
