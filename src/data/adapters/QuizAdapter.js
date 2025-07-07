// /src/data/adapters/QuizAdapter.js
export const adaptQuestions = (questions) => {
    return questions.map((item, index) => ({
      id: index + 1,
      questionText: item.question,
      correctAnswer: item.answer
    }));
  };
  