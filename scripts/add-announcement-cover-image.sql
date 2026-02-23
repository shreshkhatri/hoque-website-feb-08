-- Add cover_image_url column to announcements table
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
