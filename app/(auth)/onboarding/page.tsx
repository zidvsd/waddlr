// app/onboarding/page.tsx

"use client"
import Logo from "@/components/ui/logo"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { completeOnboarding } from "@/app/actions/profile-onboarding"
import { useCurrentUser } from "@/hooks/use-current-user"
import { uploadAvatar } from "@/app/actions/upload-avatar"
const CURRENT_YEAR = new Date().getFullYear()
const GRAD_YEARS = Array.from({ length: 8 }, (_, i) => CURRENT_YEAR + i - 1)

type FormState = {
  displayName: string
  username: string
  bio: string
  pronouns: string
  school: string
  graduationYear: string
  avatarUrl: string
}

const INITIAL_STATE: FormState = {
  displayName: "",
  username: "",
  bio: "",
  pronouns: "",
  school: "",
  graduationYear: "",
  avatarUrl: "",
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?"
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function slugifyUsername(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24)
}

export default function OnboardingPage() {
  const router = useRouter()
  const { userId, isLoading: userLoading } = useCurrentUser()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [isPending, startTransition] = useTransition()

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === "displayName" && !usernameTouched) {
        next.username = slugifyUsername(value)
      }
      return next
    })
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.displayName.trim()) {
      next.displayName = "Tell us what to call you"
    }
    if (!form.username.trim()) {
      next.username = "Pick a username"
    } else if (!/^[a-z0-9_]{3,24}$/.test(form.username)) {
      next.username = "3–24 characters: lowercase letters, numbers, underscores"
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      try {
        await completeOnboarding({
          displayName: form.displayName.trim(),
          username: form.username.trim(),
          bio: form.bio.trim() || undefined,
          pronouns: form.pronouns.trim() || undefined,
          school: form.school.trim() || undefined,
          graduationYear: form.graduationYear
            ? Number(form.graduationYear)
            : undefined,
          avatarUrl: form.avatarUrl || undefined,
        })
        router.push("/dashboard")
      } catch (err) {
        setErrors({
          username:
            err instanceof Error && err.message.includes("username")
              ? "That username's taken — try another"
              : undefined,
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr_0.5fr]">
        {/* ---------- Form column ---------- */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-medium text-primary">Almost there</p>
            <div className="flex items-center gap-4">
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Set up your profile
              </h1>
              <Logo />
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              This is how your orgs and fellow members will know you. You can
              change any of this later.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <AvatarPicker
                  displayName={form.displayName}
                  avatarUrl={form.avatarUrl}
                  userId={userId}
                  onChange={(url) => update("avatarUrl", url)}
                />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Profile photo</p>
                  <p className="text-muted-foreground">
                    Optional, but it helps people recognize you
                  </p>
                </div>
              </div>

              {/* Required identity fields */}
              <div className="space-y-5">
                <Field label="Display name" required error={errors.displayName}>
                  <input
                    type="text"
                    value={form.displayName}
                    onChange={(e) => update("displayName", e.target.value)}
                    placeholder="John Doe"
                    maxLength={60}
                    className={inputClass(!!errors.displayName)}
                    autoFocus
                  />
                </Field>

                <Field
                  label="Username"
                  required
                  error={errors.username}
                  hint="Lowercase letters, numbers, underscores"
                >
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                      @
                    </span>
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => {
                        setUsernameTouched(true)
                        update("username", slugifyUsername(e.target.value))
                      }}
                      placeholder="johndoe"
                      maxLength={24}
                      className={inputClass(!!errors.username, "pl-7")}
                    />
                  </div>
                </Field>
              </div>

              {/* Optional details */}
              <div className="space-y-5 border-t border-border pt-8">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Pronouns">
                    <input
                      type="text"
                      value={form.pronouns}
                      onChange={(e) => update("pronouns", e.target.value)}
                      placeholder="she/her"
                      maxLength={30}
                      className={inputClass(false)}
                    />
                  </Field>
                  <Field label="Graduating">
                    <select
                      value={form.graduationYear}
                      onChange={(e) => update("graduationYear", e.target.value)}
                      className={inputClass(false)}
                    >
                      <option value="">—</option>
                      {GRAD_YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="School">
                  <input
                    type="text"
                    value={form.school}
                    onChange={(e) => update("school", e.target.value)}
                    placeholder="City College of Calamba"
                    maxLength={100}
                    className={inputClass(false)}
                  />
                </Field>

                <Field label="Bio" hint={`${form.bio.length}/160`}>
                  <textarea
                    value={form.bio}
                    onChange={(e) =>
                      update("bio", e.target.value.slice(0, 160))
                    }
                    placeholder="What are you about?"
                    rows={3}
                    className={inputClass(false) + " resize-none"}
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={isPending || userLoading || !userId}
                className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isPending ? "Setting up your profile…" : "Continue to Waddlr"}
              </button>
            </form>
          </div>
        </div>

        {/* ---------- Live preview column ---------- */}
        <div
          className="hidden border-l border-border lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-8"
          style={{ background: "var(--gradient-brand-soft)" }}
        >
          <p className="mr-auto mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            How members see you
          </p>
          <ProfilePreviewCard form={form} />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-primary">*</span>}
        </span>
        {hint && !error && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  )
}

function inputClass(hasError: boolean, extra = "") {
  return [
    "w-full rounded-[var(--radius)] border bg-card px-3 py-2.5 text-sm text-foreground",
    "placeholder:text-muted-foreground",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
    hasError ? "border-destructive" : "border-input",
    extra,
  ].join(" ")
}

function AvatarPicker({
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
            <SpinnerIcon />
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

function SpinnerIcon() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

function ProfilePreviewCard({ form }: { form: FormState }) {
  const hasName = form.displayName.trim().length > 0

  return (
    <div className="mr-auto w-72 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-secondary text-base font-semibold text-secondary-foreground">
        {form.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          initials(form.displayName)
        )}
      </div>

      <div className="mt-4">
        <p
          className={
            "text-base leading-tight font-semibold " +
            (hasName ? "text-foreground" : "text-muted-foreground")
          }
        >
          {hasName ? form.displayName : "Your name"}
        </p>
        <p className="text-sm text-muted-foreground">
          @{form.username || "username"}
          {form.pronouns && <span className="ml-1.5">· {form.pronouns}</span>}
        </p>
      </div>

      {form.bio && (
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {form.bio}
        </p>
      )}

      {(form.school || form.graduationYear) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {form.school && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              {form.school}
            </span>
          )}
          {form.graduationYear && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              Class of {form.graduationYear}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
