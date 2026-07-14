import { Check } from "lucide-react"
import { LogoMark } from "./common"

export function Problem() {
  const before = [
    "Google Forms for sign-ups",
    "Google Sheets for members",
    "Messenger for announcements",
    "Canva for every poster",
    "Drive folders no one finds",
  ]

  return (
    <section className="section-padding mx-auto max-w-7xl px-6">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            The problem
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Everything is scattered.
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Organizations juggle five apps to do what one platform should.
            Members drop off. Officers burn out. Knowledge gets lost every
            semester.
          </p>
          <div className="mt-8 space-y-2">
            {before.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3"
              >
                <span className="size-2 rounded-full bg-destructive/70" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="sticky top-32">
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              The Clubly way
            </span>
            <h3 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              One organized <span className="text-gradient-brand">home.</span>
            </h3>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              A single branded portal, one member directory, one event calendar,
              one place for every announcement — and a professional online
              presence that carries across cohorts.
            </p>
            <div className="bg-gradient-brand mt-8 rounded-3xl p-1 shadow-lg">
              <div className="rounded-[calc(1.5rem-4px)] bg-card p-6">
                <div className="flex items-center gap-3">
                  <LogoMark />
                  <span className="font-semibold text-foreground">Clubly</span>
                </div>
                <div className="mt-5 space-y-2">
                  {[
                    "Portal · Members · Events",
                    "Attendance · Announcements",
                    "Certificates · Themes",
                  ].map((row) => (
                    <div
                      key={row}
                      className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground"
                    >
                      <Check className="size-4 text-primary" />
                      {row}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
