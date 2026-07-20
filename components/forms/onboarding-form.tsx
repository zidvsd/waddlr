// components/onboarding/onboarding-form.tsx
//
// Takes form state/handlers as props rather than calling
// useOnboardingForm() itself, so the parent page can share the same
// live `form` state with ProfilePreviewCard.

import type { FormState } from "@/hooks/use-onboarding-form"
import { GRAD_YEARS } from "@/lib/utils"
import { Field, inputClass } from "@/components/sections/onboarding/field"
import { AvatarPicker } from "@/components/sections/onboarding/avatar-picker"

export function OnboardingForm({
  userId,
  form,
  errors,
  isPending,
  update,
  updateUsername,
  handleSubmit,
}: {
  userId: string | null
  form: FormState
  errors: Partial<Record<keyof FormState, string>>
  isPending: boolean
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  updateUsername: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
}) {
  return (
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
              onChange={(e) => updateUsername(e.target.value)}
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
            onChange={(e) => update("bio", e.target.value.slice(0, 160))}
            placeholder="What are you about?"
            rows={3}
            className={inputClass(false) + " resize-none"}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isPending || !userId}
        className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Setting up your profile…" : "Continue to Waddlr"}
      </button>
    </form>
  )
}
