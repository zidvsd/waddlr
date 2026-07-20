import { ArrowUpRightIcon, CalendarX } from "lucide-react"

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
export function EmptyEvent() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CalendarX />
        </EmptyMedia>
        <EmptyTitle>No Events Yet</EmptyTitle>
        <EmptyDescription>
          No upcoming events yet. Get started by joining your first
          organization.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link href={"/discover?tab=events"}>
          <Button>Join Org</Button>
        </Link>

        <Button variant="outline">Suggest Events</Button>
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
