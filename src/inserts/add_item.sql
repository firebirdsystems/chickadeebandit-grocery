INSERT INTO items (
  id,
  household_id,
  name,
  name_normalized,
  added_by_id,
  added_by_name,
  checked,
  created_at
) VALUES (
  gen_random_uuid()::text,
  current_setting('app.household_id', true)::uuid,
  $1,
  lower(trim($1)),
  'ai',
  'AI',
  0,
  NOW()::text
)
ON CONFLICT (household_id, name_normalized) DO NOTHING
