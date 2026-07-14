const STEPS = [
  {
    number: "01",
    title: "Create your organization",
    body: "Claim your handle — waddlr.app/your-org — in seconds.",
  },
  {
    number: "02",
    title: "Customize your portal",
    body: "Pick a theme, upload your logo, set your colors and story.",
  },
  {
    number: "03",
    title: "Invite members",
    body: "Share your link. Students join with one tap and land on your portal.",
  },
  {
    number: "04",
    title: "Run events and activities",
    body: "Publish events, track attendance, send announcements — all in one place.",
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-muted/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            How it works
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Live in an afternoon.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="text-xs font-semibold tracking-widest text-primary">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
