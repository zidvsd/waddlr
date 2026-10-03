import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { MemberRow } from "@/components/ui/member-row"
import { MemberSearch } from "@/components/search/member-search"
import { PeopleSkeleton } from "@/components/skeletons/members-skeleton"
import { getCurrentUser } from "@/lib/auth/get-session"
import { getOrganizationBySlug, getViewerRole } from "@/lib/queries"
import {
  getOrgLeadership,
  getOrgPeople,
  type OrgPerson,
} from "@/lib/queries/org-people"

type Org = NonNullable<Awaited<ReturnType<typeof getOrganizationBySlug>>>
type SearchParams = { q?: string; limit?: string }

const PAGE_SIZE = 20
const MAX_LIMIT = 200

export default async function PeoplePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}) {
  const { slug } = await params
  const org = await getOrganizationBySlug(slug)
  if (!org) notFound()

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base">
              Members
              <span className="ml-1.5 font-normal text-muted-foreground">
                {org.memberCount.toLocaleString()}
              </span>
            </CardTitle>
            <CardDescription>
              {org.visibility === "private"
                ? "Only members of this organization can see the member list."
                : `Anyone can see who's in ${org.name}.`}
            </CardDescription>
          </div>
          <Suspense fallback={<Skeleton className="h-9 w-full rounded-full" />}>
            <MemberSearch />
          </Suspense>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<PeopleSkeleton />}>
            <PeopleContent org={org} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

async function PeopleContent({
  org,
  searchParams,
}: {
  org: Org
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const q = (sp.q ?? "").trim().slice(0, 80)
  const limit = Math.min(
    Math.max(Number(sp.limit) || PAGE_SIZE, PAGE_SIZE),
    MAX_LIMIT
  )

  // Private orgs: only members may see the list.
  if (org.visibility === "private") {
    const user = await getCurrentUser()
    const role = await getViewerRole(org.id, user?.id)
    if (!role) return <MembersOnly name={org.name} />
  }

  const [leaders, { people, hasMore }] = await Promise.all([
    q ? Promise.resolve<OrgPerson[]>([]) : getOrgLeadership(org.id),
    getOrgPeople(org.id, q, limit),
  ])

  const showMoreHref = `?${new URLSearchParams({
    ...(q ? { q } : {}),
    limit: String(Math.min(limit + PAGE_SIZE, MAX_LIMIT)),
  })}`

  if (q) {
    return (
      <section aria-labelledby="results-heading">
        <h2 id="results-heading" className="text-sm font-semibold">
          Results for “{q}”
        </h2>
        {people.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No members match “{q}”. Check the spelling or try a shorter name.
          </p>
        ) : (
          <ul className="divide-y">
            {people.map((p) => (
              <MemberRow key={p.id} person={p} ownerId={org.ownerId} />
            ))}
          </ul>
        )}
        {hasMore && <ShowMore href={showMoreHref} />}
      </section>
    )
  }

  return (
    <div className="space-y-5">
      {leaders.length > 0 && (
        <>
          <section aria-labelledby="leaders-heading">
            <h2 id="leaders-heading" className="text-sm font-semibold">
              Admins and officers
              <span className="ml-1.5 font-normal text-muted-foreground">
                {leaders.length}
              </span>
            </h2>
            <ul className="divide-y">
              {leaders.map((p) => (
                <MemberRow key={p.id} person={p} ownerId={org.ownerId} />
              ))}
            </ul>
          </section>
          <Separator />
        </>
      )}

      <section aria-labelledby="newest-heading">
        <h2 id="newest-heading" className="text-sm font-semibold">
          Newest members
        </h2>
        {people.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No other members yet.
          </p>
        ) : (
          <ul className="divide-y">
            {people.map((p) => (
              <MemberRow key={p.id} person={p} ownerId={org.ownerId} />
            ))}
          </ul>
        )}
        {hasMore && <ShowMore href={showMoreHref} />}
      </section>
    </div>
  )
}

function ShowMore({ href }: { href: string }) {
  return (
    <Button variant="secondary" className="mt-3 w-full">
      <Link href={href} scroll={false}>
        Show more
      </Link>
    </Button>
  )
}

function MembersOnly({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-10 text-center">
      <LockIcon className="size-6 text-muted-foreground" />
      <p className="text-sm font-medium">Members only</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Join {name} to see who's in it.
      </p>
    </div>
  )
}
