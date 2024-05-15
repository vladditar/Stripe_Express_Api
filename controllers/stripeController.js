require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Fetch the Checkout Session to display the JSON result on the success page
const getCheckoutSession = async (req, res) => {
  const sessionId = req.query.sessionId; // Correctly extract sessionId from query parameters
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).send({ error: 'Unable to retrieve checkout session.' });
  }
};


const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1PGMyQRxqgGsYbx99P3pDyNN',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:4200/#/cart?sessioniD={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:4200/#/error`,
  });
  res.json(session.url);
};

module.exports = {createCheckoutSession, getCheckoutSession}
