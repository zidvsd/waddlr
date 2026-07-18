// app/onboarding/page.tsx
//
// Server component: handles the auth guard, the "already onboarded"
// redirect, and passes the resolved userId down to the client-side
// form. No need to also call useCurrentUser() client-side — we
// already have the session here, and doing both would be a redundant
// fetch on every load.

import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth/get-session"
import { getProfile } from "@/app/actions/profile"
import { OnboardingView } from "@/components/OnBoardingForm"
export default async function OnboardingPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  const userProfile = await getProfile()

  if (userProfile?.onboardingCompleted) {
    redirect("/dashboard")
  }

  return <OnboardingView userId={session.user.id} />
}
