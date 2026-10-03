import { Skeleton } from "@/components/ui/skeleton"

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

export function PeopleSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading members">
      <Skeleton className="mb-1 h-4 w-40" />
      {Array.from({ length: 3 }).map((_, i) => (
        <RowSkeleton key={`l${i}`} />
      ))}
      <Skeleton className="mt-6 mb-1 h-4 w-32" />
      {Array.from({ length: 5 }).map((_, i) => (
        <RowSkeleton key={`m${i}`} />
      ))}
    </div>
  )
}
