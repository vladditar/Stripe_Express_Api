const express = require('express');
require('dotenv').config()
const {getCheckoutSession, createCheckoutSession} = require("../controllers/stripeController");

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json("Stripe Route")
})

router.post('/create-checkout-session', createCheckoutSession);
router.get('/checkout-session', getCheckoutSession)

module.exports = router;
