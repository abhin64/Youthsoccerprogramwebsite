# Payment Flow Diagram

## Where Everything Lives

```
Your Computer / GitHub Repository
│
├── 📁 src/                          ← Your React app (frontend)
│   ├── 📁 app/
│   │   ├── 📁 pages/
│   │   │   ├── Pricing.tsx          ← Registration form
│   │   │   └── Success.tsx          ← Thank you page
│   │   └── 📁 components/
│   └── ...
│
├── 📁 netlify/                      ← NEW! Backend functions
│   └── 📁 functions/
│       ├── create-checkout.js       ← Creates payment session
│       ├── verify-payment.js        ← Checks payment status
│       └── stripe-webhook.js        ← Receives payment events
│
├── 📄 netlify.toml                  ← Configuration
├── 📄 .env.example                  ← Template for secrets
├── 📄 .env                          ← YOUR SECRETS (not committed!)
└── 📄 .gitignore                    ← Protects .env

When deployed to Netlify:
├── Frontend: https://your-site.netlify.app
└── Functions: https://your-site.netlify.app/.netlify/functions/
```

---

## Step-by-Step User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARENT VISITS YOUR SITE                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Parent Fills Out Registration Form                    │
│  ────────────────────────────────────────────────────────       │
│  Location: /pricing page                                        │
│  Info collected:                                                │
│    • Child's name, age                                          │
│    • Parent contact info                                        │
│    • Emergency contact                                          │
│    • Waiver confirmation ☑                                      │
│    • Policy agreement ☑                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Parent Clicks "Proceed to Secure Payment"             │
│  ────────────────────────────────────────────────────────       │
│  What happens:                                                  │
│    React app sends registration data to:                        │
│    /.netlify/functions/create-checkout                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Your Serverless Function Runs                         │
│  ────────────────────────────────────────────────────────       │
│  File: netlify/functions/create-checkout.js                     │
│  What it does:                                                  │
│    1. Receives registration data                                │
│    2. Validates required fields                                 │
│    3. Calls Stripe API to create checkout session               │
│    4. Stripe creates secure payment page                        │
│    5. Returns checkout URL to your React app                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Parent Redirected to Stripe Checkout                  │
│  ────────────────────────────────────────────────────────       │
│  URL: https://checkout.stripe.com/c/pay/cs_test_xxxxx          │
│  What parent sees:                                              │
│    • Stripe's secure payment form                               │
│    • Camp details & price ($249)                                │
│    • Credit card fields                                         │
│    • "Secured by Stripe" badge                                  │
│  ⚠️  NO CREDIT CARD DATA GOES TO YOUR SERVER!                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 5: Parent Enters Payment Info                            │
│  ────────────────────────────────────────────────────────       │
│  Card info goes directly to Stripe                              │
│  Stripe processes the payment                                   │
│  Stripe performs fraud checks                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
     ✅ PAYMENT SUCCESS          ❌ PAYMENT FAILED
                 │                         │
                 │                         └─→ Returns to /pricing
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 6: Stripe Redirects to Success Page                      │
│  ────────────────────────────────────────────────────────       │
│  URL: https://your-site.netlify.app/success?session_id=cs_xxx  │
│  Parent sees: "Registration Complete!" 🎉                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 7: Stripe Sends Webhook to Your Server                   │
│  ────────────────────────────────────────────────────────       │
│  Stripe calls: /.netlify/functions/stripe-webhook               │
│  Event: checkout.session.completed                              │
│  Contains: All registration data + payment confirmation         │
│  Your function can:                                             │
│    • Save registration to database                              │
│    • Send confirmation email to parent                          │
│    • Update inventory/capacity                                  │
│    • Send notification to camp administrators                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     🎉 REGISTRATION COMPLETE!
```

---

## Data Flow Diagram

```
┌──────────────┐
│    PARENT    │
│   BROWSER    │
└──────┬───────┘
       │ 1. Fills form & clicks "Pay"
       │
       ▼
┌──────────────────────────────────────────┐
│      YOUR REACT APP (Frontend)           │
│      /src/app/pages/Pricing.tsx          │
│                                           │
│  fetch('/.netlify/functions/             │
│         create-checkout', {              │
│    body: registrationData                │
│  })                                       │
└──────┬───────────────────────────────────┘
       │ 2. POST request with data
       │
       ▼
