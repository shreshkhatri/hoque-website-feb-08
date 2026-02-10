# Hoque - Setup Guide

## Quick Start

### Step 1: Get Supabase Credentials

1. Visit [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings** → **API** 
4. Copy:
   - **Project URL** (starts with `https://`)
   - **anon public** key (long random string)

### Step 2: Add Environment Variables

In the v0 sidebar, go to **Vars** and add:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
\`\`\`

### Step 3: Test the Connection

The app will automatically:
- Create the database tables
- Seed 10 universities and 16 courses
- Enable search functionality

Visit the preview and click on "Universities" or "Courses" to see if data loads.

## Features Implemented

### 🏠 Landing Page
- **Hero Section**: Eye-catching banner with CTAs
- **Top Universities Grid**: 6 featured partner universities
- **Featured Courses**: 6 highlighted courses
- **About Company Section**: Company values and statistics
- **Responsive Design**: Works on all devices

### 🔍 Search Functionality
- **Real-time Search**: Type in header search box
- **Dual Results**: Searches both universities and courses
- **Smart Matching**: Searches across name, city, code, description
- **Result Dropdowns**: Organized results with click-through links

### 📊 Navigation
- **Universities Dropdown**: Hover to see top 5 universities
- **Courses Dropdown**: Hover to see top 5 courses
- **Full Listings**: Links to view all universities/courses

### 📄 Pages
- **Home**: Landing page with all sections
- **Universities**: Full list of all partner universities
- **Courses**: Complete course catalog
- **About**: Company information and mission

## Database Schema

### Universities Table
\`\`\`
- id (unique identifier)
- name, city, country
- rank_uk, rank_world
- description
- website_url, logo_url
- founded_year
- student_population
\`\`\`

### Courses Table
\`\`\`
- id (unique identifier)
- name, code
- university_id (links to universities)
- level (Undergraduate, Master, PhD)
- duration_years
- description
- tuition_fees_international
- intake_months
- entry_requirements
\`\`\`

## Search Examples

Try these searches in the header search box:

- **"Computer Science"** → All CS courses
- **"Oxford"** → University of Oxford + related courses
- **"London"** → All London universities and courses
- **"MSc"** → All Master's programs
- **"Engineering"** → All engineering courses

## Customization

### Change Consultancy Name
1. Open `/components/header.tsx`
2. Replace "Pinnacle" with your company name
3. Update logo (small "P" in top-left)

### Update Dummy Data
1. Edit `/lib/supabase.ts`
2. Modify the universities/courses arrays
3. Restart the application

### Modify Colors
1. Edit `/app/globals.css`
2. Update color tokens in `:root` section:
   \`\`\`css
   --primary: oklch(0.35 0.15 280); /* Purple */
   --accent: oklch(0.6 0.18 50);    /* Gold */
   \`\`\`

## Deployment

### Deploy to Vercel
1. Click "Publish" button in v0
2. Connect your GitHub repository
3. Vercel will automatically deploy
4. Add environment variables in Vercel dashboard

### Environment Variables on Vercel
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy the project

## Troubleshooting

### Search Not Working
- Check environment variables are set correctly
- Open browser DevTools → Network tab
- Check `/api/search` response
- Look for error messages in Console tab

### Dropdowns Not Showing Data
- Verify Supabase credentials
- Check if tables were created (go to Supabase dashboard)
- Refresh the page
- Check browser console for errors

### Styles Not Appearing Correctly
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check that globals.css is imported in layout.tsx
- Verify Tailwind classes are used correctly

## File Structure

\`\`\`
/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── api/
│   │   ├── search/         # Search API route
│   │   ├── universities/   # Universities API
│   │   └── courses/        # Courses API
│   ├── universities/       # Universities listing page
│   ├── courses/            # Courses listing page
│   ├── about/              # About page
│   └── globals.css         # Global styles with design tokens
├── components/
│   ├── header.tsx          # Navigation header with dropdowns
│   ├── hero.tsx            # Hero section
│   ├── top-universities.tsx # Universities grid
│   ├── top-courses.tsx      # Courses grid
│   ├── about-company.tsx   # About section
│   └── footer.tsx          # Footer
├── lib/
│   └── supabase.ts         # Supabase client & seeding
└── scripts/
    └── setup-database.sql  # Database schema (optional)
\`\`\`

## Next Steps

### To Add More Features:

1. **User Authentication**
   - Add Supabase Auth
   - Create login/signup pages

2. **Favorites System**
   - Add favorites table
   - Save user preferences

3. **Contact Form**
   - Add contact page
   - Send emails via email service

4. **Analytics**
   - Track user searches
   - Monitor popular courses

5. **Admin Panel**
   - Manage universities and courses
   - Upload new course information

## Support

### Documentation Files
- `DATABASE_SCHEMA.md` - Complete database documentation
- `SETUP_GUIDE.md` - This file

### Useful Links
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Key Credentials to Remember

Save these safely:
\`\`\`
Supabase Project URL: [your-url]
Supabase Anon Key: [your-key]
GitHub Repository: [optional]
Vercel Project: [optional]
\`\`\`

---

**You're all set! 🎉** 

Your Pinnacle Education website is ready. Start by:
1. Adding your Supabase credentials
2. Viewing the preview
3. Testing the search functionality
4. Customizing with your company information
