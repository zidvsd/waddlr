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
    <div className="flex items-start justify-start gap-5">
      {tabs.map((tab) => {
        const active = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative py-2.5 text-sm transition-colors ${
              active
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}

            {active && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-foreground" />
            )}
          </Link>
        )
      })}
    </div>
  )
}
