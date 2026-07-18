import { describe, it, expect } from "vitest";
import {
  memberColor, initial, esc, AVATAR_COLORS,
  normalizeItem, isDuplicate, reviveTarget, sortItems,
} from "../src/logic.js";

// ── memberColor / initial ─────────────────────────────────────────────────────
describe("memberColor", () => {
  it("returns a color from AVATAR_COLORS", () => {
    expect(AVATAR_COLORS).toContain(memberColor("member-1"));
  });
  it("is stable for the same id", () => {
    expect(memberColor("abc")).toBe(memberColor("abc"));
  });
});

describe("initial", () => {
  it("uppercases the first letter",   () => expect(initial("alice")).toBe("A"));
  it("handles leading whitespace",    () => expect(initial("  bob")).toBe("B"));
  it("returns ? for empty string",    () => expect(initial("")).toBe("?"));
});

// ── esc ───────────────────────────────────────────────────────────────────────
describe("esc", () => {
  it("escapes &, <, >, \"", () => {
    expect(esc('A & B < C > D "E"')).toBe("A &amp; B &lt; C &gt; D &quot;E&quot;");
  });
  it("passes through plain text", () => expect(esc("Milk")).toBe("Milk"));
});

// ── normalizeItem ─────────────────────────────────────────────────────────────
describe("normalizeItem", () => {
  it("lowercases the name",                () => expect(normalizeItem("Milk")).toBe("milk"));
  it("trims leading and trailing spaces",  () => expect(normalizeItem("  eggs  ")).toBe("eggs"));
  it("collapses internal whitespace",      () => expect(normalizeItem("almond  milk")).toBe("almond milk"));
  it("handles mixed case with spaces",     () => expect(normalizeItem("  Almond Milk  ")).toBe("almond milk"));
  it("coerces non-strings",               () => expect(normalizeItem(42)).toBe("42"));
});

// ── isDuplicate ───────────────────────────────────────────────────────────────
describe("isDuplicate", () => {
  const items = [
    { name: "Milk",        name_normalized: "milk" },
    { name: "Almond Milk", name_normalized: "almond milk" },
    { name: "Eggs",        name_normalized: "eggs" },
  ];

  it("returns true for an exact normalized match", () => {
    expect(isDuplicate(items, "milk")).toBe(true);
  });
  it("returns true for a differently-cased name", () => {
    expect(isDuplicate(items, "MILK")).toBe(true);
    expect(isDuplicate(items, "Milk")).toBe(true);
  });
  it("returns true for name with extra spaces", () => {
    expect(isDuplicate(items, "  eggs  ")).toBe(true);
  });
  it("returns false for a new item", () => {
    expect(isDuplicate(items, "Butter")).toBe(false);
  });
  it("returns false for an empty list", () => {
    expect(isDuplicate([], "Milk")).toBe(false);
  });
  it("handles multi-word names", () => {
    expect(isDuplicate(items, "almond   milk")).toBe(true);
    expect(isDuplicate(items, "Oat Milk")).toBe(false);
  });
  it("does not treat a checked-off item as a blocking duplicate", () => {
    const withChecked = [{ name: "Milk", name_normalized: "milk", checked: true }];
    expect(isDuplicate(withChecked, "milk")).toBe(false);
  });
});

// ── reviveTarget ──────────────────────────────────────────────────────────────
describe("reviveTarget", () => {
  const items = [
    { id: "1", name: "Milk", name_normalized: "milk", checked: true },
    { id: "2", name: "Eggs", name_normalized: "eggs", checked: false },
  ];
  it("returns the checked item to revive", () => {
    expect(reviveTarget(items, "MILK")?.id).toBe("1");
  });
  it("returns undefined for an active item (that path is a plain duplicate)", () => {
    expect(reviveTarget(items, "eggs")).toBeUndefined();
  });
  it("returns undefined for a brand-new name", () => {
    expect(reviveTarget(items, "Butter")).toBeUndefined();
  });
});

// ── sortItems ─────────────────────────────────────────────────────────────────
describe("sortItems", () => {
  const items = [
    { name: "Milk",   checked: false },
    { name: "Apples", checked: false },
    { name: "Butter", checked: true  },
    { name: "Eggs",   checked: false },
    { name: "Cheese", checked: true  },
  ];

  it("puts unchecked items before checked items", () => {
    const sorted = sortItems(items);
    const firstCheckedIdx = sorted.findIndex(i => i.checked);
    const lastUncheckedIdx = sorted.map(i => i.checked).lastIndexOf(false);
    expect(lastUncheckedIdx).toBeLessThan(firstCheckedIdx);
  });

  it("sorts unchecked items alphabetically", () => {
    const sorted  = sortItems(items);
    const names   = sorted.filter(i => !i.checked).map(i => i.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("sorts checked items alphabetically", () => {
    const sorted = sortItems(items);
    const names  = sorted.filter(i => i.checked).map(i => i.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("does not mutate the input array", () => {
    const copy = [...items];
    sortItems(items);
    expect(items).toEqual(copy);
  });

  it("handles an empty list", () => {
    expect(sortItems([])).toEqual([]);
  });

  it("handles all items checked", () => {
    const all = items.map(i => ({ ...i, checked: true }));
    const sorted = sortItems(all);
    const names  = sorted.map(i => i.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });
});
