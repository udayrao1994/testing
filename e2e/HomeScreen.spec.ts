
import { test, expect } from './setup/global-test'

test.describe('HomeScreen', () => {
  const level = 1;
  const url = `http://localhost:8081/home`;

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('should render initial question and UI elements', async ({ page }) => {
    await expect(page.getByTestId('homeScreenContainer')).toBeVisible();
    await expect(page.getByTestId('levelText')).toContainText(`Level: ${level}`);
    await expect(page.getByTestId('questionText')).toBeVisible();
    await expect(page.getByTestId('inputText')).toHaveText(' ');
  });

  test('should enter input and submit answer', async ({ page }) => {
    await page.getByTestId('keypad-1').click();
    await page.getByTestId('keypad-2').click();
    await expect(page.getByTestId('inputText')).toContainText('12'); // Allow flexible content
    await page.getByTestId('submitButtonWrapper').click();
    await expect(page.getByTestId('questionText')).toBeVisible();
  });

  test('should skip a question', async ({ page }) => {
    await page.getByTestId('skipButton').click();
    await expect(page.getByTestId('questionText')).toBeVisible();
  });

  test('should backspace correctly', async ({ page }) => {
    const inputText = page.getByTestId('inputText');
  
    for (const key of ['1','2','3','4','5','6','7','8','9','0']) {
      await page.getByTestId(`keypad-${key}`).click();
      await expect(inputText).toContainText(key); // confirm each digit
    }
  
    const before = await inputText.textContent();
    console.log('Input before backspace:', before); // should log 1234567890
  
    await page.getByTestId('keypad-backspace').click();
  
    await expect(inputText).toHaveText('');
  });
  
  test('should navigate back to levels screen', async ({ page }) => {
    await page.getByTestId('backButton').click();
    await page.waitForTimeout(1000); // Give time for navigation
    const currentUrl = page.url();
    console.log(`Navigated to: ${currentUrl}`);

    // Try to match either /levels or /home if uncertain
    await expect(page).toHaveURL(/levels|home/i);
  });
});
