# 🔑 Quick Reference: Stripe Keys Setup

This is a quick reference guide for setting up your Stripe API keys and environment variables.

---

## 📝 What You Need

You need **2 keys from Stripe** and **1 optional site URL**:

| Variable Name | What It Is | Where to Get It | Example |
|--------------|------------|-----------------|---------|
| `STRIPE_SECRET_KEY` | Your Stripe Secret API Key | Stripe Dashboard → Developers → API Keys | `sk_test_51Abc...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook Signing Secret | Stripe Dashboard → Developers → Webhooks | `whsec_ABC123...` |
| `SITE_URL` *(optional)* | Your deployed website URL | Your Netlify dashboard | `https://aaasportscamp.netlify.app` |

---

## 🚀 Step-by-Step Setup

### Step 1: Get Your Stripe Secret Key

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top-right)
3. Click **Developers** in the left sidebar
4. Click **API keys**
5. Find "Secret key" (NOT "Publishable key")
6. Click **Reveal test key**
7. Copy the entire key (starts with `sk_test_`)

**✅ You now have your STRIPE_SECRET_KEY**

---

### Step 2: Add Secret Key to Netlify

1. Go to your Netlify site dashboard
2. Click **Site settings** (in top navigation)
3. Click **Environment variables** (in left sidebar)
4. Click **Add a variable**
5. Enter:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: Paste your Stripe secret key (sk_test_...)
6. Click **Create variable**

**✅ Secret key is now configured!**

---

### Step 3: Create Stripe Webhook

1. Go back to Stripe Dashboard
2. Click **Developers** → **Webhooks**
3. Click **Add endpoint**
4. In "Endpoint URL", enter:
   ```
   https://YOUR-SITE-NAME.netlify.app/.netlify/functions/stripe-webhook
   ```
   Replace `YOUR-SITE-NAME` with your actual Netlify site name

5. Click **Select events**
6. Search for and select these events:
   - ☑️ `checkout.session.completed`
   - ☑️ `payment_intent.succeeded`
7. Click **Add events**
8. Click **Add endpoint**

**✅ Webhook endpoint created!**

---

### Step 4: Get Webhook Signing Secret

1. You should now see your webhook listed
2. Click on it to expand the details
3. Look for **Signing secret**
4. Click **Reveal** (or it may already be visible)
5. Copy the entire secret (starts with `whsec_`)

**✅ You now have your STRIPE_WEBHOOK_SECRET**

---

### Step 5: Add Webhook Secret to Netlify

1. Go back to Netlify → **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Enter:
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: Paste your webhook signing secret (whsec_...)
4. Click **Create variable**

**✅ Webhook secret is now configured!**

---

### Step 6: Deploy Your Site

1. In Netlify, go to the **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the deployment to complete (usually 1-2 minutes)

**✅ Your site is now ready to accept payments!**

---

## ✅ Verification Checklist

After completing the setup, verify:

- [ ] **STRIPE_SECRET_KEY** is set in Netlify (starts with `sk_test_`)
- [ ] **STRIPE_WEBHOOK_SECRET** is set in Netlify (starts with `whsec_`)
- [ ] Site has been redeployed after adding environment variables
- [ ] Webhook endpoint URL matches your Netlify site URL
- [ ] Webhook is listening to `checkout.session.completed` event

---

## 🧪 Test Your Setup

### Quick Test Payment

1. Go to your live site: `https://your-site.netlify.app/pricing`
2. Fill out the registration form
3. Check both required checkboxes
4. Click **Proceed to Secure Payment**
5. On Stripe Checkout, enter:
   - **Card number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., `12/34`)
   - **CVC**: Any 3 digits (e.g., `123`)
   - **ZIP**: Any 5 digits (e.g., `12345`)
6. Click **Pay**
7. You should be redirected to the success page

### Verify in Stripe Dashboard

1. Go to Stripe Dashboard → **Payments**
2. You should see your test payment
3. Go to **Developers** → **Webhooks**
4. Click on your webhook
5. You should see recent successful webhook deliveries

**If all of the above works, you're all set! 🎉**

---

## 🔴 Going Live (When Ready)

When you're ready to accept real payments:

### Switch to Live Mode

1. **In Stripe Dashboard**:
   - Toggle from "Test mode" to "Live mode" (top-right)
   - Complete any required business verification
   - Get your **live** secret key (Developers → API keys)
     - Will start with `sk_live_` instead of `sk_test_`

2. **Update Netlify Environment Variables**:
   - Go to Netlify → Site settings → Environment variables
   - Edit `STRIPE_SECRET_KEY`
   - Replace with your **live** secret key (`sk_live_...`)

3. **Create Live Webhook**:
   - In Stripe (make sure you're in **Live mode**)
   - Go to Developers → Webhooks
   - Add endpoint with the same URL
   - Select the same events
   - Get the **live** webhook signing secret

4. **Update Webhook Secret**:
   - In Netlify → Environment variables
   - Edit `STRIPE_WEBHOOK_SECRET`
   - Replace with your **live** webhook secret

5. **Redeploy**:
   - Trigger a new deployment in Netlify
   - Test with a real card (you can refund immediately)

---

## 🚨 Common Issues

### "Failed to create checkout session" error

**Cause**: STRIPE_SECRET_KEY is not set or incorrect

**Fix**: 
1. Check Netlify → Site settings → Environment variables
2. Make sure `STRIPE_SECRET_KEY` exists and starts with `sk_test_`
3. Redeploy the site

---

### Payment succeeds but webhook fails

**Cause**: STRIPE_WEBHOOK_SECRET is not set or incorrect

**Fix**:
1. Check Netlify environment variables for `STRIPE_WEBHOOK_SECRET`
2. Go to Stripe → Developers → Webhooks
3. Click on your webhook endpoint
4. Verify the signing secret matches
5. Make sure webhook URL is correct
6. Redeploy the site

---

### Success page shows "Payment Verification Failed"

**Cause**: The verify-payment function can't validate the session

**Fix**:
1. Check that payment actually succeeded in Stripe Dashboard
2. Verify the URL has `?session_id=` parameter
3. Check Netlify function logs for errors
4. Make sure `STRIPE_SECRET_KEY` is set correctly

---

## 🔒 Security Notes

**⚠️ NEVER COMMIT THESE TO GIT:**
- Your `.env` file (should be in `.gitignore`)
- Any file containing `sk_test_` or `sk_live_`
- Any file containing `whsec_`

**✅ ALWAYS:**
- Keep keys in Netlify environment variables only
- Use test keys for testing
- Only switch to live keys when ready for production
- Regularly rotate your API keys

---

## 📞 Need Help?

**Stripe Support**: 
- Chat in Stripe Dashboard (bottom-left icon)
- Docs: [stripe.com/docs](https://stripe.com/docs)

**Netlify Support**:
- Docs: [docs.netlify.com](https://docs.netlify.com)
- Forums: [answers.netlify.com](https://answers.netlify.com)

---

## 📋 Environment Variables Summary

Copy these into Netlify → Site settings → Environment variables:

```
STRIPE_SECRET_KEY = sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET = whsec_YOUR_SECRET_HERE
SITE_URL = https://your-site.netlify.app
```

**That's it! You're done! 🎉**
