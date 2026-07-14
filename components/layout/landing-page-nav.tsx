import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { LogoMark } from "../sections/landing-page/common"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import Logo from "../ui/logo"
export function Nav() {
  return (
    <header className="sticky top-0 z-50">
      <div className="surface-glass border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 ">
            
            <Logo />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Waddlr
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "Themes", "How it works", "Discover"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted md:inline-flex"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-brand hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] md:inline-flex"
            >
              Sign up
              <ArrowRight className="size-3.5" />
            </Link>

            <button
              className="rounded-full p-2 text-foreground md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
