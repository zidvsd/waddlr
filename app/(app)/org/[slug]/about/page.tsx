import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CalendarDaysIcon,
  DoorOpenIcon,
  EyeIcon,
  EyeOffIcon,
  GlobeIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  UserCheckIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

import { initials } from "@/lib/utils"
import { getOrganizationBySlug } from "@/lib/queries"
import {
  getOrgLeadership,
  getOrgStats,
  type OrgPerson,
} from "@/lib/queries/org-people"

type Fact = { icon: LucideIcon; title: string; body: string }

const VISIBILITY: Record<string, Fact[]> = {
  public: [
    {
      icon: GlobeIcon,
      title: "Public",
      body: "Anyone can see who's in the group and what they post.",
    },
    { icon: EyeIcon, title: "Visible", body: "Anyone can find this group." },
  ],
  unlisted: [
    {
      icon: LinkIcon,
      title: "Unlisted",
      body: "Anyone with the link can see the group.",
    },
    {
      icon: EyeOffIcon,
      title: "Hidden",
      body: "It doesn't appear in search or browse.",
    },
  ],
  private: [
    {
      icon: LockIcon,
      title: "Private",
      body: "Only members can see who's in the group and what they post.",
    },
  ],
}

const JOIN_POLICY: Record<string, Fact> = {
  open: {
    icon: DoorOpenIcon,
    title: "Open to join",
    body: "Anyone can join right away.",
  },
  approval_required: {
    icon: UserCheckIcon,
    title: "Approval required",
    body: "Admins review each request to join.",
  },
  invite_only: {
    icon: MailIcon,
    title: "Invite only",
    body: "Members are added by an admin or officer.",
  },
}

function FactRow({ icon: Icon, title, body }: Fact) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{body}</p>
      </div>
    </li>
  )
}

function describe(list: OrgPerson[], noun: string) {
  const first = list[0]?.displayName ?? "A member"
  if (list.length === 1) return `${first} is an ${noun}`
  const others = list.length - 1
  return `${first} and ${others} other${others > 1 ? "s" : ""} are ${noun}s`
}

function leadershipSummary(leaders: OrgPerson[]) {
  const admins = leaders.filter((l) => l.role === "organization_admin")
  const officers = leaders.filter((l) => l.role === "officer")
  return [
    admins.length ? describe(admins, "admin") : null,
    officers.length ? describe(officers, "officer") : null,
  ]
    .filter(Boolean)
    .join(". ")
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const org = await getOrganizationBySlug(slug)
  if (!org) notFound()

  const [leaders, stats] = await Promise.all([
    getOrgLeadership(org.id),
    getOrgStats(org.id),
  ])

  const facts = [
    ...(VISIBILITY[org.visibility] ?? []),
    JOIN_POLICY[org.joinPolicy],
    {
      icon: CalendarDaysIcon,
      title: "History",
      body: `Created on ${format(org.createdAt, "MMMM d, yyyy")}`,
    },
  ].filter(Boolean) as Fact[]

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">About {org.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {org.description ? (
            <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
              {org.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              This organization hasn't added a description yet.
            </p>
          )}
          <ul className="space-y-3.5">
            {facts.map((fact) => (
              <FactRow key={fact.title} {...fact} />
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Members
            <span className="ml-1.5 font-normal text-muted-foreground">
              {stats.total.toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaders.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex shrink-0 -space-x-2">
                {leaders.slice(0, 5).map((l) => (
                  <Avatar key={l.id} className="size-8 ring-2 ring-card">
                    {l.avatarUrl && (
                      <AvatarImage
                        src={l.avatarUrl}
                        alt={l.displayName ?? ""}
                      />
                    )}
                    <AvatarFallback className="text-[10px]">
                      {initials(l.displayName ?? "")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {leadershipSummary(leaders)}
              </p>
            </div>
          )}
          {/* Relative link: /[slug]/about -> /[slug]/people. Swap for your route helper if you have one. */}
          <Button variant="secondary" className="w-full">
            <Link href="people">See all members</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3.5">
            <FactRow
              icon={UsersIcon}
              title={`${stats.total.toLocaleString()} total members`}
              body={`${stats.lastMonth.toLocaleString()} joined in the last month`}
            />
            <FactRow
              icon={UserCheckIcon}
              title={`${stats.lastWeek.toLocaleString()} new this week`}
              body="Members who joined in the last 7 days"
            />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
