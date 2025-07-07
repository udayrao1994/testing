// /src/data/datasources/QuizLocalDataSource.js
import quizData from '../../assets/quizData.json';

export class QuizLocalDataSource {
  async fetchAllLevels() {
    return quizData;
  }

  async fetchLevelQuestions(level) {
    const levelData = quizData.find(item => item.level === level);
    return levelData ? levelData.questions : [];
  }
}
