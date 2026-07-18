// components/onboarding/onboarding-view.tsx
//
// Client component. Receives userId as a prop from the server page
// instead of re-fetching the session client-side via useCurrentUser() —
// the server component already resolved it.

"use client"

import Logo from "@/components/ui/logo"
import { useOnboardingForm } from "@/hooks/use-onboarding-form"
import { OnboardingForm } from "@/components/forms/onboarding-form"
import { ProfilePreviewCard } from "@/components/sections/onboarding/profile-view-card"

export function OnboardingView({ userId }: { userId: string }) {
  const { form, errors, isPending, update, updateUsername, handleSubmit } =
    useOnboardingForm()

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

            <OnboardingForm
              userId={userId}
              form={form}
              errors={errors}
              isPending={isPending}
              update={update}
              updateUsername={updateUsername}
              handleSubmit={handleSubmit}
            />
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
