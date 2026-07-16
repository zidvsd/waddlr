/**
 * lib/permissions.ts
 *
 * Single source of truth for "can this user do X in this org".
 * Used in: server actions, page-level guards, and to conditionally
 * render UI (buttons, nav items).
 *
 * Rule of thumb: if you're about to write `if (role === "organization_admin")`
 * anywhere else in the codebase, it belongs in this file instead.
 */
import { db } from "./db"
import { and, eq } from "drizzle-orm"
import { organizationMember } from "./db/schema"
import type { organizationRoleEnum } from "@/lib/db/schema/organization"

export type OrgRole = (typeof organizationRoleEnum.enumValues)[number]
// "organization_admin" | "officer" | "member"

// A user with no membership row (not in the org at all) is represented as null.
export type OrgRoleOrNone = OrgRole | null

/**
 * Every permission-gated action in the app. Add to this as you build
 * new modules (events, attendance, announcements, etc).
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
 */
export function can(role: OrgRoleOrNone, action: OrgAction): boolean {
  if (!role) return false
  return PERMISSIONS[action].includes(role)
}

/**
 * Throws-on-failure variant for server actions, so you can do:
 *   assertCan(member.role, "event:create")
 * at the top of a mutation and trust everything below it.
 */
export class PermissionError extends Error {
  constructor(action: OrgAction) {
    super(`Not permitted: ${action}`)
    this.name = "PermissionError"
  }
}

export function assertCan(role: OrgRoleOrNone, action: OrgAction): void {
  if (!can(role, action)) {
    throw new PermissionError(action)
  }
}

/**
 * Convenience helpers for the common "is this role at least X" checks,
 * useful for UI (e.g. "show admin nav section").
 */

export async function requireOrgPermission(
  userId: string,
  organizationId: string,
  action: OrgAction
) {
  const member = await db.query.organizationMember.findFirst({
    where: and(
      eq(organizationMember.userId, userId),
      eq(organizationMember.organizationId, organizationId)
    ),
  })

  assertCan(member?.role ?? null, action)

  return member! // safe: assertCan already threw if member is null
}

export function isOrgAdmin(role: OrgRoleOrNone): boolean {
  return role === "organization_admin"
}

export function isOfficerOrAbove(role: OrgRoleOrNone): boolean {
  return role === "organization_admin" || role === "officer"
}

export function isMember(role: OrgRoleOrNone): boolean {
  return role !== null
}
