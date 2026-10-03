export function initials(name?: string | null): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  return (
    (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts.at(-1)![0] : "")
  ).toUpperCase()
}
