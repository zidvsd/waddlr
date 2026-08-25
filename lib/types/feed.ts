import type { UserAnnouncement } from "@/app/actions/announcements"
import type { OrgEvent } from "@/app/actions/events"

export type FeedItem =
  | {
      kind: "announcement"
      createdAt: Date
      data: UserAnnouncement
    }
  | {
      kind: "event"
      createdAt: Date
      data: OrgEvent
    }

export type FeedPost =
  | {
      kind: "announcement"
      data: UserAnnouncement
    }
  | {
      kind: "event"
      data: OrgEvent
    }

export interface Comment {
  id: string
  author: string
  content: string
  createdAt: Date
}
