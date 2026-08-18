"use client"

import Link from "next/link"
import { Button } from "./button"
type Props = {
  slug: string
  canManage: boolean
  isMember: boolean
  joinPolicy: "open" | "approval_required" | "invite_only"
}

export function JoinOrManageButton({
  slug,
  canManage,
  isMember,
  joinPolicy,
}: Props) {
  const joinLabel =
    joinPolicy === "open"
      ? "Join"
      : joinPolicy === "approval_required"
        ? "Request to join"
        : "Invite only"

  return (
    <div className="flex">
      {/* Admin / Officer / Superadmin */}
      {canManage && (
        <Button variant={"default"}>
          <Link href={`/org/${slug}/manage`} className="">
            Manage
          </Link>
        </Button>
      )}

      {/* Non-member */}
      {!isMember && joinPolicy !== "invite_only" && (
        <Button
          variant={"default"}
          className="rounded-md bg-foreground text-sm font-medium text-background"
        >
          {joinLabel}
        </Button>
      )}
    </div>
  )
}
