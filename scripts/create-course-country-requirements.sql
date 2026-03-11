-- Create course_country_requirements table
-- Stores country-specific overrides for course entry requirements.
-- If no row exists for a given country, the public page falls back to the course's global defaults.

CREATE TABLE IF NOT EXISTS course_country_requirements (
  id                        BIGSERIAL PRIMARY KEY,
  course_id                 BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  country_id                BIGINT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  -- Each field is nullable: only fill what differs from the global course default
  academic_requirements     TEXT,
  english_language_requirements TEXT,
  other_requirements        TEXT,
  document_requirements     TEXT,
  additional_notes          TEXT,
  is_active                 BOOLEAN NOT NULL DEFAULT TRUE,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- One override row per course+country combination
  UNIQUE(course_id, country_id)
);

CREATE INDEX IF NOT EXISTS idx_ccr_course_id   ON course_country_requirements(course_id);
CREATE INDEX IF NOT EXISTS idx_ccr_country_id  ON course_country_requirements(country_id);
