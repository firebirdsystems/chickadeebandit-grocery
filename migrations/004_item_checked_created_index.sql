-- all_items orders by (checked, created_at) under LIMIT 500. `checked` is an
-- INTEGER flag and integers are never encrypted; created_at is plaintext by the
-- _at suffix rule. The existing created_at-only index cannot serve the pair.
CREATE INDEX IF NOT EXISTS app_grocery__items_checked_created_idx
  ON app_grocery__items(checked, created_at);
