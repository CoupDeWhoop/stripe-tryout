import env from './lib/env'; // need this
import express from 'express';
import path from 'path';
import { Request, Response } from 'express';
import getPaymentLink from './routes/getPaymentLink';
import addItemToBasket from './routes/addItemToBasket';
import { renderHomePage } from './controllers/home.controller';
import { renderCheckout } from './controllers/checkout.controller';

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));
// app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', renderHomePage);
app.post('/basket/item', addItemToBasket);
app.get('/cancel', (req: Request, res: Response) => {
  res.render('cancel.ejs');
});
app.get('/success', (req: Request, res: Response) => {
  res.render('success.ejs');
});

app.get('/payment/:priceId', getPaymentLink);
app.post('/create-checkout-session', renderCheckout);

export default app;
