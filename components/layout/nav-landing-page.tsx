import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import Logo from "../ui/logo"
import MobileMenuBtn from "../ui/mobile-menu-btn"
import { AuthButtons } from "./nav-auth-buttons"
export function Nav() {
  return (
    <header className="sticky top-0 z-50">
      <div className="surface-glass border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
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
            <AuthButtons />
            <MobileMenuBtn />
          </div>
        </div>
      </div>
    </header>
  )
}
