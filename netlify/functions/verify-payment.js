// ===================================================================
// AAA Sports Camp - Verify Payment
// ===================================================================
// This Netlify serverless function verifies that a payment was
// successful by retrieving the Stripe Checkout session.
// 
// Called from the Success page to confirm payment status.
//
// REQUIRED ENVIRONMENT VARIABLES (Set in Netlify):
// - STRIPE_SECRET_KEY: Your Stripe secret key (sk_test_... or sk_live_...)
//   Get this from: https://dashboard.stripe.com/apikeys
// ===================================================================

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