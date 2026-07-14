# Waddlr — Copilot Instructions

This file gives GitHub Copilot repo-wide context. Keep it up to date as decisions change — stale instructions are worse than none.

## What this is

Waddlr (previously prototyped as "Clubly"/"CampusOS") is a multi-tenant student
organization management and community platform for Philippine college and senior
high school orgs. It replaces the Facebook + Messenger + Google Forms + Excel
stack most orgs currently duct-tape together.

Two core users:
- **Students** — discover orgs, keep track of events/announcements, browse a
  cross-org "Feed" instead of being buried in group chats.
- **Officers** — run one org dashboard instead of five disconnected tools.

Mascot: **Pico the Penguin** 🐧 — friendly, student-first, community-driven.
"Waddlr" leans into the penguin/waddle theme; keep copy warm and casual, never
corporate.

## Tech stack

- **Frontend:** TanStack Router (file-based routes via `createFileRoute`),
  React, TypeScript, Tailwind CSS v4, shadcn/ui, `lucide-react` icons.
  > Note: earlier planning docs referenced Next.js Server Components/Actions.
  > If the app has since fully committed to TanStack Router, treat this file
  > as the source of truth and remove this note. If both exist, say so here
  > explicitly so Copilot doesn't mix routing paradigms in generated code.
- **Backend/data:** Supabase (Postgres + Auth + Storage), accessed through a
  service-layer / repository-pattern — avoid scattering raw Supabase calls
  directly inside components.
- **Styling:** tokens defined in `globals.css` (see below). Don't hardcode
  hex colors in components — reach for the token or the helper class.
- **Deployment:** Vercel.
- **Font:** Inter, everywhere. No separate display serif is in use right now.

## Roles & multi-tenancy — read before touching auth/org code

- **Superadmin** — platform-level, not tied to a single org. Approves/verifies
  orgs, manages platform-wide settings.
- **Admin/Officer** — scoped per-organization via an `org_members`-style join
  table (`user_id`, `org_id`, `role`). An account can be Admin of one org and
  plain Member of another simultaneously. Officers **also** retain full
  Member-level access — never gate the Feed or member views behind
  "officer-only" logic that excludes officers browsing as members.
- **Member** — default role once someone joins an org. Can browse their org's
  content, RSVP to events, browse the cross-org **Feed**, like/comment/share,
  and maintain a basic profile.

**Enforce roles at the Supabase RLS layer, not just in UI conditionals.** Any
new table needs an RLS policy keyed off org membership + role before it ships.
Frontend role checks are a UX nicety, not a security boundary — don't write
code that assumes otherwise.

**Explicit non-goal: no member-to-member chat.** Don't suggest or scaffold
DMs/messaging between members, even when adjacent code (comments, the Feed)
makes it look like a natural next step. This is a deliberate scope cut, not
a gap to fill.

## The Feed

The cross-org discovery surface — a for-you-page of public posts from other
orgs, available to both Members and Officers. Engagement is shallow by design:
like, comment, share. No algorithmic rabbit hole, no chat layer. This is the
product's main differentiator from "Excel with a UI" — don't quietly scope it
down to a plain "browse organizations" directory.

**Open decision — don't assume an implementation:** what "share" does
(external link vs. repost to own activity vs. both) isn't finalized. If
generating share-related code, flag the ambiguity rather than picking one
silently.

## Design tokens (`globals.css`)

Brand palette, exposed as both semantic tokens and raw brand colors:

| Token | Role |
|---|---|
| `--primary` (Indigo) | primary actions, links |
| `--sunbeam` | sparing "pop" accent — badges, highlights, never body text |
| `--sky` | secondary accent, event/calendar-related UI |
| `--violet` | gradient partner to primary |
| `--charcoal` | fixed dark surface (e.g. CTA bands), not tied to light/dark mode |
| `--mist` | soft off-white surface / muted backgrounds |

Helper classes already defined — use these instead of re-deriving them:
- `.section-padding` / `.section-padding-sm` — responsive vertical rhythm
- `.bg-gradient-brand` / `.text-gradient-brand` — hero/CTA only, never on
  body copy or dense data tables
- `.surface-card` — Apple-style elevated card (soft shadow, no border)
- `.surface-glass` — frosted sticky nav
- `.badge-sunbeam` — notification/new badges, use once per view, not per item
- `.focus-ring` — consistent keyboard focus state
- `.text-data` — monospace/tabular styling for timestamps, codes, counts

Exception: per-organization **theme previews** (the org's own custom colors)
intentionally use literal hex values, since they represent a user's choice,
not app chrome. Don't "fix" those into brand tokens.

## Coding conventions

- PascalCase function components. Colocate small, tightly-coupled
  subcomponents in the same file (as in the landing page sections); split
  into `components/` once something is reused across routes.
- Prefer Tailwind utilities built on the tokens above over inline styles or
  arbitrary hex values.
- Icons: `lucide-react` only, sized `h-4 w-4` / `h-5 w-5` consistent with
  existing usage.
- Reach for a shadcn/ui primitive before hand-rolling a component that
  already exists in the library.
- Favor restraint over motion — no floating/bouncing animations, no
  gratuitous fades. The visual direction is Apple-quiet with a Wix-style
  single pop of color, not a motion-heavy landing page.

## Things not to do

- Don't reintroduce Facebook/Messenger/Google Forms/Excel-style patterns as
  "integrations" without discussion — replacing them is the whole point.
- Don't add member-to-member chat or direct messaging.
- Don't put role/permission checks only on the frontend.
- Don't invent a "share" implementation without flagging the open decision above.