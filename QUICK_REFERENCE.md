# ⚡ Quick Reference Card

## 🔑 The Two Keys You Need

| Variable | Where to Get It | Starts With |
|----------|----------------|-------------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys | `sk_test_` or `sk_live_` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → (your endpoint) | `whsec_` |

**Both go in:** Netlify → Site settings → Environment variables

---

## 🔗 Important URLs

### Your Site
- Registration: `https://your-site.netlify.app/pricing`
- Success page: `https://your-site.netlify.app/success`

### Stripe Dashboard
- Main: `https://dashboard.stripe.com`
- API Keys: `https://dashboard.stripe.com/apikeys`
- Webhooks: `https://dashboard.stripe.com/webhooks`

### Netlify Dashboard
- Main: `https://app.netlify.com`
- Environment vars: Site → Settings → Environment variables

---

## 🧪 Test Cards

| Card Number | Result |
|------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Decline |
| `4000 0025 0000 3155` | 🔐 3D Secure |

**Use with:** Any future expiry, any 3-digit CVC, any ZIP

---

## 📍 Webhook Configuration

**Endpoint URL:**
```
https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook
```

**Events to listen for:**
- `checkout.session.completed` ← Required

---

## 🚀 Quick Setup Steps

1. Deploy to Netlify
2. Get `STRIPE_SECRET_KEY` from Stripe → API keys
3. Add to Netlify environment variables
4. Create webhook in Stripe → Webhooks
5. Get `STRIPE_WEBHOOK_SECRET` from webhook
6. Add to Netlify environment variables
7. Redeploy site
8. Test with card `4242 4242 4242 4242`

**Done! ✅**

---

## 🛠️ CLI Commands

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy site
netlify deploy --prod

# View function logs
netlify functions:log stripe-webhook
```

---

## 📊 What Gets Logged Where

### Stripe Dashboard → Payments
- Transaction amount
- Customer email
- Payment status
- Metadata (child info, parent info)

### Stripe Dashboard → Webhooks
- Webhook deliveries
- Success/failure status
- Event details

### Netlify → Functions
- Function invocations
- Console logs
- Errors

---

## 💰 Pricing

| Item | Cost |
|------|------|
| Camp registration | $249.00 |
| Stripe fee (2.9% + $0.30) | $7.52 |
| You receive | $241.48 |

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Payment button doesn't work | Check environment variables in Netlify |
| Redirect to checkout fails | Verify `STRIPE_SECRET_KEY` is set |
| Webhook shows failures | Check `STRIPE_WEBHOOK_SECRET` matches |
| Success page shows error | Verify payment in Stripe Dashboard |

---

## 📞 Support Links

- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Test Cards**: [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/src/app/pages/Pricing.tsx` | Registration form |
| `/src/app/pages/Success.tsx` | Payment success page |
| `/netlify/functions/create-checkout.js` | Creates checkout session |
| `/netlify/functions/stripe-webhook.js` | Handles payment events |
| `/netlify/functions/verify-payment.js` | Verifies payment |

---

## ✅ Testing Checklist

- [ ] Payment form submits
- [ ] Redirects to Stripe Checkout
- [ ] Test card accepted
- [ ] Redirects to success page
- [ ] Success page shows confirmation
- [ ] Payment appears in Stripe Dashboard
- [ ] Webhook delivery successful

---

## 🔴 Going Live

When ready for real payments:

1. Complete Stripe account activation
2. Switch to Live mode in Stripe
3. Get **live** keys (`sk_live_...`)
4. Update Netlify environment variables
5. Create **live** webhook
6. Redeploy
7. Test with real card (refund immediately)

---

## 🎯 Environment Variables Template

```
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
SITE_URL=https://your-site.netlify.app
```

---

**📚 Full Documentation:**
- [STRIPE_KEYS_SETUP.md](./STRIPE_KEYS_SETUP.md) ← Start here
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [WHERE_TO_ADD_KEYS.md](./WHERE_TO_ADD_KEYS.md)

---

**Print this and keep it handy! 📋**
