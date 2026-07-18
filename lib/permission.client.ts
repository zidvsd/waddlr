/**
 * lib/permissions.client.ts
 *
 * Client-safe subset of permissions.ts — no `db` import, so this can be
 * imported from client components to conditionally render UI
 * (buttons, nav items) without pulling drizzle/db into the browser bundle.
 *
 * This file re-exports the same OrgAction / OrgRole types and the same
 * PERMISSIONS table as lib/permissions.ts, so the two never drift apart.
 * If you add a new OrgAction, add it in both places (or better: extract
 * the type + table into a shared `permissions.shared.ts` that both files
 * import — see note at bottom).
 */
import type { organizationRoleEnum } from "@/lib/db/schema/organization"

export type OrgRole = (typeof organizationRoleEnum.enumValues)[number]
// "organization_admin" | "officer" | "member"

// A user with no membership row (not in the org at all) is represented as null.
export type OrgRoleOrNone = OrgRole | null

/**
 * Every permission-gated action in the app. Keep in sync with
 * lib/permissions.ts.
 */
export type OrgAction =
  | "org:edit_settings"
  | "org:delete"
  | "org:manage_members" // change roles, remove members
  | "org:view_workspace" // any authenticated member can see /org/[slug]
  | "join_request:view"
  | "join_request:approve"
  | "join_request:reject"
  | "event:create"
  | "event:edit"
  | "event:delete"
  | "event:view"
  | "attendance:record"
  | "attendance:view"
  | "announcement:create"
  | "announcement:delete"
  | "announcement:view"
  | "announcement:edit"

/**
 * The core permission table. Explicit and boring on purpose —
 * no clever inheritance, so it's easy to scan and audit.
 *
 * Keep in sync with the PERMISSIONS table in lib/permissions.ts.
 */
const PERMISSIONS: Record<OrgAction, OrgRole[]> = {
  "org:edit_settings": ["organization_admin"],
  "org:delete": ["organization_admin"],
  "org:manage_members": ["organization_admin"],

  "org:view_workspace": ["organization_admin", "officer", "member"],

  "join_request:view": ["organization_admin", "officer"],
  "join_request:approve": ["organization_admin", "officer"],
  "join_request:reject": ["organization_admin", "officer"],

  "event:create": ["organization_admin", "officer"],
  "event:edit": ["organization_admin", "officer"],
  "event:delete": ["organization_admin", "officer"],
  "event:view": ["organization_admin", "officer", "member"],

  "attendance:record": ["organization_admin", "officer"],
  "attendance:view": ["organization_admin", "officer", "member"],

  "announcement:create": ["organization_admin", "officer"],
  "announcement:delete": ["organization_admin"],

  "announcement:view": ["organization_admin", "officer", "member"],
  "announcement:edit": ["organization_admin", "officer"],
}

/**
 * Core check. Pass null if the user has no organization_member row
 * for this org (i.e. they're not a member).
 *
 * NOTE: this is for UI decisions only (show/hide a button, nav item).
 * The server action / route handler behind that button must still call
 * assertCan / requireOrgPermission from lib/permissions.ts — never trust
 * this check alone for authorization.
 */
export function can(role: OrgRoleOrNone, action: OrgAction): boolean {
  if (!role) return false
  return PERMISSIONS[action].includes(role)
}

/**
 * Convenience helpers for the common "is this role at least X" checks,
 * useful for UI (e.g. "show admin nav section").
 */
export function isOrgAdmin(role: OrgRoleOrNone): boolean {
  return role === "organization_admin"
}

export function isOfficerOrAbove(role: OrgRoleOrNone): boolean {
  return role === "organization_admin" || role === "officer"
}

export function isMember(role: OrgRoleOrNone): boolean {
  return role !== null
}
