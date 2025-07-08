import { test, expect } from '@playwright/test';


    test.describe('LevelScreen', () => {
        test.beforeEach(async ({ page }) => {
          await page.goto('http://localhost:8081/levels');
        });
    

  test('should display levels and allow navigation on unlocked level', async ({ page }) => {
    // 1. Go to Level Screen (adjust the URL to your app setup

    // 2. Check if main screen title is visible
    await expect(page.getByTestId('levelScreenTitle')).toBeVisible();
    await expect(page.getByText('🎯 Select Your Level')).toBeVisible();

    // 3. Wait for the level list to load
    await expect(page.getByTestId('levelList')).toBeVisible();

    // 4. Wait for first level card to render (Level 1 is assumed unlocked)
    const levelButton = page.getByTestId('levelButton-1');
    await expect(levelButton).toBeVisible();
    await expect(levelButton).toBeEnabled();

    // 5. Click on Level 1
    await levelButton.click();

    // 6. Optional: check if navigation happens
    // If your app uses a new screen, check for something unique
    // Example:
    // await expect(page.getByTestId('questionScreen')).toBeVisible();

    // 7. (Optional) Check locked level behavior (e.g., Level 2)
    const lockIcon = page.getByTestId('lockIcon-2');
    await expect(lockIcon).toBeVisible();
  });

})