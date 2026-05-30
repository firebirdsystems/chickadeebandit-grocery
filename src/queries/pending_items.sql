SELECT
  id,
  name,
  added_by_name,
  created_at
FROM items
WHERE household_id = current_setting('app.household_id', true)::uuid
  AND checked = 0
ORDER BY created_at ASC
LIMIT 200
