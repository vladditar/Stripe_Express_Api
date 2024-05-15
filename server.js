const express = require('express');
const cors = require('cors');
const stripeRouter = require('./routes/stripeRouter')
const webhook = require('./routes/webhook')



const app = express();
require('dotenv').config()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:4200', 'https://checkout.stripe.com']
}))

const PORT = process.env.PORT;
app.get('/', (req, res) => {
  res.status(200).json("Home Page")
})
// webhook route is separated because it shouldn't be parsed by express.json()
app.use('/webhook', webhook)
app.use('/stripe', express.json(), stripeRouter)


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Running on port ${PORT}`);
});
