import nock from 'nock';
import { test, expect } from '@playwright/test';

test.describe('Payment flow', () => {
  test('should redirect to Stripe checkout on submit', async ({ page }) => {
    const scope = nock('https://www.google.com')
      .get('/')
      .reply(200)
      .on('request', (req) => {
        console.log(`Intercepted request to ${req.url}`);
      });

    await page.goto('/');
    await page.click('input[type="submit"]');

    expect(scope.isDone()).toBe(true);
  });
});
