import { Request, Response } from 'express';
import Stripe from 'stripe';
import stripe from '../lib/stripeModule';

export default async function getPaymentLink(req: Request, res: Response) {
  const { priceId } = req.params;
  // const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  stripe.paymentLinks
    .create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    })
    .then((paymentLink: Stripe.PaymentLink) => {
      res.statusCode = 200;
      res.send({ paymentLink });
    });
}
