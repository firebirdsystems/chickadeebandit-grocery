// Shared utilities (memberColor, initial, esc, isAdult) live in /hub-sdk.js.
export { AVATAR_COLORS, memberColor, initial, esc, isAdult, formatRelativeDate } from "./shared.js";
// This file exports grocery-specific logic only.

// ── Item helpers ──────────────────────────────────────────────────────────────

/** Normalize an item name for deduplication: lowercase, collapse whitespace, trim. */
export function normalizeItem(name) {
  return String(name).trim().toLowerCase().replace(/\s+/g, " ");
}

/** Returns true if `name` already exists as an *active* (unchecked) item. A
 *  checked-off match does not block the add: re-adding it revives that row
 *  (see reviveTarget) instead, matching the kiosk quick-add lane. */
export function isDuplicate(items, name) {
  const key = normalizeItem(name);
  return items.some(i => i.name_normalized === key && !i.checked);
}

/** The checked-off item `name` should revive, if any (there is at most one,
 *  since name_normalized is UNIQUE). Returns undefined when the name is new or
 *  already active. */
export function reviveTarget(items, name) {
  const key = normalizeItem(name);
  return items.find(i => i.name_normalized === key && i.checked);
}

/** Sort items: unchecked alphabetically first, then checked alphabetically. */
export function sortItems(items) {
  return [...items].sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1;
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}

/**
 * Fields the in-app search matches against (see hub-sdk `searchMatch`).
 * Who added or checked an item counts as well as its name, so "what
 * did Sam put on here" is answerable.
 */
export function searchableFields(item) {
  return [item.name, item.added_by_name, item.checked_by_name];
}
