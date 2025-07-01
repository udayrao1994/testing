// repository/LocalGameRepository.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import QuizData from '../data/QuizData'; // Update this path if needed
import IGameRepository from './IGameRepository';

export default class LocalGameRepository extends IGameRepository {
  async getLevels() {
    return QuizData.levels || [];
  }

  async getQuestionsByLevel(levelId) {
    const level = QuizData.levels.find(level => level.id === levelId);
    return level ? level.questions : [];
  }

  async saveResult(result) {
    try {
      const history = await this.getHistory();
      history.push(result);
      await AsyncStorage.setItem('quizHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save result:', error);
    }
  }

  async getHistory() {
    try {
      const historyString = await AsyncStorage.getItem('quizHistory');
      return historyString ? JSON.parse(historyString) : [];
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }
}
