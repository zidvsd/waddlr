// actions/profile.ts
"use server"

import { db } from "@/lib/db"
import { profile } from "@/lib/db/schema/profile"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/get-session"
type CompleteOnboardingInput = {
  displayName: string
  username: string
  bio?: string
  pronouns?: string
  school?: string
  graduationYear?: number
  avatarUrl?: string
}

export async function completeOnboarding(input: CompleteOnboardingInput) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Not authenticated")

  // Username format check mirrors the client-side validation — never
  // trust the client alone.
  if (!/^[a-z0-9_]{3,24}$/.test(input.username)) {
    throw new Error("Invalid username format")
  }

  const existing = await db.query.profile.findFirst({
    where: eq(profile.username, input.username),
  })
  if (existing && existing.userId !== user.id) {
    throw new Error("That username is already taken")
  }

  const [updated] = await db
    .insert(profile)
    .values({
      userId: user.id,
      displayName: input.displayName,
      username: input.username,
      bio: input.bio,
      pronouns: input.pronouns,
      school: input.school,
      graduationYear: input.graduationYear,
      avatarUrl: input.avatarUrl,
      onboardingCompleted: true,
    })
    .onConflictDoUpdate({
      target: profile.userId,
      set: {
        displayName: input.displayName,
        username: input.username,
        bio: input.bio,
        pronouns: input.pronouns,
        school: input.school,
        graduationYear: input.graduationYear,
        avatarUrl: input.avatarUrl,
        onboardingCompleted: true,
        updatedAt: new Date(),
      },
    })
    .returning()

  return updated
}
