const express = require('express');
const cors = require('cors');
const stripeRouter = require('./routes/stripeRouter')


const app = express();
require('dotenv').config()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(cors({
  origin: ['http://localhost:4200', 'https://checkout.stripe.com']
}))

const PORT = process.env.PORT;
app.get('/', (req, res) => {
  res.status(200).json("Home Page")
})

app.use('/stripe', stripeRouter)


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Running on port ${PORT}`);
});
