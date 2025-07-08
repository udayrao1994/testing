import { LocalQuizRepository } from './LocalQuizRepository';
// import { ApiQuizRepository } from './ApiQuizRepository'; // optional for API use

export const quizRepository = new LocalQuizRepository();
// export const quizRepository = new ApiQuizRepository(); // switch to API here
