# 🔑 Quick Visual Guide: Where to Add Your Keys

This is a super simple visual guide showing you **exactly** where to add your Stripe API keys.

---

## 🎯 Overview

You need to add **2 keys** in **1 place**:

```
Location: Netlify Dashboard → Site settings → Environment variables

Key #1: STRIPE_SECRET_KEY = sk_test_...
Key #2: STRIPE_WEBHOOK_SECRET = whsec_...
```

That's it!

---

## 📍 Step 1: Get Your Stripe Secret Key

### Where to Go:
```
https://dashboard.stripe.com
↓
Click "Developers" (left sidebar)
↓
Click "API keys"
↓
Find "Secret key" section
↓
Click "Reveal test key"
↓
Copy the entire key (starts with sk_test_)
```

### What You'll See:
```
Publishable key: pk_test_51ABC...    ← NOT this one
Secret key:      sk_test_51ABC...    ← THIS ONE! Copy this!
```

### Important:
- ✅ Use the one that starts with `sk_test_`
- ❌ Don't use the one that starts with `pk_test_`
- ✅ For testing: `sk_test_...`
- ✅ For live (later): `sk_live_...`

---

## 📍 Step 2: Add Secret Key to Netlify

### Where to Go:
```
https://app.netlify.com
↓
Click your site
↓
Click "Site settings" (top navigation)
↓
Click "Environment variables" (left sidebar)
↓
Click "Add a variable"
```

### What to Enter:
```
Key:   STRIPE_SECRET_KEY
Value: sk_test_51ABC123...    (paste your key here)

Then click "Create variable"
```

### Result:
You should now see:
```
STRIPE_SECRET_KEY = sk_test_... (hidden)
```

---

## 📍 Step 3: Create Stripe Webhook

### Where to Go:
```
https://dashboard.stripe.com
↓
Click "Developers" (left sidebar)
↓
Click "Webhooks"
↓
Click "Add endpoint"
```

### What to Enter:

**Endpoint URL:**
```
https://YOUR-SITE-NAME.netlify.app/.netlify/functions/stripe-webhook
```
*Replace YOUR-SITE-NAME with your actual Netlify site name*

**Example:**
```
https://aaa-sports-camp.netlify.app/.netlify/functions/stripe-webhook
```

**Events to select:**
```
Search for: checkout.session.completed
Click the checkbox next to it
Click "Add events"
```

**Then:**
```
Click "Add endpoint"
```

---

## 📍 Step 4: Get Webhook Secret

### What You'll See:
After creating the webhook, you'll see your webhook listed. Click on it.

### Where to Find the Secret:
```
Webhook details page
↓
Look for "Signing secret"
↓
Click "Reveal" (if hidden)
↓
Copy the entire secret (starts with whsec_)
```

### What It Looks Like:
```
Signing secret: whsec_ABC123XYZ...    ← Copy this!
```

---

## 📍 Step 5: Add Webhook Secret to Netlify

### Where to Go:
```
Back to Netlify
↓
Site settings → Environment variables
↓
Click "Add a variable"
```

### What to Enter:
```
Key:   STRIPE_WEBHOOK_SECRET
Value: whsec_ABC123...    (paste your webhook secret here)

Then click "Create variable"
```

### Final Result:
You should now see TWO environment variables:
```
STRIPE_SECRET_KEY = sk_test_... (hidden)
STRIPE_WEBHOOK_SECRET = whsec_... (hidden)
```

---

## 📍 Step 6: Redeploy Your Site

### Where to Go:
```
Netlify Dashboard
↓
Click "Deploys" (top navigation)
↓
Click "Trigger deploy"
↓
Click "Deploy site"
```

### Wait:
- Deployment usually takes 1-2 minutes
- Watch for "Published" status
- Your site is now live with payment processing!

---

## ✅ Quick Verification

### Test the Full Flow:

1. **Go to your pricing page:**
   ```
   https://your-site.netlify.app/pricing
   ```

2. **Fill out the form** with test data

3. **Click "Proceed to Secure Payment"**

4. **You should be redirected to Stripe Checkout**
   - If you get an error, check your environment variables

5. **Enter test card:**
   ```
   Card number: 4242 4242 4242 4242
   Expiry:      12/34 (any future date)
   CVC:         123 (any 3 digits)
   ZIP:         12345 (any 5 digits)
   ```

6. **Click "Pay"**

7. **You should be redirected to success page**
   - If not, check your webhook configuration

8. **Check Stripe Dashboard:**
   ```
   Dashboard → Payments
   You should see your test payment
   ```

9. **Check Webhook:**
   ```
   Dashboard → Developers → Webhooks → Click your webhook
   You should see successful deliveries
   ```

**If all of the above works: SUCCESS! 🎉**

---

## 🆘 Common Issues

### Issue: "Failed to create checkout session"

**Cause:** STRIPE_SECRET_KEY is not set or incorrect

**Fix:**
1. Go to Netlify → Site settings → Environment variables
2. Check that `STRIPE_SECRET_KEY` exists
3. Make sure it starts with `sk_test_` (test) or `sk_live_` (live)
4. If it's wrong, edit it and redeploy

---

### Issue: Payment succeeds but webhook fails

**Cause:** STRIPE_WEBHOOK_SECRET is not set or incorrect

**Fix:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your webhook
3. Copy the "Signing secret"
4. Go to Netlify → Environment variables
5. Make sure `STRIPE_WEBHOOK_SECRET` matches
6. Redeploy if you made changes

---

### Issue: Webhook URL is wrong

**Cause:** Typo in webhook endpoint URL

**Fix:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Check the URL is exactly:
   ```
   https://YOUR-ACTUAL-SITE.netlify.app/.netlify/functions/stripe-webhook
   ```
3. Make sure there are no extra spaces or characters
4. Make sure it ends with `/stripe-webhook` (not `/webhook`)

---

## 📝 Summary Checklist

Copy this checklist and check off as you go:

```
[ ] Signed up for Stripe account
[ ] Got STRIPE_SECRET_KEY from Stripe Dashboard → API keys
[ ] Added STRIPE_SECRET_KEY to Netlify environment variables
[ ] Created webhook in Stripe Dashboard → Webhooks
[ ] Got STRIPE_WEBHOOK_SECRET from webhook details
[ ] Added STRIPE_WEBHOOK_SECRET to Netlify environment variables
[ ] Redeployed site in Netlify
[ ] Tested payment with card 4242 4242 4242 4242
[ ] Verified success page loads
[ ] Checked webhook deliveries in Stripe Dashboard
```

**When all boxes are checked: You're live! 🚀**

---

## 🔐 Security Reminder

**NEVER commit these to Git:**
- Your `.env` file
- Any file containing `sk_test_` or `sk_live_`
- Any file containing `whsec_`

**ALWAYS:**
- Keep keys in Netlify environment variables only
- Use `.gitignore` to exclude `.env` files (already set up)
- Only share keys via secure methods (never Slack, email, etc.)

---

## 🎉 Done!

**You now know:**
- ✅ Where to get your Stripe keys
- ✅ Where to add them in Netlify
- ✅ How to create a webhook
- ✅ How to test everything
- ✅ How to troubleshoot issues

**Your site is ready to accept payments!**

---

**Need more details? Check out:**
- [STRIPE_KEYS_SETUP.md](./STRIPE_KEYS_SETUP.md) - More detailed walkthrough
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete guide with screenshots
