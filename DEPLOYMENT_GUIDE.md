# AAA Sports Camp - Deployment & Stripe Setup Guide

This guide will walk you through deploying your AAA Sports Camp website and setting up Stripe payment processing.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- [ ] A Stripe account (sign up at [stripe.com](https://stripe.com))
- [ ] A Netlify account (sign up at [netlify.com](https://netlify.com))
- [ ] Access to your domain (if using a custom domain)

---

## 🚀 Step 1: Deploy to Netlify

### Option A: Deploy from GitHub

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository
   - Build settings should auto-detect:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Functions directory: `netlify/functions`
   - Click "Deploy site"

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Deploy**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

---

## 🔑 Step 2: Set Up Stripe

### Get Your Stripe API Keys

1. **Sign up for Stripe**
   - Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
   - Complete the registration process

2. **Get Your API Keys**
   - Navigate to **Developers → API keys**
   - You'll see two keys:
     - **Publishable key** (starts with `pk_test_`)
     - **Secret key** (starts with `sk_test_`)
   - **⚠️ IMPORTANT**: Keep your Secret key private!

3. **Copy Your Secret Key**
   - Click "Reveal test key" next to the Secret key
   - Copy the entire key (starts with `sk_test_`)
   - You'll need this for the next step

---

## 🔧 Step 3: Configure Environment Variables in Netlify

1. **Go to Netlify Dashboard**
   - Open your site in Netlify
   - Go to **Site settings → Environment variables**

2. **Add STRIPE_SECRET_KEY**
   - Click "Add a variable"
   - Key: `STRIPE_SECRET_KEY`
   - Value: Paste your Stripe secret key (sk_test_...)
   - Click "Create variable"

3. **Add SITE_URL** (optional but recommended)
   - Click "Add a variable"
   - Key: `SITE_URL`
   - Value: Your Netlify site URL (e.g., `https://your-site.netlify.app`)
   - Click "Create variable"

4. **Trigger a Redeploy**
   - Go to **Deploys** tab
   - Click "Trigger deploy" → "Deploy site"
   - Wait for deployment to complete

---

## 🪝 Step 4: Set Up Stripe Webhooks

Webhooks ensure that your backend is notified when payments succeed, even if the user closes their browser.

1. **Go to Stripe Dashboard**
   - Navigate to **Developers → Webhooks**

2. **Add Endpoint**
   - Click "Add endpoint"
   - **Endpoint URL**: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
     - Replace `your-site.netlify.app` with your actual Netlify domain
   - **Description**: "AAA Sports Camp Payment Notifications"

3. **Select Events to Listen To**
   - Click "Select events"
   - Search for and select:
     - ✅ `checkout.session.completed`
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed` (optional)
   - Click "Add events"

4. **Save and Get Webhook Secret**
   - Click "Add endpoint"
   - You'll see your new webhook endpoint
   - Click to expand it and reveal the **Signing secret**
   - Copy the signing secret (starts with `whsec_`)

5. **Add Webhook Secret to Netlify**
   - Go back to **Netlify → Site settings → Environment variables**
   - Click "Add a variable"
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: Paste your webhook signing secret (whsec_...)
   - Click "Create variable"

6. **Redeploy Again**
   - Go to **Deploys** tab
   - Click "Trigger deploy" → "Deploy site"

---

## 🧪 Step 5: Test Your Integration

### Test in Test Mode

1. **Go to Your Pricing Page**
   - Visit `https://your-site.netlify.app/pricing`

2. **Fill Out Registration Form**
   - Enter test data (use a real email you can check)
   - Check both required checkboxes
   - Click "Proceed to Secure Payment"

3. **Complete Test Payment**
   - You'll be redirected to Stripe Checkout
   - Use a test card number:
     - **Successful payment**: `4242 4242 4242 4242`
     - **Declined payment**: `4000 0000 0000 0002`
     - **Requires 3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any ZIP code (e.g., 12345)

4. **Verify Success**
   - After payment, you should be redirected to `/success`
   - Check Stripe Dashboard → Payments to see the test payment
   - Check your email for the Stripe receipt

### Verify Webhook Delivery

1. **Go to Stripe Dashboard**
   - Navigate to **Developers → Webhooks**
   - Click on your webhook endpoint

2. **Check Recent Events**
   - You should see recent webhook deliveries
   - All should show successful (200) responses
   - If any failed, check the error message

---

## 🔴 Step 6: Going Live (When Ready)

### Switch to Live Mode

**⚠️ IMPORTANT**: Only do this when you're ready to accept real payments!

1. **Activate Your Stripe Account**
   - Complete Stripe's business verification
   - Provide all required information
   - Wait for approval (usually instant, but can take a few days)

2. **Get Live API Keys**
   - In Stripe Dashboard, toggle from "Test mode" to "Live mode"
   - Go to **Developers → API keys**
   - Copy your **Live Secret key** (starts with `sk_live_`)

3. **Update Netlify Environment Variables**
   - Go to **Netlify → Site settings → Environment variables**
   - Find `STRIPE_SECRET_KEY`
   - Click "Options" → "Edit"
   - Replace with your **Live** secret key (sk_live_...)
   - Click "Save"

4. **Update Webhook for Live Mode**
   - In Stripe Dashboard, make sure you're in **Live mode**
   - Go to **Developers → Webhooks**
   - Add a new endpoint with the same URL
   - Select the same events
   - Copy the new **Live** webhook signing secret

5. **Update Webhook Secret in Netlify**
   - Go to **Netlify → Site settings → Environment variables**
   - Find `STRIPE_WEBHOOK_SECRET`
   - Update with the **Live** webhook signing secret
   - Click "Save"

6. **Redeploy**
   - Trigger a new deployment
   - Test with a real card (you can refund it immediately)

---

## 📧 Step 7: Set Up Email Confirmations (Optional)

The current implementation doesn't send custom confirmation emails (Stripe sends receipts automatically). To add custom emails:

### Option A: Use SendGrid

1. **Sign up for SendGrid**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Get your API key

2. **Add to Netlify Environment Variables**
   - Add variable: `SENDGRID_API_KEY` = your API key

3. **Modify Webhook Function**
   - Edit `/netlify/functions/stripe-webhook.js`
   - Uncomment the email sending code
   - Install SendGrid: `npm install @sendgrid/mail`

### Option B: Use Netlify Forms + Zapier

1. **Create a Zapier account**
2. **Set up a Zap**:
   - Trigger: Webhook (from Stripe)
   - Action: Send Email
3. **Connect to your Stripe webhook**

---

## 🔒 Security Checklist

Before going live, verify:

- [ ] **Secret keys are NOT in your code** - Only in Netlify environment variables
- [ ] **Webhook signature is verified** - Already handled in code
- [ ] **HTTPS is enabled** - Automatic with Netlify
- [ ] **Environment variables are set** - Check Netlify dashboard
- [ ] **Test payments work correctly** - Complete a full test flow
- [ ] **Webhooks are delivering** - Check Stripe webhook logs
- [ ] **Error handling is in place** - Test with declined cards

---

## 🛠️ Troubleshooting

### Payment button doesn't work

**Problem**: Clicking "Proceed to Secure Payment" does nothing or shows an error.

**Solutions**:
1. Check browser console for errors (F12 → Console tab)
2. Verify environment variables are set in Netlify
3. Check that Netlify functions are enabled
4. Make sure you've deployed after setting environment variables

### Stripe checkout doesn't load

**Problem**: Error when trying to create checkout session.

**Solutions**:
1. Verify `STRIPE_SECRET_KEY` is correctly set in Netlify
2. Check Netlify function logs (Netlify Dashboard → Functions → Logs)
3. Make sure the key starts with `sk_test_` (test) or `sk_live_` (live)

### Webhooks not receiving events

**Problem**: Payments succeed but webhooks show failures.

**Solutions**:
1. Verify webhook URL is correct: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
2. Check that `STRIPE_WEBHOOK_SECRET` is set correctly
3. View webhook logs in Stripe Dashboard → Developers → Webhooks
4. Verify the endpoint is listening to the correct events

### Success page shows error

**Problem**: After payment, success page says "Payment Verification Failed".

**Solutions**:
1. Check that the verify-payment function is working
2. Verify the session_id is in the URL
3. Check Netlify function logs for errors
4. Make sure the payment actually succeeded in Stripe Dashboard

---

## 📞 Support

If you need help:

1. **Check Stripe Logs**
   - Stripe Dashboard → Developers → Events
   - Stripe Dashboard → Developers → Webhooks → Click endpoint → View logs

2. **Check Netlify Logs**
   - Netlify Dashboard → Functions → Select function → View logs
   - Netlify Dashboard → Deploys → Click deploy → View function logs

3. **Stripe Support**
   - Available in Stripe Dashboard (bottom-left chat icon)
   - Comprehensive docs at [stripe.com/docs](https://stripe.com/docs)

4. **Netlify Support**
   - Docs at [docs.netlify.com](https://docs.netlify.com)
   - Community forum at [answers.netlify.com](https://answers.netlify.com)

---

## ✅ Deployment Checklist

Use this checklist to ensure everything is set up correctly:

### Initial Setup
- [ ] Code deployed to Netlify
- [ ] Site is live and accessible
- [ ] All pages load correctly

### Stripe Configuration
- [ ] Stripe account created
- [ ] Test mode secret key obtained
- [ ] Secret key added to Netlify environment variables
- [ ] Site redeployed after adding environment variables

### Webhook Setup
- [ ] Webhook endpoint created in Stripe
- [ ] Webhook URL is correct
- [ ] Correct events selected (checkout.session.completed, etc.)
- [ ] Webhook signing secret obtained
- [ ] Webhook secret added to Netlify environment variables
- [ ] Site redeployed after adding webhook secret

### Testing
- [ ] Registration form submits successfully
- [ ] Redirects to Stripe Checkout
- [ ] Test payment completes successfully
- [ ] Redirects to success page
- [ ] Success page verifies payment
- [ ] Webhook events show as delivered in Stripe
- [ ] All Netlify functions show successful executions

### Going Live (When Ready)
- [ ] Stripe account activated
- [ ] Live mode keys obtained
- [ ] Environment variables updated with live keys
- [ ] Live webhook created
- [ ] Live webhook secret updated
- [ ] Full test with real card completed (and refunded)

---

## 🎉 You're Done!

Your AAA Sports Camp website is now live and ready to accept registrations and payments!

**Important Files**:
- `/netlify/functions/create-checkout.js` - Creates Stripe checkout sessions
- `/netlify/functions/stripe-webhook.js` - Handles payment confirmations
- `/netlify/functions/verify-payment.js` - Verifies successful payments
- `/src/app/pages/Pricing.tsx` - Registration form
- `/src/app/pages/Success.tsx` - Success page after payment

Remember to monitor your Stripe Dashboard regularly for payments and issues!
