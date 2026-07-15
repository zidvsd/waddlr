import { relations } from "drizzle-orm"
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./auth"

export const profile = pgTable(
  "profile",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    displayName: text("display_name"),
    bio: text("bio"),
    pronouns: text("pronouns"),
    school: text("school"),
    graduationYear: integer("graduation_year"),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("profile_userId_idx").on(table.userId)]
)

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}))
