# Hoque Consultancy - Database Schema & Implementation Guide

## Database Schema

### Tables Overview

#### 1. Universities Table
Stores comprehensive information about all partner universities in the UK.

\`\`\`sql
CREATE TABLE universities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  rank_uk INT,
  rank_world INT,
  description TEXT,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  founded_year INT,
  student_population INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**Fields:**
- `id`: Unique identifier
- `name`: University name
- `country`: Country (e.g., "United Kingdom")
- `city`: City location
- `rank_uk`: UK ranking (1-10)
- `rank_world`: World ranking
- `description`: University description and key information
- `logo_url`: URL to university logo
- `website_url`: Official website URL
- `founded_year`: Year of establishment
- `student_population`: Total number of students

#### 2. Courses Table
Stores detailed information about courses offered by partner universities.

\`\`\`sql
CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  level VARCHAR(50) NOT NULL,
  duration_years INT,
  description TEXT,
  tuition_fees_international DECIMAL(10, 2),
  intake_months VARCHAR(100),
  entry_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**Fields:**
- `id`: Unique identifier
- `name`: Course name
- `code`: Course code (e.g., "COMP-001")
- `university_id`: Foreign key reference to universities table
- `level`: Qualification level ("Undergraduate", "Master", "PhD")
- `duration_years`: Course duration in years
- `description`: Detailed course description
- `tuition_fees_international`: Annual fees for international students (in GBP)
- `intake_months`: Available intake periods (e.g., "September, January")
- `entry_requirements`: Prerequisites and entry requirements

### Indexes

Performance-optimized indexes are created for:
- `universities.name` - Quick university name lookup
- `universities.city` - Filter by city
- `courses.name` - Quick course name lookup
- `courses.university_id` - Fetch courses for a university
- `courses.level` - Filter by study level

## Search Functionality

### Search API Implementation

**Endpoint:** `GET /api/search?q=query&type=all`

**Parameters:**
- `q` (required): Search query (minimum 2 characters)
- `type` (optional): Filter type - "all", "university", or "course"

**Response:**
\`\`\`json
{
  "universities": [
    {
      "id": 1,
      "name": "University of Oxford",
      "city": "Oxford",
      "country": "United Kingdom",
      ...
    }
  ],
  "courses": [
    {
      "id": 1,
      "name": "Computer Science MSc",
      "code": "COMP-001",
      "universities": {
        "id": 1,
        "name": "University of Oxford",
        "city": "Oxford"
      },
      ...
    }
  ]
}
\`\`\`

### Search Strategy

The search functionality uses **case-insensitive pattern matching** (ILIKE) across multiple fields:

**Universities Search:** Searches across `name`, `city`, `country`, and `description`
**Courses Search:** Searches across `name`, `code`, `description`, and `level`

**Example searches:**
- "Computer Science" → Returns all CS courses
- "London" → Returns all universities/courses in London
- "MSc" → Returns all Master's courses
- "Oxford" → Returns University of Oxford and its courses

## Database Initialization

The application uses a client-side database initialization system with automatic seeding:

### Initialization Flow

1. **Application Start**: When the app loads, `initializeDatabase()` is called
2. **Table Check**: System checks if tables exist and have data
3. **Auto-Seeding**: If tables are empty, dummy data is automatically seeded
4. **Data Population**: 10 universities and 16 courses are inserted

### Seeding Data

The seed includes:
- **10 Top UK Universities**: Oxford, Cambridge, Imperial, UCL, LSE, Edinburgh, Manchester, Bristol, Warwick, Durham
- **16 Sample Courses**: Mix of Undergraduate, Master's, and PhD programmes across various disciplines

## API Routes

### Universities API
**Route:** `GET /api/universities`
**Parameters:** `limit` (default: 10)
**Returns:** Array of universities sorted by UK ranking

### Courses API
**Route:** `GET /api/courses`
**Parameters:** 
- `limit` (default: 10)
- `university_id` (optional): Filter by specific university
**Returns:** Array of courses with related university information

### Search API
**Route:** `GET /api/search`
**Parameters:** 
- `q` (required): Search query
- `type` (optional): Filter type
**Returns:** Combined results from universities and courses

## Supabase Setup

### Required Environment Variables

Add these to your `.env.local`:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

### Getting Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to Settings → API
4. Copy `Project URL` and `anon public` key
5. Add these to your environment variables

## Key Features

### ✅ Search Capabilities
- Real-time search across universities and courses
- Case-insensitive pattern matching
- Results limited to 10 items per category
- Minimum 2-character query requirement

### ✅ Navigation Dropdowns
- **Universities Dropdown**: Shows top 5 universities
- **Courses Dropdown**: Shows top 5 courses
- Hover/Click triggered on desktop, Click on mobile

### ✅ Responsive Design
- Mobile-first approach
- Tailwind CSS v4 with custom design tokens
- Smooth transitions and animations
- Accessible UI components

### ✅ Modern Architecture
- Next.js 16 with App Router
- Client-side and server-side rendering
- TypeScript for type safety
- SWR ready for advanced state management

## Data Population Strategy

1. **Initial State**: Tables created on first script run
2. **Auto-Seeding**: Dummy data inserted if tables are empty
3. **Manual Updates**: Use Supabase dashboard or API to add more data
4. **Bulk Operations**: Use database scripts for large data imports

## Future Enhancements

### Recommended Additions
1. **Advanced Filters**: Filter by ranking, tuition fees, location
2. **Favorites System**: Allow users to save favorite universities/courses
3. **User Accounts**: Student profiles and application tracking
4. **Email Notifications**: Search alerts and course updates
5. **Full-Text Search**: PostgreSQL TSVECTOR for better search
6. **Ratings & Reviews**: User-generated content system
7. **Application Tracking**: Timeline management for admissions

## Performance Optimization

### Current Optimizations
- Indexed columns for fast queries
- Limit results to prevent large dataset transfers
- Client-side caching with React state
- Image lazy loading in components

### Future Optimizations
- Implement database connection pooling
- Add caching layer (Redis)
- Paginate large result sets
- Database query optimization with EXPLAIN ANALYZE

## Troubleshooting

### Common Issues

**1. "No results found" in search**
- Check Supabase credentials in environment variables
- Verify database tables exist: `SELECT * FROM universities;`
- Check if seeding completed successfully

**2. Navigation dropdowns not showing**
- Clear browser cache
- Check if APIs are returning data: `curl http://localhost:3000/api/universities`
- Verify network requests in browser DevTools

**3. Database connection errors**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active (not paused)
- Ensure IP is whitelisted in Supabase settings

## Support

For issues or questions:
1. Check browser console for error messages
2. Use Supabase dashboard to verify data
3. Review API responses in Network tab
4. Check component props in React DevTools
