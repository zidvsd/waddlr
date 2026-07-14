import Link from "next/link"
import { LogoMark } from "./common"

export function Footer() {
  const columns = [
    { title: "Product", links: ["Features", "Themes", "Discover"] },
    { title: "Organization", links: ["About", "Contact", "Roadmap"] },
    { title: "Account", links: ["Login", "Register"] },
  ]

  return (
    <footer className="border-t border-border bg-muted/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <LogoMark />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Waddlr
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The operating system for student organizations. Beautifully
              designed, built for how real clubs actually work.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold tracking-tight text-foreground">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Waddlr. Made for student leaders.
          </span>
          <span>Built with care.</span>
        </div>
      </div>
    </footer>
  )
}
