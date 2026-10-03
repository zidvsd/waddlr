import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { initials } from "@/lib/utils"
import type { OrgPerson } from "@/lib/queries/org-people"

function roleLabel(person: OrgPerson, ownerId: string) {
  if (person.userId === ownerId) return "Owner"
  if (person.role === "organization_admin") return "Admin"
  if (person.role === "officer") return "Officer"
  return null
}

export function MemberRow({
  person,
  ownerId,
}: {
  person: OrgPerson
  ownerId: string
}) {
  const name = person.displayName ?? "Member"
  const label = roleLabel(person, ownerId)
  const school = [
    person.school,
    person.graduationYear ? `Class of ${person.graduationYear}` : null,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <li className="flex items-center gap-3 py-3">
      <Avatar className="size-10">
        {person.avatarUrl && <AvatarImage src={person.avatarUrl} alt="" />}
        <AvatarFallback className="text-xs">{initials(name)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          {label && (
            <Badge
              variant={label === "Officer" ? "outline" : "secondary"}
              className="shrink-0"
            >
              {label}
            </Badge>
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          Joined {formatDistanceToNow(person.joinedAt, { addSuffix: true })}
        </p>
        {school && (
          <p className="truncate text-xs text-muted-foreground">{school}</p>
        )}
      </div>
    </li>
  )
}
