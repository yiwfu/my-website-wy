# Supabase Setup Guide

This project uses Supabase as the database backend. Follow these steps to set up your Supabase instance.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Cultural Tourism Portal
   - **Database Password**: (choose a strong password)
   - **Region**: (select closest to your users)
4. Click "Create new project" and wait for setup to complete

## 2. Run Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Open the file `supabase/schema.sql` from this project
3. Copy the entire contents
4. Paste into the SQL Editor
5. Click **Run** to execute the schema

This will create:
- 4 tables: `attractions`, `food`, `real_estate`, `jobs`
- Row Level Security (RLS) policies for public read access
- Sample data for testing

## 3. Get Your API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Find these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 4. Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## 5. Restart Development Server

```bash
npm run dev
```

Your app should now be connected to Supabase!

## Verify Setup

Visit these pages to see data from Supabase:
- `/attractions` - Should show 6 attractions
- `/food` - Should show 6 food listings
- `/real-estate` - Should show 6 properties
- `/recruitment` - Should show 6 job listings

## Database Structure

### Tables

**attractions**
- Historic sites, nature spots, cultural venues
- Fields: title, description, category, location, rating, ai_score

**food**
- Restaurants, cafes, street food
- Fields: title, description, category, location, rating, ai_score, price_range

**real_estate**
- Homestays, rentals, properties
- Fields: title, description, category, location, price, bedrooms, ai_score

**jobs**
- Tourism industry jobs
- Fields: title, description, category, company, location, salary_range, ai_score

## Adding More Data

You can add data through:
1. **SQL Editor** - Write INSERT statements
2. **Table Editor** - Visual interface in Supabase dashboard
3. **API** - Use the Supabase client in your code

## Troubleshooting

**No data showing?**
- Check `.env.local` has correct credentials
- Verify schema was run successfully in SQL Editor
- Check browser console for errors

**Permission errors?**
- Ensure RLS policies were created (they're in `schema.sql`)
- Verify you're using the `anon` key, not the `service_role` key

**Need help?**
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
