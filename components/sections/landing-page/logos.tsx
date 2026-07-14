export function Logos() {
  return (
    <section className="border-y border-border/60 bg-muted/50 py-10">
      <div className="mx-auto px-6">
        <p className="text-center text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Built for organizations on every campus
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-muted-foreground/80">
          {[
            "Computer Society",
            "Robotics Club",
            "Student Council",
            "Debate League",
            "Photography Club",
            "Dance Guild",
          ].map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
