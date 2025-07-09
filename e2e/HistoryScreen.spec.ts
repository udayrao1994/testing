
import { test, expect } from './setup/global-test'

test.describe('HistoryScreen full flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081/history');

    await page.evaluate(() => {
      // Store last quiz attempt
      localStorage.setItem(
        'lastQuizData',
        JSON.stringify({
          level: 3,
          questions: [
            { question: '2 + 2', answer: '4' },
            { question: '5 x 3', answer: '15' },
          ],
          answers: [
            { questionIndex: 0, userAnswer: '4' },   // correct
            { questionIndex: 1, userAnswer: null },  // skipped
          ],
        })
      );

      // Store quiz history for leaderboard
      localStorage.setItem(
        'quizHistory',
        JSON.stringify([
          {
            level: 3,
            score: 1,
            total: 2,
            questions: [
              { question: '2 + 2', answer: '4' },
              { question: '5 x 3', answer: '15' },
            ],
          },
        ])
      );

      // Push to /history route
      window.history.pushState({}, '', '/history');
    });

    await page.reload();
  });

  test('navigates to leaderboard and back, then retries quiz', async ({ page }) => {
    // 🏆 Step 1: Click View Leaderboard
    const leaderboardBtn = page.getByText('🏆 View Leaderboard');
    await leaderboardBtn.click();

    // ✅ Confirm Leaderboard screen
    await expect(page).toHaveURL(/leaderboard/i);
    await expect(page.getByRole('heading', { name: /Leaderboard/i })).toBeVisible();


    // ✅ Assert Level 3 is shown
    await expect(page.getByText(/Level 3/i)).toBeVisible();

    // 🔙 Step 2: Go back to History screen
    await page.goBack();

    // ✅ Confirm back on History screen
    await expect(page).toHaveURL(/history/i);
    await expect(page.getByText('📊 Quiz Summary')).toBeVisible();

    // 🔁 Step 3: Click Retry Quiz
    const retryBtn = page.getByText('🔁 Retry Quiz');
    await retryBtn.click();

  });
});







