import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  return (
    <Avatar className="size-full rounded-full">
      <AvatarFallback className="size-full rounded-full text-[9px]">
        {initials || "?"}
      </AvatarFallback>
    </Avatar>
  )
}
