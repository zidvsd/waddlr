import type { announcement } from "@/lib/db/schema/announcement"

export type Announcement = typeof announcement.$inferSelect
export type NewAnnouncement = typeof announcement.$inferInsert
