-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  event_type VARCHAR NOT NULL,
  country_id BIGINT NOT NULL,
  location VARCHAR NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  start_time TIME,
  is_free BOOLEAN DEFAULT true,
  contact_email VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_country_id ON events(country_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
