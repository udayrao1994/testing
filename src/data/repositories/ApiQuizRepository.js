import { IQuizRepository } from './IQuizRepository';

export class ApiQuizRepository extends IQuizRepository {
  async getAllLevelsWithQuestions() {
    const response = await fetch('https://your-api-url.com/levels');

    if (!response.ok) {
      throw new Error('Failed to fetch level data');
    }

    console.log("kkkkk",response.json())
    return await response.json();
  }

  async getQuestionsByLevel(level) {
    const response = await fetch(`https://your-api-url.com/levels/${level}/questions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions for level ${level}`);
    }
    return await response.json();
  }

  async unlockLevelIfNeeded(currentLevel) {
    const nextLevel = parseInt(currentLevel) + 1;

    const response = await fetch(`https://your-api-url.com/unlock-level`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: nextLevel }),
    });

    if (!response.ok) {
      throw new Error('Failed to unlock next level');
    }

    return await response.json(); // assume it returns updated unlocked levels
  }

  async getUnlockedLevels() {
    const response = await fetch(`https://your-api-url.com/unlocked-levels`);
    if (!response.ok) {
      throw new Error('Failed to fetch unlocked levels');
    }

    return await response.json(); // assume it returns array like [1,2,3]
  }

  async saveQuizHistory(result) {
    const response = await fetch(`https://your-api-url.com/quiz-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });

    if (!response.ok) {
      throw new Error('Failed to save quiz history');
    }

    return await response.json(); // optional: assume API returns updated history
  }

  async getQuizHistory() {
    const response = await fetch(`https://your-api-url.com/quiz-history`);
    if (!response.ok) {
      throw new Error('Failed to fetch quiz history');
    }

    return await response.json(); // assume it returns array of history items
  }
}
