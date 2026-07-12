import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Sparkles,
  Users,
  Calendar,
  QrCode,
  Megaphone,
  Award,
  Palette,
  LayoutDashboard,
  Check,
  Menu,
  ImageOff,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Logos />
      <Problem />
      <Features />
      <ThemeShowcase />
      <HowItWorks />
      <Discovery />
      <FinalCta />
      <Footer />
    </div>
  )
}

export default LandingPage

function Nav() {
  return (
    <header className="sticky top-0 z-50">
      <div className="surface-glass border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Clubly
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "Themes", "How it works", "Discover"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted md:inline-flex"
            >
              Log in
            </a>
            <a
              href="#signup"
              className="bg-gradient-brand hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] md:inline-flex"
            >
              Sign up
              <ArrowRight className="size-3.5" />
            </a>
            <ThemeToggle variant="outline" size="icon" />
            <button
              className="rounded-full p-2 text-foreground md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function LogoMark() {
  return (
    <span className="flex size-8 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground">
      <ImageOff className="size-4" />
    </span>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[10%] right-[10%] h-100 w-100 rounded-full bg-violet/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
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
            your organization's online presence — in one beautifully designed
            platform.
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
              alt="Clubly organization portal for Computer Society"
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

function FloatingCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`surface-card absolute px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}

function Logos() {
  return (
    <section className="border-y border-border/60 bg-muted/50 py-10">
      <div className="mx-auto max-w-6xl px-6">
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

function Problem() {
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

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Organization Portal",
    body: "Give your organization a professional online home with your logo, colors and story.",
  },
  {
    icon: Users,
    title: "Member Management",
    body: "Manage members, roles and cohorts without spreadsheets or scattered forms.",
  },
  {
    icon: Calendar,
    title: "Event Management",
    body: "Create events, collect RSVPs and track everything in a single calendar.",
  },
  {
    icon: QrCode,
    title: "QR Attendance",
    body: "Track participation in seconds. Members check in, officers get instant reports.",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    body: "Reach every member instantly — no more scrolling through group chats.",
  },
  {
    icon: Award,
    title: "Certificates",
    body: "Generate branded certificates for participation and leadership automatically.",
  },
  {
    icon: Palette,
    title: "Theme Customization",
    body: "Choose a premium theme and make your organization look uniquely yours.",
  },
] as const

function Features() {
  return (
    <section id="features" className="section-padding bg-muted/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Everything you need
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            One platform. Every workflow.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The essentials your organization runs on — thoughtfully designed,
            deeply integrated, and beautifully simple.
          </p>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg ${index === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
              >
                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-primary transition-transform group-hover:scale-110">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
                <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

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

function ThemeShowcase() {
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
            clubly.app/{theme.org.toLowerCase().replace(/\s+/g, "-")}
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

const STEPS = [
  {
    number: "01",
    title: "Create your organization",
    body: "Claim your handle — clubly.app/your-org — in seconds.",
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

function HowItWorks() {
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

function Discovery() {
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

function FinalCta() {
  return (
    <section className="px-6 pb-28">
      <div className="bg-gradient-brand relative mx-auto max-w-6xl overflow-hidden rounded-4xl p-1 shadow-xl">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-4px)] bg-charcoal px-8 py-20 text-center md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute top-0 -left-20 size-80 rounded-full bg-primary/60 blur-3xl" />
            <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-violet/60 blur-3xl" />
          </div>
          <h2 className="relative text-4xl leading-tight font-semibold tracking-tight text-white md:text-6xl">
            Build a better organization
            <br /> experience.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/70">
            Join the first cohort of student organizations running on Clubly.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-charcoal shadow-lg transition-transform hover:scale-[1.02]"
            >
              Create organization
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Join organization
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const columns = [
    { title: "Product", links: ["Features", "Themes", "Discover"] },
    { title: "Organization", links: ["About", "Contact", "Roadmap"] },
    { title: "Account", links: ["Login", "Register"] },
  ]

  return (
    <footer className="border-t border-border bg-muted/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <LogoMark />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Clubly
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The operating system for student organizations. Beautifully
              designed, built for how real clubs actually work.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold tracking-tight text-foreground">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Clubly. Made for student leaders.
          </span>
          <span>Built with care.</span>
        </div>
      </div>
    </footer>
  )
}
