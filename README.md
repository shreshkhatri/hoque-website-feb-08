# 🎓 Hoque - UK University Consultancy Website

A modern, fully-responsive educational consultancy website built with Next.js 16, Supabase, and Tailwind CSS. The platform helps international students discover and apply to top UK universities.

## ✨ Features

### 🏠 Landing Page
- **Hero Section**: Eye-catching banner with compelling value proposition
- **Top Universities Grid**: 6 featured UK universities with rankings and key stats
- **Featured Courses**: 6 highlighted programmes with course details
- **About Company**: Mission, values, and company statistics
- **Responsive Design**: Mobile-first, fully responsive layout

### 🔍 Smart Search
- **Real-time Search**: Type to search across 10 universities and 16+ courses
- **Dual Results**: Combined search results for both universities and courses
- **Smart Matching**: Searches across name, code, city, description, and level
- **Live Dropdowns**: Organized results with instant navigation

### 📊 Navigation
- **Universities Dropdown**: Hover to view top 5 universities
- **Courses Dropdown**: Hover to view top 5 courses
- **Full Listings**: Complete catalog pages for browsing
- **Detail Pages**: Individual pages for universities and courses

### 📄 Pages
- **Home** (`/`) - Landing page with all sections
- **Universities** (`/universities`) - Full list of partner universities
- **Courses** (`/courses`) - Complete course catalog
- **About** (`/about`) - Company information and mission
- **University Detail** (`/university/[id]`) - Detailed university info + courses
- **Course Detail** (`/course/[id]`) - Detailed course information

## 🚀 Quick Start

### Prerequisites
- Supabase account (free tier available)
- v0.app account (for development)

### Step 1: Get Supabase Credentials

