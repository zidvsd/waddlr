import { Suspense } from "react"

import { Discovery } from "@/components/sections/landing-page/discovery"
import { Features } from "@/components/sections/landing-page/features"
import { FinalCta } from "@/components/sections/landing-page/final-cta"
import { Footer } from "@/components/sections/landing-page/footer"
import { Hero } from "@/components/sections/landing-page/hero"
import { HowItWorks } from "@/components/sections/landing-page/how-it-works"
import { Logos } from "@/components/sections/landing-page/logos"
import { Nav } from "@/components/layout/nav-landing-page"
import { Problem } from "@/components/sections/landing-page/problem"
import { ThemeShowcase } from "@/components/sections/landing-page/themes"

import { getServerSession } from "@/lib/auth/get-session"
import { redirect } from "next/navigation"

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthenticatedRedirect />
      </Suspense>

      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <Logos />
        <Problem />
        <Features />
        <ThemeShowcase />
        <HowItWorks />
        <Discovery />
        <FinalCta />
        <Footer />
      </div>
    </>
  )
}

async function AuthenticatedRedirect() {
  const session = await getServerSession()

  if (session) {
    redirect("/dashboard")
  }

  return null
}
