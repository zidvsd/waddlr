import type { event, eventStatusEnum } from "@/lib/db/schema/event"

export type Event = typeof event.$inferSelect
export type NewEvent = typeof event.$inferInsert

export type EventStatus = (typeof eventStatusEnum.enumValues)[number]
