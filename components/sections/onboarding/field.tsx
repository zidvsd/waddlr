// components/onboarding/field.tsx

export function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-primary">*</span>}
        </span>
        {hint && !error && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  )
}

export function inputClass(hasError: boolean, extra = "") {
  return [
    "w-full rounded-[var(--radius)] border bg-card px-3 py-2.5 text-sm text-foreground",
    "placeholder:text-muted-foreground",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
    hasError ? "border-destructive" : "border-input",
    extra,
  ].join(" ")
}
