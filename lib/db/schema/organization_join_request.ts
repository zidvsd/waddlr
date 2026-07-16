import { pgEnum } from "drizzle-orm/pg-core"
import { pgTable, text, timestamp, index, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { user } from "./auth"
import { organization } from "./organization"

export const joinRequestStatusEnum = pgEnum("join_request_status", [
  "pending",
  "approved",
  "rejected",
  // "cancelled" could be added later if users can withdraw a request
])

export const organizationJoinRequest = pgTable(
  "organization_join_request",
  {
    id: text("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    status: joinRequestStatusEnum("status").default("pending").notNull(),

    // optional note the applicant leaves ("why I want to join")
    message: text("message"),

    // who resolved it (admin/officer), null while pending
    reviewedById: text("reviewed_by_id").references(() => user.id, {
      onDelete: "set null",
    }),

    reviewedAt: timestamp("reviewed_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("organization_join_request_userId_idx").on(table.userId),
    index("organization_join_request_organizationId_idx").on(
      table.organizationId
    ),
    index("organization_join_request_status_idx").on(table.status),
    // a user shouldn't be able to spam multiple pending requests to the same org
    unique("organization_join_request_user_org_unique").on(
      table.userId,
      table.organizationId
    ),
  ]
)

export const organizationJoinRequestRelations = relations(
  organizationJoinRequest,
  ({ one }) => ({
    user: one(user, {
      fields: [organizationJoinRequest.userId],
      references: [user.id],
    }),
    organization: one(organization, {
      fields: [organizationJoinRequest.organizationId],
      references: [organization.id],
    }),
    reviewedBy: one(user, {
      fields: [organizationJoinRequest.reviewedById],
      references: [user.id],
    }),
  })
)
