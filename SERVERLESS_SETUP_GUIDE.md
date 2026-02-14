# Serverless Setup Guide - Where to Put Everything

## Overview

For a React app like yours, you have two main serverless options:
1. **Netlify Functions** (easiest for beginners)
2. **Vercel Functions** (also excellent)

Both let you add backend API endpoints to your React app WITHOUT managing a separate server.

---

## Option 1: Netlify Functions (Recommended for Your Project)

### Project Structure

Your project will look like this:

```
aaa-sports-camp/
├── src/                          # Your existing React app
│   ├── app/
│   │   ├── pages/
│   │   │   └── Pricing.tsx
│   │   └── components/
│   ├── styles/
│   └── ...
├── netlify/
│   └── functions/                # ← NEW: Serverless functions go here
│       ├── create-checkout.js    # Payment endpoint
│       ├── verify-payment.js     # Payment verification
│       └── stripe-webhook.js     # Webhook handler
├── public/
├── package.json
├── netlify.toml                  # ← NEW: Netlify configuration
└── .env                          # ← NEW: Your secret keys (DON'T COMMIT!)
```

### Step-by-Step Setup

#### 1. Create the `netlify/functions` folder

In your project root, create:
```
netlify/
  └── functions/
```

#### 2. Create `netlify.toml` in your project root

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
```

#### 3. Install Stripe in your project

```bash
npm install stripe
```

#### 4. Create Environment Variables File

Create `.env` in your project root:

```env
# Stripe Keys (Get these from dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Your app URL
SITE_URL=http://localhost:5173
```

**⚠️ IMPORTANT**: Add `.env` to your `.gitignore` file!

#### 5. Update `.gitignore`

```
.env
.env.local
.netlify
```

---

## The Actual Function Files

### File 1: `netlify/functions/create-checkout.js`

This creates the Stripe checkout session.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the registration data from the request
    const data = JSON.parse(event.body);
    
    const {
      childFirstName,
      childLastName,
      childAge,
      parentName,
      parentEmail,
      parentPhone,
      emergencyContact,
      emergencyPhone,
    } = data;

    // Validate required fields
    if (!childFirstName || !childLastName || !parentEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Get the site URL from environment or headers
    const siteUrl = process.env.SITE_URL || event.headers.origin || 'http://localhost:5173';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AAA Sports Camp - 6-Week Summer Program',
              description: '12 sessions (Tuesdays & Thursdays, 10:00 AM - 12:00 PM)',
            },
            unit_amount: 24900, // $249.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      customer_email: parentEmail,
      metadata: {
        // Store all registration data in Stripe metadata
        childName: `${childFirstName} ${childLastName}`,
        childAge: childAge,
        parentName: parentName,
        parentPhone: parentPhone,
        emergencyContact: emergencyContact,
        emergencyPhone: emergencyPhone,
      },
    });

    // Return the checkout URL
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        checkoutUrl: session.url,
        sessionId: session.id 
      }),
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        message: error.message 
      }),
    };
  }
};
```

### File 2: `netlify/functions/verify-payment.js`

This verifies payment completion.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const sessionId = event.queryStringParameters.session_id;

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing session_id' }),
      };
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Return payment status and metadata
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        paid: session.payment_status === 'paid',
        customerEmail: session.customer_email,
        metadata: session.metadata,
      }),
    };

  } catch (error) {
    console.error('Error verifying payment:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to verify payment',
        message: error.message 
      }),
    };
  }
};
```

### File 3: `netlify/functions/stripe-webhook.js`

This handles Stripe webhooks for payment confirmations.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object;
      
      console.log('Payment successful!', {
        email: session.customer_email,
        amount: session.amount_total / 100,
        metadata: session.metadata,
      });

      // TODO: Save to database
      // await saveRegistrationToDatabase(session);
      
      // TODO: Send confirmation email
      // await sendConfirmationEmail(session.customer_email, session.metadata);
      
      break;

    case 'payment_intent.succeeded':
      console.log('PaymentIntent succeeded');
      break;

    default:
      console.log(`Unhandled event type: ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
