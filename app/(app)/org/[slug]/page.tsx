import { Suspense } from "react"
import { notFound } from "next/navigation"
import {
  getOrgAnnouncements,
  getOrgEvents,
  getOrgMembers,
  getOrganizationBySlug,
} from "@/lib/queries"
import { getServerSession } from "@/lib/auth/get-session"
import { OrgFeed } from "@/components/OrgFeed"
import { OrgFeedSkeleton } from "@/components/skeletons/org-feed-skeleton"

type Org = NonNullable<Awaited<ReturnType<typeof getOrganizationBySlug>>>

type OrgPageProps = {
  params: Promise<{ slug: string }>
}

export default async function OrgPage({ params }: OrgPageProps) {
  const { slug } = await params

  const org = await getOrganizationBySlug(slug) // deduped with layout via cache()
  if (!org) notFound()

  return (
    <Suspense fallback={<OrgFeedSkeleton />}>
      <OrgFeedLoader org={org} />
    </Suspense>
  )
}

async function OrgFeedLoader({ org }: { org: Org }) {
  const [session, announcements, events, members] = await Promise.all([
    getServerSession(),
    getOrgAnnouncements(org.id, { limit: 20 }),
    getOrgEvents(org.id, { limit: 20 }),
    getOrgMembers(org.id, { limit: 20 }),
  ])

  return (
    <OrgFeed
      org={org}
      announcements={announcements}
      events={events}
      members={members}
      userId={session?.user.id}
    />
  )
}
