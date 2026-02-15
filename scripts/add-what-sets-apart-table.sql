-- Create country_what_sets_apart table
CREATE TABLE IF NOT EXISTS country_what_sets_apart (
  id SERIAL PRIMARY KEY,
  country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'award',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed UK (country_id = 1) with the 4 currently hardcoded cards
INSERT INTO country_what_sets_apart (country_id, title, description, icon, display_order)
VALUES
  (1, 'World-Class Education', 'Top-ranked universities with globally recognized degrees and cutting-edge research facilities', 'award', 0),
  (1, 'Post-Study Work', 'Stay and work in the UK for up to 2 years after completing your degree with the Graduate Route visa', 'briefcase', 1),
  (1, 'Multicultural Experience', 'A diverse and welcoming community with students from over 150 countries worldwide', 'globe', 2),
  (1, 'Career Growth', 'Strong industry connections, internship opportunities, and excellent graduate employment rates', 'trending-up', 3)
ON CONFLICT DO NOTHING;
