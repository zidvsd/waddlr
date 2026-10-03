import {
  getOrgAnnouncements,
  getOrgEvents,
  getOrgMembers,
  getOrganizationBySlug,
} from "@/lib/queries"
import { getServerSession } from "@/lib/auth/get-session"
import { notFound } from "next/navigation"
import { OrgFeed } from "@/components/OrgFeed"
export default async function OrgPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await getServerSession()

  const org = await getOrganizationBySlug(slug)
  if (!org) notFound()

  const [announcements, events, members] = await Promise.all([
    getOrgAnnouncements(org.id, { limit: 20 }),
    getOrgEvents(org.id, { limit: 20 }),
    getOrgMembers(org.id, { limit: 20 }),
  ])

  return (
    <OrgFeed
      org={org}
      announcements={announcements}
      events={events}
      userId={session?.user.id}
      members={members}
    />
  )
}
