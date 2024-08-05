import env from './lib/env';
import express from 'express';
import path from 'path';
import getPaymentLink from './routes/getPaymentLink';
import addItemToBasket from './routes/addItemToBasket';
import { renderHomePage } from './controllers/home.controller';
import { renderCheckout } from './controllers/checkout.controller';

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));
// app.use(express.json());
// app.use(express.static('public'))

app.get('/', renderHomePage);
app.post('/basket/item', addItemToBasket);

app.get('/payment/:priceId', getPaymentLink);
app.post('/create-checkout-session', renderCheckout);

export default app;
