INSERT INTO users (name, email)
VALUES ('Default User', 'default@example.com')
ON CONFLICT (email) DO NOTHING;

ALTER TABLE notes
ADD COLUMN IF NOT EXISTS user_id INT;

UPDATE notes
SET user_id = (
  SELECT id FROM users WHERE email = 'default@example.com'
)
WHERE user_id IS NULL;

ALTER TABLE notes
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE notes
ADD CONSTRAINT notes_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;