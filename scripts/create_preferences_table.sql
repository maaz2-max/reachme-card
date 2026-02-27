-- Create user_preferences table for storing visibility preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT UNIQUE NOT NULL,
  show_details BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow public access (since we use device keys, not user auth)
CREATE POLICY "Allow public access to user_preferences" ON user_preferences
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index on user_key for faster lookups
CREATE INDEX IF NOT EXISTS user_preferences_user_key_idx ON user_preferences(user_key);
