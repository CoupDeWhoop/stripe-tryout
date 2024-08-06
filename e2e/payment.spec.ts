import { test, expect } from '@playwright/test';

test.describe('Intercept', () => {
  test('should intercept external website', async ({ page }) => {
    await page.route('https://www.google.com/**', async (route) => {
      await route.fulfill({
        json: { id: '343', title: 'A faked response' },
      });
    });

    await page.goto('/');
    await page.click('input[type="submit"]');

    await expect(page.getByText('A faked response')).toBeInViewport();
  });
});

// test("Mocks a simple api call", async ({ page }) => {
//   page.route(
//     "https://jsonplaceholder.typicode.com/todos/4",
//     async (route) =>
//       await route.fulfill({
//         json: { id: "343", title: "A faked response" },
//       })
//   );

//   await page.goto("http://localhost:3000/");
//   await expect(page.getByText('A faked response')).toBeInViewport()
// });
