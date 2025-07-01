// features/HistoryScreen/HistoryScreen.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HistoryScreen from './HistoryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // avoid warning

const mockNavigate = jest.fn();
const mockReset = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  reset: mockReset,
  addListener: jest.fn(() => () => {}),
};

const mockQuestions = [
  { question: '2 + 2', answer: '4' },
  { question: '5 * 3', answer: '15' },
  { question: '6 - 2', answer: '4' },
];

const mockAnswers = [
  { questionIndex: 0, userAnswer: '4' },
  { questionIndex: 1, userAnswer: '15' },
  { questionIndex: 2, userAnswer: '5' }, // incorrect
];

describe('HistoryScreen', () => {
  it('renders header and score summary', async () => {
    const { getByText } = render(
      <HistoryScreen
        navigation={mockNavigation}
        route={{
          params: {
            questions: mockQuestions,
            answers: mockAnswers,
            level: 1,
          },
        }}
      />
    );

    await waitFor(() => {
      expect(getByText('📊 Quiz Summary')).toBeTruthy();
      expect(getByText('LEVEL : 1')).toBeTruthy();
      expect(getByText('Your Score')).toBeTruthy();
      expect(getByText('2/3')).toBeTruthy(); // two correct
    });
  });

  it('displays all questions with correct/incorrect status', async () => {
    const { getByText } = render(
      <HistoryScreen
        navigation={mockNavigation}
        route={{
          params: {
            questions: mockQuestions,
            answers: mockAnswers,
            level: 1,
          },
        }}
      />
    );

    await waitFor(() => {
      expect(getByText(/Q1. 2 \+ 2/)).toBeTruthy();
      expect(getByText(/Correct: 4 \| Your: 4/)).toBeTruthy();

      expect(getByText(/Q2. 5 \* 3/)).toBeTruthy();
      expect(getByText(/Correct: 15 \| Your: 15/)).toBeTruthy();

      expect(getByText(/Q3. 6 - 2/)).toBeTruthy();
      expect(getByText(/Correct: 4 \| Your: 5/)).toBeTruthy();
    });
  });

  it('navigates to leaderboard when button pressed', async () => {
    const { getByText } = render(
      <HistoryScreen
        navigation={mockNavigation}
        route={{
          params: {
            questions: mockQuestions,
            answers: mockAnswers,
            level: 1,
          },
        }}
      />
    );

    const leaderboardBtn = getByText(/🏆 View Leaderboard/);
    fireEvent.press(leaderboardBtn);

    expect(mockNavigate).toHaveBeenCalledWith('leadboard');
  });

  it('resets navigation when retry button pressed', async () => {
    const { getByText } = render(
      <HistoryScreen
        navigation={mockNavigation}
        route={{
          params: {
            questions: mockQuestions,
            answers: mockAnswers,
            level: 1,
          },
        }}
      />
    );

    const retryBtn = getByText(/🔁 Retry Quiz/);
    fireEvent.press(retryBtn);

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Levels' }],
    });
  });

  it('saves score to AsyncStorage on mount', async () => {
    render(
      <HistoryScreen
        navigation={mockNavigation}
        route={{
          params: {
            questions: mockQuestions,
            answers: mockAnswers,
            level: 2,
          },
        }}
      />
    );

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'quizHistory',
        expect.stringContaining('"level":2')
      );
    });
  });
});
