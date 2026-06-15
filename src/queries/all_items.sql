SELECT
  id,
  name,
  added_by_name,
  checked,
  checked_by_name,
  created_at
FROM app_grocery__items
ORDER BY checked ASC, created_at ASC
LIMIT 500
