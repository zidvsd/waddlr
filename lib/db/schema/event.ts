// lib/db/schema/event.ts
//
// Matches conventions from organization/organization_member/profile:
// text ids, org-scoped via organization_id FK with cascade delete,
// created_at/updated_at timestamp defaults.

import { pgTable, text, timestamp, pgEnum, integer } from "drizzle-orm/pg-core"
import { organization } from "./organization"
import { user } from "./auth" // adjust import path to wherever `user` table lives

// Adjust values if you already have conventions for event status elsewhere.
export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "published",
  "cancelled",
])

export const event = pgTable("event", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),

  // Storing start/end separately (rather than a single timestamp) since
  // events likely need duration for calendar/attendance display.
  startsAt: timestamp("starts_at", { mode: "date" }).notNull(),
  endsAt: timestamp("ends_at", { mode: "date" }),

  status: eventStatusEnum("status").notNull().default("draft"),

  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
})
