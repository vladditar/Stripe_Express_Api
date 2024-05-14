const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1PG1D5RxqgGsYbx99GjWn5XA',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `localhost:8081/success.html`,
    cancel_url: `localhost:8081/cancel.html`,
  });
  res.redirect(303, session.url);
  console.log(req.body.price)
}

module.exports = {createCheckoutSession}
