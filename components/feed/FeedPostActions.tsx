import { Heart, MessageCircle, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FeedPostActionsProps {
  liked: boolean
  onToggleLike: () => void
  showLike?: boolean
  showComment?: boolean
  showComments?: boolean
  showShare?: boolean
  onComment: () => void
  onShare: () => void
}

export function FeedPostActions({
  liked,
  onToggleLike,
  showLike = true,
  showComment = true,
  showComments = true,
  showShare = true,
  onComment,
  onShare,
}: FeedPostActionsProps) {
  return (
    <div className="mt-7">
      <Separator />

      <div className="flex items-center py-3">
        <div className="flex items-center gap-1">
          {showLike && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onToggleLike}
              className={
                liked
                  ? "text-destructive hover:text-destructive"
                  : "text-muted-foreground"
              }
            >
              <Heart
                className="size-4"
                fill={liked ? "currentColor" : "none"}
              />
              <span>{liked ? "Liked" : "Like"}</span>
            </Button>
          )}

          {showComment && showComments && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="text-muted-foreground"
            >
              <MessageCircle className="size-4" />
              <span>Comment</span>
            </Button>
          )}

          {showShare && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="text-muted-foreground"
            >
              <Share2 className="size-4" />
              <span>Share</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
