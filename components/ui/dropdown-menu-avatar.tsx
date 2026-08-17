"use client"

import {
  Building2,
  User,
  Calendar,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
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

const navItems: {
  label: string
  href: string
  icon: LucideIcon
}[] = [
  {
    label: "Account",
    href: "/profile",
    icon: User,
  },
  {
    label: "Organizations",
    href: "/organizations",
    icon: Building2,
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    label: "Announcements",
    href: "/announcements",
    icon: Megaphone,
  },
]

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
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <DropdownMenuItem key={item.href} className="p-0">
                <Link
                  href={item.href}
                  className="flex w-full items-center gap-2 px-2 py-1.5"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
