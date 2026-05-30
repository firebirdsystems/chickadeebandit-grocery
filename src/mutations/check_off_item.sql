UPDATE items
SET
  checked         = 1,
  checked_by_name = 'AI'
WHERE id           = $1
  AND household_id = current_setting('app.household_id', true)::uuid
  AND checked      = 0
