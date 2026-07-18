"use server"
import { auth } from "@/lib/auth/auth"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { getServerSession } from "@/lib/auth/get-session"
export async function uploadAvatar(formData: FormData) {
  const session = await getServerSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  const file = formData.get("file") as File

  if (!file) {
    throw new Error("No file")
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const path = `${session.user.id}/avatar.jpg`

  const { error } = await supabaseAdmin.storage
    .from("avatars")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) {
    throw error
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("avatars").getPublicUrl(path)

  return publicUrl
}
