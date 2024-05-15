# How to run, step by step

### 1. Install project dependencies
`npm install`

### 2. Create a file with name '.env' in the root folder and add environment variables:
`PORT={****}`
`STRIPE_SECRET_KEY='****'`
`STRIPE_WEBHOOK_SECRET='****'`

### 3. Run app in background
`npm run dev` = `nodemon server.js`

# Stripe CLI

### Install Stripe CLI
`sudo brew install stripe/stripe-cli/stripe;`

### Listen to Stripe events
`stripe listen --forward-to <webhook endpoint> (ex: localhost:8081/webhook)`

### Enable event trigger
`stripe trigger <event name> (ex: checkout.session.completed)`

# Dependencies
`npm install express`
`npm install cors`
`npm install nodemon`
`npm install stripe`
`npm install dotenv`

