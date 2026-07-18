"use server"

import { db } from "@/lib/db"
import { profile } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/get-session"

export async function getProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const userProfile = await db.query.profile.findFirst({
    where: eq(profile.userId, user.id),
  })

  return userProfile ?? null
}
