# Waddlr

Waddlr is a multi-tenant student organization platform for Philippine college and senior high school orgs. It replaces the current patchwork of Facebook groups, Messenger chats, Google Forms, and spreadsheets with a single, org-centric portal for discovery, communication, operations, and attendance.

This repo is the live app foundation and product shell for that experience. It is not a finished production platform yet, but the core product model, tenancy model, auth, database schema, and org permission system are already in place.

## Current project status

### Status at a glance

- Product direction: validated and actively shaping around a warm, casual student-first UX.
- App foundation: mostly in place and running as a Next.js app with auth, onboarding, dashboards, and org-scoped pages.
- Core data model: implemented for organizations, profiles, roles, members, join requests, events, and announcements.
- Permissions: explicitly modeled and should be treated as a source of truth for org-level access control.
- Maturity: early-to-mid MVP foundation. The system is structurally sound, but several core workflows still need to be completed and hardened.

### Implemented

- Landing-page marketing and onboarding funnel UI.
- Authentication shell using Better Auth with email/password and Google OAuth support.
- Server-side session handling and redirect logic.
- Onboarding flow for profile completion.
- App shell with dashboard navigation and org-scoped page structure.
- Multi-tenant database schema for organizations and users.
- Org membership and role model with admin/officer/member semantics.
- Permission definitions for org management, events, announcements, and joins.
- Core organization discovery pages and org detail pages.
- Action-oriented server modules for orgs, profiles, members, events, and announcements.

### Partially implemented / still scaffolded

- Several route pages are still lightweight shells rather than complete workflows.
- Event and announcement flows are partly modeled but not yet fully polished end-to-end.
- Member management, admin workflows, and org settings may still need deeper validation and edge-case handling.
- Feed and richer social engagement experiences are not fully realized.
- Database-level RLS and policy validation should be treated as a required follow-through item before production readiness.

### Known product constraints

- No member-to-member chat or DM layer is part of the product scope.
- The cross-org feed is a discovery surface, not a messaging platform.
- Share behavior is intentionally still open-ended and should not be implemented as an arbitrary assumption without additional product direction.

## System design

### High-level architecture

Waddlr is a single-app Next.js platform with a server-driven multi-tenant data model:

- Frontend: Next.js 16 App Router + React 19 + TypeScript
- Styling: Tailwind CSS v4 + shadcn/ui + lucide-react
- Auth: Better Auth
- Database: Supabase Postgres
- ORM: Drizzle ORM
- Hosting target: Vercel

The system is designed around a central pattern:

1. User authenticates via Better Auth.
2. Session is resolved server-side from the app shell and route guards.
3. Server actions or page loaders fetch data using Drizzle queries.
4. Org-level access checks happen via a central permission layer, not only in the UI.
5. Data is stored in PostgreSQL with tenant-scoped organization membership rows.

### Core runtime model

#### Authentication and user identity

- Better Auth is the application's auth provider.
- User records are created through the auth adapter and a profile row is created automatically.
- Profile data includes display name and avatar.
- Auth is integrated with email/password login and Google OAuth.

Key files:

- `lib/auth/auth.ts`
- `lib/auth/get-session.ts`
- `lib/auth/auth-client.ts`
- `app/api/auth/[...all]/route.ts`

#### Data layer

The postgres schema is modeled in Drizzle and centered on organization tenancy. These are the main entities in the current codebase:

- `user` / auth user identity
- `profile` for personal profile info
- `organization` for org-level metadata and settings
- `organizationMember` for membership linkage + role assignment
- `organizationJoinRequest` for approval-based access flow
- `event` for org events and scheduling
- `announcement` for org announcements
- additional schema modules for org relations and auth integration

Key files:

- `lib/db/index.ts`
- `lib/db/schema/index.ts`
- `lib/db/schema/organization.ts`
- `lib/db/schema/organization_members.ts`
- `lib/db/schema/organization_join_request.ts`
- `lib/db/schema/event.ts`
- `lib/db/schema/announcement.ts`
- `lib/db/schema/profile.ts`

#### Multi-tenancy and org model

The product is intentionally multi-tenant and org-aware:

- A user can belong to multiple organizations.
- Membership is represented with an organization_members join record.
- Each membership carries a role.
- Org-specific permissions are evaluated against that membership, not only against a global user role.

Current role model:

- `organization_admin`
- `officer`
- `member`

The access model is intentionally explicit and should remain readable and easy to audit.

#### Permission system

