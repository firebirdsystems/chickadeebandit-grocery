-- UNIQUE on name_normalized is scoped to household so two households
-- can each add 'milk' without conflicting.
CREATE TABLE IF NOT EXISTS items (
  household_id    UUID NOT NULL DEFAULT current_setting('app.household_id', true)::uuid,
  id              TEXT NOT NULL,
  name            TEXT NOT NULL,
  name_normalized TEXT NOT NULL,
  added_by_id     TEXT NOT NULL,
  added_by_name   TEXT NOT NULL,
  checked         INTEGER NOT NULL DEFAULT 0,
  checked_by_name TEXT,
  created_at      TEXT NOT NULL,
  PRIMARY KEY (household_id, id),
  UNIQUE (household_id, name_normalized)
);
