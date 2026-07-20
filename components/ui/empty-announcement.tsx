import { ArrowUpRightIcon, Megaphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"
export function EmptyAnnouncement() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Megaphone />
        </EmptyMedia>
        <EmptyTitle>No Announcements Yet</EmptyTitle>
        <EmptyDescription>
          No announcements to keep track of yet. Get started by joining your
          first organization.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link href={"/discover?tab=announcements"}>
          <Button>Find Announcements</Button>
        </Link>
      </EmptyContent>
      <Button
        variant="link"
        className="text-muted-foreground"
        size="sm"
        nativeButton={false}
        render={
          <a href="#">
            Learn More <ArrowUpRightIcon />
          </a>
        }
      />
    </Empty>
  )
}
