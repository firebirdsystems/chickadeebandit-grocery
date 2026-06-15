SELECT
  id,
  name,
  added_by_name,
  created_at
FROM app_grocery__items
WHERE checked = 0
ORDER BY created_at ASC
LIMIT 200
