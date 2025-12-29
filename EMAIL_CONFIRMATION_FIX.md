# Quick Fix: Disable Email Confirmation

## Problem
Getting "Email not confirmed" error when trying to log in after registration.

## Solution: Disable Email Confirmation in Supabase

### Steps:

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Select your project

2. **Navigate to Authentication Settings**
   - Click **Authentication** in the left sidebar
   - Click **Providers**
   - Click on **Email** provider

3. **Disable Email Confirmation**
   - Scroll down to find **"Confirm email"**
   - **Toggle it OFF** (disable it)
   - Click **Save**

4. **Alternative: Go to Settings**
   - Click **Authentication** → **Settings**
   - Under "Email Auth" section
   - Find **"Enable email confirmations"**
   - **Toggle it OFF**
   - Click **Save**

### After Disabling:

**Option A: Register a New User**
- Go to `http://localhost:3000/register`
- Create a new account
- You'll be logged in immediately without email confirmation

**Option B: Confirm Existing User Manually**
1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Find your user in the list
3. Click on the user
4. Look for "Email Confirmed" status
5. If not confirmed, you can manually confirm by clicking the options menu

**Option C: Delete and Re-register**
1. Go to **Authentication** → **Users**
2. Delete your existing user
3. Go back to the app and register again
4. This time it will work without confirmation

## For Production

> [!WARNING]
> Email confirmation is a security feature. Only disable it for development/testing.

For production, you should:
- Keep email confirmation enabled
- Configure email templates in Supabase
- Set up a custom SMTP provider (optional)
- Test the email confirmation flow

## Verify It's Working

After disabling email confirmation:

1. Register a new account at `/register`
2. You should be automatically logged in
3. Check the header - you should see your avatar
4. Click avatar → "个人中心" to view your profile

✅ No email confirmation needed!
