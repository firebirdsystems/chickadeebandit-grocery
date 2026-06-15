UPDATE app_grocery__items
SET
  checked         = 1,
  checked_by_name = 'AI'
WHERE id      = $1
  AND checked = 0