Org authorization does not live in scattered UI checks. It is centralized in `lib/permission.ts`.

This file defines:

- `OrgAction` union for each permissioned operation
- `PERMISSIONS` map by role
- `can()`, `assertCan()`, and `requireOrgPermission()` helpers
- role utility helpers like `isOrgAdmin()` and `isOfficerOrAbove()`

This means the expected pattern is:

- server actions guard mutations with `assertCan(...)`
- page loaders use the same permission helpers for route-level access
- UI can render controls based on permission helpers, but UI checks are not the source of truth

Permission examples currently modeled:

- `org:edit_settings`
- `org:manage_members`
- `join_request:view | approve | reject`
- `event:create | edit | delete | view`
- `attendance:record | view`
- `announcement:create | delete | view | edit`

#### Request flow and app composition

The app organizes work into route groups and server functions:

- `app/` contains route groups for landing, auth, onboarding, dashboard, org pages, and admin pages.
- `app/actions/` contains server actions for profile, organizations, members, events, and announcements.
- `components/` contains shared layout and feature sections.
- `lib/` contains auth, DB access, schema, permission logic, and utility functions.

High-level route organization:

- `/` landing page
- `/login`, `/signup`, `/onboarding`
- `/dashboard`
- `/discover`
- `/profile`
- `/org/[slug]`
- `/org/[slug]/manage`
- `/admin`

### Product behavior and design principles

#### Core product goal

Waddlr is designed to act as a central operating layer for student orgs. The intended user experiences are:

- discover orgs and events across the student ecosystem
- participate in org-specific spaces without fragmented communication tools
- manage org operations from one dashboard
- give admins/officers a visible governance layer without exposing unsafe cross-org behavior

#### UX and copy direction

The product keeps a warm, student-first tone and an Apple-quiet visual pattern. The system is meant to feel approachable and community-centered, not corporate or overly heavy.

The design system intentionally relies on shared tokens in `app/globals.css` rather than ad hoc styling. This is important for maintainability and brand consistency.

#### Explicit non-goals and boundaries

The codebase is intentionally shaped around the following boundaries:

- No member-to-member chat or DM layer.
- No private “officer-only” views that accidentally block officers from seeing member-level content.
- No role enforcement that exists only in front-end conditionals.
- No forced share implementation without product decision-making.

## Repository map

- `app/` - application routes, page layouts, route groups, and route handlers
- `app/actions/` - server actions for org and app features
- `components/` - UI primitives and feature sections
- `components/layout/` - nav, shell, app chrome
- `components/ui/` - reusable UI building blocks
- `lib/` - business logic, DB layer, permissions, auth, and shared helpers
- `lib/db/schema/` - Drizzle schema modules
- `lib/auth/` - auth wiring and session plumbing
- `supabase/` - database migrations and schema snapshots
- `public/` - static assets
- `drizzle.config.ts` - Drizzle configuration
- `next.config.ts` - Next app config
- `package.json` - project scripts and dependencies

## Local development

### Prerequisites

- Node.js
- A Supabase Postgres project
- Environment variables for database and auth setup

### Typical setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Expected environment variables

At minimum, the app expects values like:

- `DATABASE_URL`
- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Useful scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Developer guidance for Claude Code / future agents

When making changes to this repo, keep the following principles in mind:

- Preserve the multi-tenant org model and organization-member role architecture.
- Treat `lib/permission.ts` as the canonical permission source.
- Keep RLS/database boundaries and server-side permission checks in sync with UI logic.
- Prefer reusing shared layout primitives and design tokens before creating one-off styles.
- Avoid introducing DM/chat features or other product expansions that violate the current scope.
- If share functionality is added, clearly document the intended behavior because the current requirement is still ambiguous.
- Prefer server actions over client-side DB calls for anything that touches org state or permissions.
- Keep copy and UI aligned with the product direction: warm, student-first, and low-friction.

## Suggested next milestones

These are the most relevant near-term moves for the codebase:

1. Finish the org dashboard and member management flows.
2. Harden org settings and approval workflows.
3. Complete event CRUD and attendance workflows end-to-end.
4. Implement announcement management with full permission enforcement.
5. Build the cross-org feed and engagement surface.
6. Validate and tighten RLS policies and permission coverage.
7. Add realistic testing strategy around auth, permissions, and org operations.

This repo is best thought of as a foundational multi-tenant student org platform with a working auth/data/permission skeleton, not as a complete feature-complete product. The most important architectural constraint is that org membership and org permission checks remain central, explicit, and server-side enforced.
