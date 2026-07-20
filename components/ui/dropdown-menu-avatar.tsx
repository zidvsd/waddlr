"use client"

import { Building2, User, Calendar } from "lucide-react"
import { LogoutButton } from "./logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Profile = {
  displayName: string | null
  avatarUrl: string | null
}

export function DropdownMenuAvatar({ profile }: { profile: Profile | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={profile?.avatarUrl ?? undefined}
                alt={profile?.displayName ?? "User"}
              />
              <AvatarFallback>
                {profile?.displayName?.slice(0, 2).toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Link
              href="/profile"
              className="flex w-full items-center gap-2 px-2 py-1.5"
            >
              <User className="size-4" />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Link
              href="/organizations"
              className="flex w-full items-center gap-2 px-2 py-1.5"
            >
              <Building2 className="size-4" />
              Organizations
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Link
              href="/events"
              className="flex w-full items-center gap-2 px-2 py-1.5"
            >
              <Calendar className="size-4" />
              Events
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
