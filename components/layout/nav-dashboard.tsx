"use client"

import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Bell, Search } from "lucide-react"
import Logo from "../ui/logo"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import { DropdownMenuAvatar } from "../ui/dropdown-menu-avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const TABS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Discover", href: "/discover" },
]

const DISCOVER_FILTERS = [
  { label: "All", value: "all" },
  { label: "Organizations", value: "orgs" },
  { label: "Events", value: "events" },
  { label: "Announcements", value: "announcements" },
]

type Profile = {
  avatarUrl: string | null
  displayName: string | null
}

export function DashboardNav({ profile }: { profile: Profile | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isDiscover = pathname.startsWith("/discover")
  const activeTab = searchParams.get("tab") ?? "all"
  const query = searchParams.get("q") ?? ""

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/discover?${params.toString()}`)
  }

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
          <DropdownMenuAvatar profile={profile} />
        </div>
      </div>

      {/* Tab row */}
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

      {/* Discover search + filters — only shown on /discover */}
      {isDiscover && (
        <div className="container mx-auto space-y-3 border-t border-border/60 px-4 py-3 md:px-6">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={query}
              onChange={(e) => setParam("q", e.target.value)}
              placeholder="Search organizations, events, announcements"
              className="pl-9"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {DISCOVER_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setParam("tab", filter.value)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    activeTab === filter.value
                      ? "bg-primary font-medium text-white"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Contextual filters — swap options based on activeTab as needed */}
            {activeTab === "orgs" && (
              <div className="hidden gap-2 md:flex">
                <Select
                  onValueChange={(v) => setParam("category", v as string)}
                >
                  <SelectTrigger className="h-8 w-35 text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(v) => setParam("sort", v as string)}>
                  <SelectTrigger className="h-8 w-35 text-sm">
                    <SelectValue placeholder="Sort: Popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="members">Member count</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === "events" && (
              <div className="hidden gap-2 md:flex">
                <Select onValueChange={(v) => setParam("range", v as string)}>
                  <SelectTrigger className="h-8 w-35 text-sm">
                    <SelectValue placeholder="This month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="all">All upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
