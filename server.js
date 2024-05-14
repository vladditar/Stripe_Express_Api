const express = require('express');
const cors = require('cors');
const stripeRouter = require('./routes/stripeRouter')


const app = express();
require('dotenv').config()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "*"
}))

const PORT = process.env.PORT;
app.get('/', (req, res) => {
  res.status(200).json("Home Page")
})

app.use('/stripe', stripeRouter)


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Running on port ${PORT}`);
});
