import { relations } from "drizzle-orm"
import { index, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { user } from "./auth"
import { organization, organizationRoleEnum } from "./organization"

export const organizationMember = pgTable(
  "organization_member",
  {
    id: text("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, {
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
    index("organization_member_userId_idx").on(table.userId),
    index("organization_member_organizationId_idx").on(table.organizationId),
    unique("organization_member_user_org_unique").on(
      table.userId,
      table.organizationId
    ),
  ]
)
export const organizationMemberRelations = relations(
  organizationMember,
  ({ one }) => ({
    user: one(user, {
      fields: [organizationMember.userId],
      references: [user.id],
    }),
    organization: one(organization, {
      fields: [organizationMember.organizationId],
      references: [organization.id],
    }),
  })
)
