
import { test, expect } from './setup/global-test'

test.describe('Onboarding Screen', () => {
  test.beforeEach(async ({ page }) => {
    // Replace with correct URL and port where app is running (Metro server or WebView wrapper)
    await page.goto('http://localhost:8081');
  });

  test('should display the first onboarding slide', async ({ page }) => {
    await expect(page.getByTestId('onboardingTitle')).toHaveText('Welcome to the Math Quiz!');
    await expect(page.getByTestId('onboardingDescription')).toHaveText(
      'Sharpen your arithmetic skills and solve challenging math problems!'
    );
  });

  test('should navigate through onboarding slides and go to Register screen', async ({ page }) => {
    await page.getByTestId('nextButton').click(); // Slide 2
    await expect(page.getByTestId('onboardingTitle')).toHaveText('Choose Your Difficulty');

    await page.getByTestId('nextButton').click(); // Slide 3
    await expect(page.getByTestId('onboardingTitle')).toHaveText('Track Your Progress');

    await page.getByTestId('nextButton').click(); // Navigate to Register screen

    // ✅ Assert that Register screen is visible by checking for an input field
    await expect(page.getByTestId('fullNameInput')).toBeVisible();
  });

  test('should navigate back to previous slide', async ({ page }) => {
    await page.getByTestId('nextButton').click(); // Slide 2
    await page.getByTestId('nextButton').click(); // Slide 3

    await page.getByTestId('backButton').click(); // Back to Slide 2
    await expect(page.getByTestId('onboardingTitle')).toHaveText('Choose Your Difficulty');
  });

  test('should navigate to Register screen when Get Started is pressed', async ({ page }) => {
    await page.getByTestId('nextButton').click(); // Slide 2
    await page.getByTestId('nextButton').click(); // Slide 3

    await expect(page.getByTestId('onboardingTitle')).toHaveText('Track Your Progress');
    await page.getByTestId('nextButton').click(); // Click "Get Started"

    // ✅ Assert Register screen loaded
    await expect(page.getByTestId('fullNameInput')).toBeVisible();
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
