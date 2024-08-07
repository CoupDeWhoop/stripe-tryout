import { Request, Response } from 'express';
import stripe from '../lib/stripeModule';
import createCheckoutSession from '../lib/stripeCheckout';

async function renderCheckout(req: Request, res: Response) {
  try {
    const session = await createCheckoutSession();

    console.log(session.url);
    if (session.url) {
      res.redirect(303, session.url);
    } else {
      throw new Error('Checkout session ID is missing');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
}

export { renderCheckout };