1. Visit [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy `Project URL` and `anon public` key

### Step 2: Add Environment Variables

In v0 sidebar, go to **Vars** and add:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

### Step 3: Test It Out

1. View the preview
2. The app automatically creates database tables
3. Data is seeded with 10 universities and 16 courses
4. Click "Universities" or "Courses" to see the data
5. Try the search functionality in the header

## 📊 Database Schema

### Universities Table
\`\`\`sql
id              - Unique identifier
name            - University name
country         - Country (UK)
city            - City location
rank_uk         - UK ranking
rank_world      - World ranking
description     - About the university
website_url     - Official website
founded_year    - Year established
student_population - Total students
\`\`\`

### Courses Table
\`\`\`sql
id                      - Unique identifier
name                    - Course name
code                    - Course code (e.g., COMP-001)
university_id           - Reference to university
level                   - Undergraduate, Master, PhD
duration_years          - Course length
description             - Course details
tuition_fees_international - Annual fees
intake_months           - Enrollment periods
entry_requirements      - Prerequisites
\`\`\`

## 🔎 Search Functionality

### API Endpoints

#### Search
\`\`\`
GET /api/search?q=query&type=all
\`\`\`
**Parameters:**
- `q` (required): Search query (min 2 chars)
- `type` (optional): Filter - "all", "university", or "course"

**Example responses:**
\`\`\`
/api/search?q=Computer%20Science
/api/search?q=London&type=university
/api/search?q=MSc&type=course
\`\`\`

#### Universities
\`\`\`
GET /api/universities?limit=10
\`\`\`

#### Courses
\`\`\`
GET /api/courses?limit=10&university_id=1
\`\`\`

### Search Examples

Try in the header search box:
- `"Computer Science"` - All CS courses
- `"Oxford"` - University of Oxford + courses
- `"London"` - All London institutions
- `"Engineering"` - All engineering programmes
- `"PhD"` - All doctoral programmes

## 🎨 Design System

### Color Palette
- **Primary**: Deep Purple (`oklch(0.35 0.15 280)`)
- **Accent**: Gold (`oklch(0.6 0.18 50)`)
- **Neutrals**: Grays, Off-whites, Black variants

### Typography
- **Heading Font**: Geist
- **Body Font**: Geist
- **Font Scale**: 12px → 60px responsive sizes

### Layout
- **Mobile First**: Optimized for small screens
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Grid System**: Tailwind CSS with custom gap values
- **Spacing**: Consistent 4px base unit

## 📁 Project Structure

\`\`\`
hoque-consultancy/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + design tokens
│   ├── api/
│   │   ├── search/route.ts    # Search API
│   │   ├── universities/route.ts
│   │   └── courses/route.ts
│   ├── universities/page.tsx  # Universities listing
│   ├── courses/page.tsx       # Courses listing
│   ├── about/page.tsx         # About page
│   ├── university/[id]/page.tsx
│   └── course/[id]/page.tsx
├── components/
│   ├── header.tsx             # Navigation + search
│   ├── hero.tsx               # Hero section
│   ├── top-universities.tsx   # Universities grid
│   ├── top-courses.tsx        # Courses grid
│   ├── about-company.tsx      # About section
│   └── footer.tsx             # Footer
├── lib/
│   └── supabase.ts            # Supabase client + seeding
├── scripts/
│   └── setup-database.sql     # Database schema
├── public/
│   └── [assets]
├── DATABASE_SCHEMA.md         # Full database docs
├── SETUP_GUIDE.md             # Detailed setup
└── README.md                  # This file
\`\`\`

## 🛠️ Customization

### Change Company Name
Edit `/components/header.tsx`:
\`\`\`tsx
<span className="hidden sm:inline font-bold text-lg text-foreground">
  Your Company Name
</span>
\`\`\`

### Update Colors
Edit `/app/globals.css`:
\`\`\`css
:root {
  --primary: oklch(0.35 0.15 280);    /* Change purple */
  --accent: oklch(0.6 0.18 50);       /* Change gold */
}
\`\`\`

### Add New Universities
1. Go to Supabase dashboard
2. Navigate to `universities` table
3. Click "Insert new row"
4. Fill in the fields
5. Refresh the website

### Modify Dummy Data
Edit `/lib/supabase.ts` → `seedDatabase()` function:
\`\`\`typescript
const universities = [
  {
    name: 'Your University',
    city: 'City',
    // ... more fields
  }
]
\`\`\`

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub** (if using GitHub)
2. **Connect to Vercel**:
   - Go to vercel.com
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables**:
   - Go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**:
   - Vercel automatically deploys on push
   - Visit your deployment URL

### Alternative: Direct v0 Publishing

1. Click "Publish" button in v0
2. Select "Deploy to Vercel"
3. Follow the prompts
4. Your site is live!

## 📚 Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + custom
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Hosting**: Vercel (optional)

## 🔐 Security Features

- **Environment Variables**: Sensitive data in env vars
- **Server-Side APIs**: Database queries on server
- **Type Safety**: TypeScript prevents bugs
- **Input Validation**: Query string sanitization

## ⚡ Performance

- **Next.js Optimization**: Automatic code splitting
- **Image Lazy Loading**: Images load on demand
- **Database Indexes**: Fast queries on indexed columns
- **Responsive Images**: Mobile-optimized
- **CSS-in-JS**: Minimal CSS bundles with Tailwind

## 🧪 Testing

### Manual Testing Checklist

- [ ] Search functionality works (try "Oxford")
- [ ] University dropdown shows 5 items on hover
- [ ] Course dropdown shows 5 items on hover
- [ ] Universities page loads all data
- [ ] Courses page loads all data
- [ ] University detail page shows courses
- [ ] Course detail page shows information
- [ ] Mobile layout is responsive
- [ ] All links work correctly
- [ ] Colors match design system

## 🐛 Troubleshooting

### Search Returns No Results
1. Check environment variables in v0 Vars
2. Verify Supabase project is active
3. Check browser console for errors
4. Try searching for "University" or "Oxford"

### Dropdowns Not Showing Data
1. Refresh the page (Cmd+Shift+R)
2. Check `/api/universities` endpoint
3. Verify database tables exist in Supabase
4. Check for JavaScript errors in console

### Database Connection Fails
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Check Supabase project is not paused
4. Ensure tables were created (check Supabase dashboard)

### Styles Not Loading
1. Clear browser cache (Cmd+Shift+R)
2. Check globals.css is imported in layout.tsx
3. Verify Tailwind CSS is properly configured
4. Check for CSS conflicts in DevTools

## 📖 Documentation

- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Complete database documentation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[Supabase Docs](https://supabase.com/docs)** - Database documentation
- **[Next.js Docs](https://nextjs.org/docs)** - Framework documentation
- **[Tailwind Docs](https://tailwindcss.com/docs)** - CSS framework

## 🚦 Next Steps

### Phase 1: Essentials
- [ ] Add your Supabase credentials
- [ ] Test all pages and search
- [ ] Customize with your company info
- [ ] Deploy to production

### Phase 2: Enhancements
- [ ] Add user authentication
- [ ] Create favorites system
- [ ] Add contact form
- [ ] Implement email notifications

### Phase 3: Advanced Features
- [ ] Add application tracking
- [ ] Create admin dashboard
- [ ] User reviews and ratings
- [ ] Advanced filtering

## 📧 Support & Contact

For questions or issues:
1. Check the troubleshooting section
2. Review documentation files
3. Check browser console for errors
4. Verify Supabase connection

## 📝 License

This project is created with v0.app and is available for educational and commercial use.

## 🎉 Ready to Launch?

Your Hoque website is fully configured and ready to go!

**Next Steps:**
1. ✅ Add Supabase credentials
2. ✅ Preview the website
3. ✅ Test search functionality
4. ✅ Deploy to production
5. ✅ Start helping students!

---

**Built with ❤️ by v0.app**

Hoque - Your Gateway to World-Class UK Universities
