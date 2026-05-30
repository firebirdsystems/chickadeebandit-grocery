SELECT
  id,
  name,
  added_by_name,
  checked,
  checked_by_name,
  created_at
FROM items
WHERE household_id = current_setting('app.household_id', true)::uuid
ORDER BY checked ASC, created_at ASC
LIMIT 500
