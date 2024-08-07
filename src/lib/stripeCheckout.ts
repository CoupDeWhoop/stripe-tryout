import stripe from './stripeModule';

export default async function createCheckoutSession() {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1Piygk07nWBNQfFLjJ25rQyF',
        quantity: 2,
      },
    ],
    mode: 'payment',
    success_url: `https://localhost:3002/success`,
    cancel_url: `https://localhost:3002/cancel`,
  });

  return session;
}
