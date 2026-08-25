import { formatDistanceToNow } from "date-fns"
import { MessageCircle } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentComposer } from "./CommentComposer"
import type { Comment } from "@/lib/types/feed"
interface FeedCommentsSidebarProps {
  comments: Comment[]
  commentText: string
  onCommentTextChange: (value: string) => void
  onSubmitComment: () => void
}

export function FeedCommentsSidebar({
  comments,
  commentText,
  onCommentTextChange,
  onSubmitComment,
}: FeedCommentsSidebarProps) {
  return (
    <aside
      id="feed-comments"
      className="hidden w-90 shrink-0 flex-col border-l border-border bg-background md:flex"
    >
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Comments</h2>

          <p className="text-xs text-muted-foreground">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5">
          {comments.length === 0 ? (
            <div className="flex min-h-100 flex-col items-center justify-center text-center">
              <Avatar className="size-11">
                <AvatarFallback>
                  <MessageCircle className="size-5 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>

              <p className="mt-3 text-sm font-medium text-foreground">
                No comments yet
              </p>

              <p className="mt-1 max-w-55 text-xs leading-relaxed text-muted-foreground">
                Be the first to share your thoughts about this post.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                      Y
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="rounded-xl bg-muted px-3 py-2.5">
                      <p className="text-xs font-semibold text-foreground">
                        {comment.author}
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {comment.content}
                      </p>
                    </div>

                    <p className="mt-1 px-1 text-[10px] text-muted-foreground">
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-border bg-background p-4">
        <CommentComposer
          variant="textarea"
          value={commentText}
          onChange={onCommentTextChange}
          onSubmit={onSubmitComment}
          className="flex items-end gap-2"
        />
      </div>
    </aside>
  )
}
