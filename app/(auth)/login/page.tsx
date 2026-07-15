import Logo from "@/components/ui/logo"
import { LoginForm } from "@/components/forms/login-form"
import Link from "next/link"
export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <Link
        href="/"
        className="flex items-center gap-2 self-center font-medium"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-foreground/50 text-primary-foreground">
          <Logo size={32} />
        </div>
        Acme Inc.
      </Link>
      <div className="mt-4 w-full max-w-md md:max-w-xl">
        <LoginForm />
      </div>
    </div>
  )
}
