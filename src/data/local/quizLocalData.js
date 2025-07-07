// quizLocalData.js - local static data source
import { quizData } from "../data/QuizData";

export const getQuestionsByLevel = (level) => {
  return quizData[level] || [];
};