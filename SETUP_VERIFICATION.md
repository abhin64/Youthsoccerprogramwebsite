# ✅ Setup Verification Checklist

## What You've Already Done ✅

1. ✅ Created Supabase project
2. ✅ Created `.env` file with credentials
3. ✅ Created `registrations` table in Supabase
4. ✅ Files created:
   - `/utils/supabase/info.tsx`
   - `/supabase/functions/server/kv_store.tsx`
   - `/supabase/functions/server/index.tsx`
   - `/supabase.env.tsx`
   - `/.env`

## Your Supabase Configuration

**Project ID:** `oimnlatvmrwihbrcxpwt`  
**URL:** `https://oimnlatvmrwihbrcxpwt.supabase.co`  
**Status:** ✅ Connected

---

## How to Test the Registration System

### Step 1: Start Your Development Server

```bash
npm run dev
```

### Step 2: Open Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Navigate to `/pricing` page

### Step 3: Check Supabase Connection Status

You should see in the console:
```
🔌 Supabase Status: ✅ Connected
📋 Supabase URL: https://oimnlatvmrwihbrcxpwt.supabase.co
```

If you see `❌ Not configured`, the `.env` file isn't loading properly. Try:
- Restart your dev server (`npm run dev`)
- Make sure `.env` is in the root directory

### Step 4: Test a Registration

1. Fill out the registration form with test data:
   - Child Name: Test Player
   - Age: 8
   - Parent Name: Test Parent
   - Email: test@example.com
   - Phone: (425) 555-0000
   - Emergency Contact: Emergency Contact
   - Emergency Phone: (425) 555-0001
   - ✅ Check both checkboxes

2. Click "Proceed to Secure Payment"

3. Watch the browser console for these messages:
   ```
   ✅ Registration saved successfully: [data object]
   ✅ Notification email sent successfully
   ```

### Step 5: Verify in Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project `oimnlatvmrwihbrcxpwt`
3. Click **Table Editor** in the left sidebar
4. Select the **registrations** table
5. You should see your test registration!

---

## What Happens When Someone Registers

### Current Flow:

1. **User fills out form** on `/pricing` page
2. **Click "Proceed to Secure Payment"** button
3. **Supabase Insert** ⬅️ Registration saved to database
4. **Email Notification** ⬅️ You receive an email (needs Resend setup)
5. **Redirect to Stripe** ⬅️ User goes to payment page

### Data Saved to Supabase:

```javascript
{
  player_name: "Test Player",
  age: 8,
  email: "test@example.com",
  phone: "(425) 555-0000",
  parent_name: "Test Parent",
  program: "6-Week Summer Camp",
  emergency_contact: "Emergency Contact",
  emergency_phone: "(425) 555-0001",
  waiver_completed: true,
  policy_agreed: true,
  payment_status: "pending",
  registration_date: "2026-02-12T..."
}
```

---

## Troubleshooting

### ❌ Error: "Failed to save registration"

**Check 1: Table exists?**
```sql
-- Run this in Supabase SQL Editor to verify table exists:
SELECT * FROM registrations LIMIT 1;
```

**Check 2: Column names match?**
```sql
-- Run this to see all columns:
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'registrations';
```

Expected columns:
- `id` (uuid)
- `player_name` (text)
- `age` (integer)
- `email` (text)
- `phone` (text)
- `parent_name` (text)
- `program` (text)
- `emergency_contact` (text)
- `emergency_phone` (text)
- `waiver_completed` (boolean)
- `policy_agreed` (boolean)
- `payment_status` (text)
- `registration_date` (timestamptz)
- `created_at` (timestamptz)

**Check 3: Row Level Security (RLS)?**

If RLS is enabled, you need to add a policy:

```sql
-- Allow anonymous inserts (for registration form)
CREATE POLICY "Allow public registration inserts"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow reading registrations (for admin)
CREATE POLICY "Allow authenticated reads"
ON registrations
FOR SELECT
TO authenticated
USING (true);
```

### ❌ Error: "Database not configured"

**Solution:** Restart your dev server
```bash
# Stop the server (Ctrl+C)
# Start again:
npm run dev
```

The `.env` file is only loaded when the dev server starts.

### ✅ Registration saves but no email?

That's expected! Email notifications require Resend setup:
1. See `/EMAIL_SETUP.md` for instructions
2. Sign up at https://resend.com (free)
3. Add `RESEND_API_KEY` and `ADMIN_EMAIL` to `.env`
4. Redeploy to Netlify with environment variables

---

## Next Steps

### For Email Notifications:
1. Read `/EMAIL_SETUP.md`
2. Sign up for Resend (free, 3000 emails/month)
3. Add environment variables to Netlify

### For Stripe Payments:
1. The current button uses a test Stripe link
2. Replace with your production Stripe Payment Link
3. Line 110 in `/src/app/pages/Pricing.tsx`:
   ```javascript
   window.location.href = "YOUR_PRODUCTION_STRIPE_LINK";
   ```

### For Viewing Registrations:
1. Go to Supabase Dashboard
2. Table Editor → registrations
3. Or build an admin dashboard (future enhancement)

---

## File Structure

```
/
├── .env                                    ← Your environment variables
├── .env.example                            ← Template for others
├── /src/app/
│   ├── /lib/
│   │   └── supabase.ts                    ← Supabase client
│   └── /pages/
│       └── Pricing.tsx                     ← Registration form
├── /utils/supabase/
│   └── info.tsx                           ← Supabase credentials (autogenerated)
├── /netlify/functions/
│   └── send-registration-email.js         ← Email notification function
├── /supabase/functions/server/
│   ├── index.tsx                          ← Hono server
│   └── kv_store.tsx                       ← KV store utilities
└── Documentation:
    ├── SUPABASE_SETUP.md                  ← Database setup
    ├── EMAIL_SETUP.md                     ← Email setup
    └── SETUP_VERIFICATION.md              ← This file!
```

---

## Quick Test Command

Open your browser console and run:
```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set');
```

---

**Everything should be working now!** 🎉

Test by filling out the registration form and checking your Supabase dashboard.
