import Stripe from 'stripe';
import env from './env';

if (!env.STRIPE_SECRET_KEY) {
  const errCode = 1;
  console.error('Stripe key not set', errCode);
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export default stripe;
