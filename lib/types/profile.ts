import type { profile } from "@/lib/db/schema/profile"

export type Profile = typeof profile.$inferSelect
export type NewProfile = typeof profile.$inferInsert
