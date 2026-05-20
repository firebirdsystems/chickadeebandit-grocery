// Shared utilities (memberColor, initial, esc, isAdult) live in /hub-sdk.js.
export { AVATAR_COLORS, memberColor, initial, esc, isAdult, formatRelativeDate } from "./shared.js";
// This file exports grocery-specific logic only.

// ── Item helpers ──────────────────────────────────────────────────────────────

/** Normalize an item name for deduplication: lowercase, collapse whitespace, trim. */
export function normalizeItem(name) {
  return String(name).trim().toLowerCase().replace(/\s+/g, " ");
}

/** Returns true if a normalized version of `name` already exists in `items`. */
export function isDuplicate(items, name) {
  const key = normalizeItem(name);
  return items.some(i => i.name_normalized === key);
}

/** Sort items: unchecked alphabetically first, then checked alphabetically. */
export function sortItems(items) {
  return [...items].sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}

/** Returns true if the member is an adult or admin and can check items off. */
export function canCheck(member) {
  return !!member && (member.role === "adult" || member.role === "admin");
}
