// components/onboarding/profile-preview-card.tsx

import type { FormState } from "@/hooks/use-onboarding-form"
import { initials } from "@/lib/utils"
export function ProfilePreviewCard({ form }: { form: FormState }) {
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
