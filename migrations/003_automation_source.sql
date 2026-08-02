-- Automation support for the `add_item` action.
--
-- `source_event_id` records which app event produced the row. The dispatcher's
-- dedupe guard matches on it (SELECT 1 FROM ... WHERE source_event_id = ?
-- LIMIT 1) so a redelivered event does not re-add an item.
--
-- Note the table's own UNIQUE (name_normalized) is a second, independent guard:
-- the action uses ON CONFLICT DO NOTHING so that asking for milk twice from two
-- different events leaves the one row already on the list rather than failing
-- the run.
--
-- Nullable on purpose: items a person adds have no source event, and the guard
-- only ever looks for a specific non-null id.
ALTER TABLE app_grocery__items ADD COLUMN source_event_id TEXT;

CREATE INDEX IF NOT EXISTS app_grocery__idx_items_source_event_id
  ON app_grocery__items(source_event_id);
