import React from 'react';
import { render } from '@testing-library/react-native';
import HistoryScreen from './HistoryScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    reset: jest.fn(),
  }),
}));

const mockRoute = {
  params: {
    questions: [{ question: '2+2', correct_answer: '4' }],
    answers: [{ answer: '4' }],
    level: 1,
  },
};

describe('HistoryScreen', () => {
  it('renders question and score', () => {
    const { getByText } = render(<HistoryScreen route={mockRoute} />);
    expect(getByText('2+2')).toBeTruthy();
  });
});
