import { ArrowRight } from "lucide-react"

const THEMES = [
  {
    name: "Apple Minimal",
    org: "Student Council",
    tag: "Premium · quiet · confident",
    bg: "linear-gradient(180deg, #ffffff, #f5f5f7)",
    fg: "#0a0a0a",
    accent: "#0071e3",
  },
  {
    name: "Cyber Tech",
    org: "Computer Society",
    tag: "Dark · neon · futuristic",
    bg: "radial-gradient(ellipse at top, #1a0b3d, #050510)",
    fg: "#e8e6ff",
    accent: "#00ffe0",
  },
  {
    name: "Creative Color",
    org: "Dance Guild",
    tag: "Vivid · playful · expressive",
    bg: "linear-gradient(135deg, #ff6b6b, #ffa940 40%, #ec4899 90%)",
    fg: "#ffffff",
    accent: "#ffffff",
  },
  {
    name: "Academic",
    org: "Debate League",
    tag: "Editorial · trusted · classic",
    bg: "linear-gradient(180deg, #f7f4ee, #ece5d3)",
    fg: "#1a1a2e",
    accent: "#7a1f2b",
  },
] as const

export function ThemeShowcase() {
  return (
    <section id="themes" className="section-padding mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium tracking-widest text-primary uppercase">
          Themes
        </span>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Every organization,
          <br /> its own identity.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose from premium theme presets. Swap logos, colors and layout to
          match the way your organization already feels.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {THEMES.map((theme) => (
          <ThemeCard key={theme.name} theme={theme} />
        ))}
      </div>
    </section>
  )
}

function ThemeCard({ theme }: { theme: (typeof THEMES)[number] }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div
        className="relative aspect-4/3 w-full p-6"
        style={{ background: theme.bg, color: theme.fg }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-xs font-bold"
              style={{
                background: theme.accent,
                color:
                  theme.bg.includes("#ffffff") || theme.name === "Academic"
                    ? "#fff"
                    : "#000",
              }}
            >
              {theme.org[0]}
            </span>
            <span className="text-sm font-semibold">{theme.org}</span>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase"
            style={{ background: `${theme.fg}12`, color: theme.fg }}
          >
            Live
          </span>
        </div>
        <div className="mt-8">
          <div className="text-3xl leading-tight font-semibold tracking-tight">
            {theme.org}
          </div>
          <div className="mt-1 text-sm opacity-70">
            waddlr.app/{theme.org.toLowerCase().replace(/\s+/g, "-")}
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-14 flex-1 rounded-xl"
              style={{
                background: `${theme.fg}0f`,
                border: `1px solid ${theme.fg}18`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="size-6 rounded-full border-2"
                style={{
                  background: theme.accent,
                  borderColor: theme.bg.includes("gradient")
                    ? theme.fg
                    : "#fff",
                }}
              />
            ))}
          </div>
          <button
            className="rounded-full px-3 py-1.5 text-xs font-medium"
            style={{
              background: theme.accent,
              color: theme.name === "Cyber Tech" ? "#050510" : "#fff",
            }}
          >
            Join
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border bg-card px-6 py-4">
        <div>
          <div className="text-sm font-semibold text-foreground">
            {theme.name}
          </div>
          <div className="text-xs text-muted-foreground">{theme.tag}</div>
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </div>
  )
}
