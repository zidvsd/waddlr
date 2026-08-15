"use client"

import Link from "next/link"

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
    <div className="flex gap-2">
      {canManage && (
        <Link
          href={`/org/${slug}/manage`}
          className="rounded-[var(--radius)] border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted/60"
        >
          Manage
        </Link>
      )}
      {!isMember && joinPolicy !== "invite_only" && (
        <button className="rounded-[var(--radius)] bg-foreground px-3.5 py-1.5 text-sm font-medium text-background">
          {joinLabel}
        </button>
      )}
      {isMember && !canManage && (
        <button className="rounded-[var(--radius)] border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60">
          Leave
        </button>
      )}
    </div>
  )
}
