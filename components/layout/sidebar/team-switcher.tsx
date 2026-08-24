"use client"

import { useRouter } from "next/navigation"
import { ChevronsUpDown, Plus, Building2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { UserOrganization } from "@/lib/types/organization"
export function OrgSwitcher({
  userOrgs,
  activeOrg,
}: {
  userOrgs: UserOrganization[]
  activeOrg?: UserOrganization
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()

  if (!activeOrg) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {activeOrg.organization.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeOrg.organization.logoUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    <Building2 className="size-4" />
                  )}
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeOrg.organization.name}
                  </span>
                  <span className="truncate text-xs capitalize">
                    {activeOrg.role}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Organizations
              </DropdownMenuLabel>
              {userOrgs.map((uo) => (
                <DropdownMenuItem
                  key={uo.organization.id}
                  onClick={() => router.push(`/org/${uo.organization.slug}`)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center overflow-hidden rounded-md border">
                    {uo.organization.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={uo.organization.logoUrl}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <Building2 className="size-3.5 shrink-0" />
                    )}
                  </div>
                  <span className="truncate">{uo.organization.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/org/new")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Explore organizations
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
