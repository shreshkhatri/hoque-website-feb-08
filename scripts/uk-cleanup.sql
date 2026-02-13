-- Step 1: Delete ALL courses linked to UK universities (country_id=1)
-- We'll re-insert fresh courses for the 28 partner universities
DELETE FROM courses WHERE university_id IN (
  SELECT id FROM universities WHERE country_id = 1
);

-- Step 2: Delete non-partner UK universities
-- Keep: 75 (Queen's University Belfast), 76 (Northumbria University), 
--        77 (University of Greenwich), 78 (Middlesex University), 79 (London South Bank University)
-- Delete all others with country_id=1
DELETE FROM universities 
WHERE country_id = 1 
AND id NOT IN (75, 76, 77, 78, 79);

-- Verify remaining UK universities
SELECT id, name, city FROM universities WHERE country_id = 1 ORDER BY id;
