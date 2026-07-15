"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
]

export default function MobileMenuBtn() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        id="mobile-menu-btn"
        aria-label="Menu"
        aria-expanded={open}
        className="inline-flex items-center justify-center rounded-full p-2 hover:bg-accent"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-border/60 bg-background shadow-lg">
          <div className="mx-auto flex max-w-7xl flex-col p-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-4 py-3 text-sm text-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
