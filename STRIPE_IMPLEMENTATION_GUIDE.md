# Stripe Payment Integration Guide for AAA Sports Camp

## Overview

This guide provides step-by-step instructions for implementing secure Stripe Checkout payment processing for the AAA Sports Camp registration system.

---

## Why Stripe Checkout?

✅ **PCI Compliant** - Stripe handles all sensitive payment data  
✅ **No Credit Card Forms** - You never touch card information  
✅ **Mobile Optimized** - Works seamlessly on all devices  
✅ **Multiple Payment Methods** - Cards, Apple Pay, Google Pay  
✅ **Built-in Security** - Fraud prevention and 3D Secure support  

---

## Prerequisites

1. **Stripe Account** - Sign up at [stripe.com](https://stripe.com)
2. **Backend Server** - Node.js, Python, PHP, or any server-side language
3. **Database** - To store registration records (PostgreSQL, MySQL, etc.)
4. **Email Service** - SendGrid, AWS SES, or similar for confirmations

---

## Step-by-Step Implementation

### Step 1: Create a Stripe Account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete registration
3. Navigate to **Developers → API Keys**
4. Copy your:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

⚠️ **IMPORTANT**: Never expose your Secret Key in frontend code!

---

### Step 2: Set Up Your Backend

Choose your preferred backend platform:

#### Option A: Node.js/Express Backend

**Install Stripe SDK:**
```bash
npm install stripe express cors
```

**Create API Endpoint** (`server.js`):
```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create Checkout Session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const {
      childFirstName,
      childLastName,
      childAge,
      parentName,
      parentEmail,
      parentPhone,
      emergencyContact,
      emergencyPhone
    } = req.body;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AAA Sports Camp - 6-Week Summer Program',
              description: '12 sessions (Tuesdays & Thursdays, 10 AM - 12 PM)',
              images: ['https://yourdomain.com/camp-image.jpg'], // Optional
            },
            unit_amount: 24900, // $249.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
      customer_email: parentEmail,
      metadata: {
        // Store registration data in metadata
        childName: `${childFirstName} ${childLastName}`,
        childAge: childAge,
        parentName: parentName,
        parentPhone: parentPhone,
        emergencyContact: emergencyContact,
        emergencyPhone: emergencyPhone,
      },
    });

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle successful payments
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_YOUR_WEBHOOK_SECRET';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Save registration to database
    await saveRegistrationToDatabase(session.metadata);
    
    // Send confirmation email
    await sendConfirmationEmail(session.customer_email, session.metadata);
  }

  res.json({ received: true });
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

---

#### Option B: Serverless (Netlify/Vercel Functions)

**Create Function** (`netlify/functions/create-checkout.js`):
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AAA Sports Camp - 6-Week Summer Program',
          },
          unit_amount: 24900,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${event.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin}/pricing`,
      customer_email: data.parentEmail,
      metadata: data,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ checkoutUrl: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

---

### Step 3: Update Frontend Code

Update the `handleProceedToPayment` function in `/src/app/pages/Pricing.tsx`:

```typescript
const handleProceedToPayment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Call your backend API
    const response = await fetch('https://your-backend.com/api/create-checkout-session', {
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

### Step 4: Create Success Page

Create `/src/app/pages/Success.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Logo } from '@/app/components/Logo';

