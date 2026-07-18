# Waddlr

Waddlr is a multi-tenant student organization platform for Philippine college and senior high school orgs. The product is designed to replace a patchwork of Facebook groups, Messenger chats, Google Forms, and spreadsheets with one centralized portal for organizations and members.

This repository is the current implementation of the product experience and app foundation.

## 1. Product summary

### Core users

- Students: discover organizations, browse a cross-org feed, view events, announcements, and member-facing org pages.
- Officers/Admins: manage an organization portal, members, events, announcements, and attendance.
- Superadmins: oversee the platform and approve/verify organizations.

### Product direction

- Warm, casual, student-first copy.
- Apple-quiet visual style with a single strong accent color.
- No member-to-member chat; this is an explicit scope boundary.
- Role checks must be enforced in the backend/RLS layer, not only in UI.

## 2. Current implementation status

### What is already implemented

- Landing page UI with hero, features, problem/solution sections, discovery cards, how-it-works, footer, and theme showcase.
- Auth shell for login, signup, onboarding, and session-based redirects.
- App layout with a dashboard shell, sidebar navigation, and org-scoped routes.
- Drizzle schema foundation for organizations, organization members, join requests, profiles, and auth.
- Permission model for org roles and actions.
- Supabase + Better Auth integration for authentication and database access.

### What is still scaffolded or placeholder-like

- Several route pages such as profile, onboarding, org home, and dashboard are still basic shells.
- Some org-specific features are defined in the schema and permission layer but still need full UI and server workflow implementation.
- The feed and richer org management flows are not yet fully built out.

## 3. Tech stack

- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS v4, shadcn/ui, lucide-react
- Auth: Better Auth
- Database/ORM: Supabase Postgres + Drizzle ORM
- Deployment target: Vercel

## 4. Repository structure

- app/: route-based Next.js app routes for landing, auth, dashboard, org pages, and admin pages
- components/: UI primitives and feature-specific sections
  - components/ui/: shared primitives such as buttons, cards, empty states, sidebar, inputs
  - components/layout/: landing nav, app nav, sidebar, auth buttons
  - components/sections/landing-page/: landing page sections
- lib/: application logic and shared helpers
  - lib/auth/: auth client/server wiring
  - lib/db/: Drizzle schema and database entrypoints
  - lib/permission.ts: org permission model
  - lib/permission.client.ts: client-side permission helpers
- actions/: server actions for org/event-related workflows
- supabase/: migrations and schema snapshots

## 5. Role and permission model

The app is designed around a multi-tenant role system.

### Roles

- Superadmin: platform-level access; not tied to a single organization.
- Admin/Officer: scoped to one organization via org membership records.
- Member: default org membership role; can view org content and participate as a member.

### Permission concepts

The permission layer is explicitly defined in lib/permission.ts and includes actions such as:

- org:edit_settings
- org:manage_members
- org:view_workspace
- join_request:view / approve / reject
- event:create / edit / delete / view
- attendance:record / view
- announcement:create / delete / view / edit

Important rule: enforce permissions in the database/RLS layer, not just in UI conditionals.

## 6. UI and design conventions

- Use Tailwind utilities and existing design tokens rather than hardcoded colors.
- Prefer shadcn/ui primitives when possible.
- Use lucide-react icons consistently.
- Keep copy warm and casual, aligned with the Waddlr brand.
- Use the existing theme tokens from app/globals.css instead of introducing ad-hoc styling.

## 7. Local development

### Prerequisites

- Node.js
- A Supabase project
- Environment variables for auth and database access

### Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Expected environment variables

At minimum, the app expects values such as:

- DATABASE_URL
- NEXT_PUBLIC_BETTER_AUTH_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

## 8. Developer guidance for future agents

When modifying this codebase, keep the following in mind:

- Preserve the multi-tenant organization model.
- Do not assume role checks are only a frontend concern.
- Avoid introducing member-to-member chat or direct messaging features.
- If implementing share behavior, note the current ambiguity rather than silently choosing one behavior.
- Prefer extending existing shared UI primitives and layout patterns before creating one-off components.

## 9. Suggested next milestones

- Finish core org dashboard and member management flows.
- Implement event and announcement CRUD with proper permission enforcement.
- Build the cross-org feed experience.
- Connect more of the schema to real UI and server actions.
- Harden RLS policies and role-based access behavior.
