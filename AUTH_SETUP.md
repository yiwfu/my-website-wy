# User Authentication Setup Guide

## Issue: "Invalid login credentials"

This error occurs because the authentication system hasn't been fully set up in your Supabase database yet.

## Solution: Apply Database Schema

### Step 1: Update Supabase Database Schema

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Navigate to your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Updated Schema**
   - Open the file `supabase/schema.sql` in your project
   - Copy **lines 49-78** (the users table, trigger, and RLS policies)
   - Paste into the SQL Editor
   - Click **Run** or press `Cmd/Ctrl + Enter`

The SQL to run:

```sql
-- Users/Profiles Table (用户)
-- This table extends Supabase Auth users with profile information
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
```

### Step 2: Enable Email Authentication (if not already enabled)

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. You can disable email confirmation for testing:
   - Go to **Authentication** → **Settings**
   - Under "Email Auth", toggle off "Enable email confirmations" (optional, for easier testing)

### Step 3: Register a New Account

1. **Navigate to Registration Page**
   - Go to `http://localhost:3000/register`

2. **Fill in the Form**
   - Full Name: Your name
   - Email: A valid email address
   - Password: At least 6 characters
   - Confirm Password: Same as password

3. **Click "注册" (Register)**
   - If email confirmation is enabled, check your email
   - If disabled, you'll be logged in automatically

### Step 4: Test Login

1. **Navigate to Login Page**
   - Go to `http://localhost:3000/login`

2. **Enter Your Credentials**
   - Use the email and password you just registered with

3. **Click "登录" (Login)**
   - You should be logged in successfully

## Verify Setup

After completing the steps above:

✅ **Check User Menu** - You should see your avatar in the header
✅ **Access Profile** - Click your avatar → "个人中心" to view/edit your profile
✅ **Test Logout** - Click your avatar → "退出登录" to sign out

## Troubleshooting

### Still getting "Invalid login credentials"?

**Check 1: Schema Applied?**
- Go to Supabase Dashboard → Table Editor
- Verify the `users` table exists

**Check 2: User Registered?**
- Go to Supabase Dashboard → Authentication → Users
- Check if your user appears in the list

**Check 3: Email Confirmation?**
- If email confirmation is enabled, check your email inbox
- Click the confirmation link before trying to log in

**Check 4: Correct Credentials?**
- Make sure you're using the exact email and password you registered with
- Passwords are case-sensitive

### Other Issues

**"User already registered" error when signing up?**
- The email is already in use
- Try logging in instead, or use a different email

**Email not sending?**
- Check Supabase Dashboard → Authentication → Email Templates
- For development, consider disabling email confirmation

**Database trigger not working?**
- Check Supabase Dashboard → Database → Functions
- Verify `handle_new_user` function exists
- Check Database → Triggers for `on_auth_user_created`

## Quick Test Account Creation (Alternative Method)

You can also create a test user directly in Supabase:

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter email and password
4. Click **Create user**
5. The trigger will automatically create a profile in the `users` table

## Need More Help?

- Check the browser console (F12) for detailed error messages
- Review Supabase logs in Dashboard → Logs
- Ensure `.env.local` has correct Supabase credentials
