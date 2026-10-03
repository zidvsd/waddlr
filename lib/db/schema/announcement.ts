import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { organization } from "./organization"
import { user } from "./auth" // adjust import path to wherever `user` table lives
import { event } from "./event"

export const announcement = pgTable(
  "announcement",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    title: text("title").notNull(),
    body: text("body").notNull(),

    eventId: text("event_id").references(() => event.id, {
      onDelete: "set null",
    }),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => [
    index("announcement_organization_created_at_idx").on(
      table.organizationId,
      table.createdAt
    ),
  ]
)
