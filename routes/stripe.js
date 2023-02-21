const express = require('express');
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE)
const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body
  const { username } = req.body
  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "RON",
        product_data: {
          name: item.titlu,
          images: [item.poza],
          description: item.descriere,
          metadata: {
            id: username,
          },
        },
        unit_amount: item.unitate * 100
      },
      quantity: item.quantity,
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
  res.status(200).send({url: session.url});
});
module.exports = router;