```

---

## Deploying to Netlify

### Method 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Initialize your site**:
```bash
netlify init
```

Follow the prompts:
- Create a new site
- Choose your team
- Set build command: `npm run build`
- Set publish directory: `dist`

4. **Add environment variables**:
```bash
netlify env:set STRIPE_SECRET_KEY sk_test_your_key_here
netlify env:set STRIPE_WEBHOOK_SECRET whsec_your_secret_here
netlify env:set SITE_URL https://your-site.netlify.app
```

5. **Deploy**:
```bash
netlify deploy --prod
```

### Method 2: Deploy via Netlify Website

1. **Push your code to GitHub**
2. **Go to [app.netlify.com](https://app.netlify.com)**
3. **Click "Add new site" → "Import an existing project"**
4. **Connect to your GitHub repository**
5. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Add environment variables** in Site Settings → Environment Variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `SITE_URL`
7. **Deploy!**

---

## Updating Your React Code

Update `/src/app/pages/Pricing.tsx` to call your new serverless function:

```typescript
const handleProceedToPayment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Call your Netlify function
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        childFirstName: registrationData.childFirstName,
        childLastName: registrationData.childLastName,
        childAge: registrationData.childAge,
        parentName: registrationData.parentName,
        parentEmail: registrationData.parentEmail,
        parentPhone: registrationData.parentPhone,
        emergencyContact: registrationData.emergencyContact,
        emergencyPhone: registrationData.emergencyPhone,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { checkoutUrl } = await response.json();
    
    // Redirect to Stripe Checkout
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Payment error:', error);
    alert('There was an error processing your payment. Please try again.');
  }
};
```

---

## Local Testing

1. **Install Netlify CLI** (if you haven't):
```bash
npm install -g netlify-cli
```

2. **Create `.env` file** with your test keys

3. **Run locally**:
```bash
netlify dev
```

This starts your app at `http://localhost:8888` with functions available at:
- `http://localhost:8888/.netlify/functions/create-checkout`
- `http://localhost:8888/.netlify/functions/verify-payment`

---

## Setting Up Stripe Webhooks

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Click "Add endpoint"**
3. **Enter your webhook URL**: 
   ```
   https://your-site.netlify.app/.netlify/functions/stripe-webhook
   ```
4. **Select events**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. **Copy the webhook secret** and add it to your environment variables

---

## Option 2: Vercel Functions (Alternative)

If you prefer Vercel instead, the structure is similar:

```
your-project/
├── src/              # Your React app
├── api/              # ← Vercel functions go here
│   ├── create-checkout.js
│   ├── verify-payment.js
│   └── stripe-webhook.js
├── vercel.json
└── .env
```

Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/api/(.*)", "destination": "/api/$1" }]
}
```

Function format is almost identical, just change `exports.handler` to:
```javascript
export default async function handler(req, res) {
  // Your code here
}
```

Deploy with:
```bash
npm install -g vercel
vercel
```

---

## Summary: What Goes Where

| File | Location | Purpose |
|------|----------|---------|
| **create-checkout.js** | `netlify/functions/` | Creates Stripe checkout session |
| **verify-payment.js** | `netlify/functions/` | Verifies payment completion |
| **stripe-webhook.js** | `netlify/functions/` | Handles Stripe events |
| **netlify.toml** | Project root | Netlify configuration |
| **.env** | Project root | Secret keys (DON'T COMMIT!) |

**Your React code stays exactly where it is** - serverless functions are added alongside it!

---

## Next Steps

1. ✅ Create the `netlify/functions` folder
2. ✅ Add the three function files
3. ✅ Create `netlify.toml`
4. ✅ Create `.env` with your Stripe test keys
5. ✅ Update `.gitignore`
6. ✅ Test locally with `netlify dev`
7. ✅ Deploy to Netlify
8. ✅ Set up webhook in Stripe Dashboard
9. ✅ Update frontend code to call functions
10. ✅ Test with Stripe test cards

You're ready to accept payments! 🎉
