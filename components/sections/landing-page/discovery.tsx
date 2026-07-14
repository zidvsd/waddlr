import { ArrowRight } from "lucide-react"

const ORGS = [
  {
    name: "Computer Society",
    tag: "Tech · 1,248 members",
    theme: "from-indigo-500 to-violet-500",
  },
  {
    name: "Engineering Club",
    tag: "Engineering · 812 members",
    theme: "from-sky-500 to-cyan-500",
  },
  {
    name: "Photography Club",
    tag: "Arts · 486 members",
    theme: "from-amber-400 to-rose-500",
  },
  {
    name: "Robotics Club",
    tag: "Tech · 340 members",
    theme: "from-emerald-500 to-teal-500",
  },
  {
    name: "Debate League",
    tag: "Humanities · 220 members",
    theme: "from-rose-500 to-pink-500",
  },
  {
    name: "Student Council",
    tag: "Governance · 96 members",
    theme: "from-slate-700 to-slate-900",
  },
] as const

export function Discovery() {
  return (
    <section id="discover" className="section-padding mx-auto max-w-7xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Discover
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Find organizations on your campus.
          </h2>
        </div>
        <a
          href="#discover"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Browse all
          <ArrowRight className="size-4" />
        </a>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ORGS.map((org) => (
          <div
            key={org.name}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className={`h-24 bg-linear-to-br ${org.theme}`} />
            <div className="relative px-6 pb-6">
              <div
                className={`relative -mt-8 mb-4 flex size-16 items-center justify-center rounded-2xl border-4 border-card bg-linear-to-br ${org.theme} text-lg font-bold text-white shadow-md`}
              >
                {org.name[0]}
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {org.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{org.tag}</p>
              <button className="mt-4 w-full rounded-full border border-border bg-card py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                Visit portal
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
