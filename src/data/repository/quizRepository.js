// quizRepository.js - abstract layer between app and data source
import { getQuestionsByLevel as getLocalQuestions } from "../local/quizLocalData";

export const getQuestionsByLevel = (level) => {
  // This can be switched to API call easily later
  return getLocalQuestions(level);
};