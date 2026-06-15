UPDATE app_grocery__items
SET
  checked         = 0,
  checked_by_name = NULL
WHERE id      = $1
  AND checked = 1
