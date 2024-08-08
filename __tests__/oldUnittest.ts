import { Request, Response } from 'express';
import getPaymentLink from '../src/routes/getPaymentLink';
import stripe from '../src/lib/stripeClient';
jest.mock('../src/lib/stripeClient');

describe('create payment link', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = { params: { priceId: 'price_1Piygk07nWBNQfFLjJ25rQyF' } };
    mockResponse = {
      statusCode: 200,
      //mockImplementation captures the response body into the responseObject.
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  test('200 - payment/:id', () => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      paymentLink: {
        url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
        object: 'payment_link',
      },
    };

    getPaymentLink(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });
});
