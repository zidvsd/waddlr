import { relations } from "drizzle-orm"
import { index, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { user } from "./auth"
import { organization, organizationRoleEnum } from "./organization"

export const organizationMember = pgTable(
  "organization_member",
  {
    id: text("id").primaryKey(),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, {
        onDelete: "cascade",
      }),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    role: organizationRoleEnum("role").default("member").notNull(),

    joinedAt: timestamp("joined_at").defaultNow().notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    unique("organization_member_unique").on(table.organizationId, table.userId),

    index("organization_member_organizationId_idx").on(table.organizationId),

    index("organization_member_userId_idx").on(table.userId),
  ]
)

export const organizationMemberRelations = relations(
  organizationMember,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationMember.organizationId],
      references: [organization.id],
    }),

    user: one(user, {
      fields: [organizationMember.userId],
      references: [user.id],
    }),
  })
)
