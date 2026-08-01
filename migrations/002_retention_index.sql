-- Serves the hub retention sweep (manifest.retention.items), which seeks rows
-- older than the household's window and then applies the `checked` exemption.
-- The sweep's leading key is the timestamp, so this index leads with it.
CREATE INDEX IF NOT EXISTS app_grocery__items_created_idx
  ON app_grocery__items (created_at);
