import { pgEnum } from "drizzle-orm/pg-core"
import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { user } from "./auth"

export const organizationRoleEnum = pgEnum("organization_role", [
  "member",
  "officer",
  "organization_admin",
])

export const organization = pgTable(
  "organization",
  {
    id: text("id").primaryKey(),

    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),

    description: text("description"),
    logoUrl: text("logo_url"),

    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("organization_ownerId_idx").on(table.ownerId),
    index("organization_slug_idx").on(table.slug),
  ]
)

export const organizationRelations = relations(organization, ({ one }) => ({
  owner: one(user, {
    fields: [organization.ownerId],
    references: [user.id],
  }),
}))
