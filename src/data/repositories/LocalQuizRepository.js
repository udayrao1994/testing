import AsyncStorage from '@react-native-async-storage/async-storage';
import levelData from './quizdata'; // ✅ make sure quizdata is default-exported
import { IQuizRepository } from './IQuizRepository';

export class LocalQuizRepository extends IQuizRepository {
  async getAllLevelsWithQuestions() {
    return levelData;
  }

  async getQuestionsByLevel(level) {
    const selected = levelData.find((l) => l.level === level);
    return selected?.questions || [];
  }


  async unlockLevelIfNeeded(currentLevel) {
    const unlocked = await this.getUnlockedLevels();
    const nextLevel = parseInt(currentLevel) + 1;
    if (!unlocked.includes(nextLevel)) {
      unlocked.push(nextLevel);
      await AsyncStorage.setItem('unlockedLevels', JSON.stringify(unlocked));
    }
  }
  
  async getUnlockedLevels() {
    const data = await AsyncStorage.getItem('unlockedLevels');
    if (!data) {
      const defaultLevels = [1];
      await AsyncStorage.setItem('unlockedLevels', JSON.stringify(defaultLevels));
      return defaultLevels;
    }
    return JSON.parse(data);
  }


  async saveQuizHistory(result) {
    const existing = await this.getQuizHistory();
    existing.push(result);
    await AsyncStorage.setItem('quizHistory', JSON.stringify(existing));
  }
  
  async getQuizHistory() {
    const data = await AsyncStorage.getItem('quizHistory');
    console.log("data",data)
    return data ? JSON.parse(data) : [];
  }
  
}