import request from 'supertest';
import app from '../src/app';
import nock from 'nock';

describe('GET /payment', () => {
  beforeAll(() => {
    nock.disableNetConnect(); // Disable all real network connections
    nock.enableNetConnect('127.0.0.1'); // allow local
  });
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test('should return 200 and payment link', async () => {
    const priceId = 'snosno0s0son';

    const mockPaymentLink = {
      url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
      object: 'payment_link',
    };

    nock('https://api.stripe.com')
      .post(`/v1/payment_links`)
      .reply(200, mockPaymentLink);

    const response = await request(app).get(`/payment/${priceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ paymentLink: mockPaymentLink });
  });
});
