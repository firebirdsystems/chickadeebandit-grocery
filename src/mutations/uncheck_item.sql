UPDATE items
SET
  checked         = 0,
  checked_by_name = NULL
WHERE id           = $1
  AND household_id = current_setting('app.household_id', true)::uuid
  AND checked      = 1
