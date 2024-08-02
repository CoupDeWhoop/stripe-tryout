import { Request, Response } from 'express';
import getPaymentLink from './getPaymentLink';

describe('Get all users request', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
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
