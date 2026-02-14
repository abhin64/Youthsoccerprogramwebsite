# Supabase Database Setup for AAA Sports Camp

## Overview
This document explains how to set up your Supabase database to work with the AAA Sports Camp registration system.

## Prerequisites
1. Create a free Supabase account at https://supabase.com
2. Create a new project in your Supabase dashboard

## Database Schema

### Table: registrations

Create the `registrations` table with the following columns:

```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  program TEXT NOT NULL,
  emergency_contact TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  waiver_completed BOOLEAN DEFAULT false,
  policy_agreed BOOLEAN DEFAULT false,
  payment_status TEXT DEFAULT 'pending',
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX idx_registrations_registration_date ON registrations(registration_date);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from anyone (for new registrations)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a policy for admins to view all registrations
-- Note: You'll need to set up authentication and admin roles for this
CREATE POLICY "Allow authenticated users to view registrations" ON registrations
  FOR SELECT
  TO authenticated
  USING (true);
```

## Configuration Steps

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to: Settings → API
3. Copy your:
   - Project URL (looks like: `https://xxxxx.supabase.co`)     https://jhqmaahcnvxkpfvywtqb.supabase.co
   - Anon/Public Key (a long JWT token)                        sb_publishable_IsY_fVIXGef8zqFhPE_BGw_mtEh0nkj

### 2. Set Up Environment Variables

Create a `.env` file in your project root (copy from `.env.example`):

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** Never commit the `.env` file to version control!

### 3. Deploy to Production

When deploying to Netlify or another hosting service:

1. Add the environment variables in your hosting dashboard
2. Make sure to prefix them with `VITE_` so Vite can access them

## Data Flow

1. **User fills out registration form** → Form data is stored in React state
2. **User clicks "Proceed to Secure Payment"** → Data is saved to Supabase with `payment_status: 'pending'`
3. **User completes Stripe checkout** → Stripe webhook updates `payment_status: 'completed'`
4. **Admin views registrations** → Query Supabase dashboard or build admin panel

## Next Steps

### After Setup:
1. Test the registration flow with a test submission
2. Verify data appears in your Supabase table
3. Set up Stripe webhooks to update payment_status
4. Create email notifications (optional)
5. Build an admin dashboard to view registrations (optional)

## Security Notes

- ✅ Row Level Security (RLS) is enabled
- ✅ Public can only INSERT (submit registrations)
- ✅ Only authenticated users can view registrations
- ✅ Supabase anon key is safe to expose (it's public)
- ⚠️ Set up authentication for admin access
- ⚠️ Never expose service_role key in client-side code

## Testing

To test your integration:

1. Fill out the registration form on `/pricing`
2. Click "Proceed to Secure Payment"
3. Check your Supabase dashboard → Table Editor → registrations
4. Verify the new row appears with correct data

## Troubleshooting

### Error: "Failed to save registration"
- Check that your environment variables are set correctly
- Verify the table name is exactly "registrations"
- Check that RLS policies allow inserts

### Error: "relation 'registrations' does not exist"
- The table hasn't been created yet
- Run the SQL schema above in your Supabase SQL Editor

### Data not appearing in Supabase
- Check browser console for errors
- Verify Supabase project URL and anon key are correct
- Ensure the table has the correct columns
