import { MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CommentComposerProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  variant?: "input" | "textarea"
  className?: string
}

export function CommentComposer({
  value,
  onChange,
  onSubmit,
  variant = "input",
  className,
}: CommentComposerProps) {
  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className={className ?? "flex items-center gap-2"}>
      {variant === "input" && (
        <MessageCircle className="size-4 shrink-0 text-muted-foreground" />
      )}

      {variant === "input" ? (
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          className="h-9 min-w-0 text-xs"
        />
      ) : (
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          rows={1}
          className="max-h-24 min-h-9 resize-none text-xs"
        />
      )}

      <Button
        type="button"
        size="icon"
        onClick={onSubmit}
        disabled={!value.trim()}
        aria-label="Post comment"
        className="size-9 shrink-0"
      >
        <Send className="size-4" />
      </Button>
    </div>
  )
}
