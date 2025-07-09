

import { test, expect } from './setup/global-test'


test.describe('Login Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081/login');
  });

  test('should log in successfully with correct credentials', async ({ page }) => {
    // Fill in email and password using testID selectors
    await expect(page.getByTestId('emailInput')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('emailInput').fill('uday@example.com');
    await page.getByTestId('passwordInput').fill('123');

    // Click login button
    await page.getByTestId('loginButton').click();

  });
});
