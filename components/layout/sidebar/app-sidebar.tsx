"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Users,
  UserPlus,
  Shield,
  Settings,
} from "lucide-react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { OrgSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserOrganization } from "@/lib/types/organization"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userOrgs: UserOrganization[]
  activeSlug: string
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function AppSidebar({
  userOrgs,
  activeSlug,
  user,
  ...props
}: AppSidebarProps) {
  const activeOrg =
    userOrgs.find((o) => o.organization.slug === activeSlug) ?? userOrgs[0]

  const navMain = React.useMemo(
    () => [
      { title: "Dashboard", url: `/org/${activeSlug}`, icon: LayoutDashboard },
      {
        title: "Announcements",
        url: `/org/${activeSlug}/announcements`,
        icon: Megaphone,
      },
      { title: "Events", url: `/org/${activeSlug}/events`, icon: CalendarDays },
      { title: "Members", url: `/org/${activeSlug}/members`, icon: Users },
      {
        title: "Join Requests",
        url: `/org/${activeSlug}/requests`,
        icon: UserPlus,
      },
      {
        title: "Roles & Permissions",
        url: `/org/${activeSlug}/roles`,
        icon: Shield,
      },
      { title: "Settings", url: `/org/${activeSlug}/settings`, icon: Settings },
    ],
    [activeSlug]
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher userOrgs={userOrgs} activeOrg={activeOrg} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
