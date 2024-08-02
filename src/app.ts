import env from './lib/env';
import express from 'express';
import getPaymentLink from './routes/getPaymentLink';

if (!env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe key not set');
}

const app = express();
app.use(express.json());

app.get('/payment/:priceId', getPaymentLink);

export default app;
