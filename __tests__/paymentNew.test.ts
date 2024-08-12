import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import app from '../src/app';
import { stripe } from '../src/lib/stripeClient';
jest.mock('../src/lib/stripeClient');

// not sure about this syntax. doesn't overcome typing issues
const mockedStripe = stripe as jest.Mocked<typeof stripe>;

describe('GET /payment/:id', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should return a payment link with a 200 status', async () => {
    const priceId = 'price_1Piygk07nWBNQfFLjJ25rQyF';
    const expectedResponse = {
      paymentLink: {
        url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
        object: 'payment_link',
      },
    };

    // @ts-ignore
    stripe.paymentLinks.create.mockResolvedValue(expectedResponse.paymentLink);

    const response = await request(app).get(`/payment/${priceId}`).expect(200);

    expect(response.body).toEqual(expectedResponse);
  });

  test('should handle errors and return a 500 status', async () => {
    const priceId = 'price_1Piygk07nWBNQfFLjJ25rQyF';

    // @ts-ignore
    stripe.paymentLinks.create.mockRejectedValue(new Error());

    const response = await request(app).get(`/payment/${priceId}`).expect(500);

    expect(response.body).toEqual({ error: 'Something went wrong' });
  });
});
