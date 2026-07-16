"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import Logo from "../ui/logo"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import { DropdownMenuAvatar } from "../ui/dropdown-menu-avatar"

const TABS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Discover", href: "/discover" },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <header className="surface-glass sticky top-0 z-50 border-b border-border/60">
      {/* Topbar */}
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Waddlr
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <Bell className="size-4.5" />
            {/* unread dot — wire up to real unread count */}
            {/* <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" /> */}
          </Link>
          <DropdownMenuAvatar />
        </div>
      </div>

      {/* Tab row — desktop nav lives here too, no separate desktop-only nav needed */}
      <nav className="container grid grid-cols-2 px-4 md:mx-auto">
        {TABS.map((tab) => {
          const active =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 border-b-2 py-2.5 text-center text-sm transition-colors md:flex-none md:px-4 ${
                active
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
