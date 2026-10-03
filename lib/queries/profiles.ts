import { cacheLife, cacheTag } from "next/cache"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/get-session"
import { db } from "@/lib/db"
import { profile } from "@/lib/db/schema/profile"
import { profileTag } from "./cache-tags"

export async function getProfile() {
  const user = await getCurrentUser()
  if (!user) return null

  return getCachedProfile(user.id)
}

async function getCachedProfile(userId: string) {
  "use cache"
  cacheLife("minutes")
  cacheTag(profileTag(userId))

  const userProfile = await db.query.profile.findFirst({
    where: eq(profile.userId, userId),
  })

  return userProfile ?? null
}