┌──────────────────────────────────────────┐
│   YOUR SERVERLESS FUNCTION (Backend)     │
│   netlify/functions/create-checkout.js   │
│                                           │
│   stripe.checkout.sessions.create({      │
│     line_items: [{ amount: 24900 }],     │
│     metadata: registrationData           │
│   })                                      │
└──────┬───────────────────────────────────┘
       │ 3. API call to Stripe
       │
       ▼
┌──────────────────────────────────────────┐
│          STRIPE SERVERS                  │
│                                           │
│   • Creates secure checkout session      │
│   • Generates unique URL                 │
│   • Stores session data                  │
└──────┬───────────────────────────────────┘
       │ 4. Returns checkout URL
       │
       ▼
┌──────────────────────────────────────────┐
│      YOUR SERVERLESS FUNCTION            │
│                                           │
│   return { checkoutUrl: session.url }    │
└──────┬───────────────────────────────────┘
       │ 5. Returns URL to frontend
       │
       ▼
┌──────────────────────────────────────────┐
│         YOUR REACT APP                   │
│                                           │
│   window.location.href = checkoutUrl     │
└──────┬───────────────────────────────────┘
       │ 6. Redirects browser
       │
       ▼
┌──────────────────────────────────────────┐
│      STRIPE CHECKOUT PAGE                │
│   (checkout.stripe.com)                  │
│                                           │
│   [Credit Card Form]                     │
│   [Parent enters card info]              │
│   [Submit Payment]                       │
└──────┬───────────────────────────────────┘
       │ 7. Processes payment
       │
       ▼
┌──────────────────────────────────────────┐
│          STRIPE SERVERS                  │
│                                           │
│   • Validates card                       │
│   • Checks for fraud                     │
│   • Processes transaction                │
│   • Updates session status               │
└──────┬───────┬───────────────────────────┘
       │       │
       │       │ 8. Sends webhook
       │       │
       │       ▼
       │   ┌──────────────────────────────┐
       │   │   YOUR WEBHOOK FUNCTION      │
       │   │   stripe-webhook.js          │
       │   │                              │
       │   │   • Verify webhook signature │
       │   │   • Save to database         │
       │   │   • Send confirmation email  │
       │   └──────────────────────────────┘
       │
       │ 9. Redirects to success_url
       │
       ▼
┌──────────────────────────────────────────┐
│         YOUR SUCCESS PAGE                │
│      /src/app/pages/Success.tsx          │
│                                           │
│   "Registration Complete!" 🎉            │
└──────────────────────────────────────────┘
```

---

## Security: Why This Is Safe

```
❌ OLD WAY (Insecure):
Parent → [Credit Card Form on your site] → Your server → Stripe
         ⚠️  Card data touches your server! PCI compliance nightmare!

✅ NEW WAY (Secure - What we're doing):
Parent → Your form → Your function → Stripe → [Secure checkout]
         (no card data!)                      ↓
                                         Parent enters card
                                              ↓
                                         Stripe processes
                                              ↓
                                    Redirects to your site

🔒 Card data NEVER touches your server!
🔒 You're automatically PCI compliant!
🔒 Stripe handles ALL security!
```

---

## What Each File Does

| File | What It Is | What It Does |
|------|-----------|--------------|
| **Pricing.tsx** | React component | Shows registration form |
| **create-checkout.js** | Serverless function | Creates Stripe session & returns URL |
| **stripe-webhook.js** | Serverless function | Receives payment confirmations from Stripe |
| **verify-payment.js** | Serverless function | Checks if payment succeeded (optional) |
| **Success.tsx** | React component | Shows "Thank you" page |
| **netlify.toml** | Config file | Tells Netlify where functions are |
| **.env** | Environment variables | Your secret Stripe keys |

---

## Questions?

**Q: Where does the payment form appear?**
A: On Stripe's website (checkout.stripe.com), not yours!

**Q: Where is my credit card data stored?**
A: Only on Stripe's servers, never yours!

**Q: How do I know if payment worked?**
A: The webhook function gets called by Stripe!

**Q: Can I test without real money?**
A: Yes! Use test mode keys and test card: 4242 4242 4242 4242

**Q: How much does this cost?**
A: Netlify: Free. Stripe: 2.9% + $0.30 per transaction.

**Q: Do I need a database?**
A: Not immediately. Stripe stores the data. But you'll want one eventually!
