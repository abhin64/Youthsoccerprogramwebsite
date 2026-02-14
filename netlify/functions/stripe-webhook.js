// ===================================================================
// AAA Sports Camp - Stripe Webhook Handler
// ===================================================================
// This Netlify serverless function receives and processes webhook
// events from Stripe when payments are completed.
//
// REQUIRED ENVIRONMENT VARIABLES (Set in Netlify):
// - STRIPE_SECRET_KEY: Your Stripe secret key (sk_test_... or sk_live_...)
//   Get this from: https://dashboard.stripe.com/apikeys
//
// - STRIPE_WEBHOOK_SECRET: Your webhook signing secret (whsec_...)
//   Get this from: https://dashboard.stripe.com/webhooks
//   After creating a webhook endpoint, click on it to reveal the secret
//
// WEBHOOK ENDPOINT URL:
// https://your-site.netlify.app/.netlify/functions/stripe-webhook
//
// EVENTS TO LISTEN FOR:
// - checkout.session.completed (required)
// - payment_intent.succeeded (optional)
// ===================================================================

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
      // Example: await saveRegistrationToDatabase(session);
      
      // TODO: Send confirmation email
      // Example: await sendConfirmationEmail(session.customer_email, session.metadata);
      
      break;

    case 'payment_intent.succeeded':
      console.log('PaymentIntent succeeded');
      break;

    case 'payment_intent.payment_failed':
      console.log('Payment failed');
      break;

    default:
      console.log(`Unhandled event type: ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};