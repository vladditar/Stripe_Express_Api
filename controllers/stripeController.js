require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {calculateItemPrice} = require('../utils')

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
  const cartItems = req.body;

  const stripeLineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Glasses ' + item.shape,
          },
          unit_amount: calculateItemPrice(item),
          // Important property. Tax can be rather 'exclusive', 'inclusive' or 'unspecified'. By default, it's 'inclusive'.
          tax_behavior: 'exclusive'
        },
        quantity: 1,
      }
    });

  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      // payment_method_types options: acss_debit, affirm, afterpay_clearpay, alipay, au_becs_debit, bacs_debit, bancontact, blik, boleto, cashapp, customer_balance, eps, fpx, giropay, grabpay, ideal, klarna, konbini, link, oxxo, p24, paynow, paypal, pix, promptpay, sepa_debit, sofort, swish, us_bank_account, wechat_pay, revolut_pay, mobilepay, zip, or amazon_pay',
      payment_method_types: ['card', 'bancontact', 'paypal'],
      billing_address_collection: 'auto',
      shipping_options: [
        {shipping_rate: 'shr_1PH3NRRxqgGsYbx9XgMe76RJ' },
        {shipping_rate: 'shr_1PH3OFRxqgGsYbx9LzSFuzsl' }
      ],
      line_items: stripeLineItems,
      automatic_tax: {
        enabled: true
      },
      mode: 'payment',
      tax_id_collection: {
        enabled: true,
      },
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        receipt_email: 'vlad@ditar.io'
      },
      success_url: `http://localhost:4200/#/cart?sessioniD={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4200/#/error`,
    });

    res.json(session);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Unable to create checkout session.' });
  }
};

module.exports = {createCheckoutSession, getCheckoutSession}
