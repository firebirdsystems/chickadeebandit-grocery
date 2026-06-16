INSERT INTO app_grocery__items (
  id,
  name,
  name_normalized,
  added_by_id,
  added_by_name,
  checked,
  created_at
) VALUES (
  gen_random_uuid(),
  $1,
  lower(trim($1)),
  'ai',
  'AI',
  0,
  datetime('now')
)
ON CONFLICT (name_normalized) DO NOTHING
