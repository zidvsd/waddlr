// components/onboarding/avatar-picker.tsx

import { useState } from "react"
import { uploadAvatar } from "@/app/actions/upload-avatar"
import { initials } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
export function AvatarPicker({
  displayName,
  avatarUrl,
  userId,
  onChange,
}: {
  displayName: string
  avatarUrl: string
  userId: string | null
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!userId) {
      setUploadError("Still loading your account — try again in a moment")
      return
    }

    setUploadError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const url = await uploadAvatar(formData)

      // Cache-bust so the new upload shows immediately even though the
      // storage path (and therefore URL) is stable across re-uploads.
      onChange(`${url}?t=${Date.now()}`)
    } catch (err) {
      console.error(err)
      setUploadError("Couldn't upload that photo — try a different file")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="group relative block cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="sr-only"
        />

        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-semibold text-secondary-foreground ring-2 ring-transparent transition-all group-hover:ring-primary/30">
          {uploading ? (
            <Spinner />
          ) : avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            initials(displayName)
          )}
        </div>

        <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </label>
      {uploadError && (
        <p className="mt-1.5 text-xs text-destructive">{uploadError}</p>
      )}
    </div>
  )
}
