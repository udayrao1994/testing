// data/repositories/QuizRepository.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuizData from '../../../assets/quizdata'; // ✅ FIXED


export class QuizRepository {
  async unlockLevelIfNeeded(currentLevel) {
    try {
      const stored = await AsyncStorage.getItem('unlockedLevels');
      const unlockedLevels = stored ? JSON.parse(stored) : [1];

      const nextLevel = currentLevel + 1;
      if (!unlockedLevels.includes(nextLevel)) {
        unlockedLevels.push(nextLevel);
        await AsyncStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
      }
    } catch (error) {
      console.error('Failed to unlock next level:', error);
    }
  }

  async getUnlockedLevels() {
    try {
      const data = await AsyncStorage.getItem('unlockedLevels');
      return data ? JSON.parse(data) : [1];
    } catch (error) {
      console.error('Failed to get unlocked levels:', error);
      return [1];
    }
  }

  async saveScoreToHistory(entry) {
    try {
      const existing = await AsyncStorage.getItem('quizHistory');
      const history = existing ? JSON.parse(existing) : [];
      history.push(entry);
      await AsyncStorage.setItem('quizHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  }

  async getHistory() {
    try {
      const history = await AsyncStorage.getItem('quizHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to retrieve history:', error);
      return [];
    }
  }

  async clearHistory() {
    try {
      await AsyncStorage.removeItem('quizHistory');
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  async clearUnlockedLevels() {
    try {
      await AsyncStorage.removeItem('unlockedLevels');
    } catch (error) {
      console.error('Failed to clear unlocked levels:', error);
    }
  }

  // ✅ MISSING METHOD - ADD THIS
  getAllLevelsWithQuestions() {
    return QuizData; // Assumes QuizData is an array of levels with `level` and `questions`
  }
}
