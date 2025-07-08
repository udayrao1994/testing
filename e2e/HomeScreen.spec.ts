import { test, expect } from '@playwright/test';

test.describe('HomeScreen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081/home'); // Adjust to your app's base route
     // Assuming you start from level selection
  });

  test('should render initial question and UI elements', async ({ page }) => {
    await expect(page.getByTestId('homeScreenContainer')).toBeVisible();
    await expect(page.getByTestId('levelText')).toHaveText(/Level:/);
    await expect(page.getByTestId('questionText')).toBeVisible();
    await expect(page.getByTestId('inputText')).toHaveText(' ');
  });

  test('should enter input and submit answer', async ({ page }) => {
    await page.getByTestId('keypad-1').click();
    await page.getByTestId('keypad-2').click();

    await expect(page.getByTestId('inputText')).toHaveText('12');

    await page.getByTestId('submitButtonWrapper').click();

    await expect(page.getByTestId('questionText')).toBeVisible(); // New question or result screen
  });

  test('should skip a question', async ({ page }) => {
    await page.getByTestId('skipButton').click();

    await expect(page.getByTestId('questionText')).toBeVisible(); // Skipped to next question
  });

  test('should backspace correctly', async ({ page }) => {
    await page.getByTestId('keypad-1').click();
    await page.getByTestId('keypad-2').click();
    await page.getByTestId('keypad-backspace').click();

    await expect(page.getByTestId('inputText')).toHaveText('1');
  });

  test('should navigate back to levels screen', async ({ page }) => {
    await page.getByTestId('backButton').click();
    await expect(page).toHaveURL(/levels/i); // Adjust depending on your route
  });
});
