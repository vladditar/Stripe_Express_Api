require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {calculatePrice} = require('../utils')

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
  console.log(req.body)
  const price = calculatePrice(req.body.color)

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Custom Sunglasses'
            },
            unit_amount: price
          },
          quantity: req.body.quantity,
        },
      ],
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        receipt_email: 'vlad@ditar.io'
      },
      success_url: `http://localhost:4200/#/cart?sessioniD={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4200/#/error`,
    });
    res.json(session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Unable to create checkout session.' });
  }
};

module.exports = {createCheckoutSession, getCheckoutSession}
