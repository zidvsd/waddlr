"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { CommentComposer } from "../feed/CommentComposer"
import { FeedCommentsSidebar } from "../feed/FeedCommentsSidebar"
import { FeedPostActions } from "../feed/FeedPostActions"
import {
  AnnouncementDetailsCard,
  EventDetailsCard,
  LinkedEventCard,
} from "../feed/FeedPostDetails"
import { FeedPostHeader } from "../feed/FeedPostHeader"
import type { Comment, FeedPost } from "@/lib/types/feed"

interface FeedPostModalProps {
  post: FeedPost | null
  open: boolean
  onClose: () => void

  showActions?: boolean
  showLike?: boolean
  showComment?: boolean
  showShare?: boolean
  showComments?: boolean
}

export function FeedPostModal({
  post,
  open,
  onClose,
  showActions = true,
  showLike = true,
  showComment = true,
  showShare = true,
  showComments = true,
}: FeedPostModalProps) {
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    if (!open) return

    setLiked(false)
    setCommentText("")
    setComments([])
  }, [open, post?.data.id])

  if (!post) return null

  const isAnnouncement = post.kind === "announcement"

  const title = post.data.title
  const organizationName = post.data.organizationName
  const createdAt = post.data.createdAt

  const body = isAnnouncement ? post.data.body : post.data.description
  const event = !isAnnouncement ? post.data : null

  function addComment() {
    const trimmed = commentText.trim()
    if (!trimmed) return

    setComments((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        author: "You",
        content: trimmed,
        createdAt: new Date(),
      },
    ])

    setCommentText("")
  }

  async function handleShare() {
    if (typeof navigator === "undefined") return

    try {
      if (navigator.share) {
        await navigator.share({ title, text: body ?? "" })
      } else {
        await navigator.clipboard?.writeText(window.location.href)
      }
    } catch {
      // User cancelled native share dialog.
    }
  }

  function scrollToComments() {
    document
      .getElementById("feed-comments")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-6xl flex-col gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 text-card-foreground shadow-2xl md:h-[min(850px,calc(100vh-48px))] md:flex-row"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <DialogDescription className="sr-only">
          {isAnnouncement ? "Announcement" : "Event"} from {organizationName}
        </DialogDescription>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={onClose}
          aria-label="Close post"
          className="absolute top-3 right-3 z-50 size-9 rounded-full bg-background/90 shadow-sm backdrop-blur"
        >
          <X className="size-4" />
        </Button>

        {/* MAIN POST COLUMN */}
        <section className="relative min-w-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <article className="w-full">
              {!isAnnouncement && event?.thumbnailUrl && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted sm:aspect-16/7">
                  <Image
                    fill
                    src={event.thumbnailUrl}
                    alt={title}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, calc(100vw - 384px)"
                  />
                </div>
              )}

              <div className="p-5 pb-28 sm:p-7 sm:pb-28">
                <FeedPostHeader
                  isAnnouncement={isAnnouncement}
                  organizationName={organizationName}
                  createdAt={createdAt}
                />

                <div className="mt-6">
                  <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {title}
                  </h1>

                  {body && (
                    <p className="mt-4 text-sm leading-7 whitespace-pre-wrap text-muted-foreground sm:text-base">
                      {body}
                    </p>
                  )}
                </div>
                {!isAnnouncement && event && <EventDetailsCard event={event} />}

                {isAnnouncement && (
                  <AnnouncementDetailsCard announcement={post.data} />
                )}
                {isAnnouncement && post.data.eventId && <LinkedEventCard />}
                {showActions && (
                  <FeedPostActions
                    liked={liked}
                    onToggleLike={() => setLiked((value) => !value)}
                    showLike={showLike}
                    showComment={showComment}
                    showComments={showComments}
                    showShare={showShare}
                    onComment={scrollToComments}
                    onShare={handleShare}
                  />
                )}
              </div>
            </article>
          </ScrollArea>

          {/* MOBILE COMMENT COMPOSER */}
          {showComments && (
            <div className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
              <CommentComposer
                value={commentText}
                onChange={setCommentText}
                onSubmit={addComment}
              />
            </div>
          )}
        </section>

        {/* DESKTOP COMMENTS */}
        {showComments && (
          <FeedCommentsSidebar
            comments={comments}
            commentText={commentText}
            onCommentTextChange={setCommentText}
            onSubmitComment={addComment}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
