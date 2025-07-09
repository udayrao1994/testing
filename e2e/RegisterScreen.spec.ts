
import { test, expect } from './setup/global-test'

test.describe("Register", () => {
  test('should register a new user and redirect to login screen', async ({ page }) => {
    
    await page.goto('http://localhost:8081/register');

    await expect(page.getByTestId('fullNameInput')).toBeVisible({ timeout: 10000 });

    await page.getByTestId('fullNameInput').fill('uday');
    await page.getByTestId('emailInput').fill('uday@example.com'); // Make sure this is a valid format if validated
    await page.getByTestId('passwordInput').fill('123');
    await page.getByTestId('confirmPasswordInput').fill('123');

    await page.getByTestId('signupButton').click();

  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.attachments.push({
        name: 'screenshot',
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  });
});
