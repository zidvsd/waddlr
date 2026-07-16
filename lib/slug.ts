/**
 * lib/slug.ts
 *
 * Slug generation + server-side validation for organization slugs.
 * NEVER trust a client-supplied slug directly — always re-run it
 * through toSlug() + validateSlug() on the server before insert.
 */

const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "dashboard",
  "discover",
  "settings",
  "login",
  "logout",
  "signup",
  "sign-in",
  "sign-up",
  "org",
  "orgs",
  "organization",
  "organizations",
  "profile",
  "me",
  "help",
  "support",
  "about",
  "terms",
  "privacy",
  "new",
  "create",
  "edit",
  "delete",
  "null",
  "undefined",
])

const MIN_SLUG_LENGTH = 3
const MAX_SLUG_LENGTH = 50

/**
 * Converts arbitrary input into a URL-safe slug.
 * Lowercase, alphanumeric + hyphens only, no leading/trailing/double hyphens.
 */
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD") // strip accents (é -> e)
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // anything not alphanumeric -> hyphen
    .replace(/-+/g, "-") // collapse repeated hyphens
    .replace(/^-|-$/g, "") // trim leading/trailing hyphen
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-$/g, "") // in case slicing left a trailing hyphen
}

export type SlugValidationResult =
  { valid: true } | { valid: false; reason: string }

/**
 * Validates a slug that has already been through toSlug().
 * Call this on the server even if the client already validated —
 * client-side checks are UX only, not security.
 */
export function validateSlug(slug: string): SlugValidationResult {
  if (slug.length < MIN_SLUG_LENGTH) {
    return {
      valid: false,
      reason: `Slug must be at least ${MIN_SLUG_LENGTH} characters.`,
    }
  }
  if (slug.length > MAX_SLUG_LENGTH) {
    return {
      valid: false,
      reason: `Slug must be at most ${MAX_SLUG_LENGTH} characters.`,
    }
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return {
      valid: false,
      reason:
        "Slug can only contain lowercase letters, numbers, and single hyphens.",
    }
  }
  if (RESERVED_SLUGS.has(slug)) {
    return { valid: false, reason: "This slug is reserved and cannot be used." }
  }
  return { valid: true }
}

/**
 * Convenience: slugify + validate in one call.
 * Throws if invalid, so callers can just call this and proceed.
 */
export function toValidatedSlug(input: string): string {
  const slug = toSlug(input)
  const result = validateSlug(slug)
  if (!result.valid) {
    throw new Error(result.reason)
  }
  return slug
}
