import {
  Award,
  Calendar,
  LayoutDashboard,
  Megaphone,
  Palette,
  QrCode,
  Users,
} from "lucide-react"

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

export function Features() {
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
