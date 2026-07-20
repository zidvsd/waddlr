"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
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
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/org/[slug]",
      icon: LayoutDashboard,
    },
    {
      title: "Announcements",
      url: "/org/[slug]/announcements",
      icon: Megaphone,
    },
    {
      title: "Events",
      url: "/org/[slug]/events",
      icon: CalendarDays,
    },
    {
      title: "Members",
      url: "/org/[slug]/members",
      icon: Users,
    },
    {
      title: "Join Requests",
      url: "/org/[slug]/requests",
      icon: UserPlus,
    },
    {
      title: "Roles & Permissions",
      url: "/org/[slug]/roles",
      icon: Shield,
    },
    {
      title: "Settings",
      url: "/org/[slug]/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
