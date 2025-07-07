// features/HistoryScreen/HistoryScreen.test.js

import React from 'react';
import { render } from '@testing-library/react-native';
import HistoryScreen from './HistoryScreen';
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockRoute = {
  params: {
    // Updated question format to match QuizData.js
    questions: [{ question: '2 + 2', answer: '4' }],
    answers: [{ questionIndex: 0, userAnswer: '4' }],
    // Updated level to a string number to match QuizData.js (e.g., '1' for level 1)
    level: '1',
  },
};

describe('HistoryScreen', () => {
  it('renders question and score', () => {
    const { getByText } = render(<HistoryScreen route={mockRoute} />);

    // Check if the question is rendered (updated to match QuizData.js format)
    // The component renders "Q{idx + 1}. {q.question}"
    expect(getByText('Q1. 2 + 2')).toBeTruthy();

    // Check if the score is rendered correctly
    expect(getByText('Your Score')).toBeTruthy();
    expect(getByText('1/1')).toBeTruthy(); // 1 correct answer out of 1
  });
});
