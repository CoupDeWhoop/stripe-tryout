import { test, expect } from '@playwright/test';
import { renderCheckout } from '../../src/controllers/checkout.controller';

test.describe('Intercept', () => {
  test('should intercept external website', async ({ page }) => {
    // await page.route(/.*stripe.*/, async (route) => {
    //   console.log(`Intercepted request to: ${route.request().url()}`);

    //   // Fulfill the request with a fake response
    //   await route.fulfill({
    //     status: 200,
    //     contentType: 'application/json',
    //     body: JSON.stringify({ id: '343', title: 'A faked response' }),
    //   });
    // });

    await page.goto('/');
    await page.click('input[type="submit"]');
    await expect(page.getByTestId('product-summary')).toContainText(
      'My First Product'
    );
  });
});
