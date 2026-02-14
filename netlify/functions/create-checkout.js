// ===================================================================
// AAA Sports Camp - Create Stripe Checkout Session
// ===================================================================
// This Netlify serverless function creates a Stripe Checkout session
// when a user submits the registration form on the pricing page.
//
// REQUIRED ENVIRONMENT VARIABLES (Set in Netlify):
// - STRIPE_SECRET_KEY: Your Stripe secret key (sk_test_... or sk_live_...)
//   Get this from: https://dashboard.stripe.com/apikeys
//
// - SITE_URL (optional): Your deployed site URL
//   Example: https://aaasportscamp.netlify.app
// ===================================================================

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