# Hoque Consultancy - Supabase Integration Guide

## Overview
Your Hoque Consultancy website is fully integrated with Supabase. All database operations, seeding, and API integrations are configured and ready to use. You just need to add your Supabase credentials!

## What's Integrated
- ✅ Supabase client (`/lib/supabase.ts`)
- ✅ Database seeding with 10 universities, 16 courses, 7 countries
- ✅ Real-time search API (`/app/api/search/route.ts`)
- ✅ Universities API (`/app/api/universities/route.ts`)
- ✅ Courses API (`/app/api/courses/route.ts`)
- ✅ Countries API (`/app/api/countries/route.ts`)
- ✅ Auto-initialization on app load

## Step-by-Step Setup

### 1. Create a Supabase Project (2-3 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with email or GitHub
4. Click "New Project"
5. Enter project name: `uni-admission` (or your preferred name)
6. Choose a region (doesn't matter which)
7. Click "Create new project"
8. Wait for initialization (about 1-2 minutes)

### 2. Get Your Credentials (1 minute)

1. Once your project is created, go to **Settings** → **API**
2. Copy these two values:
   - `Project URL` (looks like: `https://xxxxx.supabase.co`)
   - `anon public` key (long random string starting with `eyJ...`)

### 3. Add Environment Variables to v0 (2 minutes)

1. Go to **Vars** in the v0 left sidebar
2. Add two environment variables:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
     **Value**: Your Project URL from step 2
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **Value**: Your anon public key from step 2
3. Click **Save**

### 4. Verify Integration (1 minute)

1. Click **Preview** to load the website
2. The app will automatically:
   - Create 3 tables: `universities`, `courses`, `countries`
   - Seed 10 universities
   - Seed 16 courses
   - Seed 7 countries with details

3. Test the search functionality (top header)
4. Browse universities and courses

## Database Schema

### Universities Table
\`\`\`sql
- id (int, primary key)
- name (text)
- country (text)
- country_id (int, foreign key)
- city (text)
- rank_uk (int)
- rank_world (int)
- description (text)
- logo_url (text)
- website_url (text)
- founded_year (int)
- student_population (int)
- created_at (timestamp)
\`\`\`

### Courses Table
\`\`\`sql
- id (int, primary key)
- name (text)
- code (text)
- university_id (int, foreign key)
- country_id (int, foreign key)
- level (text)
- duration_years (int)
- description (text)
- tuition_fees_international (int)
- intake_months (text)
- entry_requirements (text)
- created_at (timestamp)
\`\`\`

### Countries Table
\`\`\`sql
- id (int, primary key)
- name (text)
- code (text, ISO 3166-1 alpha-2)
- flag_emoji (text)
- description (text)
- about (text)
- study_life (text)
- opportunities (text)
- student_permit_requirements (text)
- visa_processing_time (text)
- cost_of_living_monthly (int)
- work_study_hours (text)
- post_study_work_visa (text)
- created_at (timestamp)
\`\`\`

## Features Using Supabase

### 1. Search Functionality
- Real-time search across universities, courses, and countries
- Case-insensitive matching
- API endpoint: `/api/search?q=term&type=all`

### 2. Universities Page
- Displays all 10 universities
- Filters by country
- API endpoint: `/api/universities`

### 3. Courses Page
- Lists all 16 courses
- Filters by university or country
- API endpoint: `/api/courses`

### 4. Countries Page
- Shows all 7 study destinations
- Detailed country information including visa requirements

### 5. Auto-Seeding
- On first app load, database is automatically populated
- Tables are created if they don't exist
- Data is only seeded once (checks if universities table is empty)

## Troubleshooting

### Tables not created or data not seeding?
1. Check environment variables in v0 Vars section
2. Verify URLs don't have trailing slashes
3. Wait 5-10 seconds for app to initialize
4. Refresh the page
5. Check browser console for errors (F12)

### Search not working?
1. Verify Supabase credentials are correct
2. Check that universities and courses tables have data
3. Try searching in browser console:
   \`\`\`javascript
   fetch('/api/search?q=oxford&type=all').then(r => r.json()).then(console.log)
   \`\`\`

### Environment variables not working?
1. Make sure variable names are EXACTLY:
   - `NEXT_PUBLIC_SUPABASE_URL` (all caps, no typos)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (all caps, no typos)
2. Restart preview after adding variables
3. Clear browser cache (Ctrl+Shift+Delete)

## Production Deployment

When deploying to production (e.g., Vercel):

1. Go to your deployment settings
2. Add the same environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy
4. The database will auto-initialize on first load

## API Endpoints

### Search
\`\`\`
GET /api/search?q=query&type=all
Response: { universities: [...], courses: [...] }
\`\`\`

### Universities
\`\`\`
GET /api/universities?limit=5
Response: [{ id, name, city, country, ... }, ...]
\`\`\`

### Courses
\`\`\`
GET /api/courses?university_id=1
Response: [{ id, name, code, level, ... }, ...]
\`\`\`

### Countries
\`\`\`
GET /api/countries
Response: [{ id, name, flag_emoji, about, ... }, ...]
\`\`\`

## Security Notes

- The `NEXT_PUBLIC_*` prefix means these are public environment variables
- They're safe to expose (Supabase is designed for this)
- Row-level security (RLS) can be added for sensitive data
- Current setup allows public read access to all tables

## Next Steps

1. ✅ Create Supabase project
2. ✅ Get credentials
3. ✅ Add environment variables
4. ✅ Preview and test
5. (Optional) Customize database with your own universities/courses
6. (Optional) Deploy to production

---

## Support

For Supabase issues, visit: [supabase.com/docs](https://supabase.com/docs)

Your app is ready to launch! 🚀
