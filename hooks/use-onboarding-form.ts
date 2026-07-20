// hooks/use-onboarding-form.ts

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { completeOnboarding } from "@/app/actions/profile-onboarding"
import { slugifyUsername } from "@/lib/utils"
export type FormState = {
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

const USERNAME_PATTERN = /^[a-z0-9_]{3,24}$/

export function useOnboardingForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [isPending, startTransition] = useTransition()

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      // Auto-derive username from display name until the user edits
      // username directly — a small kindness, not a requirement.
      if (key === "displayName" && !usernameTouched) {
        next.username = slugifyUsername(value)
      }
      return next
    })
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function updateUsername(value: string) {
    setUsernameTouched(true)
    update("username", slugifyUsername(value))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.displayName.trim()) {
      next.displayName = "Tell us what to call you"
    }
    if (!form.username.trim()) {
      next.username = "Pick a username"
    } else if (!USERNAME_PATTERN.test(form.username)) {
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

  return {
    form,
    errors,
    isPending,
    update,
    updateUsername,
    handleSubmit,
  }
}
