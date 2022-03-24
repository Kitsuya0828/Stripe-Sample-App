// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KgpwYBEyNZnNN6yYGm63UuXMDbO7Piq7ngTlxGCtflcnoGlmCjAtP1y8VqKNH3e72hfZMuIMB02Mnvg3ICUVffQ00pyUmoWg3');
const express = require('express');
const path = require('path');

const app = express(path.join(__dirname, 'public'));
const PORT = process.env.PORT || 4242

app.set(express.static(path))
  .get("/", (req, res) => {res.sendFile(__dirname + "/index.html");});

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1KgrwGBEyNZnNN6ytMnQSYuT',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://azumaru-stripe.herokuapp.com/public/success.html`,
    cancel_url: `https://azumaru-stripe.herokuapp.com/public/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));