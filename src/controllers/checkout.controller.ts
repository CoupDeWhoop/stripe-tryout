import { Request, Response } from 'express';
import stripe from '../lib/stripeClient';

async function renderCheckout(req: Request, res: Response) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1Piygk07nWBNQfFLjJ25rQyF',
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
    });

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
