import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core"
import { user } from "./auth"

export const profile = pgTable(
  "profile",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    username: text("username").unique(),
    displayName: text("display_name").notNull(),
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
    onboardingCompleted: boolean("onboarding_completed")
      .default(false)
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
