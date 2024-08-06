import { test, expect } from '@playwright/test';
import nock from 'nock';
import app from '../../src/app';

test.describe('Payment flow', () => {
  test.beforeEach(() => {
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1'); // allow local
  });

  test.afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('should mock the payment endpoint and proceed to checkout', async ({
    page,
  }) => {
    const mockPaymentLink = {
      url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
      object: 'payment_link',
    };

    nock('https://api.stripe.com')
      .post('/v1/payment_links')
      .reply(200, mockPaymentLink);

    await page.goto('/');
    await page.click('input[type="submit"]');

    await page.waitForURL(mockPaymentLink.url);
    const url = page.url();
    expect(url).toBe(mockPaymentLink.url);
  });
});
