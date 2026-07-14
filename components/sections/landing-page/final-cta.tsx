import { ArrowRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="px-6 pb-28">
      <div className="bg-gradient-brand relative mx-auto max-w-6xl overflow-hidden rounded-4xl p-1 shadow-xl">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-4px)] bg-charcoal px-8 py-20 text-center md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute top-0 -left-20 size-80 rounded-full bg-primary/60 blur-3xl" />
            <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-violet/60 blur-3xl" />
          </div>
          <h2 className="relative text-4xl leading-tight font-semibold tracking-tight text-background md:text-6xl">
            Build a better organization
            <br /> experience.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-background/70">
            Join the first cohort of student organizations running on Waddlr.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#signup"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-charcoal shadow-lg transition-transform hover:scale-[1.02]"
            >
              Create organization
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/5 px-6 py-3 text-sm font-medium text-background backdrop-blur transition-colors hover:bg-background/10"
            >
              Join organization
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
