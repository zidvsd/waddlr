"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function MemberSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get("q") ?? "")
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const q = value.trim()
    if (q === (params.get("q") ?? "")) return // nothing changed (e.g. "Show more" click)

    const timer = setTimeout(() => {
      const next = new URLSearchParams(params.toString())
      if (q) next.set("q", q)
      else next.delete("q")
      next.delete("limit") // new search starts from the first page

      const qs = next.toString()
      startTransition(() =>
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
      )
    }, 300)

    return () => clearTimeout(timer)
  }, [value, params, pathname, router])

  return (
    <div className="relative" aria-busy={pending}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Find a member"
        aria-label="Find a member"
        className="rounded-full pl-9"
      />
    </div>
  )
}
