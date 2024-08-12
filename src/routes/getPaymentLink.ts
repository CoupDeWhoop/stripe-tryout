import { Request, Response } from 'express';
import { stripe } from '../lib/stripeClient';

export default async function getPaymentLink(req: Request, res: Response) {
  const { priceId } = req.params;

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    res.status(200).send({ paymentLink });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
}
