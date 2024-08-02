import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

console.log(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

stripe.products
  .create({
    name: 'Yet another subscription',
    description: '£14/Month subscription',
  })
  .then((product: Stripe.Product) => {
    stripe.prices
      .create({
        unit_amount: 1400,
        currency: 'gbp',
        recurring: {
          interval: 'month',
        },
        product: product.id,
      })
      .then((price: Stripe.Price) => {
        console.log(
          'Success! Here is your starter subscription product id: ' + product.id
        );
        console.log(
          'Success! Here is your starter subscription price id: ' + price.id
        );
      });
  });
