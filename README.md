# AAA Sports Camp Website 🏃⚽

A complete, modern youth soccer camp website with secure Stripe payment integration for registrations. Built for AAA Sports Camp in Sammamish, Washington.

---

## ✨ What's Included

This is a **fully functional, production-ready website** with:

- ✅ **8 Complete Pages**: Home, Sign Up, About, Pricing, Waivers, Contact, Policies, FAQ
- ✅ **Stripe Payment Integration**: Secure, PCI-compliant online registration and payment
- ✅ **Online Waiver Forms**: Digital submission system with email delivery
- ✅ **Mobile Responsive**: Works perfectly on all devices
- ✅ **Modern Design**: Uses brand colors (red, blue, green) with Poppins and Inter fonts
- ✅ **Serverless Functions**: Backend API for payment processing (Netlify)
- ✅ **Form Validation**: All forms include proper validation and error handling

**The code is complete! Just add your Stripe API keys to go live.**

---

## 🚀 Quick Start - Going Live in 3 Steps

### Step 1: Deploy to Netlify (5 minutes)
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Then connect to Netlify at app.netlify.com
# It will auto-detect settings and deploy!
```

### Step 2: Add Stripe Keys (5 minutes)
1. Sign up at [stripe.com](https://stripe.com) (free)
2. Get your **Secret key** from Stripe Dashboard → API keys
3. Add it to Netlify → Site settings → Environment variables
   - Key: `STRIPE_SECRET_KEY`
   - Value: Your Stripe secret key

### Step 3: Set Up Webhook (3 minutes)
1. In Stripe Dashboard → Webhooks, add endpoint:
   - URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - Event: `checkout.session.completed`
2. Copy the **Webhook Secret**
3. Add it to Netlify environment variables:
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: Your webhook secret

**Done! Your site is live and accepting registrations! 🎉**

---

## 📚 Complete Documentation

We've created detailed guides for everything:

| Guide | Purpose | Time to Read |
|-------|---------|--------------|
| **[STRIPE_KEYS_SETUP.md](./STRIPE_KEYS_SETUP.md)** | Quick step-by-step Stripe setup | 10 min ⚡ |
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Full deployment walkthrough | 30 min |
| **[README_STRIPE.md](./README_STRIPE.md)** | Stripe integration overview | 5 min |
| **[.env.example](./.env.example)** | Environment variables reference | 2 min |

**→ Start with [STRIPE_KEYS_SETUP.md](./STRIPE_KEYS_SETUP.md) for the fastest setup!**

---

## 🔑 Required Environment Variables

Add these to Netlify → Site settings → Environment variables:

```
STRIPE_SECRET_KEY = sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET = whsec_YOUR_SECRET_HERE
```

That's it! The site will handle everything else automatically.

---

## 🧪 Testing Payments

Use these test cards when in **test mode**:

| Card Number | Result |
|------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |
| `4000 0025 0000 3155` | 🔐 3D Secure |

Use any future expiry, any 3-digit CVC, any ZIP.

---

## 📁 Project Structure

```
/src/app/
  ├── pages/
  │   ├── Home.tsx          # Landing page
  │   ├── Pricing.tsx       # Registration + payment form
  │   ├── Success.tsx       # Payment success page
  │   ├── Waivers.tsx       # Online waiver submission
  │   └── ...               # Other pages
  └── components/
      ├── Navbar.tsx        # Sticky navigation
      ├── Footer.tsx        # Global footer
      └── ...

/netlify/functions/
  ├── create-checkout.js    # Creates Stripe checkout session
  ├── stripe-webhook.js     # Handles payment events
  ├── verify-payment.js     # Verifies payment on success page
  └── package.json          # Stripe dependency
```

---

## 🎨 Design System

**Brand Colors:**
- Red: `#E53935` (primary action)
- Blue: `#1E88E5` (secondary)
- Green: `#43A047` (success/accent)

**Typography:**
- Headings: **Poppins** (bold, modern)
- Body: **Inter** (clean, readable)

**Features:**
- Sticky navigation bar
- Mobile-responsive design
- Form validation
- Loading states
- Error handling

---

## 💰 Pricing

**Camp Cost:** $249 per child
- 6-week program
- 12 sessions (Tuesdays & Thursdays)
- 10 AM - 12 PM

**Stripe Fees:** 2.9% + $0.30 = $7.52 per transaction

---

## 🔒 Security

Your integration is production-ready and secure:

✅ PCI Compliant (Stripe handles all card data)  
✅ Webhook signature verification  
✅ Environment variables (never in code)  
✅ HTTPS everywhere (automatic with Netlify)  
✅ Form validation on both frontend and backend  

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Install Netlify CLI
npm install -g netlify-cli

# Run development server
netlify dev

# Build for production
npm run build
```

---

## 📦 What Happens When Someone Registers?

1. **Parent fills out form** on `/pricing` page
2. **Form submits to backend** → creates Stripe Checkout session
3. **Redirects to Stripe Checkout** → secure payment page
4. **Payment processed** → Stripe charges card
5. **Webhook notifies backend** → payment confirmed
6. **Redirects to success page** → shows confirmation
7. **Email receipt sent** → automatic from Stripe

All metadata (child name, age, parent info, etc.) is stored in Stripe for your records.

---

## 🚨 Troubleshooting

**Payment button doesn't work?**
→ Check Netlify environment variables are set and redeployed

**Webhook failing?**
→ Verify webhook URL and secret in Stripe Dashboard

**Success page shows error?**
→ Check that payment succeeded in Stripe Dashboard

**Full troubleshooting guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting)

---

## 📞 Support Resources

- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Stripe Support**: 24/7 chat in Stripe Dashboard
- **Test Cards**: [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Deploy to Netlify
- [ ] Add Stripe test keys to environment variables
- [ ] Create Stripe webhook endpoint
- [ ] Test registration with test card `4242 4242 4242 4242`
- [ ] Verify success page loads correctly
- [ ] Check webhook deliveries in Stripe Dashboard
- [ ] Test on mobile device

When ready for real payments:

- [ ] Activate Stripe account (complete verification)
- [ ] Switch to live keys (starts with `sk_live_`)
- [ ] Create live webhook endpoint
- [ ] Update environment variables with live keys
- [ ] Test with real card (refund immediately)

---

## 🎉 Ready to Launch?

**Follow these guides in order:**

1. **[STRIPE_KEYS_SETUP.md](./STRIPE_KEYS_SETUP.md)** ← Start here! (10 min)
2. Test your integration with test cards
3. When ready, switch to live keys

**Your website is complete and ready to accept registrations!**

---

## 📄 License

This is a custom-built website for AAA Sports Camp. All rights reserved.

**Built with:** React, TypeScript, Tailwind CSS, Vite, Netlify Functions, Stripe

---

**Questions? Start with [STRIPE_KEYS_SETUP.md](./STRIPE_KEYS_SETUP.md) - it has everything you need!**
