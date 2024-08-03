import env from './lib/env';
import express from 'express';
import getPaymentLink from './routes/getPaymentLink';
import addItemToBasket from './routes/addItemToBasket';

if (!env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe key not set');
}

const app = express();
app.use(express.json());

app.post('/basket/item', addItemToBasket);
app.get('/payment/:priceId', getPaymentLink);

export default app;
