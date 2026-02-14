# Quick Start: Add Stripe Payments in 10 Minutes

## What I've Already Created For You

✅ Three serverless functions in `/netlify/functions/`
✅ Netlify configuration file (`netlify.toml`)
✅ Environment variables template (`.env.example`)
✅ Updated `.gitignore` to protect your secrets

## Your 10-Minute Setup

### Step 1: Get Your Stripe Keys (2 minutes)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create a free account (no credit card required for testing!)
3. Go to **Developers** → **API Keys**
4. Copy these keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal test key"

### Step 2: Create Your `.env` File (1 minute)

In your project root, create a file called `.env` (note: starts with a dot):

```env
STRIPE_SECRET_KEY=sk_test_paste_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_paste_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_we_will_add_this_later
SITE_URL=http://localhost:5173
```

**Replace the placeholder values with your actual keys from Step 1!**

### Step 3: Install Stripe Package (30 seconds)

```bash
npm install stripe
```

### Step 4: Test Locally (1 minute)

Install Netlify CLI:
```bash
npm install -g netlify-cli
```

Run your app with serverless functions:
```bash
netlify dev
```

Your app will now run at `http://localhost:8888` with functions at:
- `http://localhost:8888/.netlify/functions/create-checkout`

### Step 5: Update Your Frontend Code (2 minutes)

The pricing page needs to call your new function. Replace the mock handler with this:

```typescript
const handleProceedToPayment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) throw new Error('Failed to create checkout session');

    const { checkoutUrl } = await response.json();
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Payment error:', error);
    alert('There was an error. Please try again.');
  }
};
```

### Step 6: Test With Stripe Test Cards (2 minutes)

Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`

Use any:
- Future expiry date (e.g., 12/34)
- 3-digit CVC (e.g., 123)
- ZIP code (e.g., 12345)

### Step 7: Deploy to Netlify (2 minutes)

**Option A: Using Netlify CLI**
```bash
netlify login
netlify init
netlify deploy --prod
```

**Option B: Using Netlify Website**
1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → Import from Git
4. Select your repository
5. Deploy!

### Step 8: Add Environment Variables to Netlify

In Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add these variables:
   - `STRIPE_SECRET_KEY` → your secret key
   - `STRIPE_WEBHOOK_SECRET` → (we'll add this next)
   - `SITE_URL` → your Netlify URL (e.g., https://aaa-sports-camp.netlify.app)

### Step 9: Set Up Stripe Webhook (1 minute)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Click **Add endpoint**
3. Enter: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. Select event: `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

---

## Testing the Complete Flow

1. Go to your pricing page
2. Fill out the registration form
3. Click "Proceed to Secure Payment"
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. You'll be redirected to the success page!

---

## Troubleshooting

**"Cannot find module 'stripe'"**
- Run: `npm install stripe`

**"Webhook signature verification failed"**
- Make sure you added `STRIPE_WEBHOOK_SECRET` to environment variables
- The secret should start with `whsec_`

**Functions not found (404)**
- Make sure `netlify.toml` is in your project root
- Try restarting `netlify dev`

**Payment redirects to localhost in production**
- Update `SITE_URL` environment variable in Netlify to your production URL

---

## What Happens Now?

When a parent registers:
1. ✅ They fill out the form on your pricing page
2. ✅ Click "Proceed to Secure Payment"
3. ✅ Your serverless function creates a Stripe checkout session
4. ✅ They're redirected to Stripe's secure payment page
5. ✅ They enter their card info (on Stripe's site, not yours!)
6. ✅ Stripe processes the payment
7. ✅ They're redirected back to your success page
8. ✅ Your webhook receives confirmation
9. ✅ You can save to database & send confirmation email

---

## Going Live (When You're Ready)

1. Activate your Stripe account (complete business verification)
2. Get your **live** API keys from Stripe
3. Update environment variables with live keys
4. Update webhook endpoint to use live mode
5. Test with a real card (you can refund immediately)
6. You're live! 🎉

---

## Cost

**Stripe Fees:**
- 2.9% + $0.30 per transaction
- For $249: You receive $241.48, Stripe keeps $7.52

**Netlify:**
- Free tier: 125,000 function requests/month
- More than enough for a sports camp!

---

## Need Help?

Check the full guides:
- `SERVERLESS_SETUP_GUIDE.md` - Detailed setup instructions
- `STRIPE_IMPLEMENTATION_GUIDE.md` - Complete Stripe documentation

**You're ready to accept payments securely!** 🚀
