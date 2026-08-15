"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function OrgTabs({ slug }: { slug: string }) {
  const pathname = usePathname()

  const tabs = [
    { label: "Feed", href: `/org/${slug}` },
    { label: "Members", href: `/org/${slug}/members` },
    { label: "About", href: `/org/${slug}/about` },
  ]

  return (
    <div className="flex gap-5 border-b border-border/60 px-4 md:px-6">
      {tabs.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border-b-2 py-2.5 text-sm transition-colors ${
              active
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
