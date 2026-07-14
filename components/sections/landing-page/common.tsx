import type { ReactNode } from "react"
import { ImageOff } from "lucide-react"

export function LogoMark() {
  return (
    <span className="flex size-8 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground">
      <ImageOff className="size-4" />
    </span>
  )
}

export function FloatingCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`surface-card absolute px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}