export function Success() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // Optional: Verify payment with your backend
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.paid) {
            setConfirmed(true);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p>Confirming payment...</p>
    </div>;
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="flex justify-center mb-6">
            <Logo size="medium" showText={false} linkable={false} />
          </div>
          <div className="w-20 h-20 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-[#43A047]" size={48} />
          </div>
          <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
            Registration Complete!
          </h2>
          <p className="font-inter text-lg text-gray-700 mb-4">
            Thank you for registering! Your payment has been processed successfully.
          </p>
          <p className="font-inter text-gray-600 mb-8">
            You'll receive a confirmation email with all the camp details shortly.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

Add route to `App.tsx`:
```typescript
import { Success } from './pages/Success';

// In your routes:
<Route path="/success" element={<Success />} />
```

---

### Step 5: Set Up Webhooks

Webhooks ensure payment verification happens even if the user closes their browser.

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Click "Add endpoint"**
3. **Enter your endpoint URL**: `https://yourdomain.com/api/webhook`
4. **Select events to listen to**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. **Copy the Webhook Secret** (starts with `whsec_`)
6. **Use this secret in your webhook handler** (see Step 2)

---

### Step 6: Database Schema

Create a table to store registrations:

```sql
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  child_first_name VARCHAR(100) NOT NULL,
  child_last_name VARCHAR(100) NOT NULL,
  child_age INTEGER NOT NULL,
  parent_name VARCHAR(200) NOT NULL,
  parent_email VARCHAR(255) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  emergency_contact VARCHAR(200) NOT NULL,
  emergency_phone VARCHAR(20) NOT NULL,
  amount_paid INTEGER NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### Step 7: Send Confirmation Emails

Use an email service to send confirmations:

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(email, registrationData) {
  const msg = {
    to: email,
    from: 'camp@aaasportscamp.com',
    subject: 'AAA Sports Camp Registration Confirmed!',
    html: `
      <h1>Welcome to AAA Sports Camp!</h1>
      <p>Hi ${registrationData.parentName},</p>
      <p>Your registration for ${registrationData.childName} has been confirmed!</p>
      <h2>Camp Details:</h2>
      <ul>
        <li><strong>Schedule:</strong> Tuesdays & Thursdays, 10 AM - 12 PM</li>
        <li><strong>Duration:</strong> 6 weeks (12 sessions)</li>
        <li><strong>Amount Paid:</strong> $249.00</li>
      </ul>
      <p>We'll send you more details closer to the start date.</p>
      <p>If you have questions, contact us at info@aaasportscamp.com</p>
    `,
  };
  
  await sgMail.send(msg);
}
```

---

## Testing

### Test Mode
Use Stripe's test cards in test mode:
- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any ZIP code.

---

## Going Live

1. **Switch to Live Keys** in your backend (starts with `pk_live_` and `sk_live_`)
2. **Update webhook endpoint** to use live mode
3. **Activate your Stripe account** (complete business verification)
4. **Test the full flow** with a real card (you can refund it immediately)
5. **Set up proper error handling and logging**

---

## Security Checklist

✅ Never expose Secret Keys in frontend code  
✅ Always validate data on the backend  
✅ Use HTTPS for all API endpoints  
✅ Implement webhook signature verification  
✅ Store customer data securely (encrypted)  
✅ Use environment variables for sensitive keys  
✅ Enable Stripe's fraud detection (Radar)  
✅ Set up proper CORS policies  

---

## Cost Breakdown

**Stripe Fees:**
- 2.9% + $0.30 per successful card transaction
- For a $249 payment: $7.52 per transaction

---

## Support Resources

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Checkout Guide**: [stripe.com/docs/payments/checkout](https://stripe.com/docs/payments/checkout)
- **Stripe Support**: Available in Dashboard
- **Test Stripe Integration**: Use Stripe CLI for local testing

---

## Alternative: Stripe Embedded Checkout

If you prefer to keep users on your site, use Stripe's Embedded Checkout instead of redirecting:

```typescript
// Install Stripe.js
npm install @stripe/stripe-js

// In your component:
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const handleProceedToPayment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const stripe = await stripePromise;
  
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData),
  });
  
  const { sessionId } = await response.json();
  
  // Redirect to Stripe Checkout
  const { error } = await stripe!.redirectToCheckout({ sessionId });
  
  if (error) {
    console.error('Stripe error:', error);
  }
};
```

---

## Conclusion

This implementation provides:
- ✅ Secure, PCI-compliant payment processing
- ✅ Professional checkout experience
- ✅ Automatic payment verification
- ✅ Email confirmations
- ✅ Database record keeping

All without ever handling sensitive card data directly!
