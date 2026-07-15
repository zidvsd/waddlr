import { ArrowRight, QrCode, Sparkles, Users } from "lucide-react"
import { FloatingCard, LogoMark } from "./common"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[10%] right-[10%] h-100 w-100 rounded-full bg-violet/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3 text-primary" />
            Now inviting founding organizations
          </span>
          <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-7xl">
            Run your student
            <br />
            organization like a{" "}
            <span className="text-gradient-brand">professional team.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Manage members, events, announcements, attendance, certificates and
            your organization&apos;s online presence — in one beautifully
            designed platform.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#signup"
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
            >
              Create your organization
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#discover"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Explore organizations
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-6xl">
          <div className="bg-gradient-brand absolute inset-x-8 top-8 -z-10 h-full rounded-4xl opacity-30 blur-3xl" />
          <div className="surface-card overflow-hidden rounded-3xl">
            <img
              src="https://placehold.co/600x400"
              alt="Waddlr organization portal for Computer Society"
              width={1600}
              height={1200}
              className="h-auto w-full"
            />
          </div>

          <FloatingCard className="top-[18%] left-[-2%] hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-accent">
                <Users className="size-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">New members</div>
                <div className="text-sm font-semibold text-foreground">
                  +248 this week
                </div>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard className="top-[55%] right-[-2%] hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-accent">
                <QrCode className="size-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Attendance</div>
                <div className="text-sm font-semibold text-foreground">
                  94% check-in rate
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}
