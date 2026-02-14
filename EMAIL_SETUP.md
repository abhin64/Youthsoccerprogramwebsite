# Email Notification Setup Guide

## Overview
When a parent submits a registration, the system automatically sends you an email with all the registration details. This guide explains how to set up the email notification system using Resend.

## Why Resend?
- ✅ Free tier: 3,000 emails/month, 100 emails/day
- ✅ Simple API and great deliverability
- ✅ No credit card required for free tier
- ✅ Easy setup with Netlify Functions

## Setup Instructions

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. After logging in, navigate to: **API Keys** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name like "AAA Sports Camp Production"
4. Select **"Full access"** (or "Sending access" if available)
5. Click **"Add"**
6. **Copy the API key** (it starts with `re_`)
7. ⚠️ **Important:** Save this key somewhere safe - you won't be able to see it again!

### Step 3: Verify Your Domain (Optional but Recommended)

For production use, you should verify your domain:

1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `aaasportscamp.com`)
4. Add the provided DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

**For testing:** You can skip this and use `onboarding@resend.dev` as the sender.

### Step 4: Configure Environment Variables

#### For Local Development:

Create a `.env` file in your project root:

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend Email
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=your-email@example.com
```

#### For Netlify Production:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add the following variables:
   - `RESEND_API_KEY` = `re_your_actual_api_key_here`
   - `ADMIN_EMAIL` = `your-email@example.com`

⚠️ **Important:** Environment variables in Netlify are only accessible to serverless functions, not to the client-side code. That's why `RESEND_API_KEY` doesn't need the `VITE_` prefix.

### Step 5: Update the Email Function (if using custom domain)

If you verified a custom domain, update `/netlify/functions/send-registration-email.js`:

```javascript
from: 'AAA Sports Camp <registrations@yourdomain.com>', // Change this
```

Change to:
```javascript
from: 'AAA Sports Camp <registrations@aaasportscamp.com>', // Your actual domain
```

If you don't have a verified domain, you can use:
```javascript
from: 'AAA Sports Camp <onboarding@resend.dev>', // For testing only
```

## Email Template

The email that gets sent includes:

✅ **Player Information**
- Player name
- Age
- Program registered for

✅ **Parent/Guardian Information**
- Parent name
- Email (clickable)
- Phone number (clickable)

✅ **Emergency Contact**
- Contact name
- Emergency phone number

✅ **Next Steps**
- Reminder to check Supabase for payment status
- Reminder to send confirmation to parent

## Testing

### Test the Email Function:

1. Fill out the registration form on `/pricing`
2. Click "Proceed to Secure Payment"
3. Check your email inbox (and spam folder!)
4. Verify all information is correct

### Check the Logs:

In Netlify:
1. Go to **Functions** in your site dashboard
2. Click on `send-registration-email`
3. View the logs to see if emails are being sent successfully

## Troubleshooting

### Email Not Received

**Check 1: Spam Folder**
- Look in your spam/junk folder
- Mark as "Not Spam" to improve future deliverability

**Check 2: Environment Variables**
```bash
# In Netlify, verify these are set:
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=your-actual-email@example.com
```

**Check 3: Function Logs**
- Check Netlify Function logs for errors
- Look for `✅ Notification email sent successfully` in browser console

**Check 4: Resend Dashboard**
- Go to Resend dashboard → **Logs**
- Check if the email was sent
- Look for any errors or bounces

### Common Errors

**Error: "Missing API key"**
- Make sure `RESEND_API_KEY` is set in Netlify environment variables
- Redeploy your site after adding environment variables

**Error: "Invalid domain"**
- Use `onboarding@resend.dev` for testing
- Or verify your domain in Resend dashboard

**Error: "Rate limit exceeded"**
- Free tier limit: 100 emails/day
- Upgrade to a paid plan if needed

**Email goes to spam**
- Verify your domain in Resend
- Add SPF and DKIM records
- Use a professional "from" address

## Email Customization

Want to customize the email template? Edit `/netlify/functions/send-registration-email.js`:

### Change Colors:
```javascript
// Find this in the HTML:
background: linear-gradient(135deg, #E53935 0%, #1E88E5 100%);
// Change the colors to match your brand
```

### Add More Information:
```javascript
// Add new data to the email body:
<div class="info-row">
  <div class="info-label">New Field:</div>
  <div class="info-value">${data.newField}</div>
</div>
```

### Change the Subject Line:
```javascript
subject: `🎉 New Registration: ${playerName}`, // Edit this line
```

## Multiple Recipients

Want to send emails to multiple people? Update the function:

```javascript
to: [
  'coach1@example.com',
  'coach2@example.com',
  'admin@aaasportscamp.com'
],
```

## Parent Confirmation Email (Future Enhancement)

Want to also send a confirmation to parents? Add a second email in the function:

```javascript
// After the admin email succeeds, send parent email:
await resend.emails.send({
  from: 'AAA Sports Camp <noreply@yourdomain.com>',
  to: [email],
  subject: 'Registration Confirmed - AAA Sports Camp',
  html: `
    <h1>Thank you for registering!</h1>
    <p>We've received ${playerName}'s registration for ${program}.</p>
    // Add more details...
  `,
});
```

## Cost & Limits

**Resend Free Tier:**
- 3,000 emails per month
- 100 emails per day
- No credit card required

**Paid Plans (if needed):**
- Pro: $20/month for 50,000 emails
- More details: https://resend.com/pricing

## Alternative Email Services

If you prefer a different service:

### SendGrid:
- Free tier: 100 emails/day
- [sendgrid.com](https://sendgrid.com)

### Mailgun:
- Free tier: 5,000 emails/month
- [mailgun.com](https://mailgun.com)

### AWS SES:
- Very cheap: $0.10 per 1,000 emails
- More complex setup
- [aws.amazon.com/ses](https://aws.amazon.com/ses)

To use a different service, replace the Resend code in `/netlify/functions/send-registration-email.js` with your preferred service's API.

## Security Notes

- ✅ API keys are stored securely in Netlify environment variables
- ✅ Keys are never exposed to the browser
- ✅ Function runs server-side only
- ⚠️ Never commit API keys to Git
- ⚠️ Use different keys for development and production

## Support

- **Resend Documentation:** https://resend.com/docs
- **Resend Support:** https://resend.com/support
- **Netlify Functions Docs:** https://docs.netlify.com/functions/overview

---

**Questions?** Check the Resend docs or Netlify function logs first!
