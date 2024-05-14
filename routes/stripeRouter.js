const express = require('express');
const {createCheckoutSession} = require("../controllers/stripeController");
const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json("Stripe Route")
})

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
