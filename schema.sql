-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → your project → SQL Editor)

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GAME SAVES TABLE
CREATE TABLE IF NOT EXISTS game_saves (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    current_level INT DEFAULT 1,
    highest_reached INT DEFAULT 1,
    score INT DEFAULT 0,
    streak INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    total_correct INT DEFAULT 0,
    total_wrong INT DEFAULT 0,
    total_time_played INT DEFAULT 0,
    trophy_unlocked BOOLEAN DEFAULT FALSE,
    infinite_level INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_key)
);

-- Disable RLS for simplicity (anon key has full access)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policies: allow all operations via anon key
CREATE POLICY "Allow all for anon" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON game_saves FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON achievements FOR ALL USING (true) WITH CHECK (true);
