// repository/IGameRepository.js

export default class IGameRepository {
    async getLevels() {
      throw new Error('getLevels() not implemented');
    }
  
    async getQuestionsByLevel(levelId) {
      throw new Error('getQuestionsByLevel() not implemented');
    }
  
    async saveResult(result) {
      throw new Error('saveResult() not implemented');
    }
  
    async getHistory() {
      throw new Error('getHistory() not implemented');
    }
  }
  