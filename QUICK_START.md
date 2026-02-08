# ⚡ Hoque Consultancy - Quick Start (5 Minutes)

## 🎯 Your Website is Ready!

Everything is built and configured. You just need to connect your database!

## 3-Step Setup

### Step 1️⃣: Get Your Supabase Credentials (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project (name: "uni-admission")
4. Wait for it to initialize (about 1 minute)
5. Click on "Settings" → "API"
6. Copy these two values:
   - `Project URL` (looks like: `https://xxxxx.supabase.co`)
   - `anon public` key (long random string)

### Step 2️⃣: Add to v0 Environment Variables (2 min)

In the v0 sidebar:
1. Click **"Vars"** icon
2. Add new variable:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste your Project URL)
3. Click "Add"
4. Add another variable:
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your anon public key)
5. Click "Add"

✅ Done!

### Step 3️⃣: Test It (1 min)

1. Click "Preview" to see the website
2. Scroll through the pages
3. Click **"Universities"** - should show 10 universities
4. Click **"Courses"** - should show 16 courses
5. Search for **"Oxford"** in the search bar
6. See results appear instantly

🎉 **Your website is live!**

## 📋 What's Included

- ✅ 10 UK Universities (Oxford, Cambridge, Imperial, UCL, LSE, Edinburgh, Manchester, Bristol, Warwick, Durham)
- ✅ 16 Sample Courses (Computer Science, MBA, Engineering, Law, Medicine, etc.)
- ✅ Real-time Search Across All Data
- ✅ Beautiful Navigation with Dropdowns
- ✅ Mobile-Responsive Design
- ✅ Professional Color Scheme (Purple & Gold)
- ✅ Automatic Database Setup
- ✅ Full-Featured Landing Page

## 🔍 Test These Features

### Search Feature
- Search: "Computer Science" → 2 results
- Search: "London" → Multiple universities + courses
- Search: "MSc" → All master's programs
- Search: "Oxford" → University + 2 courses

### Navigation
- Hover over **"Universities"** in header → See top 5
- Hover over **"Courses"** in header → See top 5
- Click university card → See full details + courses
- Click course card → See full course information

### Pages
1. **Home** (/) - Landing page
2. **Universities** (/universities) - All universities
3. **Courses** (/courses) - All courses
4. **About** (/about) - Company info
5. **University Detail** (/university/1) - Details + courses
6. **Course Detail** (/course/1) - Course information

## 🎨 Quick Customizations

### Change Company Name
1. Edit: `/components/header.tsx`
2. Find: `<span>Pinnacle</span>`
3. Replace: `<span>Your Company Name</span>`

### Change Colors
1. Edit: `/app/globals.css`
2. Find: `--primary: oklch(0.35 0.15 280);`
3. Change the numbers (color picker: [oklch.com](https://oklch.com))

### Update About Section
1. Edit: `/app/about/page.tsx`
2. Find: "Founded in 2015"
3. Update with your company info

## 📊 Database Content

### 10 Universities:
Oxford, Cambridge, Imperial College London, UCL, LSE, Edinburgh, Manchester, Bristol, Warwick, Durham

### 16 Courses:
- Computer Science MSc (Oxford)
- Physics PhD (Oxford)
- Business MBA (Cambridge)
- Environmental Science MSc (Cambridge)
- Engineering (Imperial)
- Economics PhD (LSE)
- Law LLM (Edinburgh)
- Medicine MBBS (UCL)
- AI MSc (Manchester)
- Psychology PhD (Bristol)
- Finance MSc (LSE)
- Data Science MSc (Warwick)
- Engineering Science (Durham)
- Biochemistry MSc (Imperial)
- International Relations MA (UCL)
- Mechanical Engineering (Manchester)

## 🚀 Deploy (Optional)

### To Vercel
1. Click "Publish" button in v0
2. Choose "Deploy with Vercel"
3. Follow prompts
4. Your site goes live instantly!

### Environment Variables on Vercel
1. After deployment
2. Go to Vercel dashboard
3. Project Settings → Environment Variables
4. Add same 2 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Redeploy"

✅ Your site is now live at a real URL!

## 🐛 Troubleshooting

**Q: "No results" in search?**
A: Check env vars in v0 Vars panel. Try refreshing the preview.

**Q: Dropdown doesn't show universities?**
A: Clear browser cache (Cmd+Shift+R) and refresh.

**Q: Database connection error?**
A: Verify Supabase credentials are exactly right in Vars.

**Q: Styles look weird?**
A: Check if Tailwind is loading (should be automatic).

## 📚 Documentation

If you need more details:
- **README.md** - Full project overview
- **SETUP_GUIDE.md** - Detailed setup instructions  
- **DATABASE_SCHEMA.md** - Database structure
- **IMPLEMENTATION_SUMMARY.md** - What's built

## ✅ Launch Checklist

- [ ] Supabase account created
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] Variables added to v0
- [ ] Preview shows data
- [ ] Search works
- [ ] All pages load
- [ ] Mobile layout responsive
- [ ] Customizations done
- [ ] Ready for deployment

## 🎉 Next Steps

1. **Right Now**: Add Supabase credentials (5 min)
2. **Today**: Test all features and customize
3. **This Week**: Deploy to Vercel
4. **Future**: Add more universities/courses, user auth, favorites

## 💡 Pro Tips

- Search works best with: "Oxford", "London", "Engineering", "MSc"
- Mobile menu works automatically on small screens
- All data is in Supabase - easily add more!
- Colors are customizable in globals.css
- No code changes needed to add universities - just edit database

## 🎯 Your Success Criteria

When you see:
✅ Home page with hero section
✅ Universities grid loads
✅ Courses grid loads
✅ Search returns results
✅ Detail pages work
✅ Mobile looks great
✅ Navigation dropdowns appear

**You're done! 🚀**

---

## 📞 Need Help?

1. Check **Troubleshooting** section above
2. Review **DATABASE_SCHEMA.md** for database questions
3. Check browser DevTools → Console for errors
4. Verify Supabase project is active

---

## 🌟 You're All Set!

Your Uni Admission website is built, styled, and ready to go.

**Just add your Supabase credentials and you're live! 🎓**

Questions? Check the documentation files included in this project.

---

**Time to shine! Let's help those international students find their perfect UK university! ✨**
